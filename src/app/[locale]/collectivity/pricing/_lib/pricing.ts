import rawCatalogue from "./subscription-catalogue.json";

export type Perimeter = "municipal_assets" | "whole_territory";
export type ContractTerm = 1 | 3;
export type ModuleId =
  | "ghg_inventory_scope_1_2"
  | "ghg_inventory_scope_3"
  | "emission_factor_consolidation"
  | "prospective_and_objectives"
  | "ghg_mitigation_investment_plan"
  | "mrv_monitoring"
  | "significant_indicators"
  | "scoring_system"
  | "commune_aggregation";

type Availability = "available_at_launch" | "coming_very_soon" | "in_development" | "planned_later";

type SubscriptionModule = {
  id: ModuleId;
  translationKey: string;
  scope: string;
  availability: Availability;
  pricingMethod: "core_reduction_ladder" | "commune_aggregation_rates";
  oneCommuneOneYearBaselineEur?: Record<Perimeter, number>;
};

type SubscriptionCatalogue = {
  currency: "EUR";
  availability: Record<Availability, { purchasableInInitialFlow: boolean; translationKey: string }>;
  modules: SubscriptionModule[];
  pricingRules: {
    core_reduction_ladder: {
      coverageTiers: Array<{
        id: string;
        minCommunes: number;
        maxCommunes: number | null;
        annualMultiplier: number;
      }>;
      termMultipliers: Record<"1" | "3", number>;
    };
  };
};

export const subscriptionCatalogue = rawCatalogue as SubscriptionCatalogue;

export const REQUIRED_MODULE_ID: ModuleId = "ghg_inventory_scope_1_2";
export const MAX_COMMUNES = 10;

export type PricingConfiguration = {
  communes: number;
  term: ContractTerm;
  perimeter: Perimeter;
  moduleIds: ModuleId[];
};

export type PricedModule = SubscriptionModule & {
  annualPriceBeforeDiscountEur: number;
  annualPriceEur: number;
};

export type PricingResult = {
  modules: PricedModule[];
  coverageDiscountPercent: number;
  termDiscountPercent: number;
  combinedDiscountPercent: number;
  baseAnnualTotalEur: number;
  coverageDiscountEur: number;
  termDiscountEur: number;
  annualTotalEur: number;
  contractTotalEur: number;
};

export const defaultPricingConfiguration: PricingConfiguration = {
  communes: 1,
  term: 1,
  perimeter: "municipal_assets",
  moduleIds: [REQUIRED_MODULE_ID],
};

function isPerimeter(value: string | null): value is Perimeter {
  return value === "municipal_assets" || value === "whole_territory";
}

function isContractTerm(value: string | null): value is "1" | "3" {
  return value === "1" || value === "3";
}

function isModuleId(value: string): value is ModuleId {
  return subscriptionCatalogue.modules.some((module) => module.id === value);
}

export function normalizePricingConfiguration(
  params: Pick<URLSearchParams, "get">
): PricingConfiguration {
  const communes = Number(params.get("communes"));
  const termValue = params.get("term");
  const perimeterValue = params.get("perimeter");
  const selectedModuleIds = (params.get("modules") ?? "")
    .split(",")
    .filter(Boolean)
    .filter(isModuleId)
    .filter((id) => {
      const catalogueModule = subscriptionCatalogue.modules.find(
        (candidate) => candidate.id === id
      );
      return catalogueModule
        ? subscriptionCatalogue.availability[catalogueModule.availability].purchasableInInitialFlow
        : false;
    });

  return {
    communes:
      Number.isInteger(communes) && communes >= 1 && communes <= MAX_COMMUNES ? communes : 1,
    term: isContractTerm(termValue) ? (Number(termValue) as ContractTerm) : 1,
    perimeter: isPerimeter(perimeterValue) ? perimeterValue : "municipal_assets",
    moduleIds: Array.from(new Set([REQUIRED_MODULE_ID, ...selectedModuleIds])),
  };
}

export function toPricingSearchParams(configuration: PricingConfiguration) {
  const params = new URLSearchParams({
    communes: String(configuration.communes),
    term: String(configuration.term),
    perimeter: configuration.perimeter,
  });
  const optionalModuleIds = configuration.moduleIds.filter((id) => id !== REQUIRED_MODULE_ID);

  if (optionalModuleIds.length > 0) params.set("modules", optionalModuleIds.join(","));
  return params;
}

export function calculateSubscriptionPrice(configuration: PricingConfiguration): PricingResult {
  const pricingRule = subscriptionCatalogue.pricingRules.core_reduction_ladder;
  const coverageTier = pricingRule.coverageTiers.find(
    (tier) =>
      configuration.communes >= tier.minCommunes &&
      (tier.maxCommunes === null || configuration.communes <= tier.maxCommunes)
  );

  if (!coverageTier) throw new Error("No pricing tier matches the commune count.");

  const termMultiplier = pricingRule.termMultipliers[String(configuration.term) as "1" | "3"];
  const modules = subscriptionCatalogue.modules
    .filter((module) => configuration.moduleIds.includes(module.id))
    .filter(
      (module) =>
        module.pricingMethod === "core_reduction_ladder" && module.oneCommuneOneYearBaselineEur
    )
    .map((module) => ({
      ...module,
      annualPriceBeforeDiscountEur:
        module.oneCommuneOneYearBaselineEur![configuration.perimeter] * configuration.communes,
      annualPriceEur:
        module.oneCommuneOneYearBaselineEur![configuration.perimeter] *
        configuration.communes *
        coverageTier.annualMultiplier *
        termMultiplier,
    }));
  const baseAnnualTotalEur = modules.reduce(
    (total, module) => total + module.annualPriceBeforeDiscountEur,
    0
  );
  const annualTotalEur = modules.reduce((total, module) => total + module.annualPriceEur, 0);
  const annualTotalAfterCoverageEur = baseAnnualTotalEur * coverageTier.annualMultiplier;
  const coverageDiscountEur = baseAnnualTotalEur - annualTotalAfterCoverageEur;
  const termDiscountEur = annualTotalAfterCoverageEur - annualTotalEur;

  return {
    modules,
    coverageDiscountPercent: Math.round((1 - coverageTier.annualMultiplier) * 100),
    termDiscountPercent: Math.round((1 - termMultiplier) * 100),
    combinedDiscountPercent: Math.round((1 - coverageTier.annualMultiplier * termMultiplier) * 100),
    baseAnnualTotalEur,
    coverageDiscountEur,
    termDiscountEur,
    annualTotalEur,
    contractTotalEur: annualTotalEur * configuration.term,
  };
}

export function formatSubscriptionCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: subscriptionCatalogue.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
