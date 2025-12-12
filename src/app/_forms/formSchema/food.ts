import { z } from "zod";
import { union } from "./utils";
import { basicMeals } from "./validation/food";
const food = z.object({
  basic: z.object({
    meals: basicMeals,
    distribution: z.object({
      // cooked at home, quantine or outside of house, livree a maison
      redMeat: z.tuple([z.number(), z.number(), z.number()]),
      whiteMeat: z.tuple([z.number(), z.number(), z.number()]),
      oilyFish: z.tuple([z.number(), z.number(), z.number()]),
      whiteFish: z.tuple([z.number(), z.number(), z.number()]),
      vegan: z.tuple([z.number(), z.number(), z.number()]),
      vegetarian: z.tuple([z.number(), z.number(), z.number()]),
    }),
  }),
  breakfast: z.object({
    meals: z.object({
      bread: z.number().optional(),
      salty: z.number().optional(),
      milk: z.number().optional(),
      fruits: z.number().optional(),
      no: z.number().optional(),
    }),
    distribution: z.object({
      bread: z.tuple([z.number(), z.number(), z.number()]),
      salty: z.tuple([z.number(), z.number(), z.number()]),
      milk: z.tuple([z.number(), z.number(), z.number()]),
      fruits: z.tuple([z.number(), z.number(), z.number()]),
    }),
  }),
  restaurants: z.object({
    // colection de donnée
    fastFood: z.number(),
    bistro: z.number(),
    classic: z.number(),
    gastronomic: z.number(),
    bio: z.number(),
  }),
  drinks: z.object({
    // cup per day
    tea: z.number(),
    coffee: z.number(),
    hotChocolate: z.number(),
    // L per week
    soda: z.number(),
    jus: z.number(),
    beer: z.number(),
    alcohol: z.number(),
  }),
  water: z.object({
    type: union("tapWater", "tapWaterFilter", "bottle"),
    quantity: z.number(), // bottle per freq
    frequency: union("day", "week", "month"),
  }),
  auxilary: z.object({
    seasonProducts: union(0, 20, 40, 60, 80, 100), // percent %
    localProducts: union(0, 20, 40, 60, 80, 100), // percent %
  }),
  market: z.object({
    hyperMarket: z.object({
      frequency: z.number(),
      frequencyUnit: union("year", "month", "week"),
    }),
    big_boxStore: z.object({
      frequency: z.number(),
      frequencyUnit: union("year", "month", "week"),
    }),
    supermarket: z.object({
      frequency: z.number(),
      frequencyUnit: union("year", "month", "week"),
    }),
    groceryStore: z.object({
      frequency: z.number(),
      frequencyUnit: union("year", "month", "week"),
    }),
    weeklyMarket: z.object({
      frequency: z.number(),
      frequencyUnit: union("year", "month", "week"),
    }),
  }),
});

export { food };
