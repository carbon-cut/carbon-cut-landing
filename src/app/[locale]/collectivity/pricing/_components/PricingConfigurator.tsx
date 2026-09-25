"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuthSignUpRoute } from "@/lib/routing/routes";
import SubscriptionControls from "./SubscriptionControls";
import ModulePricingTable from "./ModulePricingTable";
import SubscriptionSummary from "./SubscriptionSummary";
import {
  calculateSubscriptionPrice,
  normalizePricingConfiguration,
  toPricingSearchParams,
  type ModuleId,
  type PricingConfiguration,
} from "../_lib/pricing";

type PricingConfiguratorProps = { isAuthenticated: boolean; pricingRoute: string };

export default function PricingConfigurator({
  isAuthenticated,
  pricingRoute,
}: PricingConfiguratorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const [configuration, setConfiguration] = useState(() =>
    normalizePricingConfiguration(searchParams)
  );
  const pricing = calculateSubscriptionPrice(configuration);

  useEffect(() => {
    setConfiguration(normalizePricingConfiguration(new URLSearchParams(searchParamsKey)));
  }, [searchParamsKey]);

  function updateConfiguration(next: Partial<PricingConfiguration>, persist = false) {
    const nextConfiguration = normalizePricingConfiguration(
      toPricingSearchParams({
        ...configuration,
        ...next,
        moduleIds: next.moduleIds ?? configuration.moduleIds,
      })
    );
    setConfiguration(nextConfiguration);

    if (persist) {
      router.replace(`${pricingRoute}?${toPricingSearchParams(nextConfiguration).toString()}`, {
        scroll: false,
      });
    }
  }

  function handleContinue() {
    const returnTo = `${pricingRoute}?${toPricingSearchParams(configuration).toString()}`;

    if (isAuthenticated) {
      console.log("collectivitySubscriptionContinue", configuration);
      return;
    }

    router.push(getAuthSignUpRoute(returnTo));
  }

  return (
    <div className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6">
      <div className="flex min-w-[0px] grow shrink-0 basis-0 flex-col items-start gap-6 mobile:min-w-0 mobile:flex-none">
        <SubscriptionControls
          configuration={configuration}
          onCommit={(next) => updateConfiguration(next, true)}
        />
        <ModulePricingTable
          configuration={configuration}
          pricing={pricing}
          onChange={(moduleIds: ModuleId[]) => updateConfiguration({ moduleIds }, true)}
        />
      </div>
      <SubscriptionSummary
        configuration={configuration}
        pricing={pricing}
        onContinue={handleContinue}
      />
    </div>
  );
}
