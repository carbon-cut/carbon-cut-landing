import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import { chartColors, emissionColors } from "@/components/charts/palette";
import type { StackedBarDatum } from "@/components/charts/stacked-bar";

type AfatLabels = {
  livestock: string;
  crops: string;
  waste: string;
  treeSource: (source: string) => string;
};

const cropSources = new Set(["organicSoilAmendment", "syntheticFertilizer", "cropProduction"]);

export function buildAfatChartData(
  result: CollectivityInventoryCalculationResult,
  labels: AfatLabels
): { categories: string[]; data: StackedBarDatum[] } {
  const yearKeys = Object.keys(result.resultRows).sort(
    (left, right) => Number(left.slice(2)) - Number(right.slice(2))
  ) as Array<keyof typeof result.resultRows>;
  const rows = yearKeys.flatMap((yearKey) => result.resultRows[yearKey]);
  const treeSources = [
    ...new Set(
      rows
        .filter((row) => row.family === "afat" && row.direction === "absorption" && row.afatSource)
        .map((row) => row.afatSource!)
    ),
  ].sort();
  const series = [
    {
      id: "livestock",
      label: labels.livestock,
      matches: (row: (typeof rows)[number]) =>
        row.family === "afat" &&
        row.direction === "emission" &&
        row.afatSource === "manureManagement",
    },
    {
      id: "crops",
      label: labels.crops,
      matches: (row: (typeof rows)[number]) =>
        row.family === "afat" &&
        row.direction === "emission" &&
        Boolean(row.afatSource && cropSources.has(row.afatSource)),
    },
    {
      id: "waste",
      label: labels.waste,
      matches: (row: (typeof rows)[number]) =>
        row.family === "waste" && row.wasteSource === "greenWaste",
    },
    ...treeSources.map((source) => ({
      id: source,
      label: labels.treeSource(source),
      matches: (row: (typeof rows)[number]) =>
        row.family === "afat" && row.direction === "absorption" && row.afatSource === source,
    })),
  ];

  return {
    categories: yearKeys.map((yearKey) => yearKey.slice(2)),
    data: series
      .filter(({ matches }) => rows.some(matches))
      .map(({ id, label, matches }, index) => {
        const matchingRows = rows.filter(matches);

        return {
          id,
          label,
          color: id === "waste" ? emissionColors.waste : chartColors[index % chartColors.length],
          unit: matchingRows[0]?.unit ?? "tCO2e",
          values: yearKeys.map((yearKey) =>
            result.resultRows[yearKey].filter(matches).reduce((total, row) => total + row.value, 0)
          ),
        };
      }),
  };
}
