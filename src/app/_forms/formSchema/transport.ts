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
    })
  ).optional(),
  auxilary: z.object({
    electricBike: z.number().default(0),
    electricScooter: z.number().default(0),
    //car: z.number().nullable(),
  }),
  airs: z.array(
    z.object({
      origin: z.string(required),
      destination: z.string(required),
      stopover: z.string().nullable(),
      carbonEmissions: z.number().nullable(),
      distance: z.number(),
      aircraftType: 
        union(
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
          "other",
        ),
      class: union(
          "economy",
          "premium",
          "business",
          "first",
        )
        .nullable(),
      roundTrip: z.boolean().default(false),
      flightPurpose: union("tourism", "business", "personal").nullable(),
      frequency: z.number().nullable(),
      familyMembers: z.number().nullable(),
    })
  ).optional(),
  /* seas: z.array(
    z.object({
      distance: z.number().nullable(),
      frequency: z.number().nullable(),
      withCar: z.boolean().nullable(),
      people: z.number().nullable(),
      type: union("fluvial", "ferry", "cruise").nullable().default("ferry"),
      tripPurpose: union("tourism", "business", "personal").nullable(),
    })
  ), */
  commonTransport: z.object({
    shortDistances: z.object({
      bus: z.array(
        z.object({
          busType: union(
            "electric",
            "diesel",
            "gasoline",
            "hybrid",
            "naturalGaz"
          ),
          distance: z.number(required),
          frequency: z.number(required),
          nbPeople: z.number().nullable(),
        })
      ),
      metro: z.array(
        z.object({
          distance: z.number(required),
          frequency: z.number(required),
          nbPeople: z.number().nullable(),
        })
      ),
      covoiturage: z.array(
        z.object({
          make: z.string().optional().nullable(),
          engine: carType,
          distance: z.number({
            errorMap: () => ({ message: "Required" }),
          }),
          people: z.number().nullable(),
          frequency: z.number({
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
            distance: z.number(required),
            frequency: z.number(required),
            nbPeople: z.number().nullable(),
          })
          .nullable()
      ),
      train: z.array(
        z
          .object({
            distance: z.number(required),
            frequency: z.number(required),
            type: union("intercity", "TER", "TGV"),
            nbPeople: z.number().nullable(),
          })
          .nullable()
      ),
      covoiturage: z.array(
        z.object({
          make: z.string().optional().nullable(),
          engine: carType,
          distance: z.number(required),
          people: z.number().nullable(),
          frequency: z.number(required),
        })
      ),
    }),
  }),
});

export { transport };
