import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import type { GroupedStackedBarGroup } from "@/components/charts/grouped-stacked-bar";
import { chartColors } from "@/components/charts/palette";

const ownerStackOrder: Record<string, number> = {
  territory: 0,
  airport: 1,
  port: 2,
  municipal: 4,
};

function compareOwners(left: string, right: string) {
  const leftOrder = ownerStackOrder[left] ?? 3;
  const rightOrder = ownerStackOrder[right] ?? 3;

  return leftOrder === rightOrder ? left.localeCompare(right) : leftOrder - rightOrder;
}

export function buildTransportChartData(
  result: CollectivityInventoryCalculationResult,
  localizeOwner: (owner: string) => string
): { categories: string[]; groups: GroupedStackedBarGroup[] } {
  const yearKeys = Object.keys(result.resultRows).sort(
    (left, right) => Number(left.slice(2)) - Number(right.slice(2))
  ) as Array<keyof typeof result.resultRows>;
  const matchesTransport = (row: (typeof result.resultRows)[(typeof yearKeys)[number]][number]) =>
    row.family === "energy" && row.direction === "emission" && row.sector === "transport";
  const owners = Array.from(
    new Set(
      yearKeys.flatMap((yearKey) =>
        result.resultRows[yearKey].filter(matchesTransport).map((row) => row.owner)
      )
    )
  ).sort(compareOwners);
  const ownerColorByValueRank = new Map(
    [...owners]
      .sort((left, right) => {
        const totalFor = (owner: string) =>
          yearKeys
            .flatMap((yearKey) => result.resultRows[yearKey])
            .filter((row) => matchesTransport(row) && row.owner === owner)
            .reduce((total, row) => total + row.value, 0);

        return totalFor(right) - totalFor(left);
      })
      .map((owner, index) => [owner, chartColors[index % chartColors.length]])
  );

  return {
    categories: yearKeys.map((yearKey) => yearKey.slice(2)),
    groups: [
      {
        id: "by-owner",
        label: "by-owner",
        segments: owners.map((owner) => {
          const ownerRows = yearKeys.flatMap((yearKey) =>
            result.resultRows[yearKey].filter((row) => matchesTransport(row) && row.owner === owner)
          );

          return {
            id: owner,
            label: localizeOwner(owner),
            color: ownerColorByValueRank.get(owner),
            unit: ownerRows[0]?.unit ?? "tCO2e",
            values: yearKeys.map((yearKey) =>
              result.resultRows[yearKey]
                .filter((row) => matchesTransport(row) && row.owner === owner)
                .reduce((total, row) => total + row.value, 0)
            ),
          };
        }),
      },
    ],
  };
}
