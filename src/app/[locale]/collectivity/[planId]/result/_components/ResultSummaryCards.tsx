"use client";

import ResultMetricCard from "@/app/[locale]/collectivity/[planId]/result/_components/ResultMetricCard";
import { useCollectivityWorkspaceSnapshot } from "@/app/[locale]/collectivity/_components/collectivityProjectContext";
import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import { useScopedI18n } from "@/locales/client";

import { buildSummaryMetrics } from "../_lib/summary-metrics";

export default function ResultSummaryCards({
  result,
  isLoading,
  error,
}: {
  result?: CollectivityInventoryCalculationResult;
  isLoading: boolean;
  error: Error | null;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const snapshot = useCollectivityWorkspaceSnapshot();

  const referenceYear = snapshot.currentInventory.setupPayload.referenceYear;
  const summaryMetrics = result ? buildSummaryMetrics(result) : null;

  return (
    <section
      aria-label={t("summaryCards.ariaLabel")}
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <ResultMetricCard
        favorableChange="decrease"
        label={t("summaryCards.emissions")}
        metric={
          summaryMetrics
            ? {
                referenceYear,
                values: summaryMetrics.emissions,
              }
            : undefined
        }
        isLoading={isLoading}
        error={error}
      />
      <ResultMetricCard
        favorableChange="decrease"
        label={t("summaryCards.netEmissions")}
        metric={
          summaryMetrics
            ? {
                referenceYear,
                values: summaryMetrics.netEmissions,
              }
            : undefined
        }
        isLoading={isLoading}
        error={error}
      />
      <ResultMetricCard
        favorableChange="increase"
        label={t("summaryCards.absorptions")}
        metric={
          summaryMetrics
            ? {
                referenceYear,
                values: summaryMetrics.absorptions,
              }
            : undefined
        }
        isLoading={isLoading}
        error={error}
      />
      <ResultMetricCard
        favorableChange="decrease"
        label={t("summaryCards.emissionsPerCapita")}
        metric={
          summaryMetrics
            ? {
                referenceYear,
                values: summaryMetrics.emissionsPerCapita,
              }
            : undefined
        }
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
