import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import { emissionColors } from "@/components/charts/palette";
import type { StackedBarDatum, StackedBarLineDatum } from "@/components/charts/stacked-bar";

type GHGSeriesLabels = {
  energy: string;
  afatEmissions: string;
  waste: string;
  absorptions: string;
  totalGrossEmissions: string;
};

type GHGSeriesDefinition = {
  id: string;
  family?: "energy" | "afat" | "waste";
  direction: "emission" | "absorption";
  label: keyof GHGSeriesLabels;
  color: string;
};

const seriesDefinitions: GHGSeriesDefinition[] = [
  {
    id: "energy",
    family: "energy",
    direction: "emission",
    label: "energy",
    color: emissionColors.energy,
  },
  {
    id: "afat-emissions",
    family: "afat",
    direction: "emission",
    label: "afatEmissions",
    color: emissionColors.afat,
  },
  {
    id: "waste",
    family: "waste",
    direction: "emission",
    label: "waste",
    color: emissionColors.waste,
  },
  {
    id: "absorptions",
    direction: "absorption",
    label: "absorptions",
    color: emissionColors.absorption,
  },
];

export function buildGHGDevelopmentChartData(
  result: CollectivityInventoryCalculationResult,
  labels: GHGSeriesLabels
): { categories: string[]; data: StackedBarDatum[]; line: StackedBarLineDatum } {
  const yearKeys = Object.keys(result.resultRows).sort(
    (left, right) => Number(left.slice(2)) - Number(right.slice(2))
  );
  const data = seriesDefinitions.map(({ id, family, direction, label, color }) => {
    const matchingRows = yearKeys.flatMap(
      (yearKey) =>
        result.resultRows[yearKey as keyof typeof result.resultRows]?.filter(
          (row) => row.direction === direction && (!family || row.family === family)
        ) ?? []
    );

    return {
      id,
      label: labels[label],
      color,
      unit: matchingRows[0]?.unit ?? "tCO2e",
      values: yearKeys.map((yearKey) =>
        (result.resultRows[yearKey as keyof typeof result.resultRows] ?? [])
          .filter((row) => row.direction === direction && (!family || row.family === family))
          .reduce((total, row) => total + row.value, 0)
      ),
    };
  });

  return {
    categories: yearKeys.map((yearKey) => yearKey.slice(2)),
    data,
    line: {
      id: "total-gross-emissions",
      label: labels.totalGrossEmissions,
      unit: data[0]?.unit ?? "tCO2e",
      values: yearKeys.map((_, index) =>
        data.slice(0, 3).reduce((total, series) => total + series.values[index], 0)
      ),
    },
  };
}
