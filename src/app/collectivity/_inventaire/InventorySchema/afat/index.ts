import { z } from "zod";

import {
  createGroupSchema,
  createRepeatableRowGroupSchema,
  datasetPlaceholderSchema,
} from "../_shared";

const perennialPlantationStockRowSchema = z.object({
  plantType: z.string(),
  customName: z.string(),
  values: z.record(z.string(), z.record(z.string(), z.string())),
});

const perennialPlantationStockSchema = createRepeatableRowGroupSchema(
  perennialPlantationStockRowSchema
);

const afatSchema = createGroupSchema({
  perennialPlantationStock: perennialPlantationStockSchema,
  livestock: datasetPlaceholderSchema,
  fertilizers: datasetPlaceholderSchema,
  agriculturalProduction: datasetPlaceholderSchema,
});

export { afatSchema };
