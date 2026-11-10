// AGADE Newsletter — intentionally disabled until consent policy and unsubscribe channel are ready.
// Public endpoint; rate limit and strict allowed origin. No secret in browser.
const configuredOrigin = Deno.env.get("AGADE_NEWSLETTER_ORIGIN") ?? "";
const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
  "Cache-Control": "no-store",
});

const json = (body: unknown, status: number, origin: string) =>
  Response.json(body, { status, headers: cors(origin) });

function getAdminKey() {
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin") ?? "";
  if (!configuredOrigin.startsWith("https://") || origin !== configuredOrigin) {
    return Response.json({ error: "Origem não autorizada" }, { status: 403 });
  }
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (request.method !== "POST") return json({ error: "Método não permitido" }, 405, origin);
  if (Deno.env.get("ENABLE_NEWSLETTER_SIGNUP") !== "true") return json({ error: "Cadastro indisponível" }, 503, origin);

  const projectUrl = Deno.env.get("SUPABASE_URL");
  const secret = Deno.env.get("AGADE_NEWSLETTER_RATE_SALT") ?? "";
  const admin = getAdminKey();
  if (!projectUrl || !admin || secret.length < 32) return json({ error: "Cadastro indisponível" }, 503, origin);

  try {
    const body = await request.json();
    if (body?.website) return json({ registered: true }, 200, origin); // honeypot
    if (body?.consent !== true || body?.source !== "footer" || typeof body?.email !== "string" ||
        body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return json({ error: "Dados e consentimento inválidos" }, 400, origin);
    }
    const ip = request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const macKey = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const digest = new Uint8Array(await crypto.subtle.sign("HMAC", macKey, new TextEncoder().encode(ip)));
    const fingerprint = Array.from(digest).map(b => b.toString(16).padStart(2,"0")).join("");

    const response = await fetch(`${projectUrl}/rest/v1/rpc/register_newsletter_interest`, {
      method: "POST",
      headers: { apikey: admin, Authorization: `Bearer ${admin}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        p_email: body.email.trim().toLowerCase(), p_source: "footer", p_fingerprint: fingerprint,
      }),
    });
    if (!response.ok) return json({ error: "Cadastro temporariamente indisponível" }, 503, origin);
    return json({ registered: true }, 200, origin);
  } catch {
    return json({ error: "Falha ao processar solicitação" }, 400, origin);
  }
});
