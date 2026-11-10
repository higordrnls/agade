/** Preços monetários sempre em centavos; cálculos definitivos do checkout serão feitos no servidor. */
export type PricingInputs = {
  purchaseCents: number;
  personalizationCents: number;
  inboundFreightCents: number;
  packagingCents: number;
  outboundSubsidyCents: number;
  fixedFeeCents: number;
  percentageFees: number; // Fração da receita (ex.: 0.05)
  contributionTargetCents: number;
};

function nonnegativeInteger(name: string, value: number): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${name} precisa ser um inteiro não negativo em centavos`);
  }
  return value;
}

/** Calcula menor preço que atende à contribuição alvo antes dos custos fixos gerais. */
export function minimumPriceCents(input: PricingInputs): number {
  const base = nonnegativeInteger('purchaseCents', input.purchaseCents)
    + nonnegativeInteger('personalizationCents', input.personalizationCents)
    + nonnegativeInteger('inboundFreightCents', input.inboundFreightCents)
    + nonnegativeInteger('packagingCents', input.packagingCents)
    + nonnegativeInteger('outboundSubsidyCents', input.outboundSubsidyCents)
    + nonnegativeInteger('fixedFeeCents', input.fixedFeeCents)
    + nonnegativeInteger('contributionTargetCents', input.contributionTargetCents);
  if (!Number.isFinite(input.percentageFees) || input.percentageFees < 0 || input.percentageFees >= 1) {
    throw new Error('percentageFees deve estar entre 0 e 1 (exclusivo)');
  }
  return Math.ceil(base / (1 - input.percentageFees));
}
