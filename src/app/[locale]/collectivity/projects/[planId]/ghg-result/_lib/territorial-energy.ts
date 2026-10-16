import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import type { GroupedStackedBarGroup } from "@/components/charts/grouped-stacked-bar";

type TerritorialEnergyLabels = {
  electricity: string;
  naturalGas: string;
  gpl: string;
  industry: string;
  residential: string;
  tertiary: string;
  agriculture: string;
};

const energySources = [
  { id: "electricity", energy: "electricity", label: "electricity" },
  { id: "natural-gas", energy: "naturalGas", label: "naturalGas" },
  { id: "gpl", energy: "gpl", label: "gpl" },
] as const;

const sectors = ["industry", "residential", "tertiary", "agriculture"] as const;

export function buildTerritorialEnergyChartData(
  result: CollectivityInventoryCalculationResult,
  labels: TerritorialEnergyLabels
): { categories: string[]; groups: GroupedStackedBarGroup[] } {
  const yearKeys = Object.keys(result.resultRows).sort(
    (left, right) => Number(left.slice(2)) - Number(right.slice(2))
  ) as Array<keyof typeof result.resultRows>;
  const matchesTerritorialEnergy = (
    row: (typeof result.resultRows)[(typeof yearKeys)[number]][number]
  ) => row.family === "energy" && row.direction === "emission" && row.sector !== "transport";

  return {
    categories: yearKeys.map((yearKey) => yearKey.slice(2)),
    groups: energySources.map(({ id, energy, label }) => {
      const sourceRows = yearKeys.flatMap((yearKey) =>
        result.resultRows[yearKey].filter(
          (row) => matchesTerritorialEnergy(row) && row.energy === energy
        )
      );
      const presentSectors = sectors.filter((sector) =>
        sourceRows.some((row) => row.sector === sector)
      );

      return {
        id,
        label: labels[label],
        summary: {
          id: `${id}-total`,
          label: labels[label],
          unit: sourceRows[0]?.unit ?? "tCO2e",
          values: yearKeys.map((yearKey) =>
            result.resultRows[yearKey]
              .filter((row) => matchesTerritorialEnergy(row) && row.energy === energy)
              .reduce((total, row) => total + row.value, 0)
          ),
        },
        segments: presentSectors.map((sector) => ({
          id: `${id}-${sector}`,
          label: labels[sector],
          unit: sourceRows.find((row) => row.sector === sector)?.unit ?? "tCO2e",
          values: yearKeys.map((yearKey) =>
            result.resultRows[yearKey]
              .filter(
                (row) =>
                  matchesTerritorialEnergy(row) && row.energy === energy && row.sector === sector
              )
              .reduce((total, row) => total + row.value, 0)
          ),
        })),
      };
    }),
  };
}
