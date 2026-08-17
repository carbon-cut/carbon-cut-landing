import { z } from "zod";
import { createAIFieldCatalog, type AIFieldCatalogEntry } from "./_shared";

const yearSchema = z.coerce.number().int();

const yearsSchema = z.object({
  reference: yearSchema,
  comparisons: z.array(yearSchema),
});

// The year plan comes from collectivity setup and is omitted from editable inventory input.
const yearsCatalog = createAIFieldCatalog<AIFieldCatalogEntry>([]);

export { yearSchema, yearsCatalog, yearsSchema };
