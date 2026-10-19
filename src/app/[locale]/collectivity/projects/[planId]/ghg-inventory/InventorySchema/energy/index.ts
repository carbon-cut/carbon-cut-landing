import { z } from "zod";

import { createGroupSchema, createMatrixSchema, metadata } from "../_shared";
import { electricity, naturalGas, photovoltaic, solarWaterHeating } from "./config";
import { createStationaryEnergyBlockSchema } from "./stationary-energy";
export { energyDefault } from "./default";

const electricitySchema = z.object({
  dataSet: z.object({
    lt: createStationaryEnergyBlockSchema({
      fixedLines: electricity.lines.lt,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
    mt: createStationaryEnergyBlockSchema({
      fixedLines: electricity.lines.mt,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
    ht: createStationaryEnergyBlockSchema({
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

const naturalGasSchema = z.object({
  dataSet: z.object({
    lp: createStationaryEnergyBlockSchema({
      fixedLines: naturalGas.lines.lp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
    mp: createStationaryEnergyBlockSchema({
      fixedLines: naturalGas.lines.mp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
    hp: createStationaryEnergyBlockSchema({
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

const photovoltaicSchema = z.object({
  dataSet: z.object({
    bt: createMatrixSchema(
      photovoltaic.btRowKeys,
      { unitsByKeys: photovoltaic.units.tension },
      true
    ),
    mt: createMatrixSchema(
      photovoltaic.mtRowKeys,
      { unitsByKeys: photovoltaic.units.tension },
      true
    ),
  }),
  metadata,
});

const solarWaterHeatingSchema = z.object({
  dataSet: z.object({
    residential: createMatrixSchema(
      solarWaterHeating.defaultRowKeys,
      { unitsByKeys: solarWaterHeating.units.default },
      true
    ),
    tertiary: createMatrixSchema(
      solarWaterHeating.defaultRowKeys,
      { unitsByKeys: solarWaterHeating.units.default },
      true
    ),
    industrial: createMatrixSchema(
      solarWaterHeating.defaultRowKeys,
      { unitsByKeys: solarWaterHeating.units.default },
      true
    ),
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
