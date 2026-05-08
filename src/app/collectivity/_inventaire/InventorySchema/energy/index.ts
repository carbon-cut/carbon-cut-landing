import { z } from "zod";

import { createGroupSchema, createMatrixSchema, metadata } from "../_shared";
import { electricity, naturalGas, photovoltaic, solarWaterHeating } from "./config";

const electricitySchema = z.object({
  dataSet: z.object({
    lt: createMatrixSchema(electricity.rowKeys, { unitsByKeys: electricity.units.tensions }),
    mt: createMatrixSchema(electricity.rowKeys, { unitsByKeys: electricity.units.tensions }),
    ht: createMatrixSchema(electricity.rowKeys, { unitsByKeys: electricity.units.tensions }),
  }),
  metadata,
});

const photovoltaicSchema = z.object({
  dataSet: z.object({
    bt: createMatrixSchema(photovoltaic.btRowKeys, {
      unitsByKeys: photovoltaic.units.tension,
    }),
    mt: createMatrixSchema(photovoltaic.mtRowKeys, {
      unitsByKeys: photovoltaic.units.tension,
    }),
  }),
  metadata,
});

const naturalGasSchema = z.object({
  dataSet: z.object({
    bp: createMatrixSchema(naturalGas.rowKeys, { unitsByKeys: naturalGas.units.tensions }),
    mp: createMatrixSchema(naturalGas.rowKeys, { unitsByKeys: naturalGas.units.tensions }),
    hp: createMatrixSchema(naturalGas.rowKeys, { unitsByKeys: naturalGas.units.tensions }),
  }),
  metadata,
});

const solarWaterHeatingSchema = z.object({
  dataSet: z.object({
    residential: createMatrixSchema(solarWaterHeating.defaultRowKeys, {
      unitsByKeys: solarWaterHeating.units.default,
    }),
    tertiary: createMatrixSchema(solarWaterHeating.defaultRowKeys, {
      unitsByKeys: solarWaterHeating.units.default,
    }),
    industrial: createMatrixSchema(solarWaterHeating.defaultRowKeys, {
      unitsByKeys: solarWaterHeating.units.default,
    }),
  }),
  metadata,
});

const energySchema = createGroupSchema({
  electricity: electricitySchema,
  photovoltaic: photovoltaicSchema,
  naturalGas: naturalGasSchema,
  solarWaterHeating: solarWaterHeatingSchema,
});

export { energySchema };
