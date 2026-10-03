import { z } from "zod";

import {
  createFixedKeyRecordSchema,
  createGroupSchema,
  createGridSchema,
  createMatrixSchema,
  createRecordGridSchemaByOptionalKeys,
  createYearValueSchema,
  metadata,
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
      treeCanopyArea: createYearValueSchema(["ha"]),
      count: createYearValueSchema([""], true),
    }),
    metadata,
  }),
});

const livestockSchema = z.object({
  dataSet: z.object({
    count: createMatrixSchema(livestock.keys, { unit: livestock.units.count.default }, true),
    manureManagementShares: createGridSchema(
      livestock.manureManagementAnimalKeys,
      livestock.manureManagementSystemKeys,
      { unit: livestock.units.manureManagementShares.default },
      true
    ).superRefine((shares, context) => {
      for (const animal of livestock.manureManagementAnimalKeys) {
        const sharesBySystem = shares[animal];
        const yearKeys = new Set(
          livestock.manureManagementSystemKeys.flatMap((system) =>
            Object.keys(sharesBySystem[system].value)
          )
        );

        for (const yearKey of yearKeys) {
          const year = yearKey as `y-${number}${number}${number}${number}`;
          const values = livestock.manureManagementSystemKeys.map(
            (system) => sharesBySystem[system].value[year] ?? 0
          );
          const total = values.reduce((sum, value) => sum + value, 0);
          const hasAnyShare = values.some((value) => value !== 0);

          if (!hasAnyShare || Math.abs(total - 100) < 1e-9) continue;

          for (const system of livestock.manureManagementSystemKeys) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: [animal, system, "value", year],
              message: "manureManagementSharesMustTotal100",
            });
          }
        }
      }
    }),
    poultryManureManagementShares: createGridSchema(
      livestock.poultryManureManagementAnimalKeys,
      livestock.poultryManureManagementSystemKeys,
      { unit: livestock.units.manureManagementShares.default },
      true
    ).superRefine((shares, context) => {
      for (const animal of livestock.poultryManureManagementAnimalKeys) {
        const sharesBySystem = shares[animal];
        const yearKeys = new Set(
          livestock.poultryManureManagementSystemKeys.flatMap((system) =>
            Object.keys(sharesBySystem[system].value)
          )
        );

        for (const yearKey of yearKeys) {
          const year = yearKey as `y-${number}${number}${number}${number}`;
          const values = livestock.poultryManureManagementSystemKeys.map(
            (system) => sharesBySystem[system].value[year] ?? 0
          );
          const total = values.reduce((sum, value) => sum + value, 0);
          const hasAnyShare = values.some((value) => value !== 0);

          if (!hasAnyShare || Math.abs(total - 100) < 1e-9) continue;

          for (const system of livestock.poultryManureManagementSystemKeys) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: [animal, system, "value", year],
              message: "manureManagementSharesMustTotal100",
            });
          }
        }
      }
    }),
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
