"use client";

import { FeatherArrowRight, FeatherReceipt, FeatherShieldCheck } from "@subframe/core";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import type { PricingConfiguration, PricingResult } from "../_lib/pricing";
import SelectedOfferSummaryContent from "./SelectedOfferSummaryContent";

type SubscriptionSummaryProps = {
  configuration: PricingConfiguration;
  pricing: PricingResult;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueBusy?: boolean;
  continueError?: string;
  onRetry?: () => void;
};

export default function SubscriptionSummary({
  configuration,
  pricing,
  onContinue,
  continueDisabled = false,
  continueBusy = false,
  continueError,
  onRetry,
}: SubscriptionSummaryProps) {
  const t = useScopedI18n("collectivityPricing");

  return (
    <aside
      aria-label={t("totals.aria")}
      className="sticky top-8 flex w-96 flex-none mobile:static mobile:w-full mobile:flex-none"
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

        <SelectedOfferSummaryContent
          configuration={configuration}
          pricing={pricing}
          showSelectedModuleCount
        />
        <Button
          className="h-10 w-full flex-none"
          variant="brand-primary"
          size="large"
          iconRight={<FeatherArrowRight />}
          onClick={onContinue}
          disabled={continueDisabled}
          aria-busy={continueBusy}
        >
          {t("action.continue")}
        </Button>
        {continueError ? (
          <div className="flex w-full items-center justify-between gap-2">
            <Typography variant="captionSubframe" className="text-error-600" role="alert">
              {continueError}
            </Typography>
            {onRetry ? (
              <Button type="button" variant="neutral-tertiary" size="small" onClick={onRetry}>
                {t("action.retry")}
              </Button>
            ) : null}
          </div>
        ) : null}
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
