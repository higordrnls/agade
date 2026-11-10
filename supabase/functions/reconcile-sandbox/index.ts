// Reconciliador de TESTES. Executar por chamada agendada (Supabase Cron)
// com segredo privado; nunca expor endpoint sem autenticação própria.
import { verifiedOrderOutcome } from "../_shared/reconciliation.ts";

const json = (body: unknown, status=200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json({ error: "Método não permitido" },405);
  if (Deno.env.get("ENABLE_SANDBOX_CHECKOUT") !== "true") return json({ error: "Inativo" },503);
  const key=Deno.env.get("AGADE_CRON_TEST_SECRET"), supplied=request.headers.get("x-agade-cron-key");
  const token=Deno.env.get("MP_TEST_ACCESS_TOKEN"), project=Deno.env.get("SUPABASE_URL");
  const serviceKey=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!key || key.length<32 || supplied!==key || !token?.startsWith("TEST-") || !project || !serviceKey) {
    return json({ error: "Não autorizado" },401);
  }
  const headers={ apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type":"application/json" };
  let checked=0, transitioned=0, needsReview=0;
  // Primeiro, pedidos vinculados: nunca assumir que prazo vencido implica não pago.
  const orders=await fetch(
    `${project}/rest/v1/sales_orders?select=reference,total_cents,payment_provider_id&status=eq.pending_payment&payment_provider_id=not.is.null&order=created_at.asc&limit=50`,
    {headers},
  );
  if (!orders.ok) return json({error:"Falha de consulta"},502);
  for (const order of await orders.json()) {
    checked++;
    try {
      const response=await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(order.payment_provider_id)}`,{
        headers:{Authorization:`Bearer ${token}`,Accept:"application/json"},
      });
      if (!response.ok) {needsReview++;continue;}
      const remote=await response.json();
      const outcome=verifiedOrderOutcome(remote,{
        providerId:order.payment_provider_id,reference:order.reference,totalCents:Number(order.total_cents),
      });
      if (outcome==="pending") continue;
      const update=await fetch(`${project}/rest/v1/rpc/transition_test_order`,{
        method:"POST",headers,
        body:JSON.stringify({p_reference:order.reference,p_target:outcome,p_provider_id:order.payment_provider_id}),
      });
      if (update.ok) transitioned++; else needsReview++;
    } catch {needsReview++;}
  }
  // Segundo, somente os pedidos que não chegaram a criar order do provedor.
  const expired=await fetch(`${project}/rest/v1/rpc/expire_unlinked_test_orders`,{
    method:"POST",headers,body:JSON.stringify({p_batch_size:100}),
  });
  if (!expired.ok) return json({error:"Falha ao expirar reservas",checked,transitioned,needsReview},502);
  return json({checked,transitioned,needsReview,expired_unlinked:await expired.json()});
});
