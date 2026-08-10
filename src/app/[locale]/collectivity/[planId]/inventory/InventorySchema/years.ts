import { z } from "zod";

const yearSchema = z.coerce.number().int();

const yearsSchema = z.object({
  reference: yearSchema,
  comparisons: z.array(yearSchema),
});

export { yearSchema, yearsSchema };
