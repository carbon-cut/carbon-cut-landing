import { createMatrixDefaults, createYearValueFieldDefaults } from "../_sharedDefaults";
import { electricity, naturalGas, photovoltaic, solarWaterHeating } from "./config";

export function energyDefault(years: readonly number[]) {
  return {
    electricity: {
      dataSet: {
        lt: {
          fixed: Object.fromEntries(
            Object.entries(electricity.lines.lt).map(([key, definition]) => [
              key,
              {
                sector: definition.sector,
                consumption: createYearValueFieldDefaults(
                  electricity.units.tensions.consumption,
                  years
                ),
                subscribers: createYearValueFieldDefaults(
                  electricity.units.tensions.subscribers,
                  years
                ),
              },
            ])
          ),
        },
        mt: {
          fixed: Object.fromEntries(
            Object.entries(electricity.lines.mt).map(([key, definition]) => [
              key,
              {
                sector: definition.sector,
                consumption: createYearValueFieldDefaults(
                  electricity.units.tensions.consumption,
                  years
                ),
                subscribers: createYearValueFieldDefaults(
                  electricity.units.tensions.subscribers,
                  years
                ),
              },
            ])
          ),
        },
        ht: {
          fixed: Object.fromEntries(
            Object.entries(electricity.lines.ht).map(([key, definition]) => [
              key,
              {
                sector: definition.sector,
                consumption: createYearValueFieldDefaults(
                  electricity.units.tensions.consumption,
                  years
                ),
                subscribers: createYearValueFieldDefaults(
                  electricity.units.tensions.subscribers,
                  years
                ),
              },
            ])
          ),
        },
      },
    },
    naturalGas: {
      dataSet: {
        lp: {
          fixed: Object.fromEntries(
            Object.entries(naturalGas.lines.lp).map(([key, definition]) => [
              key,
              {
                sector: definition.sector,
                consumption: createYearValueFieldDefaults(
                  naturalGas.units.tensions.consumption,
                  years
                ),
                subscribers: createYearValueFieldDefaults(
                  naturalGas.units.tensions.subscribers,
                  years
                ),
              },
            ])
          ),
        },
        mp: {
          fixed: Object.fromEntries(
            Object.entries(naturalGas.lines.mp).map(([key, definition]) => [
              key,
              {
                sector: definition.sector,
                consumption: createYearValueFieldDefaults(
                  naturalGas.units.tensions.consumption,
                  years
                ),
                subscribers: createYearValueFieldDefaults(
                  naturalGas.units.tensions.subscribers,
                  years
                ),
              },
            ])
          ),
        },
        hp: {
          fixed: Object.fromEntries(
            Object.entries(naturalGas.lines.hp).map(([key, definition]) => [
              key,
              {
                sector: definition.sector,
                consumption: createYearValueFieldDefaults(
                  naturalGas.units.tensions.consumption,
                  years
                ),
                subscribers: createYearValueFieldDefaults(
                  naturalGas.units.tensions.subscribers,
                  years
                ),
              },
            ])
          ),
        },
      },
    },
    photovoltaic: {
      dataSet: {
        bt: createMatrixDefaults(
          photovoltaic.btRowKeys,
          { unitsByKeys: photovoltaic.units.tension },
          years
        ),
        mt: createMatrixDefaults(
          photovoltaic.mtRowKeys,
          { unitsByKeys: photovoltaic.units.tension },
          years
        ),
      },
    },
    solarWaterHeating: {
      dataSet: {
        residential: createMatrixDefaults(
          solarWaterHeating.defaultRowKeys,
          { unitsByKeys: solarWaterHeating.units.default },
          years
        ),
        tertiary: createMatrixDefaults(
          solarWaterHeating.defaultRowKeys,
          { unitsByKeys: solarWaterHeating.units.default },
          years
        ),
        industrial: createMatrixDefaults(
          solarWaterHeating.defaultRowKeys,
          { unitsByKeys: solarWaterHeating.units.default },
          years
        ),
      },
    },
  };
}
