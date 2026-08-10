import { createMatrixDefaults } from "../_sharedDefaults";
import { airTransport, buildTerritoryVehicleDefaultRows, port } from "./config";

export function transportDefault(years: readonly number[]) {
  return {
    publicTransport: {
      dataSet: [],
    },
    airTransport: {
      dataSet: {
        movements: {},
        energy: createMatrixDefaults(
          airTransport.energyKeys,
          { unitsByKeys: airTransport.units.energy },
          years
        ),
      },
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
