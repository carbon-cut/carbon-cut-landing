import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { airTransport, port, publicTransport, territoryVehicles } from "./config";

export const transportDatasetKeys = [
  "publicTransport",
  "airTransport",
  "port",
  "territoryVehicles",
] as const;
export type TransportDatasetKey = (typeof transportDatasetKeys)[number];

const year = { key: "year" } as const;
const record = { key: "recordIndex" } as const;
const units = (values: readonly string[], source: Record<string, readonly [string, ...string[]]>) =>
  Object.fromEntries(values.map((value) => [value, source[value][0]]));

function publicTransportField(
  id: string,
  group: string,
  label: string,
  metrics: readonly string[],
  unitByMetric: Record<string, string | null>
) {
  return {
    datasetKey: "publicTransport",
    id: `transport.publicTransport.${id}`,
    fieldPath: `transport.publicTransport.dataSet.{recordIndex}.${group}.{metric}.value`,
    label,
    description: `${label} pour un opérateur de transport public.`,
    valueType: "number" as const,
    expectedUnit: null,
    unitByDimension: { metric: unitByMetric },
    dimensions: [year, record, { key: "metric", allowedValues: metrics }],
    aliases: ["transport public", "opérateur", label.toLowerCase()],
  };
}

const transportCatalogEntries = [
  {
    datasetKey: "publicTransport",
    id: "transport.publicTransport.operator.name",
    fieldPath: "transport.publicTransport.dataSet.{recordIndex}.name",
    label: "Nom de l’opérateur de transport public",
    description: "Nom du réseau ou de l’opérateur auquel appartiennent les données.",
    valueType: "string",
    expectedUnit: null,
    dimensions: [record],
    aliases: ["opérateur", "réseau", "société de transport"],
  },
  publicTransportField(
    "exploitation",
    "exploitation",
    "Données annuelles d’exploitation",
    publicTransport.exploitationRowKeys,
    units(publicTransport.exploitationRowKeys, publicTransport.units.exploitation)
  ),
  publicTransportField(
    "buses",
    "buses",
    "Nombre annuel de bus",
    publicTransport.fuelKeys,
    Object.fromEntries(publicTransport.fuelKeys.map((fuel) => [fuel, null]))
  ),
  publicTransportField(
    "consumption",
    "consumption",
    "Consommation annuelle des bus",
    publicTransport.fuelKeys,
    units(publicTransport.fuelKeys, publicTransport.units.consumption)
  ),
  publicTransportField(
    "spend",
    "spend",
    "Dépense annuelle des bus",
    publicTransport.fuelKeys,
    Object.fromEntries(publicTransport.fuelKeys.map((fuel) => [fuel, "currency"]))
  ),
  publicTransportField(
    "renewal",
    "renewal",
    "Renouvellement annuel du parc de bus",
    publicTransport.renewalRowKeys,
    units(publicTransport.renewalRowKeys, publicTransport.units.renewal)
  ),
  publicTransportField(
    "age",
    "age",
    "Répartition d’âge du parc de bus",
    publicTransport.ageRowKeys,
    units(publicTransport.ageRowKeys, publicTransport.units.age)
  ),
  {
    datasetKey: "publicTransport",
    id: "transport.publicTransport.renewalFuture",
    fieldPath: "transport.publicTransport.dataSet.{recordIndex}.renewalFuture.value",
    label: "Renouvellement futur du parc de transport public",
    description: "Nombre prévu de véhicules renouvelés pour une année future.",
    valueType: "number",
    expectedUnit: null,
    dimensions: [record, { key: "futureYear" }],
    aliases: ["renouvellement futur", "prévision de renouvellement"],
  },
  {
    datasetKey: "port",
    id: "transport.port.fuelConsumption",
    fieldPath: "transport.port.dataSet.fuelConsumption.{fuel}.value",
    label: "Consommation annuelle de carburant du port",
    description: "Quantité annuelle de carburant consommée par les activités portuaires.",
    valueType: "number",
    expectedUnit: null,
    unitByDimension: { fuel: units(port.fuelKeys, port.units.fuelConsumption) },
    dimensions: [year, { key: "fuel", allowedValues: port.fuelKeys }],
    aliases: ["consommation port", "carburant portuaire"],
  },
  ...port.electricityKeys.map((metric) => ({
    datasetKey: "port",
    id: `transport.port.electricity.${metric}`,
    fieldPath: `transport.port.dataSet.electricityConsumption.${metric}.value`,
    label:
      metric === "electricityConsumption"
        ? "Consommation électrique annuelle du port"
        : "Facture électrique annuelle du port",
    description: "Donnée énergétique annuelle des activités portuaires.",
    valueType: "number" as const,
    expectedUnit: port.units.electricityConsumption[metric][0] || null,
    dimensions: [year],
    aliases: ["électricité portuaire", metric],
  })),
  {
    datasetKey: "airTransport",
    id: "transport.airTransport.movements",
    fieldPath: "transport.airTransport.dataSet.movements.{aircraft}.national.value",
    label: "Mouvements aériens nationaux",
    description: "Nombre annuel de mouvements nationaux par type d’avion pris en charge.",
    valueType: "number",
    expectedUnit: null,
    dimensions: [year, { key: "aircraft" }],
    aliases: ["mouvements aériens", "vols nationaux", "avion"],
  },
  {
    datasetKey: "airTransport",
    id: "transport.airTransport.energy",
    fieldPath: "transport.airTransport.dataSet.energy.{metric}.value",
    label: "Consommation énergétique annuelle de l’aéroport",
    description: "Énergie consommée par les bâtiments, véhicules et activités aéroportuaires.",
    valueType: "number",
    expectedUnit: null,
    unitByDimension: { metric: units(airTransport.energyKeys, airTransport.units.energy) },
    dimensions: [year, { key: "metric", allowedValues: airTransport.energyKeys }],
    aliases: ["énergie aéroport", "kérosène", "flotte aéroportuaire"],
  },
  {
    datasetKey: "territoryVehicles",
    id: "transport.territoryVehicles",
    fieldPath: "transport.territoryVehicles.dataSet.rows.{recordIndex}.value.{metric}.value",
    label: "Données annuelles des véhicules du territoire",
    description:
      "Nombre, consommation moyenne ou kilométrage moyen par type de véhicule et carburant.",
    valueType: "number",
    expectedUnit: null,
    unitByDimension: {
      metric: {
        vehicles: null,
        avgConsumption: Object.values(territoryVehicles.consumptionUnitByFuel),
        avgMileage: territoryVehicles.units.measures.avgMileage[0],
      },
    },
    dimensions: [
      year,
      record,
      { key: "vehicleType", allowedValues: Object.keys(territoryVehicles.allowedFuelsByType) },
      { key: "fuel", allowedValues: territoryVehicles.fuelKeys },
      { key: "metric", allowedValues: territoryVehicles.measureKeys },
    ],
    aliases: ["véhicules territoire", "mobilité", "kilométrage", "consommation moyenne"],
  },
] as const satisfies readonly AIFieldCatalogEntry[];

export const transportCatalog = createAIFieldCatalog(transportCatalogEntries);
export function getTransportDatasetFieldCatalog(datasetKey: TransportDatasetKey) {
  return transportCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}
export function resolveTransportAIField(id: string) {
  return transportCatalog.resolve(id);
}
