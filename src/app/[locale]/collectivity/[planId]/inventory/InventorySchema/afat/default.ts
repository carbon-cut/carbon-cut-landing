import {
  createMatrixDefaults,
  createScalarValueDefaults,
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
          count: createYearValueFieldDefaults([""], years),
        },
      },
    },
    livestock: {
      dataSet: {
        count: createMatrixDefaults(livestock.keys, { unit: livestock.units.count.default }, years),
        confinedTimeShare: Object.fromEntries(
          livestock.keys.map((key) => [
            key,
            createScalarValueDefaults(livestock.units.confinedTimeShare.default),
          ])
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
