import { z } from "zod";

const baseMeals = z.object({
  redMeat: z.number().optional(),
  whiteMeat: z.number().optional(),
  oilyFish: z.number().optional(),
  whiteFish: z.number().optional(),
  vegan: z.number().optional(),
  vegetarian: z.number().optional(),
});

const meals = z.preprocess((input, ctx) => {
  const parsed = baseMeals.safeParse(input);
  if (parsed.success) {
    const totalMeals = Object.values(parsed.data).reduce(
      (acc, curr) => acc + (curr ?? 0),
      0,
    );

    if (totalMeals < 7) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "food.minMeals",
        path: [],
      });
    }

    return parsed.data;
  }

  return input;
}, baseMeals);

export { meals as basicMeals };
