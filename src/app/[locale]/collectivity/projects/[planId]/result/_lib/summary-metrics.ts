import type {
  CollectivityInventoryCalculationResult,
  CollectivityResultYearKey,
  CollectivityResultsByYear,
} from "@/app/[locale]/collectivity/_lib/queries";

import type { ResultMetricValue } from "./summary-metric";

type SummaryMetrics = {
  emissions: Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;
  netEmissions: Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;
  absorptions: Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;
  emissionsPerCapita: Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;
};

function sumRows(resultRows: CollectivityResultsByYear, direction?: "emission" | "absorption") {
  return Object.fromEntries(
    Object.entries(resultRows).map(([year, rows]) => {
      const matchingRows = direction
        ? (rows ?? []).filter((row) => row.direction === direction)
        : (rows ?? []);
      const unit = matchingRows[0]?.unit ?? "tCO2e";

      return [
        year,
        {
          value: matchingRows.reduce((total, row) => total + row.value, 0),
          unit,
        },
      ];
    })
  ) as Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;
}

export function buildSummaryMetrics(
  result: CollectivityInventoryCalculationResult
): SummaryMetrics {
  const emissions = sumRows(result.resultRows, "emission");
  const netEmissions = sumRows(result.resultRows);
  const absorptions = Object.fromEntries(
    Object.entries(sumRows(result.resultRows, "absorption")).flatMap(([year, metric]) =>
      metric ? [[year, { ...metric, value: Math.abs(metric.value) }]] : []
    )
  ) as Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;
  const emissionsPerCapita = Object.fromEntries(
    Object.entries(emissions).flatMap(([year, metric]) => {
      const population = result.context.population[year as CollectivityResultYearKey];

      return metric && population && population.value > 0
        ? [[year, { value: metric.value / population.value, unit: `${metric.unit}/capita` }]]
        : [];
    })
  ) as Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;

  return { emissions, netEmissions, absorptions, emissionsPerCapita };
}
