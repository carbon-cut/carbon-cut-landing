import {
  getDatasetCalculationReadinessPaths,
  validateDatasetCalculationReadiness,
} from "./datasets";

export function validateInventoryCalculationReadiness(datasetKey: string, values: unknown) {
  return validateDatasetCalculationReadiness(datasetKey, values);
}

export function getInventoryCalculationReadinessPaths(datasetKey: string, values: unknown) {
  return getDatasetCalculationReadinessPaths(datasetKey, values);
}
