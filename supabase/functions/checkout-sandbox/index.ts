// Integração experimental com Mercado Pago Orders API.
// DESATIVADA por padrão, sem endpoint público de compra.
// Requer o segredo ADMIN_SANDBOX_KEY e um token de teste Mercado Pago.
import { buildTestOrder, assertMercadoPagoCheckoutUrl } from "../_shared/checkout.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json({ error: "Método não permitido" }, 405);
  if (Deno.env.get("ENABLE_SANDBOX_CHECKOUT") !== "true") return json({ error: "Checkout desativado" }, 503);
  const secret = Deno.env.get("ADMIN_SANDBOX_KEY");
  const token = Deno.env.get("MP_TEST_ACCESS_TOKEN");
  const projectUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!secret || secret.length < 32 || !token?.startsWith("TEST-") || !projectUrl || !serviceKey) {
    return json({ error: "Ambiente de teste não configurado" }, 503);
  }
  // Chave privada exclusivamente no servidor; não chamar a função diretamente do navegador.
  if (request.headers.get("x-agade-admin-test-key") !== secret) return json({ error: "Não autorizado" }, 401);

  try {
    const input = await request.json();
    if (typeof input?.sku !== "string" || input.sku.length > 80 ||
        !Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 10 ||
        typeof input.reference !== "string") {
      return json({ error: "Dados inválidos" }, 400);
    }
    // Consulta com autoridade de servidor. O cliente não fornece valor ou título.
    const response = await fetch(
      `${projectUrl}/rest/v1/catalog_variants?select=sku,price_cents,available_stock,reserved_stock,active,catalog_products!inner(name,status)&sku=eq.${encodeURIComponent(input.sku)}&limit=1`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );
    if (!response.ok) return json({ error: "Falha de consulta ao catálogo" }, 502);
    const variants = await response.json();
    const variant = variants[0];
    if (!variant || variant.active !== true || variant.catalog_products?.status !== "active" ||
        variant.available_stock - variant.reserved_stock < input.quantity) {
      return json({ error: "Produto indisponível" }, 409);
    }
    const payload = buildTestOrder([
      { sku: variant.sku, title: variant.catalog_products.name, quantity: input.quantity, unitPriceCents: variant.price_cents },
    ], input.reference);

    // Não há reservas/pedidos ou reconciliação nesta etapa: SOMENTE credenciais de teste.
    const checkout = await fetch("https://api.mercadopago.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Idempotency-Key": input.reference,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!checkout.ok) return json({ error: "Não foi possível criar pedido de teste" }, 502);
    const order = await checkout.json();
    return json({ order_id: order.id, checkout_url: assertMercadoPagoCheckoutUrl(order.checkout_url) });
  } catch {
    return json({ error: "Falha ao preparar checkout de teste" }, 400);
  }
});
