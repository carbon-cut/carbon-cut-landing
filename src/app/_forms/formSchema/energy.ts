import { z } from "zod";

import { union } from "./utils";
import heating from "./validation/heating";


const energie = z.object({
  energies: z.object({
    electricity: z.boolean().default(false),
    gasNetwork: z.boolean().default(false),
    heatNetwork: z.boolean().default(false),
    GPL: z.boolean().default(false),
    fioul: z.boolean().default(false),
    charcoal: z.boolean().default(false),
    wood: z.boolean().default(false),
    disel: z.boolean().default(false),
    other: z.boolean().default(false),
    otherValue: z.string().optional(),
  }),
  housing: z.object({
    area: z.number(),
    category: union("appartment", "house", "villa", "other"),
    heatedVolume: z.number(),
    conditionedVolume: z.number(),
    rooms: z.number(),
    thermalInsulation: z.boolean().default(false),
    insulatedGlazing: z.boolean().default(false),
  }),
  heating: heating,
  repartition: z.object({
    hasRepartition: z.boolean().default(false),
    q1: z.array(
      z.object({
        type: z.union([
          z.literal("tv"),
          z.literal("washingMachine"),
          z.literal("dishwasher"),
        ]),
        made: z.string(),
        model: z.string(),
        power: z.number(),
        frequency: z.number(),
        label: union("A", "B", "C", "D", "E", "F", "G", ""),
      }),
    ),
    q2: z.array(
      z.object({
        type: z.union([z.literal("iron"), z.literal("electricOven")]),
        made: z.string(),
        model: z.string(),
        frequency: z.number(),
        label: union("A", "B", "C", "D", "E", "F", "G", ""),
      }),
    ),
    q3: z.array(
      z.object({
        type: union("simpleRefrigerator", "combinedRefrigerator", "freezer"),
        /* z.union([z.literal("simpleRefrigerator"), z.literal("combinedRefrigerator"), z.literal("freezer"),]), */
        made: z.string(),
        model: z.string(),
        refrigeratorVolume: z.number().optional(),
        freezerVolume: z.number().optional(),
        label: union("A", "B", "C", "D", "E", "F", "G", ""),
      }),
    ),
    computers: z.number(),
    smartphones: z.number(),
  }),
  electricity: z.object({
    kWh: z.record(
      z
        .string()
        .regex(
          /^(0?[1-9]|1[0-2])\/\d{4}$/,
          "Key must follow the format monthNumber/year (e.g., 1/2025)",
        ),
      z.number(),
    ),
    total: z.number(),
    money: z.number().nullable(),
    index: z.number(),
  }),
  gaz: z.object({
    m: z.record(
      z
        .string()
        .regex(
          /^(0?[1-9]|1[0-2])\/\d{4}$/,
          "Key must follow the format monthNumber/year (e.g., 1/2025)",
        ),
      z.number(),
    ),
    total: z.number(),
    money: z.number().nullable(),
    index: z.number(),
  }),
  heatingNetwork: z.object({
    total: z.number().nullable(),
    money: z.number().nullable(),
    price: z.number().nullable(),
    index: z.number().nullable(),
  }),
});

export { energie };
