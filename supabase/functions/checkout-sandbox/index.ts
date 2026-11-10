// AGADE — Checkout experimental Mercado Pago Orders API.
// Desativado por padrão. Não habilitar vendas reais com esta função.
import { buildTestOrder, assertMercadoPagoCheckoutUrl } from "../_shared/checkout.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const restHeaders = (key: string) => ({
  apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json",
});

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json({ error: "Método não permitido" }, 405);
  if (Deno.env.get("ENABLE_SANDBOX_CHECKOUT") !== "true" || Deno.env.get("MP_ACCOUNT_ENV") !== "test") return json({ error: "Checkout desativado" }, 503);
  const secret = Deno.env.get("ADMIN_SANDBOX_KEY");
  const token = Deno.env.get("MP_TEST_ACCESS_TOKEN");
  const projectUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!secret || secret.length < 32 || !token?.startsWith("APP_USR-") || !projectUrl || !serviceKey) {
    return json({ error: "Ambiente de teste não configurado" }, 503);
  }
  // Chave privada não pode aparecer em frontend, URLs nem logs.
  if (request.headers.get("x-agade-admin-test-key") !== secret) return json({ error: "Não autorizado" }, 401);

  try {
    const input = await request.json();
    if (typeof input?.sku !== "string" || input.sku.length > 80 ||
        !Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 10 ||
        typeof input.reference !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(input.reference)) {
      return json({ error: "Dados inválidos" }, 400);
    }
    // Atomicamente reserva estoque e congela o preço do catálogo.
    const reservationResponse = await fetch(`${projectUrl}/rest/v1/rpc/reserve_test_order`, {
      method: "POST",
      headers: restHeaders(serviceKey),
      body: JSON.stringify({ p_reference: input.reference, p_sku: input.sku, p_quantity: input.quantity }),
    });
    if (!reservationResponse.ok) return json({ error: "Reserva indisponível" }, 409);
    const [reservation] = await reservationResponse.json();
    if (!reservation || reservation.order_status !== "pending_payment") {
      return json({ error: "Pedido já encerrado" }, 409);
    }

    // Um retry com mesma referência reutiliza a reserva e a idempotência do MP.
    // Não aceita preço enviado pelo comprador.
    const payload = buildTestOrder([{
      sku: input.sku, title: input.sku, quantity: input.quantity,
      unitPriceCents: reservation.unit_price_cents,
    }], input.reference);

    const checkout = await fetch("https://api.mercadopago.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Idempotency-Key": input.reference,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    // Não liberar imediatamente reserva após erro de rede: a order pode existir no MP.
    if (!checkout.ok) return json({ error: "Pedido em análise; repetir com mesma referência" }, 502);
    const order = await checkout.json();
    if (order.external_reference !== input.reference || order.total_amount !== payload.total_amount ||
        (order.live_mode === true || typeof order.id !== "string" || !order.id.startsWith("ORDTST")) || typeof order.checkout_url !== "string") {
      return json({ error: "Resposta do provedor inconsistente" }, 502);
    }

    // Vincular o ID do MP à reserva antes de permitir o redirecionamento.
    const attach = await fetch(`${projectUrl}/rest/v1/rpc/attach_test_provider_order`, {
      method: "POST",
      headers: restHeaders(serviceKey),
      body: JSON.stringify({ p_reference: input.reference, p_provider_order_id: order.id }),
    });
    if (!attach.ok) return json({ error: "Vínculo pendente; pagamento não liberado" }, 409);
    return json({
      order_id: order.id,
      checkout_url: assertMercadoPagoCheckoutUrl(order.checkout_url),
      reference: input.reference,
    });
  } catch {
    return json({ error: "Falha ao preparar checkout de teste" }, 400);
  }
});
