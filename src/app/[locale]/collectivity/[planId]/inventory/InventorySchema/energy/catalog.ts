import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { electricity, naturalGas } from "./config";
import { territorialEnergySectorValues } from "./territorial-energy";

export const energyDatasetKeys = ["electricity", "naturalGas"] as const;
export type EnergyDatasetKey = (typeof energyDatasetKeys)[number];

const yearDimension = { key: "year" } as const;
const sectorDimension = { key: "sector", allowedValues: territorialEnergySectorValues } as const;

const lineLabels: Record<string, string> = {
  domestic: "résidentiel",
  commercial: "commerce",
  administration: "administration",
  publicLighting: "éclairage public",
  agriculture: "agriculture",
  smallIndustry: "petite industrie",
  workshops: "ateliers",
  industries: "industrie",
  extractive: "industrie extractive",
  chemical: "industrie chimique",
  textile: "industrie textile",
  food: "industrie agroalimentaire",
  otherIndustries: "autres industries",
  pumping: "pompage",
  tourism: "tourisme",
  transportTelco: "transport et télécommunications",
  cement: "cimenterie",
  water: "eau",
  industrialZone: "zone industrielle",
  services: "services",
  powerPlant: "centrale électrique",
  industrialHub: "pôle industriel",
};

function createEnergyBlockFields({
  datasetKey,
  sourceLabel,
  tension,
  tensionLabel,
  lines,
  units,
}: {
  datasetKey: EnergyDatasetKey;
  sourceLabel: string;
  tension: string;
  tensionLabel: string;
  lines: Record<string, unknown>;
  units: Record<string, readonly [string, ...string[]]>;
}) {
  const metrics = [
    {
      key: "consumption",
      label: `Consommation annuelle de ${sourceLabel}`,
      description: `Quantité annuelle de ${sourceLabel} consommée par secteur.`,
      unit: units.consumption[0],
      aliases: ["consommation", sourceLabel],
    },
    {
      key: "subscribers",
      label: `Nombre d’abonnés ${sourceLabel}`,
      description: `Nombre annuel d’abonnés par secteur pour ${sourceLabel}.`,
      unit: units.subscribers[0],
      aliases: ["abonnés", "clients", sourceLabel],
    },
  ] as const;

  const fixed = Object.keys(lines).flatMap((line) =>
    metrics.map(
      ({ key, label, description, unit, aliases }): AIFieldCatalogEntry => ({
        datasetKey,
        id: `energy.${datasetKey}.${tension}.fixed.${line}.${key}`,
        fieldPath: `energy.${datasetKey}.dataSet.${tension}.fixed.${line}.${key}.value`,
        label: `${label} — ${lineLabels[line] ?? line} (${tensionLabel})`,
        description: `${description} Secteur : ${lineLabels[line] ?? line}; réseau ${tensionLabel}.`,
        valueType: "number",
        expectedUnit: unit || null,
        dimensions: [yearDimension],
        aliases: [...aliases, lineLabels[line] ?? line, tensionLabel],
      })
    )
  );

  const custom = metrics.map(
    ({ key, label, description, unit, aliases }): AIFieldCatalogEntry => ({
      datasetKey,
      id: `energy.${datasetKey}.${tension}.custom.${key}`,
      fieldPath: `energy.${datasetKey}.dataSet.${tension}.custom.{recordIndex}.${key}.value`,
      label: `${label} — secteur personnalisé (${tensionLabel})`,
      description: `${description} Ligne personnalisée avec son libellé et son secteur.`,
      valueType: "number",
      expectedUnit: unit || null,
      dimensions: [yearDimension, { key: "recordIndex" }, sectorDimension],
      aliases: [...aliases, "ligne personnalisée", tensionLabel],
    })
  );

  return [...fixed, ...custom];
}

const energyCatalogEntries = [
  ...(["lt", "mt", "ht"] as const).flatMap((tension) =>
    createEnergyBlockFields({
      datasetKey: "electricity",
      sourceLabel: "électricité",
      tension,
      tensionLabel: { lt: "basse tension", mt: "moyenne tension", ht: "haute tension" }[tension],
      lines: electricity.lines[tension],
      units: electricity.units.tensions,
    })
  ),
  ...(["lp", "mp", "hp"] as const).flatMap((tension) =>
    createEnergyBlockFields({
      datasetKey: "naturalGas",
      sourceLabel: "gaz naturel",
      tension,
      tensionLabel: { lp: "basse pression", mp: "moyenne pression", hp: "haute pression" }[tension],
      lines: naturalGas.lines[tension],
      units: naturalGas.units.tensions,
    })
  ),
] as const;

export const energyCatalog = createAIFieldCatalog(energyCatalogEntries);

export function getEnergyDatasetFieldCatalog(datasetKey: EnergyDatasetKey) {
  return energyCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}

export function resolveEnergyAIField(id: string) {
  return energyCatalog.resolve(id);
}
