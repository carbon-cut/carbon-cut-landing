import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { electricity, naturalGas } from "./config";
import { territorialEnergySectorValues } from "./territorial-energy";

export const energyDatasetKeys = ["electricity", "naturalGas"] as const;
export type EnergyDatasetKey = (typeof energyDatasetKeys)[number];

const year = { key: "year" } as const;
const tensions = {
  electricity: ["lt", "mt", "ht"],
  naturalGas: ["lp", "mp", "hp"],
} as const;

function energyFields(
  datasetKey: EnergyDatasetKey,
  sourceLabel: string,
  source: typeof electricity | typeof naturalGas
) {
  const tensionValues = tensions[datasetKey];
  const lineValues = Object.fromEntries(
    tensionValues.map((tension) => [
      tension,
      Object.keys(source.lines[tension as keyof typeof source.lines]),
    ])
  );
  return ["consumption", "subscribers"].map(
    (metric): AIFieldCatalogEntry => ({
      datasetKey,
      id: `energy.${datasetKey}.fixed.${metric}`,
      fieldPath: `energy.${datasetKey}.dataSet.{tension}.fixed.{line}.${metric}.value`,
      label:
        metric === "consumption"
          ? `Consommation annuelle de ${sourceLabel}`
          : `Nombre annuel d’abonnés ${sourceLabel}`,
      description: `${metric === "consumption" ? "Consommation" : "Nombre d’abonnés"} par niveau de réseau et secteur.`,
      valueType: "number",
      expectedUnit: metric === "consumption" ? source.units.tensions.consumption[0] : null,
      dimensions: [
        year,
        { key: "tension", allowedValues: tensionValues },
        { key: "line", allowedValues: [...new Set(Object.values(lineValues).flat())] },
      ],
      aliases: [sourceLabel, metric === "consumption" ? "consommation" : "abonnés", "secteur"],
    })
  );
}

const energyCatalogEntries = [
  ...energyFields("electricity", "électricité", electricity),
  ...energyFields("naturalGas", "gaz naturel", naturalGas),
  ...(["electricity", "naturalGas"] as const).flatMap((datasetKey) => {
    const source = datasetKey === "electricity" ? electricity : naturalGas;
    const sourceLabel = datasetKey === "electricity" ? "électricité" : "gaz naturel";
    return ["consumption", "subscribers"].map(
      (metric): AIFieldCatalogEntry => ({
        datasetKey,
        id: `energy.${datasetKey}.custom.${metric}`,
        fieldPath: `energy.${datasetKey}.dataSet.{tension}.custom.{recordIndex}.${metric}.value`,
        label:
          metric === "consumption"
            ? `Consommation annuelle de ${sourceLabel} — secteur personnalisé`
            : `Nombre d’abonnés ${sourceLabel} — secteur personnalisé`,
        description: "Valeur annuelle pour une ligne personnalisée avec libellé et secteur.",
        valueType: "number",
        expectedUnit: metric === "consumption" ? source.units.tensions.consumption[0] : null,
        dimensions: [
          year,
          { key: "tension", allowedValues: tensions[datasetKey] },
          { key: "recordIndex" },
          { key: "sector", allowedValues: territorialEnergySectorValues },
        ],
        aliases: [
          sourceLabel,
          "ligne personnalisée",
          metric === "consumption" ? "consommation" : "abonnés",
        ],
      })
    );
  }),
] as const;

export const energyCatalog = createAIFieldCatalog(energyCatalogEntries);
export function getEnergyDatasetFieldCatalog(datasetKey: EnergyDatasetKey) {
  return energyCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}
export function resolveEnergyAIField(id: string) {
  return energyCatalog.resolve(id);
}
