// AGADE — Webhook de teste Mercado Pago Orders (não publicado).
// O endpoint deve ser exposto sem validação JWT Supabase SOMENTE com HMAC obrigatório.
// Não aceita credenciais de produção.
import { verifyWebhookSignature, verifiedOrderOutcome } from "../_shared/reconciliation.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const restHeaders = (key: string) => ({
  apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json",
});

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json({ error: "Método não permitido" }, 405);
  if (Deno.env.get("ENABLE_SANDBOX_CHECKOUT") !== "true") return json({ error: "Inativo" }, 503);
  const token = Deno.env.get("MP_TEST_ACCESS_TOKEN");
  const secret = Deno.env.get("MP_WEBHOOK_TEST_SECRET");
  const projectUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!token?.startsWith("TEST-") || !secret || !projectUrl || !serviceKey) return json({ error: "Inativo" }, 503);

  const url = new URL(request.url);
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("data_id");
  const requestId = request.headers.get("x-request-id") ?? "";
  const signature = request.headers.get("x-signature") ?? "";
  if (!dataId || !/^ORD[A-Za-z0-9_-]{5,100}$/.test(dataId) ||
      !(await verifyWebhookSignature(dataId, requestId, signature, secret))) {
    return json({ error: "Assinatura inválida" }, 401);
  }

  try {
    const notice = await request.json();
    if (notice?.type !== "order" || notice?.live_mode !== false || notice?.data?.id !== dataId) {
      return json({ error: "Notificação inválida" }, 400);
    }
    // Consulta autenticada ao provedor; jamais atualizar pedido pelo payload recebido.
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(dataId)}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    if (!mpResponse.ok) return json({ error: "Provedor indisponível" }, 502);
    const providerOrder = await mpResponse.json();

    const orderResponse = await fetch(
      `${projectUrl}/rest/v1/sales_orders?select=reference,total_cents,payment_provider_id&payment_provider_id=eq.${encodeURIComponent(dataId)}&limit=1`,
      { headers: restHeaders(serviceKey) },
    );
    if (!orderResponse.ok) return json({ error: "Falha no banco" }, 502);
    const [order] = await orderResponse.json();
    if (!order) return json({ error: "Order não reconhecida" }, 409);

    const outcome = verifiedOrderOutcome(providerOrder, {
      providerId: order.payment_provider_id,
      reference: order.reference,
      totalCents: Number(order.total_cents),
    });
    if (outcome === "pending") return json({ received: true, status: "pending" });

    const transition = await fetch(`${projectUrl}/rest/v1/rpc/transition_test_order`, {
      method: "POST",
      headers: restHeaders(serviceKey),
      body: JSON.stringify({
        p_reference: order.reference,
        p_target: outcome,
        p_provider_id: order.payment_provider_id,
      }),
    });
    if (!transition.ok) {
      // Conflito exige conciliação, não confirmar sucesso de estoque.
      return json({ error: "Conciliação pendente" }, 409);
    }
    return json({ received: true, status: outcome });
  } catch {
    return json({ error: "Falha de processamento" }, 500);
  }
});
