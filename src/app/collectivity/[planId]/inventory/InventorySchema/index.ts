import { createGroupSchema } from "./_shared";
import { yearsSchema } from "./years";
import { municipalSchema } from "./municipal";
import { energySchema } from "./energy";
import { transportSchema } from "./transport";
import { afatSchema } from "./afat";
import { wastewaterSanitationSchema } from "./wastewaterSanitation";
import { wasteSchema } from "./waste";
import { priceAssumptionsSchema } from "./price-assumptions";

const inventorySchema = createGroupSchema({
  years: yearsSchema,
  municipal: municipalSchema,
  energy: energySchema,
  transport: transportSchema,
  afat: afatSchema,
  wastewaterSanitation: wastewaterSanitationSchema,
  waste: wasteSchema,
  priceAssumptions: priceAssumptionsSchema.optional(),
});

const inventoryInputSchema = inventorySchema.omit({
  years: true,
});

export { inventorySchema, inventoryInputSchema };
