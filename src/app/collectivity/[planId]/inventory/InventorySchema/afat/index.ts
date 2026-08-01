import { z } from "zod";

import {
  createFixedKeyRecordSchema,
  createGroupSchema,
  createRecordGridSchemaByOptionalKeys,
  createScalarValueSchema,
  createYearValueSchema,
  constructUnit,
  metadata,
  numberByYearSchema,
} from "../_shared";
import { fertilizers, livestock, trees } from "./config";

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
    confinedTimeShare: z.record(
      z.string(),
      z.object({
        value: z.coerce.number().min(0).max(100).optional(),
        unit: constructUnit(livestock.units.confinedTimeShare.default),
      })
    ),
  }),
  metadata,
});

const fertilizersSchema = z.object({
  dataSet: createFixedKeyRecordSchema(fertilizers.keys, {
    quantity: createYearValueSchema(fertilizers.units.quantity.default),
    tenure: createScalarValueSchema(
      fertilizers.units.tenure.default,
      true,
      z.coerce.number().min(0).max(100).optional()
    ),
  }),
  metadata,
});

const afatSchema = createGroupSchema({
  trees: treesSchema,
  livestock: livestockSchema,
  fertilizers: fertilizersSchema,
});

export { afatSchema };
