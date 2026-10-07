import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import type { StackedBarDatum } from "@/components/charts/stacked-bar";

export function buildMunicipalEnergyChartData(
  result: CollectivityInventoryCalculationResult,
  localizeEnergy: (energy: string) => string
): { categories: string[]; data: StackedBarDatum[] } {
  const yearKeys = Object.keys(result.resultRows).sort(
    (left, right) => Number(left.slice(2)) - Number(right.slice(2))
  ) as Array<keyof typeof result.resultRows>;
  const rows = yearKeys.flatMap((yearKey) => result.resultRows[yearKey]);
  const energies = [
    ...new Set(
      rows
        .filter(
          (row) =>
            row.owner === "municipal" &&
            row.family === "energy" &&
            row.direction === "emission" &&
            row.energy
        )
        .map((row) => row.energy!)
    ),
  ].sort();

  return {
    categories: yearKeys.map((yearKey) => yearKey.slice(2)),
    data: energies.map((energy) => {
      const matches = (row: (typeof rows)[number]) =>
        row.owner === "municipal" &&
        row.family === "energy" &&
        row.direction === "emission" &&
        row.energy === energy;
      const matchingRows = rows.filter(matches);

      return {
        id: energy,
        label: localizeEnergy(energy),
        unit: matchingRows[0]?.unit ?? "tCO2e",
        values: yearKeys.map((yearKey) =>
          result.resultRows[yearKey].filter(matches).reduce((total, row) => total + row.value, 0)
        ),
      };
    }),
  };
}
