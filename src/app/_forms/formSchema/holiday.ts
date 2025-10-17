import { z } from "zod";
import { union, carType } from "./utils";

const holiday = z.object({
  general: z.object({
    frequency: z.number(),
    nbPeople: z.number(),
  }),
  transport: z.object({
    plane: z.boolean(),
    train: z.boolean(),
    bus: z.boolean(),
    car: z.boolean(),
    motorcycle: z.boolean(),
    ship: z.boolean(),
    other: z.boolean(),
    additional: z.object({
      car: z.object({ index: z.string(), distance: z.number() }),
      moto: z.object({ index: z.string(), distance: z.number() }),
      bus: z.array(
        z
          .object({
            busType: union("electric", "diesel", "hybrid", "naturalGaz"),
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
            nbPeople: z.number(),
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
  housing: z.object({
    type: z.object({
      hotel: z.boolean(),
      ecoHotel: z.boolean(),
      camping: z.boolean(),
      rent: z.boolean(),
      other: z.boolean(),
    }),
    specifics: z.record(
      union("hotel", "ecoHotel", "camping", "rent", "other"),
      z.object({
        nights: z.number(),
        renewable: z.boolean(),
        equipmints: z.object({
          airconditioner: z.boolean(),
          heating: z.boolean(),
          heatedPool: z.boolean(),
          spa: z.boolean(),
        }),
      }),
    ),
  }),
  food: z.object({
    frequency: z.number(),
    type: union("veg", "mix", "carnivore"),
    localProducts: z.boolean(),
    waste: union("weak", "moderate", "high"),
  }),
  activities: z.object({
    guidedTour: z.boolean(),
    nature: z.boolean(),
    mecSport: z.boolean(),
    vehicle: z.boolean(),
    shoping: z.boolean(),
    parc: z.boolean(),
    waterSport: z.boolean(),
    other: z.boolean(),
  }),
  shopping: z.object({
    localartisanal: z.boolean(),
    importedProducts: z.boolean(),
    Textiles: z.boolean(),
    electronics: z.boolean(),
  }),
  waste: z.object({
    tri: z.boolean(),
    disposable: z.boolean(),
  }),
  compensation: z.boolean(),
});

export { holiday };
