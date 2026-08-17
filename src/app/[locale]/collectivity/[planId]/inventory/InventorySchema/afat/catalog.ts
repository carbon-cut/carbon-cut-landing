import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { fertilizers, livestock, trees } from "./config";

export const afatDatasetKeys = ["trees", "livestock", "fertilizers"] as const;
export type AfatDatasetKey = (typeof afatDatasetKeys)[number];

const yearDimension = { key: "year" } as const;
const recordDimension = { key: "recordIndex" } as const;
const labels: Record<string, string> = {
  youngHectares: "Surface de jeunes arbres",
  adultHectares: "Surface d’arbres adultes",
  senescentHectares: "Surface d’arbres sénescents",
  youngTrees: "Nombre de jeunes arbres",
  adultTrees: "Nombre d’arbres adultes",
  senescentTrees: "Nombre d’arbres sénescents",
  dairyCattle: "bovins laitiers",
  otherCattle: "autres bovins",
  sheep: "ovins",
  goats: "caprins",
  horses: "chevaux",
  donkeysMules: "ânes et mulets",
  camels: "camélidés",
  broilers: "poulets de chair",
  layingHens: "poules pondeuses",
  turkeys: "dindes",
  ammonitrate: "ammonitrate",
  dap: "DAP",
  urea: "urée",
};

function labelFor(key: string) {
  return labels[key] ?? key;
}

const afatCatalogEntries = [
  ...trees.trackedTreeCropMetricKeys.map(
    (metric): AIFieldCatalogEntry => ({
      datasetKey: "trees",
      id: `afat.trees.trackedTreeCrops.${metric}`,
      fieldPath: `afat.trees.trackedTreeCrops.dataSet.{recordIndex}.value.${metric}.value`,
      label: `${labelFor(metric)} des cultures arboricoles`,
      description: `${labelFor(metric)} pour une espèce d’arbre suivie.`,
      valueType: "number",
      expectedUnit: trees.units.metrics[metric][0] || null,
      dimensions: [
        yearDimension,
        recordDimension,
        { key: "treeType", allowedValues: trees.trackedTreeCropOptions },
      ],
      aliases: [metric, "arboriculture", "plantation pérenne"],
    })
  ),
  {
    datasetKey: "trees",
    id: "afat.trees.fruitTrees.count",
    fieldPath: "afat.trees.fruitTrees.dataSet.count.value",
    label: "Nombre annuel d’arbres fruitiers",
    description: "Nombre annuel d’arbres fruitiers sur le territoire.",
    valueType: "number",
    expectedUnit: null,
    dimensions: [yearDimension],
    aliases: ["arbres fruitiers", "vergers"],
  } satisfies AIFieldCatalogEntry,
  ...livestock.keys.map(
    (livestockType): AIFieldCatalogEntry => ({
      datasetKey: "livestock",
      id: `afat.livestock.count.${livestockType}`,
      fieldPath: `afat.livestock.dataSet.count.${livestockType}.value`,
      label: `Effectif annuel de ${labelFor(livestockType)}`,
      description: `Nombre annuel de ${labelFor(livestockType)} sur le territoire.`,
      valueType: "number",
      expectedUnit: livestock.units.count.default[0] || null,
      dimensions: [yearDimension, { key: "livestockType", allowedValues: livestock.keys }],
      aliases: [livestockType, labelFor(livestockType), "cheptel"],
    })
  ),
  ...livestock.keys.map(
    (livestockType): AIFieldCatalogEntry => ({
      datasetKey: "livestock",
      id: `afat.livestock.confinedTimeShare.${livestockType}`,
      fieldPath: `afat.livestock.dataSet.confinedTimeShare.${livestockType}.value`,
      label: `Part du temps en stabulation de ${labelFor(livestockType)}`,
      description: `Pourcentage de temps annuel que ${labelFor(livestockType)} passent en stabulation.`,
      valueType: "number",
      expectedUnit: livestock.units.confinedTimeShare.default[0] || null,
      dimensions: [{ key: "livestockType", allowedValues: livestock.keys }],
      aliases: ["temps en stabulation", livestockType],
    })
  ),
  ...fertilizers.keys.map(
    (fertilizer): AIFieldCatalogEntry => ({
      datasetKey: "fertilizers",
      id: `afat.fertilizers.quantity.${fertilizer}`,
      fieldPath: `afat.fertilizers.dataSet.quantity.${fertilizer}.value`,
      label: `Quantité annuelle d’engrais — ${labelFor(fertilizer)}`,
      description: `Quantité annuelle de ${labelFor(fertilizer)} utilisée sur le territoire.`,
      valueType: "number",
      expectedUnit: fertilizers.units.quantity.default[0] || null,
      dimensions: [yearDimension],
      aliases: [fertilizer, "engrais"],
    })
  ),
  ...fertilizers.keys.map(
    (fertilizer): AIFieldCatalogEntry => ({
      datasetKey: "fertilizers",
      id: `afat.fertilizers.tenure.${fertilizer}`,
      fieldPath: `afat.fertilizers.dataSet.tenure.${fertilizer}.value`,
      label: `Teneur en nutriments de ${labelFor(fertilizer)}`,
      description: `Part de nutriments contenue dans ${labelFor(fertilizer)}.`,
      valueType: "number",
      expectedUnit: fertilizers.units.tenure.default[0] || null,
      dimensions: [],
      aliases: [fertilizer, "tenure", "teneur", "part de nutriments"],
    })
  ),
] as const;

export const afatCatalog = createAIFieldCatalog(afatCatalogEntries);

export function getAfatDatasetFieldCatalog(datasetKey: AfatDatasetKey) {
  return afatCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}

export function resolveAfatAIField(id: string) {
  return afatCatalog.resolve(id);
}
