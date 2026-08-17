import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { fertilizers, livestock, trees } from "./config";

export const afatDatasetKeys = ["trees", "livestock", "fertilizers"] as const;
export type AfatDatasetKey = (typeof afatDatasetKeys)[number];

const year = { key: "year" } as const;
const metricUnits = Object.fromEntries(
  trees.trackedTreeCropMetricKeys.map((metric) => [metric, trees.units.metrics[metric][0]])
);

const afatCatalogEntries = [
  {
    datasetKey: "trees",
    id: "afat.trees.trackedTreeCrops",
    fieldPath: "afat.trees.trackedTreeCrops.dataSet.{recordIndex}.value.{metric}.value",
    label: "Données annuelles des cultures arboricoles",
    description: "Surface ou nombre d’arbres par espèce et stade de maturité.",
    valueType: "number",
    expectedUnit: null,
    unitByDimension: { metric: metricUnits },
    dimensions: [
      year,
      { key: "recordIndex" },
      { key: "treeType", allowedValues: trees.trackedTreeCropOptions },
      { key: "metric", allowedValues: trees.trackedTreeCropMetricKeys },
    ],
    aliases: ["arboriculture", "plantation pérenne", "jeunes arbres", "arbres adultes"],
  },
  {
    datasetKey: "trees",
    id: "afat.trees.fruitTrees.count",
    fieldPath: "afat.trees.fruitTrees.dataSet.count.value",
    label: "Nombre annuel d’arbres fruitiers",
    description: "Nombre d’arbres fruitiers sur le territoire.",
    valueType: "number",
    expectedUnit: null,
    dimensions: [year],
    aliases: ["arbres fruitiers", "vergers"],
  },
  {
    datasetKey: "livestock",
    id: "afat.livestock.count",
    fieldPath: "afat.livestock.dataSet.count.{animalType}.value",
    label: "Effectif annuel du cheptel",
    description: "Nombre annuel d’animaux par type de cheptel.",
    valueType: "number",
    expectedUnit: null,
    dimensions: [year, { key: "animalType", allowedValues: livestock.keys }],
    aliases: ["cheptel", "effectif animaux", "bovins", "ovins"],
  },
  {
    datasetKey: "livestock",
    id: "afat.livestock.confinedTimeShare",
    fieldPath: "afat.livestock.dataSet.confinedTimeShare.{animalType}.value",
    label: "Part du temps en stabulation du cheptel",
    description: "Pourcentage de temps qu’un type d’animal passe en stabulation.",
    valueType: "number",
    expectedUnit: "%",
    dimensions: [{ key: "animalType", allowedValues: livestock.keys }],
    aliases: ["temps confiné", "stabulation", "part confinée"],
  },
  {
    datasetKey: "fertilizers",
    id: "afat.fertilizers.quantity",
    fieldPath: "afat.fertilizers.dataSet.quantity.{fertilizer}.value",
    label: "Quantité annuelle d’engrais",
    description: "Tonnage annuel par type d’engrais.",
    valueType: "number",
    expectedUnit: "t",
    dimensions: [year, { key: "fertilizer", allowedValues: fertilizers.keys }],
    aliases: ["engrais", "ammonitrate", "DAP", "urée"],
  },
  {
    datasetKey: "fertilizers",
    id: "afat.fertilizers.tenure",
    fieldPath: "afat.fertilizers.dataSet.tenure.{fertilizer}.value",
    label: "Teneur en nutriments des engrais",
    description: "Part de nutriments contenue dans un type d’engrais.",
    valueType: "number",
    expectedUnit: "%",
    dimensions: [{ key: "fertilizer", allowedValues: fertilizers.keys }],
    aliases: ["tenure", "teneur", "part de nutriments"],
  },
] as const satisfies readonly AIFieldCatalogEntry[];

export const afatCatalog = createAIFieldCatalog(afatCatalogEntries);
export function getAfatDatasetFieldCatalog(datasetKey: AfatDatasetKey) {
  return afatCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}
export function resolveAfatAIField(id: string) {
  return afatCatalog.resolve(id);
}
