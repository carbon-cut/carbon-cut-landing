import { z } from "zod";
import { union } from "../../utils";

const marketEntry = z.object({
  frequency: z.number().optional(),
  frequencyUnit: union("year", "month", "week").optional(),
});

const marketShape = z.object({
  hyperMarket: marketEntry,
  big_boxStore: marketEntry,
  supermarket: marketEntry,
  groceryStore: marketEntry,
  weeklyMarket: marketEntry,
});

const market = z.preprocess((input, ctx) => {
  const parsed = marketShape.safeParse(input);
  if (!parsed.success) return input;

  Object.entries(parsed.data).forEach(([key, value]) => {
    const hasFrequency = value.frequency;
    const hasUnit = value.frequencyUnit;

    if (hasFrequency && !hasUnit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: [key, "frequencyUnit"],
      });
    } else if (!hasFrequency && hasUnit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: [key, "frequency"],
      });
    }
  });

  return parsed.data;
}, marketShape);

export { market };
