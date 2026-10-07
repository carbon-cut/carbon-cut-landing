"use client";

import Typography from "@/components/ui/typography";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import {
  formatSubscriptionCurrency,
  formatSubscriptionLabel,
  type PricingConfiguration,
  type PricedSelection,
} from "../_lib/pricing";

type SelectedOfferSummaryContentProps = {
  configuration: PricingConfiguration;
  pricing: PricedSelection;
  showSelectedModuleCount?: boolean;
  showModuleBreakdown?: boolean;
};

export default function SelectedOfferSummaryContent({
  configuration,
  pricing,
  showSelectedModuleCount = false,
  showModuleBreakdown = false,
}: SelectedOfferSummaryContentProps) {
  const t = useScopedI18n("collectivityPricing");
  const locale = useCurrentLocale();

  return (
    <>
      <dl className="flex w-full flex-col items-start gap-3">
        <SummaryRow label={t("summary.communes")} value={String(configuration.communes)} />
        <SummaryRow
          label={t("summary.duration")}
          value={
            configuration.term === 1
              ? t("configuration.term.oneYear")
              : t("configuration.term.threeYears")
          }
        />
        <SummaryRow
          label={t("summary.perimeter")}
          value={
            configuration.perimeter === "patrimoine_communal"
              ? t("configuration.perimeter.municipal_assets")
              : configuration.perimeter === "territorial_communes"
                ? t("configuration.perimeter.whole_territory")
                : configuration.perimeter.replace(/_/g, " ")
          }
        />
        {showSelectedModuleCount ? (
          <SummaryRow
            label={t("summary.selectedModules")}
            value={String(configuration.moduleKeys.length)}
          />
        ) : null}
      </dl>

      {showModuleBreakdown ? (
        <div className="flex w-full flex-col items-start gap-2 rounded-sm bg-neutral-50 px-3 py-3">
          {pricing.modules.map((module) => (
            <div key={module.key} className="flex w-full items-start justify-between gap-2">
              <div className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-0.5">
                <Typography variant="captionBold" className="text-default-font">
                  {getModuleLabel(t, module.key)}
                </Typography>
                <Typography variant="captionSubframe" className="text-subtext-color">
                  {t("summary.moduleQuantityPrice", {
                    count: configuration.communes,
                    price: formatSubscriptionCurrency(module.annualUnitAmountCents, locale),
                  })}
                </Typography>
              </div>
              <Typography variant="captionBold" className="whitespace-nowrap text-default-font">
                {formatSubscriptionCurrency(module.annualAmountCents, locale)}
              </Typography>
            </div>
          ))}
        </div>
      ) : null}

      <div className="h-px w-full flex-none bg-neutral-border" />

      <div className="flex w-full flex-col items-start gap-3">
        <SummaryRow
          align="start"
          label={t("summary.annualSubtotal")}
          value={formatSubscriptionCurrency(pricing.baseAnnualTotalCents, locale)}
        />
        {pricing.discountBasisPoints > 0 ? (
          <SummaryRow
            align="start"
            label={t("configuration.combinedDiscount", {
              discount: pricing.discountBasisPoints / 100,
            })}
            value={`−${formatSubscriptionCurrency(pricing.discountAmountCents, locale)}`}
            valueClassName="text-success-600"
          />
        ) : null}
      </div>

      <div className="h-px w-full flex-none bg-neutral-border" />

      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full flex-col items-start gap-1">
          <Typography variant="captionBold" className="text-subtext-color">
            {t("summary.annualTotal")}
          </Typography>
          <div className="flex items-end gap-2">
            <Typography variant="heading1" className="text-default-font">
              {formatSubscriptionCurrency(pricing.annualTotalCents, locale)} {t("summary.perYear")}
            </Typography>
            <Typography variant="captionSubframe" className="pb-1 text-subtext-color">
              {t("summary.taxSuffix")}
            </Typography>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 rounded-sm bg-brand-50 px-4 py-3">
          <Typography variant="bodySubframe" className="text-brand-800">
            {t("summary.contractTotal", { years: configuration.term })}
          </Typography>
          <Typography variant="heading3" className="whitespace-nowrap text-brand-800">
            {formatSubscriptionCurrency(pricing.contractTotalCents, locale)}
          </Typography>
        </div>
      </div>

      <Typography variant="captionSubframe" className="text-subtext-color">
        {t("summary.priceTaxNotice")}
      </Typography>
    </>
  );
}

export function SummaryRow({
  label,
  value,
  valueClassName,
  align = "center",
}: {
  label: string;
  value: string;
  valueClassName?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex w-full justify-between gap-2 ${
        align === "center" ? "items-center" : "items-start"
      }`}
    >
      <Typography asChild variant="bodySubframe" className="text-subtext-color">
        <dt>{label}</dt>
      </Typography>
      <Typography
        asChild
        variant="bodyBold"
        className={`whitespace-nowrap ${valueClassName ?? "text-default-font"}`}
      >
        <dd className="text-right">{value}</dd>
      </Typography>
    </div>
  );
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
