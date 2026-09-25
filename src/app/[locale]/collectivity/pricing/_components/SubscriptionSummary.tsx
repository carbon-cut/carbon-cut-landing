"use client";

import {
  FeatherArrowRight,
  FeatherDownload,
  FeatherReceipt,
  FeatherShieldCheck,
} from "@subframe/core";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import {
  formatSubscriptionCurrency,
  type PricingConfiguration,
  type PricingResult,
} from "../_lib/pricing";

type SubscriptionSummaryProps = {
  configuration: PricingConfiguration;
  pricing: PricingResult;
  onContinue: () => void;
};

export default function SubscriptionSummary({
  configuration,
  pricing,
  onContinue,
}: SubscriptionSummaryProps) {
  const t = useScopedI18n("collectivityPricing");

  return (
    <aside
      aria-label={t("totals.aria")}
      className="sticky top-24 flex w-96 flex-none mobile:static mobile:w-full mobile:flex-none"
    >
      <Card className="flex w-full flex-col items-start gap-5 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-md mobile:px-4 mobile:py-4">
        <div className="flex w-full items-center gap-2">
          <FeatherReceipt
            className="text-heading-3 font-heading-3 text-brand-600"
            aria-hidden="true"
          />
          <CardTitle asChild>
            <h2>{t("summary.title")}</h2>
          </CardTitle>
        </div>

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
            value={t(`configuration.perimeter.${configuration.perimeter}`)}
          />
          <SummaryRow
            label={t("summary.selectedModules")}
            value={String(configuration.moduleIds.length)}
          />
        </dl>

        <div className="h-px w-full flex-none bg-neutral-border" />

        <div className="flex w-full flex-col items-start gap-3">
          <SummaryRow
            align="start"
            label={t("summary.annualSubtotal")}
            value={formatSubscriptionCurrency(pricing.baseAnnualTotalEur)}
          />
          {pricing.coverageDiscountPercent > 0 ? (
            <SummaryRow
              align="start"
              label={t("summary.coverageDiscount", {
                discount: pricing.coverageDiscountPercent,
              })}
              value={`−${formatSubscriptionCurrency(pricing.coverageDiscountEur)}`}
              valueClassName="text-success-600"
            />
          ) : null}
          {pricing.termDiscountPercent > 0 ? (
            <SummaryRow
              align="start"
              label={t("summary.termDiscount", { discount: pricing.termDiscountPercent })}
              value={`−${formatSubscriptionCurrency(pricing.termDiscountEur)}`}
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
                {formatSubscriptionCurrency(pricing.annualTotalEur)} {t("summary.perYear")}
              </Typography>
              {/* TODO: HT display is not confirmed. */}
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
              {formatSubscriptionCurrency(pricing.contractTotalEur)}
            </Typography>
          </div>
        </div>

        <Typography variant="captionSubframe" className="text-subtext-color">
          {t("summary.priceTaxNotice")}
        </Typography>
        <div className="flex w-full flex-col items-start gap-2">
          <Button
            className="h-10 w-full flex-none"
            variant="brand-primary"
            size="large"
            iconRight={<FeatherArrowRight />}
            onClick={onContinue}
          >
            {t("action.continue")}
          </Button>
          <Button
            className="h-10 w-full flex-none"
            variant="neutral-secondary"
            size="large"
            icon={<FeatherDownload />}
          >
            {t("action.downloadQuote")}
          </Button>
        </div>
        <div className="flex w-full items-center gap-2">
          <FeatherShieldCheck className="text-caption font-caption text-subtext-color" />
          <Typography variant="captionSubframe" className="text-subtext-color">
            {t("summary.hostingEu")}
            {/* TODO: RGPD compliance claim is not confirmed.
            · Conforme RGPD
            */}
          </Typography>
        </div>

        {/*
        Keep any submission handler, quote generation, and tax/legal claims behind their
        confirmed commercial flow.
        <Typography variant="captionSubframe" className="text-subtext-color">
          {t("summary.priceTaxNotice")}
        </Typography>
        */}
      </Card>
    </aside>
  );
}

function SummaryRow({
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
