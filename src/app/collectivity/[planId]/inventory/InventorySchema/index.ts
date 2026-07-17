import { createGroupSchema } from "./_shared";
import { yearsSchema } from "./years";
import { municipalSchema } from "./municipal";
import { energySchema } from "./energy";
import { transportSchema } from "./transport";
import { afatSchema } from "./afat";
import { wastewaterSanitationSchema } from "./wastewaterSanitation";
import { wasteSchema } from "./waste";

const inventorySchema = createGroupSchema({
  years: yearsSchema,
  municipal: municipalSchema,
  energy: energySchema,
  transport: transportSchema,
  afat: afatSchema,
  wastewaterSanitation: wastewaterSanitationSchema,
  waste: wasteSchema,
});

export { inventorySchema };
