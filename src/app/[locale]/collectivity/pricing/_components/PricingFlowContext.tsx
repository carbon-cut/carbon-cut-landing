"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivityQuoteContext,
} from "@/app/[locale]/collectivity/_lib/queries";
import { quoteInformationSchema, type QuoteInformationInput } from "../_lib/infoSchema";
import developmentQuoteInformation from "../_lib/developmentQuoteInformation.json";
import type { PricingConfiguration, PricedSelection, QuoteContext } from "../_lib/pricing";
import type { ViesStatus } from "../_lib/taxTreatment";

export type PricingFlowStep = "configuration" | "informations" | "verification";
export type FrozenPricingSelection = {
  configuration: PricingConfiguration;
  pricing: PricedSelection;
};

// Development convenience only. Keep false unless manually exercising the verification step.
const ENABLE_DEVELOPMENT_QUOTE_DEFAULTS = true;
const useDevelopmentQuoteDefaults =
  process.env.NODE_ENV === "development" && ENABLE_DEVELOPMENT_QUOTE_DEFAULTS;
const developmentQuoteDefaults = developmentQuoteInformation as unknown as QuoteInformationInput;

const PricingFlowContext = createContext<{
  activeStep: PricingFlowStep;
  goToStep: (step: PricingFlowStep) => void;
  frozenSelection: FrozenPricingSelection | null;
  setFrozenSelection: (selection: FrozenPricingSelection) => void;
  quoteInformationForm: UseFormReturn<QuoteInformationInput>;
  viesStatus: ViesStatus;
  setViesStatus: (status: ViesStatus) => void;
  quoteContext: QuoteContext | undefined;
  isQuoteContextPending: boolean;
  isQuoteContextError: boolean;
  refetchQuoteContext: () => void;
} | null>(null);

export function PricingFlowProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState<PricingFlowStep>("configuration");
  const [frozenSelection, setFrozenSelection] = useState<FrozenPricingSelection | null>(null);
  const [viesStatus, setViesStatus] = useState<ViesStatus>("notChecked");
  const quoteContextQuery = useQuery({
    ...collectivityQueryOptions,
    queryKey: collectivityQueryKeys.quoteContext(),
    queryFn: fetchCollectivityQuoteContext,
  });
  const quoteInformationForm = useForm<QuoteInformationInput>({
    resolver: zodResolver(quoteInformationSchema),
    defaultValues: useDevelopmentQuoteDefaults
      ? developmentQuoteDefaults
      : {
          customerType: "LEGAL_ENTITY",
          customer: {
            legalName: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            city: "",
            countryCode: "",
            siren: "",
            siret: "",
            vatNumber: "",
            hasNoVatNumber: false,
          },
          contact: { name: "", email: "", phone: "" },
          quoteTerms: { contractStartDate: "" },
        },
    mode: "onSubmit",
  });

  return (
    <PricingFlowContext.Provider
      value={{
        activeStep,
        goToStep: setActiveStep,
        frozenSelection,
        setFrozenSelection,
        quoteInformationForm,
        viesStatus,
        setViesStatus,
        quoteContext: quoteContextQuery.data,
        isQuoteContextPending: quoteContextQuery.isPending,
        isQuoteContextError: quoteContextQuery.isError,
        refetchQuoteContext: () => {
          void quoteContextQuery.refetch();
        },
      }}
    >
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
