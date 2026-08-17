import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { buildings, fleet, publicLighting, treesParksWaste } from "./config";

export const municipalDatasetKeys = [
  "fleet",
  "publicLighting",
  "buildings",
  "treesParksWaste",
] as const;
export type MunicipalDatasetKey = (typeof municipalDatasetKeys)[number];

const year = { key: "year" } as const;

function yearField(
  entry: Omit<AIFieldCatalogEntry, "valueType" | "dimensions"> & {
    dimensions?: AIFieldCatalogEntry["dimensions"];
  }
) {
  return {
    ...entry,
    valueType: "number" as const,
    dimensions: [year, ...(entry.dimensions ?? [])],
  };
}

const municipalCatalogEntries = [
  yearField({
    datasetKey: "fleet",
    id: "municipal.fleet.vehicles",
    fieldPath: "municipal.fleet.dataSet.vehicles.{engine}.value",
    label: "Nombre annuel de véhicules municipaux",
    description: "Nombre de véhicules municipaux par motorisation.",
    expectedUnit: null,
    dimensions: [{ key: "engine", allowedValues: fleet.carEngineKeys }],
    aliases: ["flotte municipale", "parc automobile", "véhicules"],
  }),
  yearField({
    datasetKey: "fleet",
    id: "municipal.fleet.consumption",
    fieldPath: "municipal.fleet.dataSet.consumption.{fuel}.value",
    label: "Consommation annuelle de la flotte municipale",
    description: "Quantité annuelle de carburant ou d’électricité consommée par la flotte.",
    expectedUnit: null,
    unitByDimension: {
      fuel: Object.fromEntries(
        fleet.fuelKeys.map((fuel) => [fuel, fleet.units.consumption[fuel][0]])
      ),
    },
    dimensions: [{ key: "fuel", allowedValues: fleet.fuelKeys }],
    aliases: ["consommation flotte", "carburant", "énergie flotte"],
  }),
  yearField({
    datasetKey: "fleet",
    id: "municipal.fleet.spend",
    fieldPath: "municipal.fleet.dataSet.spend.{fuel}.value",
    label: "Dépense annuelle de la flotte municipale",
    description: "Montant annuel dépensé par énergie ou carburant pour la flotte.",
    expectedUnit: "currency",
    dimensions: [{ key: "fuel", allowedValues: fleet.fuelKeys }],
    aliases: ["dépense flotte", "facture carburant", "coût énergie"],
  }),
  yearField({
    datasetKey: "fleet",
    id: "municipal.fleet.composition",
    fieldPath: "municipal.fleet.dataSet.composition.{category}.{engine}.value",
    label: "Composition annuelle de la flotte municipale",
    description: "Nombre de véhicules par catégorie et motorisation.",
    expectedUnit: null,
    dimensions: [
      { key: "category", allowedValues: fleet.categoryKeys },
      { key: "engine", allowedValues: fleet.carEngineKeys },
    ],
    aliases: ["répartition flotte", "composition du parc"],
  }),
  ...publicLighting.yearlyKeys.map((metric) =>
    yearField({
      datasetKey: "publicLighting",
      id: `municipal.publicLighting.yearly.${metric}`,
      fieldPath: `municipal.publicLighting.dataSet.yearly.${metric}.value`,
      label:
        metric === "consumption"
          ? "Consommation annuelle d’électricité de l’éclairage public"
          : "Facture annuelle d’électricité de l’éclairage public",
      description:
        metric === "consumption"
          ? "Électricité consommée par le réseau municipal d’éclairage public."
          : "Montant annuel facturé pour l’électricité de l’éclairage public.",
      expectedUnit: publicLighting.units.yearly[metric][0] || null,
      aliases:
        metric === "consumption"
          ? ["consommation éclairage public", "consommation EP"]
          : ["facture éclairage public", "facture EP"],
    })
  ),
  yearField({
    datasetKey: "publicLighting",
    id: "municipal.publicLighting.infrastructure.count",
    fieldPath: "municipal.publicLighting.dataSet.infrastructure.{infrastructure}.value",
    label: "Équipements d’infrastructure d’éclairage public",
    description: "Nombre d’armoires, compteurs ou variateurs du réseau d’éclairage public.",
    expectedUnit: null,
    dimensions: [{ key: "infrastructure", allowedValues: ["cabinets", "meters", "dimmers"] }],
    aliases: ["armoires", "compteurs", "variateurs", "infrastructure éclairage public"],
  }),
  yearField({
    datasetKey: "publicLighting",
    id: "municipal.publicLighting.infrastructure.power",
    fieldPath: "municipal.publicLighting.dataSet.infrastructure.power.value",
    label: "Puissance installée de l’éclairage public",
    description: "Puissance du réseau municipal d’éclairage public.",
    expectedUnit: "kW",
    aliases: ["puissance éclairage public", "puissance EP"],
  }),
  ...publicLighting.lampCols.map((metric) =>
    yearField({
      datasetKey: "publicLighting",
      id: `municipal.publicLighting.lamps.${metric}`,
      fieldPath: `municipal.publicLighting.dataSet.lamps.{lampType}.${metric}.value`,
      label:
        metric === "unitPower"
          ? "Puissance unitaire des lampes d’éclairage public"
          : "Nombre de lampes d’éclairage public",
      description: "Valeur par type de lampe : SHP, HPL ou LED.",
      expectedUnit: publicLighting.units.lamps[metric][0] || null,
      dimensions: [{ key: "lampType", allowedValues: publicLighting.lampKeys }],
      aliases: [
        metric === "unitPower" ? "puissance lampe" : "points lumineux",
        "SHP",
        "HPL",
        "LED",
      ],
    })
  ),
  yearField({
    datasetKey: "buildings",
    id: "municipal.buildings.count",
    fieldPath: "municipal.buildings.dataSet.areas.building.value",
    label: "Nombre de bâtiments municipaux",
    description: "Nombre annuel de bâtiments du patrimoine municipal.",
    expectedUnit: null,
    aliases: ["bâtiments municipaux", "patrimoine bâti"],
  }),
  yearField({
    datasetKey: "buildings",
    id: "municipal.buildings.surface",
    fieldPath: "municipal.buildings.dataSet.areas.{surfaceType}.value",
    label: "Surface des bâtiments municipaux",
    description: "Surface ouverte ou couverte du patrimoine bâti municipal.",
    expectedUnit: "m²",
    dimensions: [{ key: "surfaceType", allowedValues: ["openSurface", "closedSurface"] }],
    aliases: ["surface ouverte", "surface couverte", "surface bâtiment"],
  }),
  yearField({
    datasetKey: "buildings",
    id: "municipal.buildings.energyConsumption",
    fieldPath: "municipal.buildings.dataSet.consumption.{energy}Consumption.value",
    label: "Consommation énergétique annuelle des bâtiments municipaux",
    description: "Consommation annuelle d’électricité, de gaz naturel ou de diesel des bâtiments.",
    expectedUnit: null,
    unitByDimension: { energy: { electricity: "kWh", gas: "Nm3", diesel: "L" } },
    dimensions: [{ key: "energy", allowedValues: ["electricity", "gas", "diesel"] }],
    aliases: ["consommation bâtiments", "électricité bâtiment", "gaz bâtiment", "diesel bâtiment"],
  }),
  yearField({
    datasetKey: "buildings",
    id: "municipal.buildings.energyBill",
    fieldPath: "municipal.buildings.dataSet.consumption.{energy}Bill.value",
    label: "Facture énergétique annuelle des bâtiments municipaux",
    description: "Montant annuel facturé pour l’énergie des bâtiments municipaux.",
    expectedUnit: "currency",
    dimensions: [{ key: "energy", allowedValues: ["electricity", "gas", "diesel"] }],
    aliases: ["facture bâtiments", "facture énergie", "dépense énergétique"],
  }),
  yearField({
    datasetKey: "treesParksWaste",
    id: "municipal.treesParksWaste.urbanTrees",
    fieldPath: "municipal.treesParksWaste.dataSet.urbanTrees.value",
    label: "Nombre annuel d’arbres urbains",
    description: "Nombre d’arbres urbains sur le périmètre municipal.",
    expectedUnit: null,
    aliases: ["arbres urbains", "arbres municipaux"],
  }),
  yearField({
    datasetKey: "treesParksWaste",
    id: "municipal.treesParksWaste.greenWaste",
    fieldPath: "municipal.treesParksWaste.dataSet.{destination}.value",
    label: "Quantité annuelle de déchets verts municipaux",
    description: "Déchets verts produits ou orientés vers une destination de traitement.",
    expectedUnit: "t",
    dimensions: [
      {
        key: "destination",
        allowedValues: treesParksWaste.yearlyKeys.filter((key) => key !== "urbanTrees"),
      },
    ],
    aliases: ["déchets verts", "compostage", "décharge"],
  }),
] as const;

export const municipalCatalog = createAIFieldCatalog(municipalCatalogEntries);
export function getMunicipalDatasetFieldCatalog(datasetKey: MunicipalDatasetKey) {
  return municipalCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}
export function resolveMunicipalAIField(id: string) {
  return municipalCatalog.resolve(id);
}
