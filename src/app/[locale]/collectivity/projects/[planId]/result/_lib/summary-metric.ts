export type ResultMetricValue = {
  unit: string;
  value: number;
};

export type ResultMetricSeries = {
  referenceYear: number;
  values: Partial<Record<CollectivityResultYearKey, ResultMetricValue>>;
};

export type ResultMetricSummary = {
  annualChange: number | null;
  baselineYear: number | null;
  latestYear: number;
  unit: string;
  value: number;
};

function yearlyValues(values: Partial<Record<CollectivityResultYearKey, ResultMetricValue>>) {
  return Object.entries(values)
    .flatMap(([year, value]) => (value ? [{ year: Number(year.slice(2)), ...value }] : []))
    .sort((left, right) => left.year - right.year);
}

export function summarizeResultMetric({
  referenceYear,
  values,
}: ResultMetricSeries): ResultMetricSummary {
  const entries = yearlyValues(values);
  const latest = entries.at(-1);
  console.log({
    referenceYear,
    values,
  });
  if (!latest) {
    throw new Error("A result metric requires at least one yearly value.");
  }

  const reference = entries.find(({ year }) => year === referenceYear);
  const baseline =
    reference && reference.year !== latest.year
      ? reference
      : entries.filter(({ year }) => year < latest.year).at(-1);
  const elapsedYears = baseline ? latest.year - baseline.year : 0;
  const annualChange =
    baseline && baseline.value > 0 && latest.value > 0 && elapsedYears > 0
      ? (Math.pow(latest.value / baseline.value, 1 / elapsedYears) - 1) * 100
      : null;

  return {
    annualChange,
    baselineYear: baseline?.year ?? null,
    latestYear: latest.year,
    unit: latest.unit,
    value: latest.value,
  };
}
import type { CollectivityResultYearKey } from "@/lib/collectivity/result-types";
