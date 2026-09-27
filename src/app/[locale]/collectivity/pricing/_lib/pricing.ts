export type Perimeter = string;
export type ContractTerm = 1 | 3;

export type SubscriptionCondition = { field: string; operator: string; value: unknown };

export type SubscriptionModule = {
  key: string;
  status: string;
  annualRatesCents: Record<string, number>;
  conditions: SubscriptionCondition[];
};

export type SubscriptionCatalogue = {
  catalogueVersion: string;
  discountPolicyVersion: string;
  perimeters: string[];
  modules: SubscriptionModule[];
  discountPolicy: {
    termYears: Record<string, number>;
    communeCount: Array<{ minimum: number; discountBasisPoints: number }>;
    maximumDiscountBasisPoints: number;
  };
};

export type PricingConfiguration = {
  communes: number;
  term: ContractTerm;
  perimeter: Perimeter;
  moduleKeys: string[];
};

export type PricedModule = SubscriptionModule & {
  annualUnitAmountCents: number;
  annualAmountCents: number;
};

export type PricingResult = {
  modules: PricedModule[];
  discountBasisPoints: number;
  baseAnnualTotalCents: number;
  discountAmountCents: number;
  annualTotalCents: number;
  contractTotalCents: number;
};

export type CommuneDiscountTier = {
  minimum: number;
  maximum: number;
  discountBasisPoints: number;
};

export function getDefaultPricingConfiguration(
  catalogue: SubscriptionCatalogue
): PricingConfiguration {
  const firstAvailableModule = catalogue.modules.find(
    (module) => module.status === "available" && moduleMeetsConditions(module, 1)
  );

  return {
    communes: 1,
    term: 1,
    perimeter: catalogue.perimeters[0] ?? "patrimoine_communal",
    moduleKeys: firstAvailableModule ? [firstAvailableModule.key] : [],
  };
}

function isContractTerm(value: string | null): value is "1" | "3" {
  return value === "1" || value === "3";
}

export function moduleMeetsConditions(module: SubscriptionModule, communes: number) {
  return module.conditions.every((condition) => {
    if (condition.field !== "commune_count" || typeof condition.value !== "number") return false;
    if (condition.operator === "gte") return communes >= condition.value;
    if (condition.operator === "gt") return communes > condition.value;
    if (condition.operator === "lte") return communes <= condition.value;
    if (condition.operator === "lt") return communes < condition.value;
    if (condition.operator === "eq") return communes === condition.value;
    return false;
  });
}

export function getCommuneDiscountBasisPoints(catalogue: SubscriptionCatalogue, communes: number) {
  return catalogue.discountPolicy.communeCount.reduce(
    (discount, tier) =>
      communes >= tier.minimum ? Math.max(discount, tier.discountBasisPoints) : discount,
    0
  );
}

export function getCommuneDiscountTiers(
  catalogue: SubscriptionCatalogue,
  maximumCommunes: number
): CommuneDiscountTier[] {
  const starts = [{ minimum: 1, discountBasisPoints: 0 }, ...catalogue.discountPolicy.communeCount]
    .filter((tier) => tier.minimum <= maximumCommunes)
    .sort((left, right) => left.minimum - right.minimum);

  return starts.map((tier, index) => ({
    ...tier,
    maximum:
      index < starts.length - 1
        ? Math.min(starts[index + 1].minimum - 1, maximumCommunes)
        : maximumCommunes,
  }));
}

export function normalizePricingConfiguration(
  params: Pick<URLSearchParams, "get">,
  catalogue: SubscriptionCatalogue
): PricingConfiguration {
  const defaults = getDefaultPricingConfiguration(catalogue);
  const communes = Number(params.get("communes"));
  const normalizedCommunes =
    Number.isInteger(communes) && communes >= 1 ? communes : defaults.communes;
  const selectedModuleKeys = (params.get("modules") ?? "")
    .split(",")
    .filter(Boolean)
    .filter((key, index, keys) => keys.indexOf(key) === index)
    .filter((key) => {
      const catalogueModule = catalogue.modules.find((candidate) => candidate.key === key);
      return Boolean(
        catalogueModule &&
        catalogueModule.status === "available" &&
        moduleMeetsConditions(catalogueModule, normalizedCommunes)
      );
    });

  return {
    communes: normalizedCommunes,
    term: isContractTerm(params.get("term"))
      ? (Number(params.get("term")) as ContractTerm)
      : defaults.term,
    perimeter: catalogue.perimeters.includes(params.get("perimeter") ?? "")
      ? (params.get("perimeter") as Perimeter)
      : defaults.perimeter,
    moduleKeys: selectedModuleKeys.length > 0 ? selectedModuleKeys : defaults.moduleKeys,
  };
}

export function toPricingSearchParams(configuration: PricingConfiguration) {
  const params = new URLSearchParams({
    communes: String(configuration.communes),
    term: String(configuration.term),
    perimeter: configuration.perimeter,
  });
  if (configuration.moduleKeys.length > 0)
    params.set("modules", configuration.moduleKeys.join(","));
  return params;
}

export function calculateSubscriptionPrice(
  configuration: PricingConfiguration,
  catalogue: SubscriptionCatalogue
): PricingResult {
  const modules = catalogue.modules
    .filter((module) => configuration.moduleKeys.includes(module.key))
    .filter(
      (module) =>
        module.status === "available" && moduleMeetsConditions(module, configuration.communes)
    )
    .map((module) => {
      const annualUnitAmountCents = module.annualRatesCents[configuration.perimeter] ?? 0;
      return {
        ...module,
        annualUnitAmountCents,
        annualAmountCents: annualUnitAmountCents * configuration.communes,
      };
    });
  const baseAnnualTotalCents = modules.reduce(
    (total, module) => total + module.annualAmountCents,
    0
  );
  const communeDiscountBasisPoints = getCommuneDiscountBasisPoints(
    catalogue,
    configuration.communes
  );
  const discountBasisPoints = Math.min(
    catalogue.discountPolicy.maximumDiscountBasisPoints,
    communeDiscountBasisPoints +
      (catalogue.discountPolicy.termYears[String(configuration.term)] ?? 0)
  );
  const annualTotalCents = Math.round(
    (baseAnnualTotalCents * (10000 - discountBasisPoints)) / 10000
  );
  const discountAmountCents = baseAnnualTotalCents - annualTotalCents;

  return {
    modules,
    discountBasisPoints,
    baseAnnualTotalCents,
    discountAmountCents,
    annualTotalCents,
    contractTotalCents: annualTotalCents * configuration.term,
  };
}

export function formatSubscriptionCurrency(amountCents: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amountCents / 100);
}

export function formatSubscriptionLabel(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
