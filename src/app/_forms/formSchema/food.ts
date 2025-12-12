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
    fastFood: z.number().optional(),
    bistro: z.number().optional(),
    classic: z.number().optional(),
    gastronomic: z.number().optional(),
    bio: z.number().optional(),
  }),
  drinks: z.object({
    // cup per day
    tea: z.number().optional(),
    coffee: z.number().optional(),
    hotChocolate: z.number().optional(),
    // L per week
    soda: z.number().optional(),
    jus: z.number().optional(),
    beer: z.number().optional(),
    alcohol: z.number().optional(),
  }),
  //TODO
  /* water: z.object({
    type: union("tapWater", "tapWaterFilter", "bottle"),
    quantity: z.number(), // bottle per freq
    frequency: union("day", "week", "month"),
  }), */
  auxilary: z.object({
    seasonProducts: union(0, 20, 40, 60, 80, 100, false).optional(), // percent %
    localProducts: union(0, 20, 40, 60, 80, 100, false).optional(), // percent %
  }),
  market: marketValidator,
});

export { food };
