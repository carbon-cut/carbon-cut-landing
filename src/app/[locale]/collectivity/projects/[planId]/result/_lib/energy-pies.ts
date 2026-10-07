import type {
  CollectivityInventoryCalculationResult,
  CollectivityResultYearKey,
} from "@/app/[locale]/collectivity/_lib/queries";
import type { PieDatum } from "@/components/charts/pie";

type PieYear = {
  year: number;
  items: PieDatum[];
};

type EnergyPieLabels = {
  scope1: string;
  scope2: string;
  scope3: string;
  transport: string;
  residential: string;
  industry: string;
  tertiary: string;
  agriculture: string;
  municipal: string;
};

const scopeOrder = ["scope1", "scope2", "scope3"] as const;
const sourceOrder = [
  "transport",
  "residential",
  "industry",
  "tertiary",
  "agriculture",
  "municipal",
] as const;

function buildPieYear(
  year: number,
  rows: CollectivityInventoryCalculationResult["resultRows"][keyof CollectivityInventoryCalculationResult["resultRows"]],
  order: readonly string[],
  labels: EnergyPieLabels,
  getGroup: (row: (typeof rows)[number]) => string | undefined
): PieYear {
  const grouped = new Map<string, { value: number; unit: string }>();

  for (const row of rows) {
    if (row.family !== "energy" || row.direction !== "emission") {
      continue;
    }

    const id = getGroup(row);
    if (!id) {
      continue;
    }

    const current = grouped.get(id);
    grouped.set(id, {
      value: (current?.value ?? 0) + row.value,
      unit: current?.unit ?? row.unit,
    });
  }

  return {
    year,
    items: order.flatMap((id) => {
      const metric = grouped.get(id);

      return metric ? [{ id, label: labels[id as keyof EnergyPieLabels], ...metric }] : [];
    }),
  };
}

function sortedResultYears(
  result: CollectivityInventoryCalculationResult
): CollectivityResultYearKey[] {
  return (Object.keys(result.resultRows) as CollectivityResultYearKey[]).sort(
    (left, right) => Number(left.slice(2)) - Number(right.slice(2))
  );
}

export function buildEnergyScopePieData(
  result: CollectivityInventoryCalculationResult,
  labels: EnergyPieLabels
): PieYear[] {
  return sortedResultYears(result).map((yearKey) =>
    buildPieYear(
      Number(yearKey.slice(2)),
      result.resultRows[yearKey],
      scopeOrder,
      labels,
      (row) => row.scope
    )
  );
}

export function buildEnergySourcePieData(
  result: CollectivityInventoryCalculationResult,
  labels: EnergyPieLabels
): PieYear[] {
  return sortedResultYears(result).map((yearKey) => {
    const pieYear = buildPieYear(
      Number(yearKey.slice(2)),
      result.resultRows[yearKey],
      sourceOrder,
      labels,
      (row) => (row.owner === "municipal" ? "municipal" : row.sector)
    );

    return {
      ...pieYear,
      items: [...pieYear.items].sort((left, right) => right.value - left.value),
    };
  });
}
