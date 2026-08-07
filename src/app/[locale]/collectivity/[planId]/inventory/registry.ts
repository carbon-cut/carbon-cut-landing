import type { CollectivitySetupApplicability } from "@/app/[locale]/collectivity/setup/_lib/types";
import type { InventoryDataset, InventoryWorkspaceConfig } from "./types";

const families = [
  "municipalPatrimoine",
  "territorialEnergy",
  "transportMobility",
  "afat",
  "waste",
  "wastewater",
] as const;

const datasetsByFamily = {
  municipalPatrimoine: ["fleet", "publicLighting", "buildings", "treesParksWaste"],
  territorialEnergy: ["electricity", "naturalGas"],
  transportMobility: ["port", "publicTransport", "airTransport", "territoryVehicles"],
  afat: ["trees", "livestock", "fertilizers"],
  waste: [],
  wastewater: [],
} as const;

export type InventoryFamilyKey = (typeof families)[number];
export type InventoryDatasetKey = (typeof datasetsByFamily)[InventoryFamilyKey][number];

export type InventoryWorkspaceLocale = {
  families: InventoryFamilyKey[];
  datasets: InventoryDatasetKey;
};

const retiredDatasetKeys = new Set<string>([]);

const applicabilityDatasetKeys: Record<keyof CollectivitySetupApplicability, readonly string[]> = {
  airport: ["airTransport"],
  port: ["port"],
  agriculture: ["trees", "livestock", "fertilizers"],
};

function buildInventoryRegistryWithApplicability(
  applicability: CollectivitySetupApplicability | null
): {
  workspace: InventoryWorkspaceConfig;
} {
  const disabledDatasetKeys = new Set<string>(retiredDatasetKeys);

  if (applicability) {
    (
      Object.entries(applicability) as Array<[keyof CollectivitySetupApplicability, boolean]>
    ).forEach(([key, enabled]) => {
      if (!enabled) {
        applicabilityDatasetKeys[key].forEach((datasetKey) => {
          disabledDatasetKeys.add(datasetKey);
        });
      }
    });
  }

  const inventoryDatasets: InventoryDataset[] = families.flatMap((familyKey) =>
    datasetsByFamily[familyKey]
      .filter((datasetKey) => !disabledDatasetKeys.has(datasetKey))
      .map((datasetKey) => {
        return {
          key: datasetKey,
          familyKey,
        };
      })
  );

  const visibleFamilyKeys = new Set(inventoryDatasets.map((dataset) => dataset.familyKey));

  return {
    workspace: {
      families: families
        .filter((familyKey) => visibleFamilyKeys.has(familyKey))
        .map((familyKey) => ({
          key: familyKey,
        })),
      datasets: inventoryDatasets,
    },
  };
}

export function buildInventoryRegistry(
  applicability: CollectivitySetupApplicability | null = null
): {
  workspace: InventoryWorkspaceConfig;
} {
  return buildInventoryRegistryWithApplicability(applicability);
}
