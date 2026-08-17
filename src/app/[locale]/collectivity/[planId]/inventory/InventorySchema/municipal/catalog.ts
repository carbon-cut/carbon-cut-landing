import { createAIFieldCatalog, type AIFieldCatalogEntry, type AIFieldDefinition } from "../_shared";
import { buildings, fleet, publicLighting, treesParksWaste } from "./config";

export const municipalDatasetKeys = [
  "fleet",
  "publicLighting",
  "buildings",
  "treesParksWaste",
] as const;

export type MunicipalDatasetKey = (typeof municipalDatasetKeys)[number];

const yearDimension = { key: "year" } as const;

function createYearValueField({
  datasetKey,
  id,
  fieldPath,
  label,
  description,
  expectedUnit,
  aliases,
  dimensions = [],
}: Omit<AIFieldCatalogEntry, "valueType" | "dimensions"> & {
  datasetKey: MunicipalDatasetKey;
  dimensions?: readonly AIFieldDefinition["dimensions"][number][];
}) {
  return {
    datasetKey,
    id,
    fieldPath,
    label,
    description,
    valueType: "number" as const,
    expectedUnit,
    dimensions: [yearDimension, ...dimensions],
    aliases,
  };
}

const fuelLabels = {
  petrol: "essence",
  diesel: "diesel",
  gpl: "GPL",
  electricity: "électricité",
  gnv: "GNV",
  hybrid: "hybride",
} as const;

const publicLightingLampLabels = {
  shp: "lampes sodium haute pression",
  hpl: "lampes mercure haute pression",
  led: "lampes LED",
} as const;

const municipalCatalogEntries = [
  ...fleet.carEngineKeys.map((engine) =>
    createYearValueField({
      datasetKey: "fleet",
      id: `municipal.fleet.vehicles.${engine}`,
      fieldPath: `municipal.fleet.dataSet.vehicles.${engine}.value`,
      label: `Nombre annuel de véhicules municipaux — ${fuelLabels[engine]}`,
      description: `Nombre de véhicules municipaux utilisant ${fuelLabels[engine]}.`,
      expectedUnit: fleet.units.vehicles.default[0] || null,
      aliases: [`véhicules ${fuelLabels[engine]}`, `flotte ${fuelLabels[engine]}`],
    })
  ),
  ...fleet.fuelKeys.map((fuel) =>
    createYearValueField({
      datasetKey: "fleet",
      id: `municipal.fleet.consumption.${fuel}`,
      fieldPath: `municipal.fleet.dataSet.consumption.${fuel}.value`,
      label: `Consommation annuelle de la flotte — ${fuelLabels[fuel]}`,
      description: `Quantité annuelle de ${fuelLabels[fuel]} consommée par la flotte municipale.`,
      expectedUnit: fleet.units.consumption[fuel][0] || null,
      aliases: [`consommation flotte ${fuelLabels[fuel]}`, `carburant ${fuelLabels[fuel]}`],
    })
  ),
  ...fleet.fuelKeys.map((fuel) =>
    createYearValueField({
      datasetKey: "fleet",
      id: `municipal.fleet.spend.${fuel}`,
      fieldPath: `municipal.fleet.dataSet.spend.${fuel}.value`,
      label: `Dépense annuelle de la flotte — ${fuelLabels[fuel]}`,
      description: `Montant annuel dépensé pour ${fuelLabels[fuel]} par la flotte municipale.`,
      expectedUnit: fleet.units.spend.default[0] || null,
      aliases: [`dépense flotte ${fuelLabels[fuel]}`, `facture ${fuelLabels[fuel]}`],
    })
  ),
  createYearValueField({
    datasetKey: "fleet",
    id: "municipal.fleet.composition",
    fieldPath: "municipal.fleet.dataSet.composition.{category}.{engine}.value",
    label: "Composition annuelle de la flotte municipale",
    description: "Nombre de véhicules par catégorie de flotte et type de motorisation.",
    expectedUnit: fleet.units.composition.default[0] || null,
    dimensions: [
      { key: "category", allowedValues: fleet.categoryKeys },
      { key: "engine", allowedValues: fleet.carEngineKeys },
    ],
    aliases: ["répartition flotte", "composition du parc", "parc automobile"],
  }),
  ...publicLighting.yearlyKeys.map((key) =>
    createYearValueField({
      datasetKey: "publicLighting",
      id: `municipal.publicLighting.yearly.${key}`,
      fieldPath: `municipal.publicLighting.dataSet.yearly.${key}.value`,
      label:
        key === "consumption"
          ? "Consommation annuelle d’électricité de l’éclairage public"
          : "Facture annuelle d’électricité de l’éclairage public",
      description:
        key === "consumption"
          ? "Électricité consommée annuellement par le réseau municipal d’éclairage public."
          : "Montant annuel facturé pour l’électricité du réseau municipal d’éclairage public.",
      expectedUnit: publicLighting.units.yearly[key][0] || null,
      aliases:
        key === "consumption"
          ? ["consommation éclairage public", "consommation EP"]
          : ["facture éclairage public", "facture EP"],
    })
  ),
  ...publicLighting.infrastructureKeys.map((key) => {
    const labels = {
      cabinets: "Nombre d’armoires d’éclairage public",
      meters: "Nombre de compteurs d’éclairage public",
      dimmers: "Nombre de variateurs d’éclairage public",
      power: "Puissance installée de l’éclairage public",
    } as const;

    return createYearValueField({
      datasetKey: "publicLighting",
      id: `municipal.publicLighting.infrastructure.${key}`,
      fieldPath: `municipal.publicLighting.dataSet.infrastructure.${key}.value`,
      label: labels[key],
      description: `${labels[key]} pour le réseau municipal.`,
      expectedUnit: publicLighting.units.infrastructure[key][0] || null,
      aliases: [key, "infrastructure éclairage public"],
    });
  }),
  ...publicLighting.lampKeys.flatMap((lamp) =>
    publicLighting.lampCols.map((metric) =>
      createYearValueField({
        datasetKey: "publicLighting",
        id: `municipal.publicLighting.lamps.${lamp}.${metric}`,
        fieldPath: `municipal.publicLighting.dataSet.lamps.${lamp}.${metric}.value`,
        label:
          metric === "unitPower"
            ? `Puissance unitaire des ${publicLightingLampLabels[lamp]}`
            : `Nombre de ${publicLightingLampLabels[lamp]}`,
        description:
          metric === "unitPower"
            ? "Puissance électrique d’une lampe de ce type."
            : "Nombre de lampes de ce type installées dans le réseau d’éclairage public.",
        expectedUnit: publicLighting.units.lamps[metric][0] || null,
        aliases: [publicLightingLampLabels[lamp], `${lamp} ${metric}`],
      })
    )
  ),
  ...buildings.areaKeys.map((key) => {
    const labels = {
      building: "Nombre de bâtiments municipaux",
      openSurface: "Surface ouverte des bâtiments municipaux",
      closedSurface: "Surface fermée des bâtiments municipaux",
    } as const;

    return createYearValueField({
      datasetKey: "buildings",
      id: `municipal.buildings.areas.${key}`,
      fieldPath: `municipal.buildings.dataSet.areas.${key}.value`,
      label: labels[key],
      description: `${labels[key]} sur le périmètre municipal.`,
      expectedUnit: buildings.units.areas[key][0] || null,
      aliases: [key, "patrimoine bâti municipal"],
    });
  }),
  ...buildings.consumptionKeys.map((key) => {
    const labels = {
      electricityConsumption: "Consommation électrique annuelle des bâtiments municipaux",
      electricityBill: "Facture électrique annuelle des bâtiments municipaux",
      gasConsumption: "Consommation annuelle de gaz des bâtiments municipaux",
      gasBill: "Facture annuelle de gaz des bâtiments municipaux",
      dieselConsumption: "Consommation annuelle de diesel des bâtiments municipaux",
      dieselBill: "Facture annuelle de diesel des bâtiments municipaux",
    } as const;

    return createYearValueField({
      datasetKey: "buildings",
      id: `municipal.buildings.consumption.${key}`,
      fieldPath: `municipal.buildings.dataSet.consumption.${key}.value`,
      label: labels[key],
      description: `${labels[key]} sur le périmètre municipal.`,
      expectedUnit: buildings.units.consumption[key][0] || null,
      aliases: [key, "consommation bâtiments municipaux"],
    });
  }),
  ...treesParksWaste.yearlyKeys.map((key) => {
    const labels = {
      urbanTrees: "Nombre d’arbres urbains municipaux",
      greenWaste: "Quantité annuelle de déchets verts municipaux",
      composting: "Quantité annuelle de déchets verts compostés",
      controlledLandfill: "Quantité annuelle de déchets verts en décharge contrôlée",
      uncontrolledLandfill: "Quantité annuelle de déchets verts en décharge non contrôlée",
    } as const;

    return createYearValueField({
      datasetKey: "treesParksWaste",
      id: `municipal.treesParksWaste.yearly.${key}`,
      fieldPath: `municipal.treesParksWaste.dataSet.${key}.value`,
      label: labels[key],
      description: `${labels[key]} sur le périmètre municipal.`,
      expectedUnit: treesParksWaste.units.yearly[key][0] || null,
      aliases: [key, "déchets verts", "espaces verts"],
    });
  }),
] as const;

export const municipalCatalog = createAIFieldCatalog(municipalCatalogEntries);

export function getMunicipalDatasetFieldCatalog(datasetKey: MunicipalDatasetKey) {
  return municipalCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}

export function resolveMunicipalAIField(id: string) {
  return municipalCatalog.resolve(id);
}
