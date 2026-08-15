import { z } from "zod";

import {
  createFixedKeyRecordSchema,
  createGroupSchema,
  createMatrixSchema,
  createRecordGridSchemaByOptionalKeys,
  createScalarValueSchema,
  createYearValueSchema,
  constructUnit,
  metadata,
  numberByYearSchema,
  percentScalarSchema,
} from "../_shared";
import { fertilizers, livestock, trees } from "./config";
export { afatDefault } from "./default";

const treesSchema = createGroupSchema({
  trackedTreeCrops: z.object({
    dataSet: createRecordGridSchemaByOptionalKeys(
      trees.trackedTreeCropMetricKeys,
      z.enum(trees.trackedTreeCropOptions),
      {
        unitsByKeys: trees.units.metrics,
      },
      trees.trackedTreeCropOptionalMetricKeys,
      undefined,
      "treeType"
    ),
    metadata,
  }),
  fruitTrees: z.object({
    dataSet: z.object({
      count: createYearValueSchema([""]),
    }),
    metadata,
  }),
});

const livestockSchema = z.object({
  dataSet: z.object({
    count: z.record(
      z.string(),
      z.object({
        value: numberByYearSchema,
        unit: constructUnit(livestock.units.count.default),
      })
    ),
    confinedTimeShare: z.record(z.string(), percentScalarSchema),
  }),
  metadata,
});

const fertilizersSchema = z.object({
  dataSet: z.object({
    quantity: createMatrixSchema(
      fertilizers.keys,
      { unit: fertilizers.units.quantity.default },
      true
    ),
    tenure: createFixedKeyRecordSchema(fertilizers.keys, percentScalarSchema.shape),
  }),
  metadata,
});

const afatSchema = createGroupSchema({
  trees: treesSchema,
  livestock: livestockSchema,
  fertilizers: fertilizersSchema,
});

export { afatSchema };
