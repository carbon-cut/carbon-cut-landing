import type { ReactNode } from "react";

import { PricingFlowProvider } from "./_components/PricingFlowContext";
import PricingFlowHeader from "./_components/PricingFlowHeader";

export default function CollectivityPricingLayout({ children }: { children: ReactNode }) {
  return (
    <main
      id="content"
      className="flex w-full flex-col items-center bg-neutral-50 px-4 py-6 md:px-8 md:py-10"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-6 md:gap-8">
        <PricingFlowProvider>
          <PricingFlowHeader />
          {children}
        </PricingFlowProvider>
      </div>
    </main>
  );
}
