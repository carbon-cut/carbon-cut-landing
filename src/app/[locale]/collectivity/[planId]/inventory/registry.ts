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

export type InventoryFamilyKey = (typeof families)[number];

type InventoryDatasetDefinition = {
  key: string;
  familyKey: InventoryFamilyKey;
  applicability?: keyof CollectivitySetupApplicability;
};

const datasetDefinitions = [
  { key: "fleet", familyKey: "municipalPatrimoine" },
  { key: "publicLighting", familyKey: "municipalPatrimoine" },
  { key: "buildings", familyKey: "municipalPatrimoine" },
  { key: "treesParksWaste", familyKey: "municipalPatrimoine" },
  { key: "electricity", familyKey: "territorialEnergy" },
  { key: "naturalGas", familyKey: "territorialEnergy" },
  { key: "port", familyKey: "transportMobility", applicability: "port" },
  { key: "publicTransport", familyKey: "transportMobility" },
  { key: "airTransport", familyKey: "transportMobility", applicability: "airport" },
  { key: "territoryVehicles", familyKey: "transportMobility" },
  { key: "trees", familyKey: "afat", applicability: "agriculture" },
  { key: "livestock", familyKey: "afat", applicability: "agriculture" },
  { key: "fertilizers", familyKey: "afat", applicability: "agriculture" },
] as const satisfies readonly InventoryDatasetDefinition[];

export type InventoryDatasetKey = (typeof datasetDefinitions)[number]["key"];

export type InventoryWorkspaceLocale = {
  families: InventoryFamilyKey[];
  datasets: InventoryDatasetKey;
};

function isDatasetEnabled(
  dataset: InventoryDatasetDefinition,
  applicability: CollectivitySetupApplicability | null
) {
  return !dataset.applicability || applicability?.[dataset.applicability] !== false;
}

function buildInventoryRegistryWithApplicability(
  applicability: CollectivitySetupApplicability | null
): {
  workspace: InventoryWorkspaceConfig;
} {
  const inventoryDatasets: InventoryDataset[] = datasetDefinitions
    .filter((dataset) => isDatasetEnabled(dataset, applicability))
    .map(({ key, familyKey }) => ({ key, familyKey }));

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
