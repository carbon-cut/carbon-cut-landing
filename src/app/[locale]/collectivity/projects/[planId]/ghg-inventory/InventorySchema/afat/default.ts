import {
  createGridDefaults,
  createMatrixDefaults,
  createYearValueFieldDefaults,
} from "../_sharedDefaults";
import { fertilizers, livestock } from "./config";

export function afatDefault(years: readonly number[]) {
  return {
    trees: {
      trackedTreeCrops: {
        dataSet: [],
      },
      fruitTrees: {
        dataSet: {
          treeCanopyArea: createYearValueFieldDefaults(["ha"], years),
          count: createYearValueFieldDefaults([""], years),
        },
      },
    },
    livestock: {
      dataSet: {
        count: createMatrixDefaults(livestock.keys, { unit: livestock.units.count.default }, years),
        manureManagementShares: createGridDefaults(
          livestock.manureManagementAnimalKeys,
          livestock.manureManagementSystemKeys,
          { unit: livestock.units.manureManagementShares.default },
          years
        ),
        poultryManureManagementShares: createGridDefaults(
          livestock.poultryManureManagementAnimalKeys,
          livestock.poultryManureManagementSystemKeys,
          { unit: livestock.units.manureManagementShares.default },
          years
        ),
      },
    },
    fertilizers: {
      dataSet: {
        quantity: createMatrixDefaults(
          fertilizers.keys,
          { unit: fertilizers.units.quantity.default },
          years
        ),
      },
    },
  };
}
