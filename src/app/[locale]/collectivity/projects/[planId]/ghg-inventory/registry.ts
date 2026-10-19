import type { CollectivitySetupApplicability } from "@/app/[locale]/collectivity/projects/setup/_lib/types";
import type { CollectivityProjectSnapshot } from "@/app/[locale]/collectivity/projects/setup/_lib/types";
import type { InventoryDataset, InventoryWorkspaceConfig } from "./types";

const families = [
  "municipalPatrimoine",
  "stationaryEnergy",
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
  { key: "referenceData", familyKey: "municipalPatrimoine" },
  { key: "fleet", familyKey: "municipalPatrimoine" },
  { key: "publicLighting", familyKey: "municipalPatrimoine" },
  { key: "buildings", familyKey: "municipalPatrimoine" },
  { key: "treesParksWaste", familyKey: "municipalPatrimoine" },
  { key: "electricity", familyKey: "stationaryEnergy" },
  { key: "naturalGas", familyKey: "stationaryEnergy" },
  { key: "port", familyKey: "transportMobility", applicability: "port" },
  { key: "buses", familyKey: "transportMobility" },
  { key: "urbanRail", familyKey: "transportMobility" },
  { key: "territoryVehicles", familyKey: "transportMobility" },
  { key: "trees", familyKey: "afat", applicability: "agriculture" },
  { key: "livestock", familyKey: "afat", applicability: "agriculture" },
  { key: "fertilizers", familyKey: "afat", applicability: "agriculture" },
  { key: "wastewaterTreatment", familyKey: "wastewater" },
  { key: "wastewaterNitrogen", familyKey: "wastewater" },
  { key: "wastewaterSludge", familyKey: "wastewater" },
] as const satisfies readonly InventoryDatasetDefinition[];

export type InventoryDatasetKey = (typeof datasetDefinitions)[number]["key"];

export type InventoryWorkspaceLocale = {
  families: InventoryFamilyKey[];
  datasets: InventoryDatasetKey;
};

function isDatasetEnabled(
  dataset: InventoryDatasetDefinition,
  applicability: CollectivitySetupApplicability | null,
  perimeter: CollectivityProjectSnapshot["perimeter"]
) {
  const isInBoundary =
    perimeter !== "patrimoine_communal" || dataset.familyKey === "municipalPatrimoine";

  return (
    isInBoundary && (!dataset.applicability || applicability?.[dataset.applicability] !== false)
  );
}

function buildInventoryRegistryWithApplicability(
  applicability: CollectivitySetupApplicability | null,
  perimeter: CollectivityProjectSnapshot["perimeter"]
): {
  workspace: InventoryWorkspaceConfig;
} {
  const inventoryDatasets: InventoryDataset[] = datasetDefinitions
    .filter((dataset) => isDatasetEnabled(dataset, applicability, perimeter))
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
  applicability: CollectivitySetupApplicability | null = null,
  perimeter: CollectivityProjectSnapshot["perimeter"] = "territorial_communes"
): {
  workspace: InventoryWorkspaceConfig;
} {
  return buildInventoryRegistryWithApplicability(applicability, perimeter);
}
