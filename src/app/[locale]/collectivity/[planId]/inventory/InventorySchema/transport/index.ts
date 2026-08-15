import { z } from "zod";

import {
  constructUnit,
  createDynamicGridSchema,
  createGroupSchema,
  createMatrixSchema,
  createRecordGridSchema,
  createRecordMatrixSchema,
  metadata,
  numberFutureOptionalSchema,
  requiredStringSchema,
} from "../_shared";
import { airTransport, port, publicTransport, territoryVehicles } from "./config";
export { transportDefault } from "./default";

const territoryVehicleTypeKeys = Object.keys(territoryVehicles.allowedFuelsByType) as [
  keyof typeof territoryVehicles.allowedFuelsByType,
  ...(keyof typeof territoryVehicles.allowedFuelsByType)[],
];
const territoryVehicleFuelKeys = territoryVehicles.fuelKeys as [
  (typeof territoryVehicles.fuelKeys)[number],
  ...(typeof territoryVehicles.fuelKeys)[number][],
];
const territoryVehicleRequiredTypes = territoryVehicles.requiredDefaults.map(({ key }) => key) as [
  (typeof territoryVehicles.requiredDefaults)[number]["key"],
  ...(typeof territoryVehicles.requiredDefaults)[number]["key"][],
];

const publicTransportSchema = z.object({
  dataSet: z
    .array(
      z.object({
        name: requiredStringSchema,
        exploitation: createMatrixSchema(
          publicTransport.exploitationRowKeys,
          {
            unitsByKeys: publicTransport.units.exploitation,
          },
          true
        ),
        buses: createMatrixSchema(
          publicTransport.fuelKeys,
          {
            unit: publicTransport.units.buses.default,
          },
          true
        ),
        consumption: createMatrixSchema(
          publicTransport.fuelKeys,
          {
            unitsByKeys: publicTransport.units.consumption,
          },
          true
        ),
        spend: createMatrixSchema(
          publicTransport.fuelKeys,
          {
            unit: publicTransport.units.spend.default,
          },
          true
        ),
        renewal: createMatrixSchema(
          publicTransport.renewalRowKeys,
          {
            unitsByKeys: publicTransport.units.renewal,
          },
          true
        ),
        age: createMatrixSchema(
          publicTransport.ageRowKeys,
          {
            unitsByKeys: publicTransport.units.age,
          },
          true
        ),
        renewalFuture: z.object({
          value: numberFutureOptionalSchema,
          unit: constructUnit(publicTransport.units.future.default),
        }),
      })
    )
    .min(1, { message: "Required" }),
  metadata,
});

const portSchema = z.object({
  dataSet: z.object({
    fuelConsumption: createMatrixSchema(port.fuelKeys, {
      unitsByKeys: port.units.fuelConsumption,
    }),
    electricityConsumption: createMatrixSchema(
      port.electricityKeys,
      {
        unitsByKeys: port.units.electricityConsumption,
      },
      true
    ),
  }),
  metadata,
});

const airTransportSchema = z.object({
  dataSet: z.object({
    movements: createDynamicGridSchema(
      airTransport.movementColumnKeys,
      {
        unit: airTransport.units.movements.default,
      },
      true
    ),
    energy: createMatrixSchema(
      airTransport.energyKeys,
      {
        unitsByKeys: airTransport.units.energy,
      },
      true
    ),
  }),
  metadata,
});

const territoryVehiclesSchema = z.object({
  dataSet: z.object({
    rows: createRecordGridSchema(
      territoryVehicles.measureKeys,
      z.enum(territoryVehicleTypeKeys),
      {
        unitsByKeys: territoryVehicles.units.measures,
      },
      {
        fuel: z.enum(territoryVehicleFuelKeys),
      },
      "vehicleType"
    ).superRefine((rows, ctx) => {
      const availableTypes = new Set(rows.map((row) => row.vehicleType));

      for (const vehicleType of territoryVehicleRequiredTypes) {
        if (!availableTypes.has(vehicleType)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [],
            message: `Required: ${vehicleType}`,
          });
        }
      }
    }),
  }),
  metadata,
});

const transportSchema = createGroupSchema({
  publicTransport: publicTransportSchema,
  airTransport: airTransportSchema.optional(),
  port: portSchema.optional(),
  territoryVehicles: territoryVehiclesSchema,
});

export { transportSchema };
