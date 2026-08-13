"use client";

import StackedAreaChart, { type StackedAreaDatum } from "@/components/charts/stacked-area";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import { useScopedI18n } from "@/locales/client";

import municipalAssets from "../_fixtures/municipal-assets.json";

export default function MunicipalAssetsChart() {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "municipal-assets-poc-title";
  const data: StackedAreaDatum[] = municipalAssets.series;

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="mb-3">
        <ChartTitle id={chartTitleId}>{t("municipalAssetsChart.title")}</ChartTitle>
        <ChartDescription>{t("municipalAssetsChart.description")}</ChartDescription>
      </div>
      <StackedAreaChart
        ariaLabel={t("municipalAssetsChart.ariaLabel")}
        categories={municipalAssets.years}
        data={data}
        showShareLabels
      />
    </ChartContainer>
  );
}
