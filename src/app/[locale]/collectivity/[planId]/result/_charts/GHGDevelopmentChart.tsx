"use client";

import StackedBarChart, {
  type StackedBarDatum,
  type StackedBarLineDatum,
} from "@/components/charts/stacked-bar";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import { useScopedI18n } from "@/locales/client";

import ghgDevelopment from "../_fixtures/ghg-development.json";

export default function GHGDevelopmentChart() {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "ghg-development-poc-title";
  const data: StackedBarDatum[] = ghgDevelopment.series;
  const totalGrossEmissions: StackedBarLineDatum = ghgDevelopment.totalGrossEmissions;

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="mb-3">
        <ChartTitle id={chartTitleId}>{t("ghgDevelopmentChart.title")}</ChartTitle>
        <ChartDescription>{t("ghgDevelopmentChart.description")}</ChartDescription>
      </div>
      <StackedBarChart
        ariaLabel={t("ghgDevelopmentChart.ariaLabel")}
        categories={ghgDevelopment.years}
        data={data}
        line={totalGrossEmissions}
      />
    </ChartContainer>
  );
}
