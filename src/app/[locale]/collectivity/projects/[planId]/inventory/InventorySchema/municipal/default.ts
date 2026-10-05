import { createGridDefaults, createMatrixDefaults } from "../_sharedDefaults";
import { buildings, fleet, publicLighting, treesParksWaste } from "./config";

export function municipalDefault(years: readonly number[]) {
  return {
    fleet: {
      dataSet: {
        vehicles: createMatrixDefaults(
          fleet.carEngineKeys,
          { unit: fleet.units.vehicles.default },
          years
        ),
        consumption: createMatrixDefaults(
          fleet.fuelKeys,
          { unitsByKeys: fleet.units.consumption },
          years
        ),
        spend: createMatrixDefaults(fleet.fuelKeys, { unit: fleet.units.spend.default }, years),
        composition: createGridDefaults(
          fleet.categoryKeys,
          fleet.carEngineKeys,
          { unit: fleet.units.composition.default },
          years
        ),
      },
    },
    publicLighting: {
      dataSet: {
        infrastructure: createMatrixDefaults(
          publicLighting.infrastructureKeys,
          { unitsByKeys: publicLighting.units.infrastructure },
          years
        ),
        lamps: createGridDefaults(
          publicLighting.lampKeys,
          publicLighting.lampCols,
          { unitsByCols: publicLighting.units.lamps },
          years
        ),
        yearly: createMatrixDefaults(
          publicLighting.yearlyKeys,
          { unitsByKeys: publicLighting.units.yearly },
          years
        ),
      },
    },
    buildings: {
      dataSet: {
        areas: createMatrixDefaults(
          buildings.areaKeys,
          { unitsByKeys: buildings.units.areas },
          years
        ),
        consumption: createMatrixDefaults(
          buildings.consumptionKeys,
          { unitsByKeys: buildings.units.consumption },
          years
        ),
      },
    },
    treesParksWaste: {
      dataSet: createMatrixDefaults(
        treesParksWaste.yearlyKeys,
        { unitsByKeys: treesParksWaste.units.yearly },
        years
      ),
    },
  };
}
