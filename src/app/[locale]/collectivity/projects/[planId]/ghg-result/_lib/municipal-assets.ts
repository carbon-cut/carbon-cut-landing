import type {
  CollectivityInventoryCalculationResult,
  CollectivityResultRow,
} from "@/app/[locale]/collectivity/_lib/queries";
import type { StackedAreaDatum } from "@/components/charts/stacked-area";

type MunicipalAssetSeriesLabels = {
  publicLighting: string;
  fleet: string;
  buildings: string;
};

type MunicipalAssetSeriesDefinition = {
  id: string;
  label: keyof MunicipalAssetSeriesLabels;
  matches: (row: CollectivityResultRow) => boolean;
};

const municipalAssetSeries: MunicipalAssetSeriesDefinition[] = [
  {
    id: "public-lighting",
    label: "publicLighting",
    matches: (row) => row.owner === "municipal" && row.key === "municipalPublicLighting",
  },
  {
    id: "vehicle-fleet",
    label: "fleet",
    matches: (row) => row.owner === "municipal" && row.sector === "transport",
  },
  {
    id: "buildings",
    label: "buildings",
    matches: (row) =>
      row.owner === "municipal" &&
      row.sector === "tertiary" &&
      row.key !== "municipalPublicLighting",
  },
];

export function buildMunicipalAssetsChartData(
  result: CollectivityInventoryCalculationResult,
  labels: MunicipalAssetSeriesLabels
): { categories: string[]; data: StackedAreaDatum[] } {
  const yearKeys = Object.keys(result.resultRows).sort(
    (left, right) => Number(left.slice(2)) - Number(right.slice(2))
  );

  return {
    categories: yearKeys.map((yearKey) => yearKey.slice(2)),
    data: municipalAssetSeries.map(({ id, label, matches }) => {
      const matchingRows = yearKeys.flatMap(
        (yearKey) =>
          result.resultRows[yearKey as keyof typeof result.resultRows]?.filter(matches) ?? []
      );

      return {
        id,
        label: labels[label],
        unit: matchingRows[0]?.unit ?? "tCO2e",
        values: yearKeys.map((yearKey) =>
          (result.resultRows[yearKey as keyof typeof result.resultRows] ?? [])
            .filter(matches)
            .reduce((total, row) => total + row.value, 0)
        ),
      };
    }),
  };
}
