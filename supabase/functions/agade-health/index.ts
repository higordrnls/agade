// AGADE · Diagnóstico público mínimo do ambiente de desenvolvimento.
// Sem consulta ao banco, sem tokens, sem pagamentos e sem dados pessoais.
// Endpoint exclusivo para testar o deploy e o runtime de Edge Functions.
Deno.serve((request: Request): Response => {
  if (request.method !== "GET" && request.method !== "POST") {
    return Response.json({ ok: false, error: "method_not_allowed" }, {
      status: 405,
      headers: { "Cache-Control": "no-store", "Allow": "GET, POST" },
    });
  }

  return Response.json({
    ok: true,
    service: "agade-dev",
    component: "edge-runtime",
    payments_enabled: false,
    version: 1,
  }, { headers: { "Cache-Control": "no-store" } });
});
