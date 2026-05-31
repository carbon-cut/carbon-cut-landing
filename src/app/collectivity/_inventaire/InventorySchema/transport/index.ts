import { z } from "zod";

import {
  constructUnit,
  createGridSchema,
  createGroupSchema,
  createMatrixSchema,
  createRecordGridSchema,
  createRecordMatrixSchema,
  metadata,
  numberFutureSchema,
} from "../_shared";
import { airTransport, port, publicTransport, territoryVehicles } from "./config";

const publicTransportSchema = z.object({
  dataSet: z.array(
    z.object({
      key: z.string(), // operator name
      exploitation: createMatrixSchema(publicTransport.exploitationRowKeys, {
        unitsByKeys: publicTransport.units.exploitation,
      }),
      buses: createMatrixSchema(publicTransport.fuelKeys, {
        unit: publicTransport.units.buses.default,
      }),
      consumption: createMatrixSchema(publicTransport.fuelKeys, {
        unitsByKeys: publicTransport.units.consumption,
      }),
      spend: createMatrixSchema(publicTransport.fuelKeys, {
        unit: publicTransport.units.spend.default,
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
    concernedPorts: z.array(
      z.object({
        key: z.string(),
      })
    ),
    vesselCount: createRecordMatrixSchema(z.string(), { unit: port.units.vesselCount.default }),
    fuelConsumption: createRecordMatrixSchema(
      z.string(),
      {
        unitsByKeys: port.units.fuelConsumption,
      },
      z.enum(port.fuels)
    ),
  }),
  metadata,
});

const airTransportSchema = z.object({
  dataSet: z.object({
    movements: createGridSchema(airTransport.aircraftModelKeys, airTransport.movementColumnKeys, {
      unit: airTransport.units.movements.default,
    }),
    energy: createMatrixSchema(airTransport.energyKeys, {
      unitsByKeys: airTransport.units.energy,
    }),
  }),
  metadata,
});

const territoryVehiclesSchema = z.object({
  dataSet: z.object({
    rows: createRecordGridSchema(
      territoryVehicles.measureKeys,
      z.enum(territoryVehicles.vehicleTypeKeys),
      {
        unitsByKeys: territoryVehicles.units.measures,
      },
      {
        fuel: z.enum(territoryVehicles.fuelKeys),
      }
    ),
  }),
  metadata,
});

const transportSchema = createGroupSchema({
  publicTransport: publicTransportSchema,
  airTransport: airTransportSchema,
  port: portSchema,
  territoryVehicles: territoryVehiclesSchema,
});

export { transportSchema };
