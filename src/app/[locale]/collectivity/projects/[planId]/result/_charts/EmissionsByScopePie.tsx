"use client";

import { useState } from "react";

import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import ErrorChart from "@/components/charts/error-chart";
import PieChart from "@/components/charts/pie";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import YearSelector from "@/components/table/year-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { useScopedI18n } from "@/locales/client";

import { buildEnergyScopePieData } from "../_lib/energy-pies";

export default function EmissionsByScopePie({
  result,
  isLoading,
  error,
}: {
  result?: CollectivityInventoryCalculationResult;
  isLoading: boolean;
  error: Error | null;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "emissions-by-scope-poc-title";
  const [selectedYear, setSelectedYear] = useState<number>();
  const years = result
    ? buildEnergyScopePieData(result, {
        scope1: t("chart.scopes.scope1"),
        scope2: t("chart.scopes.scope2"),
        scope3: t("chart.scopes.scope3"),
        transport: "",
        residential: "",
        industry: "",
        tertiary: "",
        agriculture: "",
        municipal: "",
      })
    : [];
  const selectedYearData = years.find(({ year }) => year === selectedYear) ?? years[0];

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="col-span-2">
          <ChartTitle id={chartTitleId}>{t("chart.title")}</ChartTitle>
          <ChartDescription>
            {t("chart.description", { year: selectedYearData?.year })}
          </ChartDescription>
        </div>
        <YearSelector
          ariaLabel={t("chart.yearSelectorAriaLabel")}
          onSelectYear={setSelectedYear}
          selectedYear={selectedYearData?.year}
          years={years.map(({ year }) => year)}
        />
      </div>
      {isLoading ? <Skeleton className="w-full" style={{ height: 330 }} /> : null}
      {error ? <ErrorChart error={error} title={t("chart.errorTitle")} /> : null}
      {selectedYearData ? (
        <PieChart ariaLabel={t("chart.ariaLabel")} data={selectedYearData.items} />
      ) : null}
    </ChartContainer>
  );
}
