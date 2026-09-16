import { createMatrixDefaults } from "../_sharedDefaults";
import { buildTerritoryVehicleDefaultRows, port } from "./config";

export function transportDefault(years: readonly number[]) {
  return {
    buses: {
      dataSet: [],
    },
    urbanRail: {
      dataSet: [],
    },
    port: {
      dataSet: {
        fuelConsumption: createMatrixDefaults(
          port.fuelKeys,
          { unitsByKeys: port.units.fuelConsumption },
          years
        ),
        electricityConsumption: createMatrixDefaults(
          port.electricityKeys,
          { unitsByKeys: port.units.electricityConsumption },
          years
        ),
      },
    },
    territoryVehicles: {
      dataSet: {
        rows: buildTerritoryVehicleDefaultRows([], years),
      },
    },
  };
}
