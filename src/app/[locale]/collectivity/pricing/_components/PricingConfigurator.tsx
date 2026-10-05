"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import {
  collectivityQueryKeys,
  fetchCollectivitySubscriptionPricePreview,
  fetchCollectivitySubscriptionCatalogue,
  subscriptionCatalogueQueryOptions,
} from "@/app/[locale]/collectivity/_lib/queries";
import { getAuthSignUpRoute } from "@/lib/routing/routes";
import Typography from "@/components/ui/typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useScopedI18n } from "@/locales/client";
import SubscriptionControls from "./SubscriptionControls";
import ModulePricingTable from "./ModulePricingTable";
import SubscriptionSummary from "./SubscriptionSummary";
import {
  calculateSubscriptionPrice,
  normalizePricingConfiguration,
  toPricedSelection,
  toPricingSearchParams,
  type PricingConfiguration,
} from "../_lib/pricing";
import type { FrozenPricingSelection } from "./PricingFlowContext";

type PricingConfiguratorProps = {
  isAuthenticated: boolean;
  onAuthenticatedContinue: (selection: FrozenPricingSelection) => void;
  pricingRoute: string;
  quoteContextReady: boolean;
  quoteContextPending: boolean;
  quoteContextError: boolean;
  onRetryQuoteContext: () => void;
};

export default function PricingConfigurator({
  isAuthenticated,
  onAuthenticatedContinue,
  pricingRoute,
  quoteContextReady,
  quoteContextPending,
  quoteContextError,
  onRetryQuoteContext,
}: PricingConfiguratorProps) {
  const t = useScopedI18n("collectivityPricing");
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const catalogueQuery = useQuery({
    ...subscriptionCatalogueQueryOptions,
    queryKey: collectivityQueryKeys.subscriptionCatalogue(),
    queryFn: fetchCollectivitySubscriptionCatalogue,
  });
  const catalogue = catalogueQuery.data;
  const pricePreviewMutation = useMutation({
    mutationFn: fetchCollectivitySubscriptionPricePreview,
  });
  const [configuration, setConfiguration] = useState(() =>
    catalogue ? normalizePricingConfiguration(searchParams, catalogue) : null
  );

  useEffect(() => {
    if (catalogue) {
      setConfiguration(
        normalizePricingConfiguration(new URLSearchParams(searchParamsKey), catalogue)
      );
    }
  }, [catalogue, searchParamsKey]);

  if (catalogueQuery.isError) {
    return (
      <Typography asChild variant="bodySubframe" className="text-subtext-color">
        <p role="alert">{t("catalogueLoadError")}</p>
      </Typography>
    );
  }

  if (catalogueQuery.isPending || !catalogue || !configuration) {
    return <PricingConfiguratorSkeleton />;
  }

  const currentConfiguration = configuration;
  const currentCatalogue = catalogue;
  const pricing = calculateSubscriptionPrice(currentConfiguration, currentCatalogue);

  function updateConfiguration(next: Partial<PricingConfiguration>, persist = false) {
    const nextConfiguration = normalizePricingConfiguration(
      toPricingSearchParams({
        ...currentConfiguration,
        ...next,
        moduleKeys: next.moduleKeys ?? currentConfiguration.moduleKeys,
      }),
      currentCatalogue
    );
    setConfiguration(nextConfiguration);

    if (persist) {
      window.history.replaceState(
        window.history.state,
        "",
        `${pricingRoute}?${toPricingSearchParams(nextConfiguration).toString()}`
      );
    }
  }

  async function handleContinue() {
    const returnTo = `${pricingRoute}?${toPricingSearchParams(currentConfiguration).toString()}`;

    if (!isAuthenticated) {
      router.push(getAuthSignUpRoute(returnTo));
      return;
    }

    if (!quoteContextReady) return;

    try {
      const preview = await pricePreviewMutation.mutateAsync({
        communeQuantity: currentConfiguration.communes,
        termYears: currentConfiguration.term,
        perimeter: currentConfiguration.perimeter,
        moduleKeys: currentConfiguration.moduleKeys,
      });
      onAuthenticatedContinue({
        configuration: currentConfiguration,
        pricing: toPricedSelection(preview),
      });
    } catch {
      // The mutation state renders the localized retry treatment below the action.
    }
  }

  const quotePreparationError = quoteContextError
    ? t("quoteContextLoadError")
    : pricePreviewMutation.isError
      ? t("pricePreviewLoadError")
      : undefined;
  const continueBusy = isAuthenticated && (quoteContextPending || pricePreviewMutation.isPending);
  const continueDisabled =
    isAuthenticated && (continueBusy || quoteContextError || !quoteContextReady);

  return (
    <div className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6">
      <div className="flex min-w-[0px] grow shrink-0 basis-0 flex-col items-start gap-6 mobile:min-w-0 mobile:flex-none">
        <SubscriptionControls
          configuration={currentConfiguration}
          catalogue={currentCatalogue}
          onCommit={(next) => updateConfiguration(next, true)}
        />
        <ModulePricingTable
          configuration={currentConfiguration}
          catalogue={currentCatalogue}
          pricing={pricing}
          onChange={(moduleKeys) => updateConfiguration({ moduleKeys }, true)}
        />
      </div>
      <SubscriptionSummary
        configuration={currentConfiguration}
        pricing={pricing}
        onContinue={handleContinue}
        continueDisabled={continueDisabled}
        continueBusy={continueBusy}
        continueError={quotePreparationError}
        onRetry={
          quoteContextError
            ? onRetryQuoteContext
            : pricePreviewMutation.isError
              ? handleContinue
              : undefined
        }
      />
    </div>
  );
}

function PricingConfiguratorSkeleton() {
  const t = useScopedI18n("collectivityPricing");

  return (
    <div className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6">
      <div className="flex min-w-[0px] grow shrink-0 basis-0 flex-col items-start gap-6 mobile:min-w-0 mobile:flex-none">
        <Card className="w-full border-solid border-neutral-border bg-default-background">
          <CardHeader className="pb-6 mobile:pt-4">
            <CardTitle asChild>
              <h2>{t("configuration.panelTitle")}</h2>
            </CardTitle>
            <CardDescription asChild>
              <p>{t("configuration.panelDescription")}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col items-start gap-6" aria-busy="true">
              <LoadingControl
                label={t("configuration.communes.label")}
                description={t("configuration.communes.description")}
                controlClassName="h-10 w-32"
              />
              <div className="h-px w-full flex-none bg-neutral-border" />
              <LoadingControl
                label={t("configuration.term.label")}
                description={t("configuration.term.description")}
                controlClassName="h-10 w-48"
              />
              <div className="h-px w-full flex-none bg-neutral-border" />
              <LoadingControl
                label={t("configuration.perimeter.label")}
                description={t("configuration.perimeter.description")}
                controlClassName="h-20 w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full overflow-hidden border-solid border-neutral-border bg-default-background">
          <CardHeader>
            <CardTitle asChild>
              <h2>{t("modules.title")}</h2>
            </CardTitle>
            <CardDescription asChild>
              <p>{t("modules.description")}</p>
            </CardDescription>
          </CardHeader>
          <CardContent flush>
            <div className="flex w-full flex-col" aria-busy="true">
              <div className="flex w-full items-center gap-4 border-y border-solid border-neutral-border bg-neutral-50 px-6 py-2 mobile:hidden">
                <div className="flex w-5 flex-none" />
                <Typography
                  variant="captionBold"
                  className="grow shrink-0 basis-0 text-subtext-color"
                >
                  {t("modules.service")}
                </Typography>
                <Typography variant="captionBold" className="w-48 flex-none text-subtext-color">
                  {t("modules.status")}
                </Typography>
                <Typography
                  variant="captionBold"
                  className="w-28 flex-none text-right text-subtext-color"
                >
                  {t("modules.annualPrice")}
                </Typography>
              </div>
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="flex w-full items-center gap-4 border-b border-solid border-neutral-border px-6 py-4 mobile:px-4"
                >
                  <Skeleton className="size-5 flex-none" />
                  <div className="flex min-w-[0px] grow shrink-0 basis-0 flex-col gap-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-72" />
                  </div>
                  <Skeleton className="h-6 w-24 flex-none mobile:hidden" />
                  <Skeleton className="h-4 w-20 flex-none" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <aside
        className="sticky top-24 flex w-96 flex-none mobile:static mobile:w-full mobile:flex-none"
        aria-busy="true"
      >
        <Card className="flex w-full flex-col items-start gap-5 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-md mobile:px-4 mobile:py-4">
          <CardTitle asChild>
            <h2>{t("summary.title")}</h2>
          </CardTitle>
          <div className="flex w-full flex-col gap-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex w-full items-center justify-between gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
          <div className="h-px w-full flex-none bg-neutral-border" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full" />
        </Card>
      </aside>
      <span className="sr-only" role="status">
        {t("catalogueLoading")}
      </span>
    </div>
  );
}

function LoadingControl({
  label,
  description,
  controlClassName,
}: {
  label: string;
  description: string;
  controlClassName: string;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-4 mobile:flex-col mobile:items-start">
      <div className="flex flex-col items-start gap-1">
        <Typography variant="bodyBold">{label}</Typography>
        <Typography variant="captionSubframe">{description}</Typography>
      </div>
      <Skeleton className={controlClassName} />
    </div>
  );
}
