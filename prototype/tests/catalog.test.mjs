import test from 'node:test';
import assert from 'node:assert/strict';
import { minimumPriceCents } from '../src/app/lib/pricing.ts';
import { groupCatalog } from '../src/app/data/storefrontCatalog.ts';

const input = {
  purchaseCents: 3490,
  personalizationCents: 150,
  inboundFreightCents: 300,
  packagingCents: 740,
  outboundSubsidyCents: 0,
  fixedFeeCents: 0,
  percentageFees: 0.05,
  contributionTargetCents: 2500,
};

test('preço mínimo contempla custos e taxa sobre receita', () => {
  assert.equal(minimumPriceCents(input), Math.ceil(7180 / 0.95));
});
test('rejeita custo negativo, percentual >=100% e valores fracionários', () => {
  assert.throws(() => minimumPriceCents({ ...input, purchaseCents: -1 }));
  assert.throws(() => minimumPriceCents({ ...input, percentageFees: 1 }));
  assert.throws(() => minimumPriceCents({ ...input, packagingCents: 1.5 }));
});
test('agrupa variantes sem misturar SKUs de produtos diferentes', () => {
  const base = {
    editorial_description: 'Curadoria', technical_description: 'Solar',
    collection_name: '001', hero_image_url: null, lens_type: 'solar',
    uv_claim: 'Declarado pelo fornecedor', polarized_claim: false,
    size_description: null, weight_grams: null, price_cents: 12900,
    sellable_stock: 3,
  };
  const rows = [
    { ...base, product_id: 'p1', slug: 'forma', name: 'Forma', variant_id: 'v1', sku: 'A1', color_name: 'Preto' },
    { ...base, product_id: 'p1', slug: 'forma', name: 'Forma', variant_id: 'v2', sku: 'A2', color_name: 'Tartaruga' },
    { ...base, product_id: 'p2', slug: 'linha', name: 'Linha', variant_id: 'v3', sku: 'B1', color_name: 'Marrom' },
  ];
  const products = groupCatalog(rows);
  assert.equal(products.length, 2);
  assert.deepEqual(products.map(p => p.variants.length), [2, 1]);
  assert.deepEqual(products[0].variants.map(v => v.sku), ['A1','A2']);
});
