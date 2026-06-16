import type { InventoryFormValues } from "./context/inventory-context";

export function buildInventoryDefaultValues() {
  return {
    municipal: {
      fleet: {},
      publicLighting: {},
      buildings: {},
      treesParksWaste: {},
    },
    energy: {
      electricity: {},
      photovoltaic: {},
      naturalGas: {},
      solarWaterHeating: {},
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
  } satisfies Partial<InventoryFormValues>;
}
