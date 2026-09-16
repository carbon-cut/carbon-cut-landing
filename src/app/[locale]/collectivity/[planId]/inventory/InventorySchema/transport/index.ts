import { z } from "zod";

import {
  constructUnit,
  createGroupSchema,
  createMatrixSchema,
  createRecordGridSchema,
  createRecordMatrixSchema,
  metadata,
  numberFutureOptionalSchema,
  requiredStringSchema,
} from "../_shared";
import { buses, port, territoryVehicles, urbanRail } from "./config";
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

const busesSchema = z.object({
  dataSet: z
    .array(
      z.object({
        name: requiredStringSchema,
        exploitation: createMatrixSchema(
          buses.exploitationRowKeys,
          {
            unitsByKeys: buses.units.exploitation,
          },
          true
        ),
        buses: createMatrixSchema(
          buses.fuelKeys,
          {
            unit: buses.units.buses.default,
          },
          true
        ),
        consumption: createMatrixSchema(
          buses.fuelKeys,
          {
            unitsByKeys: buses.units.consumption,
          },
          true
        ),
        spend: createMatrixSchema(
          buses.fuelKeys,
          {
            unit: buses.units.spend.default,
          },
          true
        ),
        renewal: createMatrixSchema(
          buses.renewalRowKeys,
          {
            unitsByKeys: buses.units.renewal,
          },
          true
        ),
        age: createMatrixSchema(
          buses.ageRowKeys,
          {
            unitsByKeys: buses.units.age,
          },
          true
        ),
        renewalFuture: z.object({
          value: numberFutureOptionalSchema,
          unit: constructUnit(buses.units.future.default),
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

const urbanRailSchema = z.object({
  dataSet: z.array(
    z.object({
      name: requiredStringSchema,
      operationsWithinMunicipalBoundary: z.boolean().refine((value) => value, {
        message: "Required",
      }),
      energy: createMatrixSchema(
        urbanRail.energyKeys,
        {
          unitsByKeys: urbanRail.units.energy,
        },
        true
      ),
      spend: createMatrixSchema(
        urbanRail.energyKeys,
        {
          unit: urbanRail.units.spend.default,
        },
        true
      ),
    })
  ),
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
  buses: busesSchema,
  urbanRail: urbanRailSchema,
  port: portSchema.optional(),
  territoryVehicles: territoryVehiclesSchema,
});

export { transportSchema };
