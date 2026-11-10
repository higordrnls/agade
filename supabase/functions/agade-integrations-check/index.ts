// AGADE · Diagnóstico PRIVADO dos serviços, sem criar pedidos ou cobranças.
// Publicar somente após definir AGADE_DIAGNOSTIC_KEY (32+ caracteres aleatórios).
// Deploy com verify_jwt=false: esta função faz sua própria autenticação.
const respond = (body: unknown, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});

// O catálogo é exposto APENAS por RPC pública para anon/authenticated.
// Evitamos service_role aqui: esse papel NÃO recebeu EXECUTE da RPC.
function getCatalogKey(): string | undefined {
  const legacy = Deno.env.get("SUPABASE_ANON_KEY");
  if (legacy) return legacy;
  try {
    const keys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}");
    return typeof keys.default === "string" ? keys.default : undefined;
  } catch {
    return undefined;
  }
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return respond({ error: "method_not_allowed" }, 405);

  const expected = Deno.env.get("AGADE_DIAGNOSTIC_KEY") ?? "";
  if (expected.length < 32 || request.headers.get("x-agade-diagnostic-key") !== expected) {
    return respond({ error: "unauthorized" }, 401);
  }

  // Somente ambiente declarado como teste; esta função jamais executa cobrança.
  if (Deno.env.get("MP_ACCOUNT_ENV") !== "test") {
    return respond({ error: "test_environment_required" }, 503);
  }

  const url = Deno.env.get("SUPABASE_URL");
  const catalogKey = getCatalogKey();
  const token = Deno.env.get("MP_TEST_ACCESS_TOKEN");
  const status: Record<string, string> = {
    database: "not_checked",
    mercado_pago: "not_checked",
  };

  if (!url || !catalogKey) {
    status.database = "configuration_missing";
  } else {
    try {
      const catalog = await fetch(`${url}/rest/v1/rpc/list_storefront_catalog`, {
        method: "POST",
        headers: {
          apikey: catalogKey,
          ...(catalogKey.startsWith("eyJ") ? { Authorization: `Bearer ${catalogKey}` } : {}),
          "Content-Type": "application/json",
        },
        body: "{}",
        signal: AbortSignal.timeout(7000),
      });
      status.database = catalog.ok ? "connected" :
        catalog.status === 401 || catalog.status === 403 ? "permission_denied" :
        catalog.status === 404 ? "rpc_not_found" : "api_error";
    } catch {
      status.database = "unreachable";
    }
  }

  if (!token || !token.startsWith("APP_USR-")) {
    status.mercado_pago = "test_token_missing_or_unrecognized";
  } else {
    try {
      // Endpoint de leitura documentado pelo Mercado Pago para validar autenticação.
      // Nenhum dado retornado pelo provedor é enviado ao cliente.
      const response = await fetch("https://api.mercadolibre.com/users/me", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        signal: AbortSignal.timeout(7000),
      });
      status.mercado_pago = response.ok ? "authenticated" :
        response.status === 401 || response.status === 403 ? "unauthorized" : "provider_error";
    } catch {
      status.mercado_pago = "unreachable";
    }
  }

  return respond({
    ok: status.database === "connected" && status.mercado_pago === "authenticated",
    environment: "agade-dev",
    payments_enabled: false,
    checks: status,
  });
});
