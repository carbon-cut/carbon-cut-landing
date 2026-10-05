"use client";

import { FeatherCalendarRange, FeatherMap, FeatherMapPin } from "@subframe/core";

import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { formatSubscriptionCurrency, formatSubscriptionLabel } from "../_lib/pricing";
import { QuoteOfferTile, QuoteTotalRow } from "./QuoteReviewPrimitives";

type QuoteOfferModule = {
  key: string;
  annualUnitAmountCents: number;
  annualAmountCents: number;
};

export function QuoteConfigurationTiles({
  communeQuantity,
  termYears,
  perimeter,
}: {
  communeQuantity: number;
  termYears: number;
  perimeter: string;
}) {
  const t = useScopedI18n("collectivityPricing");

  return (
    <div className="flex w-full items-stretch gap-3 mobile:flex-col">
      <QuoteOfferTile
        icon={<FeatherMapPin />}
        label={t("summary.communes")}
        value={String(communeQuantity)}
      />
      <QuoteOfferTile
        icon={<FeatherCalendarRange />}
        label={t("summary.duration")}
        value={
          termYears === 1 ? t("configuration.term.oneYear") : t("configuration.term.threeYears")
        }
      />
      <QuoteOfferTile
        icon={<FeatherMap />}
        label={t("summary.perimeter")}
        value={formatPerimeter(t, perimeter)}
      />
    </div>
  );
}

export function QuoteOfferTable({
  modules,
  communeQuantity,
}: {
  modules: QuoteOfferModule[];
  communeQuantity: number;
}) {
  const t = useScopedI18n("collectivityPricing.quoteVerification");
  const pricing = useScopedI18n("collectivityPricing");

  return (
    <div className="w-full overflow-x-auto rounded-sm border border-solid border-neutral-border">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[minmax(0,1fr)_7rem_9rem_9rem] gap-4 border-b border-solid border-neutral-border bg-neutral-50 px-4 py-2">
          {(["service", "quantity", "annualUnitPrice", "annualAmount"] as const).map((key) => (
            <Typography
              key={key}
              variant="captionBold"
              className={`text-subtext-color ${key.includes("Price") || key === "annualAmount" ? "text-right" : ""}`}
            >
              {t(`offer.table.${key}`)}
            </Typography>
          ))}
        </div>
        {modules.map((module, index) => (
          <div
            key={module.key}
            className={`grid grid-cols-[minmax(0,1fr)_7rem_9rem_9rem] items-center gap-4 px-4 py-3 ${index < modules.length - 1 ? "border-b border-solid border-neutral-border" : ""}`}
          >
            <Typography variant="bodyBold" className="text-default-font">
              {getModuleLabel(pricing, module.key)}
            </Typography>
            <Typography variant="bodySubframe" className="text-subtext-color">
              {t("offer.communesValue", { count: communeQuantity })}
            </Typography>
            <Typography variant="bodySubframe" className="text-right text-default-font">
              {formatSubscriptionCurrency(module.annualUnitAmountCents)}
            </Typography>
            <Typography variant="bodyBold" className="text-right text-default-font">
              {formatSubscriptionCurrency(module.annualAmountCents)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuoteOfferTotals({
  annualSubtotalCents,
  discountBasisPoints,
  discountAmountCents,
  annualTotalCents,
  contractTotalCents,
  termYears,
}: {
  annualSubtotalCents: number;
  discountBasisPoints: number;
  discountAmountCents: number;
  annualTotalCents: number;
  contractTotalCents: number;
  termYears: number;
}) {
  const t = useScopedI18n("collectivityPricing.quoteVerification");
  const pricing = useScopedI18n("collectivityPricing");

  return (
    <dl className="ml-auto flex w-full max-w-md flex-col items-start gap-3">
      <QuoteTotalRow
        label={pricing("summary.annualSubtotal")}
        value={formatSubscriptionCurrency(annualSubtotalCents)}
      />
      {discountBasisPoints > 0 ? (
        <QuoteTotalRow
          label={t("offer.discount", { discount: discountBasisPoints / 100 })}
          value={`−${formatSubscriptionCurrency(discountAmountCents)}`}
          success
        />
      ) : null}
      <QuoteTotalRow
        label={t("offer.annualAfterDiscount")}
        value={`${formatSubscriptionCurrency(annualTotalCents)} HT`}
      />
      <div className="flex w-full items-center justify-between gap-4 rounded-sm bg-brand-50 px-4 py-3">
        <Typography variant="bodyBold" className="text-brand-800">
          {pricing("summary.contractTotal", { years: termYears })}
        </Typography>
        <Typography variant="heading3" className="whitespace-nowrap text-brand-800">
          {formatSubscriptionCurrency(contractTotalCents)} HT
        </Typography>
      </div>
    </dl>
  );
}

function formatPerimeter(t: ReturnType<typeof useScopedI18n>, perimeter: string) {
  if (perimeter === "patrimoine_communal") return t("configuration.perimeter.municipal_assets");
  if (perimeter === "territorial_communes") return t("configuration.perimeter.whole_territory");
  return formatSubscriptionLabel(perimeter);
}

function getModuleLabel(t: ReturnType<typeof useScopedI18n>, key: string) {
  const translationKeys: Record<string, string> = {
    ghg_inventory_scope_1_2: "ghg_inventory_scope_1_2",
    ghg_inventory_scope_3: "ghg_inventory_scope_3",
    emission_factor_consolidation: "emission_factor_consolidation",
    prospective_objectives: "prospective_and_objectives",
    ghg_mitigation_investment_plan: "ghg_mitigation_investment_plan",
    mrv_tracking: "mrv_monitoring",
    significant_indicators: "significant_indicators",
    scoring_100: "scoring_system",
    intermunicipal_aggregation: "commune_aggregation",
  };
  const translationKey = translationKeys[key];
  return translationKey ? t(`modules.items.${translationKey}`) : formatSubscriptionLabel(key);
}
