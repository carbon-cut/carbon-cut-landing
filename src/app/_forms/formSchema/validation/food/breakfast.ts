import { z } from "zod";

const breakfastMeals = z.object({
  bread: z.coerce.number().optional(),
  salty: z.coerce.number().optional(),
  milk: z.coerce.number().optional(),
  fruits: z.coerce.number().optional(),
  no: z.coerce.number().optional(),
});

const distributionBreakfast = z
  .object({
    bread: z
      .tuple([
        z.coerce.number().optional(),
        z.coerce.number().optional(),
        z.coerce.number().optional(),
      ])
      .optional(),
    salty: z
      .tuple([
        z.coerce.number().optional(),
        z.coerce.number().optional(),
        z.coerce.number().optional(),
      ])
      .optional(),
    milk: z
      .tuple([
        z.coerce.number().optional(),
        z.coerce.number().optional(),
        z.coerce.number().optional(),
      ])
      .optional(),
    fruits: z
      .tuple([
        z.coerce.number().optional(),
        z.coerce.number().optional(),
        z.coerce.number().optional(),
      ])
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
            path: ["distribution", mealKey],
          });
        }
      });
  }

  return parsed.data;
}, breakfastShape);

export { breakfast };
