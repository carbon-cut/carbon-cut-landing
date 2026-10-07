"use client";

import { useState } from "react";

import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import ErrorChart from "@/components/charts/error-chart";
import PieChart from "@/components/charts/pie";
import { sectorColors } from "@/components/charts/palette";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import YearSelector from "@/components/table/year-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { useScopedI18n } from "@/locales/client";

import { buildEnergySourcePieData } from "../_lib/energy-pies";

export default function EmissionsBySectorPie({
  result,
  isLoading,
  error,
}: {
  result?: CollectivityInventoryCalculationResult;
  isLoading: boolean;
  error: Error | null;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "emissions-by-source-poc-title";
  const [selectedYear, setSelectedYear] = useState<number>();
  const years = result
    ? buildEnergySourcePieData(result, {
        scope1: "",
        scope2: "",
        scope3: "",
        transport: t("sourceChart.sources.transport"),
        residential: t("sourceChart.sources.residential"),
        industry: t("sourceChart.sources.industry"),
        tertiary: t("sourceChart.sources.tertiary"),
        agriculture: t("sourceChart.sources.agriculture"),
        municipal: t("sourceChart.sources.municipal"),
      })
    : [];
  const selectedYearData = years.find(({ year }) => year === selectedYear) ?? years[0];
  const data = selectedYearData?.items.map((item) => ({
    ...item,
    color: sectorColors[item.id as keyof typeof sectorColors],
  }));

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="col-span-2">
          <ChartTitle id={chartTitleId}>{t("sourceChart.title")}</ChartTitle>
          <ChartDescription>
            {t("sourceChart.description", { year: selectedYearData?.year })}
          </ChartDescription>
        </div>
        <YearSelector
          ariaLabel={t("sourceChart.yearSelectorAriaLabel")}
          onSelectYear={setSelectedYear}
          selectedYear={selectedYearData?.year}
          years={years.map(({ year }) => year)}
        />
      </div>
      {isLoading ? <Skeleton className="w-full" style={{ height: 330 }} /> : null}
      {error ? <ErrorChart error={error} title={t("sourceChart.errorTitle")} /> : null}
      {data ? <PieChart ariaLabel={t("sourceChart.ariaLabel")} data={data} /> : null}
    </ChartContainer>
  );
}
