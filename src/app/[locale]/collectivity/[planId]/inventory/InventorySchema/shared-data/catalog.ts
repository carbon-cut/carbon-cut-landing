import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { sharedData } from "./config";

export const sharedDataDatasetKeys = ["population", "householdEnergy"] as const;
export type SharedDataDatasetKey = (typeof sharedDataDatasetKeys)[number];

const sharedDataCatalogEntries = [
  ...sharedData.population.metricKeys.map(
    (metric): AIFieldCatalogEntry => ({
      datasetKey: "population",
      id: `sharedData.population.${metric}`,
      fieldPath: `sharedData.population.dataSet.${metric}.value`,
      label: "Population annuelle du territoire",
      description: "Nombre annuel d’habitants du territoire couvert par l’inventaire.",
      valueType: "number",
      expectedUnit: sharedData.population.units.dataSet[metric][0] || null,
      dimensions: [{ key: "year" }],
      aliases: ["population", "habitants", "nombre d’habitants"],
    })
  ),
  {
    datasetKey: "householdEnergy",
    id: "sharedData.householdEnergy.consumptionNorm",
    fieldPath: "sharedData.householdEnergy.assumptions.consumptionNorm.value",
    label: "Norme de consommation énergétique des ménages",
    description: "Hypothèse de consommation énergétique annuelle moyenne par habitant.",
    valueType: "number",
    expectedUnit: sharedData.householdEnergy.units.assumptions.consumptionNorm[0],
    dimensions: [],
    aliases: ["consommation ménages", "norme énergétique", "tep par habitant"],
  } satisfies AIFieldCatalogEntry,
] as const;

export const sharedDataCatalog = createAIFieldCatalog(sharedDataCatalogEntries);

export function getSharedDataDatasetFieldCatalog(datasetKey: SharedDataDatasetKey) {
  return sharedDataCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}

export function resolveSharedDataAIField(id: string) {
  return sharedDataCatalog.resolve(id);
}
