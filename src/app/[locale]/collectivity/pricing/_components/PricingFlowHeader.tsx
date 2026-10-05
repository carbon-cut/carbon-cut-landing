"use client";

import { FeatherArrowLeft } from "@subframe/core";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { usePricingFlow } from "./PricingFlowContext";
import PricingStepper from "./PricingStepper";

export default function PricingFlowHeader() {
  const { activeStep, goToStep } = usePricingFlow();
  const t = useScopedI18n("collectivityPricing.quoteInformation");

  if (activeStep !== "informations") {
    return <PricingStepper activeStep={activeStep} />;
  }

  return (
    <header className="flex w-full flex-col items-start gap-6">
      <div className="flex w-full items-center justify-between gap-4 mobile:flex-col mobile:items-start">
        <Button
          type="button"
          variant="link-neutral"
          size="small"
          icon={<FeatherArrowLeft />}
          onClick={() => goToStep("configuration")}
        >
          {t("back")}
        </Button>
        <PricingStepper activeStep={activeStep} className="max-w-[560px]" />
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <Typography asChild variant="heading1" className="text-default-font">
          <h1>{t("title")}</h1>
        </Typography>
        <Typography asChild variant="bodySubframe" className="max-w-[720px] text-subtext-color">
          <p>{t("description")}</p>
        </Typography>
      </div>
    </header>
  );
}
