import { z } from "zod";

import {union, carType} from "./utils";
import car from "./validation/cars";

const transport = z.object({
  hasCar: z.coerce.number().default(0),
  hasMoto: z.coerce.number().default(0),
  hasAir: z.coerce.boolean().default(false),
  hasSea: z.coerce.boolean().default(false),
  cars: z.array(
    car
  ),
  motos: z.array(
    z.object({
      motoMake: z.string().min(1),
      motoModel: z.string().min(1),
      motoType: carType,
      motoEngine: z.string(),
      motoConsumption: z.number(),
      motoCalculatedConsumption: z.number(),
      motoEConsmption: z.number(),
      motoLConsumption: z.number(),
      motoMoneyConsumption: z.number(),
      motoMoneyEConsumption: z.number(),
      motoDistanceConsumption: z.number(),
      motoMileage: z.number(),
      motoFuelPrise: z.number().optional(),
    }),
  ),
  auxilary: z.object({
    electricBike: z.number().default(0),
    electricScooter: z.number().default(0),
    //car: z.number().nullable(),
  }),
  airs: z.array(
    z.object({
      origin: z.string().nullable(),
      destination: z.string().nullable(),
      stopover: z.string().nullable(),
      carbonEmissions: z.number().nullable(),
      distance: z.number(),
      aircraftType: z
        .union([
          z.literal("A220"),
          z.literal("A319"),
          z.literal("A320"),
          z.literal("A321"),
          z.literal("A330"),
          z.literal("Boeing737"),
          z.literal("Boeing757"),
          z.literal("Boeing767"),
          z.literal("Boeing777"),
          z.literal("Boeing787"),
          z.literal("other"),
        ])
        .nullable(),
      class: z
        .union([
          z.literal("economy"),
          z.literal("premium"),
          z.literal("business"),
          z.literal("first"),
        ])
        .nullable(),
      roundTrip: z.boolean().default(false),
      flightPurpose: union("tourism", "business", "personal").nullable(),
      frequency: z.number().nullable(),
      familyMembers: z.number().nullable(),
    }),
  ),
  seas: z.array(
    z.object({
      distance: z.number().nullable(),
      frequency: z.number().nullable(),
      withCar: z.boolean().nullable(),
      people: z.number().nullable(),
      type: union("fluvial", "ferry", "cruise").nullable().default("ferry"),
      tripPurpose: union("tourism", "business", "personal").nullable(),
    }),
  ),
  commonTransport: z.object({
    shortDistances: z.object({
      bus: z.array(
        z.object({
          busType: union(
            "electric",
            "diesel",
            "gasoline",
            "hybrid",
            "naturalGaz",
          ),
          distance: z.number(),
          frequency: z.number(),
          nbPeople: z.number().nullable(),
        }),
      ),
      metro: z.array(
        z.object({
          distance: z.number(),
          frequency: z.number(),
          nbPeople: z.number().nullable(),
        }),
      ),
      tramway: z.array(
        z.object({
          distance: z.number(),
          frequency: z.number(),
        }),
      ),
      covoiturage: z.array(
        z.object({
          make: z.string(),
          engine: carType.optional(),
          distance: z.number(),
          pepole: z.number(),
          frequency: z.number(),
        }),
      ),
    }),
    longueDistances: z.object({
      bus: z.array(
        z
          .object({
            busType: union("other", "diesel",),
            distance: z.number(),
            frequency: z.number(),
            nbPeople: z.number().nullable(),
          })
          .nullable(),
      ),
      train: z.array(
        z
          .object({
            distance: z.number(),
            frequency: z.number(),
            type: union("intercity", "TER", "TGV"),
            nbPeople: z.number().nullable(),
          })
          .nullable(),
      ),
      covoiturage: z.array(
        z
          .object({
            make: z.string(),
            engine: carType,
            distance: z.number(),
            pepole: z.number(),
            frequency: z.number(),
          })
          .nullable(),
      ),
    }),
  }),
});

export {transport}