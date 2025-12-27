import { z } from "zod";

import { union } from "./utils";
import heating from "./validation/heating";
import bills from "./validation/bills";

const energie = z.object({
  /* energies: z.object({
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
  }), */
  housing: z.object({
    area: z.coerce.number().optional(),
    category: union("appartment", "house", "villa", "other").optional(),
    heatedVolume: z.coerce.number().optional(),
    conditionedVolume: z.coerce.number().optional(),
    rooms: z.coerce.number().optional(),
    thermalInsulation: z.boolean().default(false).optional(),
    insulatedGlazing: z.boolean().default(false).optional(),
  }),
  heating: heating,
  repartition: z
    .object({
      hasRepartition: z.boolean().default(false),
      q1: z.array(
        z.object({
          type: z.union([z.literal("tv"), z.literal("washingMachine"), z.literal("dishwasher")]),
          made: z.string(),
          model: z.string(),
          power: z.coerce.number(),
          frequency: z.coerce.number(),
          label: union("A", "B", "C", "D", "E", "F", "G", ""),
        })
      ),
      q2: z.array(
        z.object({
          type: z.union([z.literal("iron"), z.literal("electricOven")]),
          made: z.string(),
          model: z.string(),
          frequency: z.coerce.number(),
          label: union("A", "B", "C", "D", "E", "F", "G", ""),
        })
      ),
      q3: z.array(
        z.object({
          type: union("simpleRefrigerator", "combinedRefrigerator", "freezer"),
          /* z.union([z.literal("simpleRefrigerator"), z.literal("combinedRefrigerator"), z.literal("freezer"),]), */
          made: z.string(),
          model: z.string(),
          refrigeratorVolume: z.coerce.number().optional(),
          freezerVolume: z.coerce.number().optional(),
          label: union("A", "B", "C", "D", "E", "F", "G", ""),
        })
      ),
      computers: z.coerce.number(),
      smartphones: z.coerce.number(),
    })
    .optional(),
  electricity: z.object({
    total: z.coerce.number().optional(),
    money: z.coerce.number().optional(),
    //index: z.coerce.number(),
  }),
  gas: z.object({
    total: z.coerce.number().optional(),
    money: z.coerce.number().optional(),
    //index: z.coerce.number(),
  }),
});

const out = z.preprocess((input, ctx) => {
  bills(input, ctx);
  return input;
}, energie);

export { out as energie, energie as raw };
