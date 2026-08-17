import { z } from "zod";

import {
  createFixedKeyRecordSchema,
  createGroupSchema,
  createMatrixSchema,
  createRecordGridSchemaByOptionalKeys,
  createScalarValueSchema,
  createYearValueSchema,
  metadata,
  percentScalarSchema,
} from "../_shared";
import { fertilizers, livestock, trees } from "./config";
export { afatDefault } from "./default";
export {
  afatCatalog,
  afatDatasetKeys,
  getAfatDatasetFieldCatalog,
  resolveAfatAIField,
  type AfatDatasetKey,
} from "./catalog";

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
    count: createMatrixSchema(livestock.keys, { unit: livestock.units.count.default }).strict(),
    confinedTimeShare: createFixedKeyRecordSchema(
      livestock.keys,
      percentScalarSchema.shape
    ).strict(),
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
