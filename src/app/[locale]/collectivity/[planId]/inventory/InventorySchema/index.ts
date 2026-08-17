import { createGroupCatalog, createGroupSchema } from "./_shared";
import { yearsCatalog, yearsSchema } from "./years";
import { municipalCatalog, municipalSchema } from "./municipal";
import { energyCatalog, energySchema } from "./energy";
import { transportCatalog, transportSchema } from "./transport";
import { afatCatalog, afatSchema } from "./afat";
import { wastewaterSanitationCatalog, wastewaterSanitationSchema } from "./wastewaterSanitation";
import { wasteCatalog, wasteSchema } from "./waste";
import { priceAssumptionsCatalog, priceAssumptionsSchema } from "./price-assumptions";
import { sharedDataCatalog, sharedDataSchema } from "./shared-data";

const inventorySchema = createGroupSchema({
  years: yearsSchema,
  municipal: municipalSchema,
  energy: energySchema,
  transport: transportSchema,
  afat: afatSchema,
  wastewaterSanitation: wastewaterSanitationSchema,
  waste: wasteSchema,
  sharedData: sharedDataSchema.optional(),
  priceAssumptions: priceAssumptionsSchema.optional(),
});

const inventoryInputSchema = inventorySchema.omit({
  years: true,
});

const inventoryCatalog = createGroupCatalog({
  years: yearsCatalog,
  municipal: municipalCatalog,
  energy: energyCatalog,
  transport: transportCatalog,
  afat: afatCatalog,
  wastewaterSanitation: wastewaterSanitationCatalog,
  waste: wasteCatalog,
  sharedData: sharedDataCatalog,
  priceAssumptions: priceAssumptionsCatalog,
});

function getInventoryDatasetFieldCatalog(datasetKey: string) {
  return inventoryCatalog.getDatasetFields(datasetKey);
}

function resolveInventoryAIField(id: string) {
  return inventoryCatalog.resolve(id);
}

export {
  getInventoryDatasetFieldCatalog,
  inventoryCatalog,
  inventorySchema,
  inventoryInputSchema,
  resolveInventoryAIField,
};
