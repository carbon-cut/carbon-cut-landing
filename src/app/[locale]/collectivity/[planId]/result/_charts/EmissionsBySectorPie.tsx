"use client";

import { useState } from "react";

import PieChart, { type PieDatum } from "@/components/charts/pie";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import YearSelector from "@/components/table/year-selector";
import { useScopedI18n } from "@/locales/client";

import emissionsBySector from "../_fixtures/emissions-by-sector.json";

export default function EmissionsBySectorPie() {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "emissions-by-sector-poc-title";
  const [selectedYear, setSelectedYear] = useState(emissionsBySector.years[0].year);
  const selectedYearData =
    emissionsBySector.years.find(({ year }) => year === selectedYear) ?? emissionsBySector.years[0];
  const data: PieDatum[] = selectedYearData.items;

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="col-span-2">
          <ChartTitle id={chartTitleId}>{t("sectorChart.title")}</ChartTitle>
          <ChartDescription>
            {t("sectorChart.description", { year: selectedYearData.year })}
          </ChartDescription>
        </div>
        <YearSelector
          ariaLabel={t("sectorChart.yearSelectorAriaLabel")}
          onSelectYear={setSelectedYear}
          selectedYear={selectedYearData.year}
          years={emissionsBySector.years.map(({ year }) => year)}
        />
      </div>
      <PieChart ariaLabel={t("sectorChart.ariaLabel")} data={data} />
    </ChartContainer>
  );
}
