import { z } from "zod";

import { union } from "./utils";
import heating from "./validation/heating";
import bills from "./validation/bills";


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
    area: z.number().optional(),
    category: union("appartment", "house", "villa", "other").optional(),
    heatedVolume: z.number().optional(),
    conditionedVolume: z.number().optional(),
    rooms: z.number().optional(),
    thermalInsulation: z.boolean().default(false).optional(),
    insulatedGlazing: z.boolean().default(false).optional(),
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
    total: z.number().optional(),
    money: z.number().optional(),
    //index: z.number(),
  }),
  gaz: z.object({
    total: z.number().optional(),
    money: z.number().optional(),
    //index: z.number(),
  }),
});

const out = z.preprocess((input, ctx) => {
  bills(input, ctx);
  return input;
}, energie);

export { out as energie, energie as raw };
