import { z } from "zod";

import {
  constructUnit,
  createGridSchema,
  createGroupSchema,
  createMatrixSchema,
  createRecordGridSchema,
  createRecordMatrixSchema,
  metadata,
} from "../_shared";
import { agriculturalProduction, fertilizers, livestock, perennialPlantationStock } from "./config";

const perennialPlantationStockSchema = z.object({
  dataSet: createRecordGridSchema(
    perennialPlantationStock.metricKeys,
    z.enum(perennialPlantationStock.plantOptions),
    {
      unitsByKeys: perennialPlantationStock.units.metrics,
    }
  ),
  metadata,
});

const livestockSchema = z.object({
  dataSet: z.object({
    headcount: createMatrixSchema(livestock.rowKeys, {
      unit: livestock.units.headcount.default,
    }),
    confinedTimeShare: z.object(
      Object.fromEntries(
        livestock.rowKeys.map((key) => [
          key,
          z
            .object({
              value: z.coerce.number().min(0).max(100).optional(),
              unit: constructUnit(livestock.units.confinedTimeShare.default),
            })
            .optional(),
        ])
      )
    ),
  }),
  metadata,
});

const fertilizersSchema = z.object({
  dataSet: createRecordMatrixSchema(z.string(), {
    unit: fertilizers.units.default,
  }),
  metadata,
});

const agriculturalProductionSchema = z.object({
  dataSet: createRecordGridSchema(agriculturalProduction.measureKeys, z.string(), {
    unitsByKeys: agriculturalProduction.units.measures,
  }),
  metadata,
});

const afatSchema = createGroupSchema({
  perennialPlantationStock: perennialPlantationStockSchema,
  livestock: livestockSchema,
  fertilizers: fertilizersSchema,
  agriculturalProduction: agriculturalProductionSchema,
});

export { afatSchema };
