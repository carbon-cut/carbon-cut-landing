"use client";

import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import ErrorChart from "@/components/charts/error-chart";
import StackedAreaChart from "@/components/charts/stacked-area";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import { Skeleton } from "@/components/ui/skeleton";
import { useScopedI18n } from "@/locales/client";

import { buildMunicipalAssetsChartData } from "../_lib/municipal-assets";

export default function MunicipalAssetsChart({
  result,
  isLoading,
  error,
}: {
  result?: CollectivityInventoryCalculationResult;
  isLoading: boolean;
  error: Error | null;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "municipal-assets-poc-title";
  const chartData = result
    ? buildMunicipalAssetsChartData(result, {
        publicLighting: t("municipalAssetsChart.series.publicLighting"),
        fleet: t("municipalAssetsChart.series.fleet"),
        buildings: t("municipalAssetsChart.series.buildings"),
      })
    : null;

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="mb-3">
        <ChartTitle id={chartTitleId}>{t("municipalAssetsChart.title")}</ChartTitle>
        <ChartDescription>{t("municipalAssetsChart.description")}</ChartDescription>
      </div>
      {isLoading ? <Skeleton className="w-full" style={{ height: 360 }} /> : null}
      {error ? <ErrorChart error={error} title={t("municipalAssetsChart.errorTitle")} /> : null}
      {chartData ? (
        <StackedAreaChart
          ariaLabel={t("municipalAssetsChart.ariaLabel")}
          categories={chartData.categories}
          data={chartData.data}
          showShareLabels
        />
      ) : null}
    </ChartContainer>
  );
}
