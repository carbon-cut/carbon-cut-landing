"use client";

import PricingFlowContent from "./PricingFlowContent";
import { PricingFlowProvider } from "./PricingFlowContext";
import PricingFlowHeader from "./PricingFlowHeader";

export default function PricingFlowShell({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <PricingFlowProvider>
      <PricingFlowHeader />
      <PricingFlowContent isAuthenticated={isAuthenticated} />
    </PricingFlowProvider>
  );
}
