import { z } from "zod";

import {
  constructUnit,
  createGroupSchema,
  createMatrixSchema,
  createRecordMatrixSchema,
  datasetPlaceholderSchema,
  futureYearSchema,
  metadata,
  numberFutureSchema,
} from "../_shared";
import { port, publicTransport } from "./config";

const publicTransportSchema = z.object({
  dataSet: z.array(
    z.object({
      key: z.string(), // operator name
      exploitation: createMatrixSchema(publicTransport.exploitationRowKeys, {
        unitsByKeys: publicTransport.units.exploitation,
      }),
      renewal: createMatrixSchema(publicTransport.renewalRowKeys, {
        unitsByKeys: publicTransport.units.renewal,
      }),
      age: createMatrixSchema(publicTransport.ageRowKeys, {
        unitsByKeys: publicTransport.units.age,
      }),
      renewalFuture: z.object({
        value: numberFutureSchema,
        unit: constructUnit(publicTransport.units.future.default),
      }),
    })
  ),
  metadata,
});

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
  publicTransport: publicTransportSchema,
  airTransport: datasetPlaceholderSchema,
  port: portSchema,
  vehicleCounts: datasetPlaceholderSchema,
});

export { transportSchema };
