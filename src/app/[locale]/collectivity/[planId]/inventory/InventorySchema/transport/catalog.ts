import { createAIFieldCatalog, type AIFieldCatalogEntry } from "../_shared";
import { airTransport, port, publicTransport, territoryVehicles } from "./config";

export const transportDatasetKeys = [
  "publicTransport",
  "airTransport",
  "port",
  "territoryVehicles",
] as const;
export type TransportDatasetKey = (typeof transportDatasetKeys)[number];

const yearDimension = { key: "year" } as const;
const recordDimension = { key: "recordIndex" } as const;
const labels: Record<string, string> = {
  kmTravelled: "Kilométrage annuel parcouru",
  staff: "Nombre de salariés",
  passengerKm: "Voyageurs-kilomètres annuels",
  passengers: "Nombre annuel de voyageurs",
  scrapped: "Nombre de véhicules réformés",
  purchased: "Nombre de véhicules achetés",
  purchaseCost: "Coût d’achat des véhicules",
  age0to5: "Véhicules âgés de 0 à 5 ans",
  age6to10: "Véhicules âgés de 6 à 10 ans",
  age10plus: "Véhicules âgés de plus de 10 ans",
  electricityConsumption: "Consommation électrique annuelle",
  electricityBill: "Facture annuelle d’électricité",
  fuelConsumption: "Consommation annuelle de carburant",
  buildingElectricity: "Consommation électrique des bâtiments",
  electricFleet: "Consommation électrique de la flotte",
  vehicles: "Nombre de véhicules",
  avgConsumption: "Consommation moyenne",
  avgMileage: "Kilométrage moyen annuel",
};

function labelFor(key: string) {
  return labels[key] ?? key;
}

function createPublicTransportMetricFields(
  group: string,
  keys: readonly string[],
  unitFor: (key: string) => string
) {
  return keys.map(
    (key): AIFieldCatalogEntry => ({
      datasetKey: "publicTransport",
      id: `transport.publicTransport.${group}.${key}`,
      fieldPath: `transport.publicTransport.dataSet.{recordIndex}.${group}.${key}.value`,
      label: `${labelFor(key)} du réseau de transport public`,
      description: `${labelFor(key)} pour un opérateur ou réseau de transport public.`,
      valueType: "number",
      expectedUnit: unitFor(key) || null,
      dimensions: [yearDimension, recordDimension],
      aliases: [key, "transport public", "opérateur"],
    })
  );
}

const transportCatalogEntries = [
  {
    datasetKey: "publicTransport",
    id: "transport.publicTransport.operator.name",
    fieldPath: "transport.publicTransport.dataSet.{recordIndex}.name",
    label: "Nom de l’opérateur de transport public",
    description:
      "Nom de l’opérateur ou du réseau auquel appartiennent les données de transport public.",
    valueType: "string",
    expectedUnit: null,
    dimensions: [recordDimension],
    aliases: ["opérateur", "réseau", "société de transport"],
  } satisfies AIFieldCatalogEntry,
  ...createPublicTransportMetricFields(
    "exploitation",
    publicTransport.exploitationRowKeys,
    (key) => publicTransport.units.exploitation[key][0]
  ),
  ...createPublicTransportMetricFields(
    "buses",
    publicTransport.fuelKeys,
    () => publicTransport.units.buses.default[0]
  ),
  ...createPublicTransportMetricFields(
    "consumption",
    publicTransport.fuelKeys,
    (key) => publicTransport.units.consumption[key][0]
  ),
  ...createPublicTransportMetricFields(
    "spend",
    publicTransport.fuelKeys,
    () => publicTransport.units.spend.default[0]
  ),
  ...createPublicTransportMetricFields(
    "renewal",
    publicTransport.renewalRowKeys,
    (key) => publicTransport.units.renewal[key][0]
  ),
  ...createPublicTransportMetricFields(
    "age",
    publicTransport.ageRowKeys,
    (key) => publicTransport.units.age[key][0]
  ),
  {
    datasetKey: "publicTransport",
    id: "transport.publicTransport.renewalFuture",
    fieldPath: "transport.publicTransport.dataSet.{recordIndex}.renewalFuture.value",
    label: "Renouvellement futur du parc de transport public",
    description: "Nombre prévu de véhicules renouvelés pour une année future.",
    valueType: "number",
    expectedUnit: publicTransport.units.future.default[0] || null,
    dimensions: [recordDimension, { key: "futureYear" }],
    aliases: ["renouvellement futur", "prévision de renouvellement"],
  } satisfies AIFieldCatalogEntry,
  ...port.fuelKeys.map(
    (fuel): AIFieldCatalogEntry => ({
      datasetKey: "port",
      id: `transport.port.fuelConsumption.${fuel}`,
      fieldPath: `transport.port.dataSet.fuelConsumption.${fuel}.value`,
      label: `Consommation annuelle du port — ${fuel}`,
      description: `Quantité annuelle de ${fuel} consommée par les activités portuaires.`,
      valueType: "number",
      expectedUnit: port.units.fuelConsumption[fuel][0] || null,
      dimensions: [yearDimension],
      aliases: [`consommation port ${fuel}`, `carburant port ${fuel}`],
    })
  ),
  ...port.electricityKeys.map(
    (key): AIFieldCatalogEntry => ({
      datasetKey: "port",
      id: `transport.port.electricity.${key}`,
      fieldPath: `transport.port.dataSet.electricityConsumption.${key}.value`,
      label: `${labelFor(key)} du port`,
      description: `${labelFor(key)} pour les activités portuaires.`,
      valueType: "number",
      expectedUnit: port.units.electricityConsumption[key][0] || null,
      dimensions: [yearDimension],
      aliases: [key, "électricité portuaire"],
    })
  ),
  ...airTransport.movementColumnKeys.map(
    (movementType): AIFieldCatalogEntry => ({
      datasetKey: "airTransport",
      id: `transport.airTransport.movements.${movementType}`,
      fieldPath: `transport.airTransport.dataSet.movements.{movementKey}.${movementType}.value`,
      label: `Mouvements aériens ${movementType === "national" ? "nationaux" : movementType}`,
      description:
        "Nombre annuel de mouvements aériens pour un aéroport ou une catégorie de trafic.",
      valueType: "number",
      expectedUnit: airTransport.units.movements.default[0] || null,
      dimensions: [yearDimension, { key: "movementKey" }],
      aliases: ["mouvements aériens", "vols", movementType],
    })
  ),
  ...airTransport.energyKeys.map(
    (key): AIFieldCatalogEntry => ({
      datasetKey: "airTransport",
      id: `transport.airTransport.energy.${key}`,
      fieldPath: `transport.airTransport.dataSet.energy.${key}.value`,
      label: `${labelFor(key)} de l’aéroport`,
      description: `${labelFor(key)} pour les activités aéroportuaires.`,
      valueType: "number",
      expectedUnit: airTransport.units.energy[key][0] || null,
      dimensions: [yearDimension],
      aliases: [key, "énergie aéroport"],
    })
  ),
  ...territoryVehicles.measureKeys.map(
    (measure): AIFieldCatalogEntry => ({
      datasetKey: "territoryVehicles",
      id: `transport.territoryVehicles.${measure}`,
      fieldPath: `transport.territoryVehicles.dataSet.rows.{recordIndex}.value.${measure}.value`,
      label: `${labelFor(measure)} des véhicules du territoire`,
      description: `${labelFor(measure)} par type de véhicule et carburant sur le territoire.`,
      valueType: "number",
      expectedUnit:
        measure === "avgConsumption"
          ? Object.values(territoryVehicles.consumptionUnitByFuel)
          : territoryVehicles.units.measures[measure][0] || null,
      dimensions: [
        yearDimension,
        recordDimension,
        {
          key: "vehicleType",
          allowedValues: Object.keys(territoryVehicles.allowedFuelsByType),
        },
        { key: "fuel", allowedValues: territoryVehicles.fuelKeys },
      ],
      aliases: [measure, "véhicules territoire", "mobilité"],
    })
  ),
] as const;

export const transportCatalog = createAIFieldCatalog(transportCatalogEntries);

export function getTransportDatasetFieldCatalog(datasetKey: TransportDatasetKey) {
  return transportCatalog.fields.filter((field) => field.datasetKey === datasetKey);
}

export function resolveTransportAIField(id: string) {
  return transportCatalog.resolve(id);
}
