/** Contrato do Checkout Pro (Orders API), usado exclusivamente no servidor. */
export type CheckoutItem = { sku: string; title: string; quantity: number; unitPriceCents: number };

export function moneyBRL(cents: number): string {
  if (!Number.isSafeInteger(cents) || cents < 0) throw new Error("Valor monetário inválido");
  return (cents / 100).toFixed(2);
}

/** Fonte dos preços: banco de dados, NUNCA payload do navegador. */
export function buildTestOrder(items: CheckoutItem[], reference: string) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(reference)) throw new Error("Referência inválida");
  if (items.length === 0 || items.length > 10) throw new Error("Quantidade de itens inválida");
  let total = 0;
  const sanitizedItems = items.map(({ sku, title, quantity, unitPriceCents }) => {
    if (!sku || !title || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Item inválido");
    }
    const unit_price = moneyBRL(unitPriceCents);
    const itemTotal = quantity * unitPriceCents;
    if (!Number.isSafeInteger(itemTotal)) throw new Error("Valor inválido");
    total += itemTotal;
    if (!Number.isSafeInteger(total) || total > 100000000) throw new Error("Total inválido");
    return { id: sku, title: title.slice(0, 120), quantity, unit_price };
  });
  return {
    type: "online" as const,
    processing_mode: "manual" as const,
    external_reference: reference,
    total_amount: moneyBRL(total),
    items: sanitizedItems,
  };
}

/** Não aceitar domínios arbitrários retornados por API. */
export function assertMercadoPagoCheckoutUrl(value: string): string {
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || !["mercadopago.com.br", "www.mercadopago.com.br"].includes(hostname)) {
    throw new Error("Destino de checkout não permitido");
  }
  return url.toString();
}
