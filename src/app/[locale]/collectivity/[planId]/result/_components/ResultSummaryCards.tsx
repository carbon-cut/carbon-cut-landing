"use client";

import ResultMetricCard from "@/app/[locale]/collectivity/[planId]/result/_components/ResultMetricCard";
import { useScopedI18n } from "@/locales/client";

import summaryMetrics from "../_fixtures/summary-metrics.json";

export default function ResultSummaryCards() {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");

  return (
    <section
      aria-label={t("summaryCards.ariaLabel")}
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <ResultMetricCard
        favorableChange="decrease"
        label={t("summaryCards.emissions")}
        metric={{
          referenceYear: summaryMetrics.referenceYear,
          values: summaryMetrics.metrics.emissions,
        }}
      />
      <ResultMetricCard
        favorableChange="decrease"
        label={t("summaryCards.netEmissions")}
        metric={{
          referenceYear: summaryMetrics.referenceYear,
          values: summaryMetrics.metrics.netEmissions,
        }}
      />
      <ResultMetricCard
        favorableChange="increase"
        label={t("summaryCards.absorptions")}
        metric={{
          referenceYear: summaryMetrics.referenceYear,
          values: summaryMetrics.metrics.absorptions,
        }}
      />
      <ResultMetricCard
        favorableChange="decrease"
        label={t("summaryCards.emissionsPerCapita")}
        metric={{
          referenceYear: summaryMetrics.referenceYear,
          values: summaryMetrics.metrics.emissionsPerCapita,
        }}
      />
    </section>
  );
}
