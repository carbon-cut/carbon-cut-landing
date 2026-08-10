import { z } from "zod";

const baseMeals = z.object({
  redMeat: z.coerce.number().optional(),
  whiteMeat: z.coerce.number().optional(),
  oilyFish: z.coerce.number().optional(),
  whiteFish: z.coerce.number().optional(),
  vegan: z.coerce.number().optional(),
  vegetarian: z.coerce.number().optional(),
});

const meals = z.preprocess((input, ctx) => {
  const parsed = baseMeals.safeParse(input);
  if (parsed.success) {
    const totalMeals = Object.values(parsed.data).reduce((acc, curr) => acc + (curr ?? 0), 0);

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
const tupleOfThreeNumbers = z.tuple([
  z.coerce.number().optional(),
  z.coerce.number().optional(),
  z.coerce.number().optional(),
]);
const distributionBasic = z
  .object({
    redMeat: tupleOfThreeNumbers.optional(),
    whiteMeat: tupleOfThreeNumbers.optional(),
    oilyFish: tupleOfThreeNumbers.optional(),
    whiteFish: tupleOfThreeNumbers.optional(),
    vegan: tupleOfThreeNumbers.optional(),
    vegetarian: tupleOfThreeNumbers.optional(),
  })
  .optional();

const basicShape = z.object({
  meals,
  distribution: distributionBasic,
});

const basic = z.preprocess((input, ctx) => {
  const parsed = basicShape.safeParse(input);
  if (!parsed.success) return input;

  const { meals: mealValues, distribution } = parsed.data;
  if (distribution) {
    (Object.keys(mealValues) as Array<keyof typeof mealValues>).forEach((mealKey) => {
      const target = mealValues[mealKey] ?? 0;
      const total = distribution[mealKey]?.reduce((acc: number, curr) => acc + (curr ?? 0), 0) ?? 0;
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
}, basicShape);

export { meals as basicMeals, basic };
