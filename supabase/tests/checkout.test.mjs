import test from "node:test";
import assert from "node:assert/strict";
import { buildTestOrder, moneyBRL, assertMercadoPagoCheckoutUrl } from "../functions/_shared/checkout.ts";

test("gera pedido com total inteiro em centavos e idempotência por referência", () => {
  const order = buildTestOrder([{ sku: "AG-01", title: "Modelo teste", quantity: 2, unitPriceCents: 12990 }], "test-uuid_01");
  assert.equal(order.total_amount, "259.80");
  assert.equal(order.items[0].unit_price, "129.90");
  assert.equal(order.processing_mode, "manual");
  assert.equal(order.external_reference, "test-uuid_01");
});
test("rejeita itens sem quantidade, preços negativos e referências inválidas", () => {
  assert.throws(() => buildTestOrder([], "ref"));
  assert.throws(() => buildTestOrder([{ sku: "1", title: "X", quantity: 0, unitPriceCents: 100 }], "ref"));
  assert.throws(() => buildTestOrder([{ sku: "1", title: "X", quantity: 1, unitPriceCents: -1 }], "ref"));
  assert.throws(() => buildTestOrder([{ sku: "1", title: "X", quantity: 1, unitPriceCents: 100 }], "invalid ref!"));
  assert.throws(() => moneyBRL(1.5));
});
test("rejeita links de checkout maliciosos ou sem HTTPS", () => {
  assert.match(assertMercadoPagoCheckoutUrl("https://www.mercadopago.com.br/checkout/v1/redirect?order_id=123"), /^https:/);
  assert.throws(() => assertMercadoPagoCheckoutUrl("https://mercadopago.com.br.evil.example/pay"));
  assert.throws(() => assertMercadoPagoCheckoutUrl("http://www.mercadopago.com.br/checkout"));
});
