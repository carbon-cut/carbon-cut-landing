"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type PricingFlowStep = "configuration" | "informations" | "verification";

const PricingFlowContext = createContext<{
  activeStep: PricingFlowStep;
  goToStep: (step: PricingFlowStep) => void;
} | null>(null);

export function PricingFlowProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState<PricingFlowStep>("configuration");

  return (
    <PricingFlowContext.Provider value={{ activeStep, goToStep: setActiveStep }}>
      {children}
    </PricingFlowContext.Provider>
  );
}

export function usePricingFlow() {
  const context = useContext(PricingFlowContext);

  if (!context) {
    throw new Error("usePricingFlow must be used within PricingFlowProvider");
  }

  return context;
}
