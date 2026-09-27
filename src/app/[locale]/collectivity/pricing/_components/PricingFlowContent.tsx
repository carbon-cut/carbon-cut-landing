"use client";

import PricingConfigurationStep from "../_configuration/PricingConfigurationStep";
import PricingInformationStep from "../_informations/PricingInformationStep";
import { usePricingFlow } from "./PricingFlowContext";

export default function PricingFlowContent({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { activeStep } = usePricingFlow();

  return (
    <>
      <div hidden={activeStep !== "configuration"} className="w-full">
        <PricingConfigurationStep isAuthenticated={isAuthenticated} />
      </div>
      <div hidden={activeStep !== "informations"} className="w-full">
        <PricingInformationStep />
      </div>
      <div hidden={activeStep !== "verification"} />
    </>
  );
}
