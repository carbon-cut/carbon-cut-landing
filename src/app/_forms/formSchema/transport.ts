import { z } from "zod";

import { union, carType } from "./utils";
import car from "./validation/cars";

const required = {
  errorMap: () => ({ message: "Required" }),
} as const;

const transport = z.object({
  hasCar: z.coerce.number().default(0),
  hasMoto: z.coerce.number().default(0),
  hasAir: z.coerce.boolean(),
  hasSea: z.coerce.boolean().default(false),
  cars: z.array(car).optional(),
  motos: z
    .array(
      z.object({
        motoMake: z.string().min(1),
        motoModel: z.string().min(1),
        motoType: carType,
        motoEngine: z.string(),
        motoConsumption: z.coerce.number(),
        motoCalculatedConsumption: z.coerce.number(),
        motoEConsmption: z.coerce.number(),
        motoLConsumption: z.coerce.number(),
        motoMoneyConsumption: z.coerce.number(),
        motoMoneyEConsumption: z.coerce.number(),
        motoDistanceConsumption: z.coerce.number(),
        motoMileage: z.coerce.number(),
        motoFuelPrise: z.coerce.number().optional(),
      })
    )
    .optional(),
  auxilary: z.object({
    electricBike: z.coerce.number().default(0),
    electricScooter: z.coerce.number().default(0),
    //car: z.coerce.number().nullable(),
  }),
  airs: z
    .array(
      z.object({
        origin: z.string(required),
        destination: z.string(required),
        stopover: z.string().nullable(),
        carbonEmissions: z.coerce.number().nullable(),
        distance: z.coerce.number(),
        aircraftType: union(
          "A220",
          "A319",
          "A320",
          "A321",
          "A330",
          "Boeing737",
          "Boeing757",
          "Boeing767",
          "Boeing777",
          "Boeing787",
          "other"
        ),
        class: union("economy", "premium", "business", "first").nullable(),
        roundTrip: z.boolean().default(false),
        flightPurpose: union("tourism", "business", "personal").nullable(),
        frequency: z.coerce.number().nullable(),
        familyMembers: z.coerce.number().nullable(),
      })
    )
    .optional(),
  /* seas: z.array(
    z.object({
      distance: z.coerce.number().nullable(),
      frequency: z.coerce.number().nullable(),
      withCar: z.boolean().nullable(),
      people: z.coerce.number().nullable(),
      type: union("fluvial", "ferry", "cruise").nullable().default("ferry"),
      tripPurpose: union("tourism", "business", "personal").nullable(),
    })
  ), */
  commonTransport: z.object({
    shortDistances: z.object({
      bus: z.array(
        z.object({
          busType: union("electric", "diesel", "gasoline", "hybrid", "naturalGaz"),
          distance: z.coerce.number(required),
          frequency: z.coerce.number(required),
          nbPeople: z.coerce.number().nullable(),
        })
      ),
      metro: z.array(
        z.object({
          distance: z.coerce.number(required),
          frequency: z.coerce.number(required),
          nbPeople: z.coerce.number().nullable(),
        })
      ),
      covoiturage: z.array(
        z.object({
          make: z.string().optional().nullable(),
          engine: carType,
          distance: z.coerce.number({
            errorMap: () => ({ message: "Required" }),
          }),
          people: z.coerce.number().nullable(),
          frequency: z.coerce.number({
            errorMap: () => ({ message: "Required" }),
          }),
        })
      ),
    }),
    longueDistances: z.object({
      bus: z.array(
        z
          .object({
            busType: union("other", "diesel"),
            distance: z.coerce.number(required),
            frequency: z.coerce.number(required),
            nbPeople: z.coerce.number().nullable(),
          })
          .nullable()
      ),
      train: z.array(
        z
          .object({
            distance: z.coerce.number(required),
            frequency: z.coerce.number(required),
            type: union("intercity", "TER", "TGV"),
            nbPeople: z.coerce.number().nullable(),
          })
          .nullable()
      ),
      covoiturage: z.array(
        z.object({
          make: z.string().optional().nullable(),
          engine: carType,
          distance: z.coerce.number(required),
          people: z.coerce.number().nullable(),
          frequency: z.coerce.number(required),
        })
      ),
    }),
  }),
});

export { transport };
