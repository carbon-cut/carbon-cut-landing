import { z } from "zod";

const breakfastMeals = z.object({
  bread: z.number().optional(),
  salty: z.number().optional(),
  milk: z.number().optional(),
  fruits: z.number().optional(),
  no: z.number().optional(),
});

const distributionBreakfast = z
  .object({
    bread: z
      .tuple([z.number().optional(), z.number().optional(), z.number().optional()])
      .optional(),
    salty: z
      .tuple([z.number().optional(), z.number().optional(), z.number().optional()])
      .optional(),
    milk: z.tuple([z.number().optional(), z.number().optional(), z.number().optional()]).optional(),
    fruits: z
      .tuple([z.number().optional(), z.number().optional(), z.number().optional()])
      .optional(),
  })
  .optional();

const breakfastShape = z.object({
  meals: breakfastMeals,
  distribution: distributionBreakfast,
});

const breakfast = z.preprocess((input, ctx) => {
  const parsed = breakfastShape.safeParse(input);
  if (!parsed.success) return input;

  const { meals: mealValues, distribution } = parsed.data;
  if (distribution) {
    (Object.keys(mealValues) as Array<keyof typeof mealValues>)
      .filter((mealKey) => mealKey !== "no")
      .forEach((mealKey) => {
        const target = mealValues[mealKey] ?? 0;
        const total =
          distribution[mealKey]?.reduce((acc: number, curr) => acc + (curr ?? 0), 0) ?? 0;
        if (total !== target) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "food.distributionMismatch",
            path: ["distribution", mealKey, 0],
          });
        }
      });
  }

  return parsed.data;
}, breakfastShape);

export { breakfast };
