"use client";

import { useState } from "react";

import PieChart, { type PieDatum } from "@/components/charts/pie";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import YearSelector from "@/components/table/year-selector";
import { useScopedI18n } from "@/locales/client";

import emissionsByScope from "../_fixtures/emissions-by-scope.json";

export default function EmissionsByScopePie() {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "emissions-by-scope-poc-title";
  const [selectedYear, setSelectedYear] = useState(emissionsByScope.years[0].year);
  const selectedYearData =
    emissionsByScope.years.find(({ year }) => year === selectedYear) ?? emissionsByScope.years[0];
  const data: PieDatum[] = selectedYearData.items;

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="col-span-2">
          <ChartTitle id={chartTitleId}>{t("chart.title")}</ChartTitle>
          <ChartDescription>
            {t("chart.description", { year: selectedYearData.year })}
          </ChartDescription>
        </div>
        <YearSelector
          ariaLabel={t("chart.yearSelectorAriaLabel")}
          onSelectYear={setSelectedYear}
          selectedYear={selectedYearData.year}
          years={emissionsByScope.years.map(({ year }) => year)}
        />
      </div>
      <PieChart ariaLabel={t("chart.ariaLabel")} data={data} />
    </ChartContainer>
  );
}
