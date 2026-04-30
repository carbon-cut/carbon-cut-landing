import { createGroupSchema, datasetPlaceholderSchema } from "../_shared";
import { z } from "zod";

const fuelKeySchema = z.enum(["petrol", "diesel", "gpl", "electricity", "gnv"]);
type Year = `${number}${number}${number}${number}`;

const yearSchema = z.string().regex(/^\d{4}$/) as z.ZodType<Year>;

const numberByYearSchema = z.record(yearSchema, z.number());

const fleetSchema = z.object({
  vehicles: z.record(fuelKeySchema, numberByYearSchema),
  consumption: z.record(fuelKeySchema, numberByYearSchema),
  spend: z.record(fuelKeySchema, numberByYearSchema),
});

/* z.record(
  yearSchema,
  z.object({
    vehicles: z.record(fuelKeySchema, z.number()),
    consumption: z.record(fuelKeySchema, z.number()),
    spend: z.record(fuelKeySchema, z.number()),
  })
); */
const municipalSchema = createGroupSchema({
  fleet: fleetSchema,
  publicLighting: datasetPlaceholderSchema,
  buildings: datasetPlaceholderSchema,
  treesParksWaste: datasetPlaceholderSchema,
});

export { municipalSchema };
