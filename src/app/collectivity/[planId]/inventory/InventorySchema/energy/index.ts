import { z } from "zod";

import { createGroupSchema, createMatrixSchema, metadata } from "../_shared";
import { electricity, naturalGas, photovoltaic, solarWaterHeating } from "./config";
import { createTerritorialEnergyBlockSchema } from "./territorial-energy";

const electricitySchema = z.object({
  dataSet: z.object({
    lt: createTerritorialEnergyBlockSchema({
      fixedLines: electricity.lines.lt,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
    mt: createTerritorialEnergyBlockSchema({
      fixedLines: electricity.lines.mt,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
    ht: createTerritorialEnergyBlockSchema({
      fixedLines: electricity.lines.ht,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
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
    bp: createTerritorialEnergyBlockSchema({
      fixedLines: naturalGas.lines.bp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
    mp: createTerritorialEnergyBlockSchema({
      fixedLines: naturalGas.lines.mp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
    hp: createTerritorialEnergyBlockSchema({
      fixedLines: naturalGas.lines.hp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
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
  //photovoltaic: photovoltaicSchema,
  naturalGas: naturalGasSchema,
  //solarWaterHeating: solarWaterHeatingSchema,
});

export { energySchema };
