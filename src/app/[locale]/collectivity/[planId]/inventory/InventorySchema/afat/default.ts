import { createMatrixDefaults, createYearValueFieldDefaults } from "../_sharedDefaults";
import { fertilizers, livestock } from "./config";

export function afatDefault(years: readonly number[]) {
  return {
    trees: {
      trackedTreeCrops: {
        dataSet: [],
      },
      fruitTrees: {
        dataSet: {
          count: createYearValueFieldDefaults([""], years),
        },
      },
    },
    livestock: {
      dataSet: {
        count: createMatrixDefaults(livestock.keys, { unit: livestock.units.count.default }, years),
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
