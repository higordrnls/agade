/** Validadores compartilhados. Nunca confiar no corpo do webhook para atualizar estoque. */
export function centsFromAmount(value: unknown): number {
  if (typeof value !== "string" || !/^(0|[1-9]\d{0,8})(\.\d{1,2})?$/.test(value)) throw new Error("Valor inválido");
  const [major, decimals = ""] = value.split(".");
  return Number(major) * 100 + Number((decimals + "00").slice(0, 2));
}

export function verifiedOrderOutcome(
  external: Record<string, unknown>,
  expected: { providerId: string; reference: string; totalCents: number },
): "paid" | "cancelled" | "pending" {
  if (external.id !== expected.providerId ||
      external.external_reference !== expected.reference ||
      centsFromAmount(external.total_amount) !== expected.totalCents ||
      external.live_mode !== false) {
    throw new Error("Order divergente ou não simulada");
  }
  if (external.status === "processed" && external.status_detail === "accredited" &&
      centsFromAmount(external.total_paid_amount) === expected.totalCents) return "paid";
  if (external.status === "canceled" || external.status === "failed") return "cancelled";
  return "pending";
}

export function signatureManifest(dataId: string, requestId: string, ts: string) {
  return `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
}

export async function verifyWebhookSignature(
  dataId: string, requestId: string, signature: string, secret: string,
): Promise<boolean> {
  if (!dataId || !requestId || !secret || !/^ts=\d{9,16},v1=[a-f0-9]{64}$/i.test(signature)) return false;
  const match = /^ts=(\d{9,16}),v1=([a-f0-9]{64})$/i.exec(signature);
  if (!match) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signatureManifest(dataId, requestId, match[1])));
  const actual = new Uint8Array(digest);
  const expected = Uint8Array.from(match[2].match(/../g)!, byte => parseInt(byte, 16));
  let difference = 0;
  for (let i = 0; i < actual.length; i++) difference |= actual[i] ^ expected[i];
  return difference === 0;
}
