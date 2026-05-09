import { z } from "zod";

import {
  createGroupSchema,
  createMatrixSchema,
  createRecordMatrixSchema,
  datasetPlaceholderSchema,
  metadata,
} from "../_shared";
import { port } from "./config";

const portSchema = z.object({
  dataSet: z.object({
    vesselCount: createRecordMatrixSchema(z.string(), { unit: port.units.vesselCount.default }),
    fuelConsumption: createRecordMatrixSchema(z.string(), {
      unit: port.units.fuelConsumption.default,
    }),
  }),
  metadata,
});

const transportSchema = createGroupSchema({
  publicTransport: datasetPlaceholderSchema,
  airTransport: datasetPlaceholderSchema,
  port: portSchema,
  vehicleCounts: datasetPlaceholderSchema,
});

export { transportSchema };
