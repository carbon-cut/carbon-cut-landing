"use client";

import { FeatherArrowLeft } from "@subframe/core";

import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { usePricingFlow } from "./PricingFlowContext";
import PricingStepper from "./PricingStepper";

export default function PricingFlowHeader() {
  const { activeStep, goToStep } = usePricingFlow();
  const t = useScopedI18n("collectivityPricing.quoteInformation");

  if (activeStep !== "informations") {
    return <PricingStepper />;
  }

  return (
    <header className="flex w-full flex-col items-start gap-6">
      <div className="flex w-full items-center justify-between gap-4 mobile:flex-col mobile:items-start">
        <button
          type="button"
          onClick={() => goToStep("configuration")}
          className="group/a4ee726a flex cursor-pointer items-center gap-1 border-none bg-transparent text-left"
        >
          <FeatherArrowLeft className="text-caption font-caption text-neutral-700 group-hover/a4ee726a:text-brand-700" />
          <Typography
            variant="captionSubframe"
            className="text-neutral-700 group-hover/a4ee726a:text-brand-700 group-hover/a4ee726a:underline"
          >
            {t("back")}
          </Typography>
        </button>
        <PricingStepper className="max-w-[560px]" />
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
