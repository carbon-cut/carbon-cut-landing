import { z } from "zod";
import { requiredNumber, union } from "./utils";
import {
  wasteGeneral,
  wasteOrganic,
  wasteRecycle,
  wastePaper,
  wasteGlass,
  water,
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
    // personalCompost: z.boolean().default(false),
    hasBiodigest: z.boolean().default(false),
    biodigest: z
      .object({
        electric: z.object({
          amount: requiredNumber(), // kWh
          frequencyUnit: union("month", "year"),
        }),
        biogas: z.object({
          amount: requiredNumber(), // m3
          frequencyUnit: union("month", "year"),
        }),
      })
      .optional(),
  }),
  water: water,
});

export { waste };
