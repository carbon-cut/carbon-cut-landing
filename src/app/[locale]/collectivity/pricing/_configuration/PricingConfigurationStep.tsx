"use client";

import Typography from "@/components/ui/typography";
import { getCollectivityPricingConfigurationRoute } from "@/lib/routing/routes";
import { useScopedI18n } from "@/locales/client";
import { usePricingFlow } from "../_components/PricingFlowContext";
import PricingConfigurator from "../_components/PricingConfigurator";

export default function PricingConfigurationStep({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const t = useScopedI18n("collectivityPricing");
  const { goToStep } = usePricingFlow();

  return (
    <div className="flex w-full flex-col items-start gap-6">
      <header className="flex w-full flex-col items-start gap-2">
        <Typography asChild variant="heading1" className="text-default-font">
          <h1>{t("title")}</h1>
        </Typography>
        <Typography asChild variant="bodySubframe" className="max-w-[720px] text-subtext-color">
          <p>{t("description")}</p>
        </Typography>
      </header>
      <PricingConfigurator
        isAuthenticated={isAuthenticated}
        onAuthenticatedContinue={() => goToStep("informations")}
        pricingRoute={getCollectivityPricingConfigurationRoute()}
      />
    </div>
  );
}
