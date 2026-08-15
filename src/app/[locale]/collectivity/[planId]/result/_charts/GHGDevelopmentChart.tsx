"use client";

import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import ErrorChart from "@/components/charts/error-chart";
import StackedBarChart from "@/components/charts/stacked-bar";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import { Skeleton } from "@/components/ui/skeleton";
import { useScopedI18n } from "@/locales/client";

import { buildGHGDevelopmentChartData } from "../_lib/ghg-development";

export default function GHGDevelopmentChart({
  result,
  isLoading,
  error,
}: {
  result?: CollectivityInventoryCalculationResult;
  isLoading: boolean;
  error: Error | null;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "ghg-development-poc-title";
  const chartData = result
    ? buildGHGDevelopmentChartData(result, {
        energy: t("ghgDevelopmentChart.series.energy"),
        afatEmissions: t("ghgDevelopmentChart.series.afatEmissions"),
        waste: t("ghgDevelopmentChart.series.waste"),
        absorptions: t("ghgDevelopmentChart.series.absorptions"),
        totalGrossEmissions: t("ghgDevelopmentChart.series.totalGrossEmissions"),
      })
    : null;

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="mb-3">
        <ChartTitle id={chartTitleId}>{t("ghgDevelopmentChart.title")}</ChartTitle>
        <ChartDescription>{t("ghgDevelopmentChart.description")}</ChartDescription>
      </div>
      {isLoading ? (
        <Skeleton className="w-full" style={{ height: 360 }} />
      ) : error ? (
        <ErrorChart error={error} title={t("ghgDevelopmentChart.errorTitle")} />
      ) : chartData ? (
        <StackedBarChart
          ariaLabel={t("ghgDevelopmentChart.ariaLabel")}
          categories={chartData.categories}
          data={chartData.data}
          line={chartData.line}
        />
      ) : null}
    </ChartContainer>
  );
}
