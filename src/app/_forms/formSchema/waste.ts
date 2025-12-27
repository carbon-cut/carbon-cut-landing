import { z } from "zod";
import { union } from "./utils";

const wasteGeneral = z.object({
  amount: z.coerce.number(),
  amountUnit: z.union([z.literal("bag"), z.literal("kg")]),
  frequencyUnit: z.union([z.literal("day"), z.literal("week")]),
  bagVolume: union("10", "20", "30", "40", "50", "60", "70", "80", "90", "100"),
  destination: z.null(),
});

const wasteOrganic = z.object({
  amount: z.coerce.number(),
  amountUnit: z.union([z.literal("bag"), z.literal("kg")]),
  frequencyUnit: z.union([z.literal("day"), z.literal("week")]),
  bagVolume: union("10", "20", "30", "40", "50", "60", "70", "80", "90", "100"),
  destination: union("idk", "biomethan", "compost"),
});

const wasteRecycle = z.object({
  amount: z.coerce.number(),
  amountUnit: z.union([z.literal("bag"), z.literal("kg")]),
  frequencyUnit: z.union([z.literal("day"), z.literal("week")]),
  bagVolume: union("10", "20", "30", "40", "50", "60", "70", "80", "90", "100"),
  destination: union("idk", "incineration", "recycling"),
});

const wastePaper = z.object({
  amount: z.coerce.number(),
  amountUnit: z.union([z.literal("bag"), z.literal("kg")]),
  frequencyUnit: z.union([z.literal("day"), z.literal("week")]),
  bagVolume: union("10", "20", "30", "40", "50", "60", "70", "80", "90", "100"),
  destination: union("idk", "incineration", "recycling", "biomethan", "compost"),
});

const wasteGlass = z.object({
  amount: z.coerce.number(),
  amountUnit: z.union([z.literal("bag"), z.literal("kg")]),
  frequencyUnit: z.union([z.literal("day"), z.literal("week")]),
  bagVolume: union("10", "20", "30", "40", "50", "60", "70", "80", "90", "100"),
  destination: union("idk", "recycling", "biomethan", "incineration"),
});

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
    }),
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
