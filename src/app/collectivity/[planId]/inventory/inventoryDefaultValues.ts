import type { InventoryFormValues } from "./context/inventory-context";

function getRecord(value: unknown) {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

export function buildInventoryDefaultValues(inventoryInput?: Record<string, unknown> | null) {
  const defaults = {
    municipal: {
      fleet: {},
      publicLighting: {},
      buildings: {},
      treesParksWaste: {},
    },
    energy: {
      electricity: {},
      naturalGas: {},
    },
    transport: {
      publicTransport: {},
      airTransport: {},
      port: {},
      territoryVehicles: {},
    },
    afat: {
      perennialPlantationStock: {},
      livestock: {},
      fertilizers: {},
      agriculturalProduction: {},
    },
    wastewaterSanitation: {},
    waste: {},
    sharedData: {
      population: {},
      householdEnergy: {},
    },
  } as Partial<InventoryFormValues>;
  const input = getRecord(inventoryInput);

  return {
    municipal: {
      ...defaults.municipal,
      ...getRecord(input.municipal),
    },
    energy: {
      ...defaults.energy,
      ...getRecord(input.energy),
    },
    transport: {
      ...defaults.transport,
      ...getRecord(input.transport),
    },
    afat: {
      ...defaults.afat,
      ...getRecord(input.afat),
    },
    wastewaterSanitation: {
      ...defaults.wastewaterSanitation,
      ...getRecord(input.wastewaterSanitation),
    },
    waste: {
      ...defaults.waste,
      ...getRecord(input.waste),
    },
    sharedData: {
      ...defaults.sharedData,
      ...getRecord(input.sharedData),
    },
  } as Partial<InventoryFormValues>;
}
