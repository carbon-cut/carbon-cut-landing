import { z } from "zod";

import {
  createGroupSchema,
  createGridSchema,
  datasetPlaceholderSchema,
  metadata,
  createRecordGridSchema,
} from "../_shared";
import { electricity } from "./config";

const electricitySchema = z.object({
  dataSet: z.object({
    lt: createRecordGridSchema(electricity.rowKeys, z.string().min(1, "Required"), {
      unitsByKeys: electricity.units.tensions,
    }),
    mt: createRecordGridSchema(electricity.rowKeys, z.string().min(1, "Required"), {
      unitsByKeys: electricity.units.tensions,
    }),
    ht: createRecordGridSchema(electricity.rowKeys, z.string().min(1, "Required"), {
      unitsByKeys: electricity.units.tensions,
    }),
  }),
  metadata,
});

const energySchema = createGroupSchema({
  electricity: electricitySchema,
  photovoltaic: datasetPlaceholderSchema,
  naturalGas: datasetPlaceholderSchema,
  solarWaterHeating: datasetPlaceholderSchema,
});

export { energySchema };
