import { z } from "zod";
import { union } from "./utils";
import {
  wasteGeneral,
  wasteOrganic,
  wasteRecycle,
  wastePaper,
  wasteGlass,
} from "./validation/waste";

const waste = z.object({
  general: z.object({
    waste: wasteGeneral,
  }),
  precise: z.object({
    recylablePackaging: wasteRecycle.nullable(),
    paper: wastePaper.nullable(),
    glass: wasteGlass.nullable(),
    organic: wasteOrganic.nullable(),
  }),

  details: z.object({
    wasteDestination: union(
      "incineration",
      "recycling",
      "landfilling",
      "composting",
      "biomethanation",
      "idk"
    ),
    personalCompost: z.boolean().default(false),
    hasBiodigest: z.boolean().default(false),
    biodigest: z.object({
      electric: z.object({
        amount: z.coerce.number(), // kWh
        frequencyUnit: union("month", "year"),
      }),
      biogas: z.object({
        amount: z.coerce.number(), // m3
        frequencyUnit: union("month", "year"),
      }),
    }).optional(),
  }),
  water: z.object({
    money: z.object({
      amount: z.coerce.number(), // euro
      frequencyUnit: union("month", "year"),
    }),
    wasteWater: z.object({
      amount: z.coerce.number(), // euro
      frequencyUnit: union("month", "year"),
    }),
    /*       index: z.object({
        value: z.coerce.number(), // in m3?
        date: z.date(),
      }), */
  }),
});

export { waste };
