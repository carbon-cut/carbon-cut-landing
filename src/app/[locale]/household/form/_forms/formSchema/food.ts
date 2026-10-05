import { z } from "zod";
import { union } from "./utils";
import {
  basic as basicValidator,
  breakfast as breakfastValidator,
  market as marketValidator,
} from "./validation/food";

const food = z.object({
  basic: basicValidator,
  breakfast: breakfastValidator,
  restaurants: z.object({
    // colection de donnée
    fastFood: z.coerce.number().optional(),
    bistro: z.coerce.number().optional(),
    classic: z.coerce.number().optional(),
    gastronomic: z.coerce.number().optional(),
    bio: z.coerce.number().optional(),
  }),
  drinks: z.object({
    // cup per day
    tea: z.coerce.number().optional(),
    coffee: z.coerce.number().optional(),
    hotChocolate: z.coerce.number().optional(),
    // L per week
    soda: z.coerce.number().optional(),
    jus: z.coerce.number().optional(),
    beer: z.coerce.number().optional(),
    alcohol: z.coerce.number().optional(),
  }),
  //TODO
  /* water: z.object({
    type: union("tapWater", "tapWaterFilter", "bottle"),
    quantity: z.coerce.number(), // bottle per freq
    frequency: union("day", "week", "month"),
  }), */
  auxilary: z.object({
    seasonProducts: union(0, 20, 40, 60, 80, 100, false).optional(), // percent %
    localProducts: union(0, 20, 40, 60, 80, 100, false).optional(), // percent %
  }),
  market: marketValidator,
});

export { food };
