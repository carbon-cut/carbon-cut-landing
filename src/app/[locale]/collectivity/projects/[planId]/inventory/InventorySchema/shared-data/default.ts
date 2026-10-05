import { createMatrixDefaults, createScalarValueDefaults } from "../_sharedDefaults";
import { sharedData } from "./config";

export function sharedDataDefault(years: readonly number[]) {
  return {
    population: {
      dataSet: createMatrixDefaults(
        sharedData.population.metricKeys,
        { unitsByKeys: sharedData.population.units.dataSet },
        years
      ),
    },
    householdEnergy: {
      assumptions: {
        consumptionNorm: createScalarValueDefaults(
          sharedData.householdEnergy.units.assumptions.consumptionNorm
        ),
      },
    },
  };
}
