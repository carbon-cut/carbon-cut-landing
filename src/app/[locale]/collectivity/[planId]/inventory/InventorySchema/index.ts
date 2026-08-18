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
export { createAIFormOperationSchema, type AIFormOperation } from "./operations";

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

type InventoryAssistantCatalogOptions = {
  aircraftValues: readonly { value: string; label: string }[];
};

function buildInventoryAssistantCatalog({ aircraftValues }: InventoryAssistantCatalogOptions) {
  const aircraftLabels = Object.fromEntries(
    aircraftValues.map(({ value, label }) => [value, label])
  );

  return inventoryCatalog.fields.map((field) => {
    if (field.id !== "transport.airTransport.movements") {
      return field;
    }

    return {
      ...field,
      dimensions: field.dimensions.map((dimension) =>
        dimension.key === "aircraft"
          ? {
              ...dimension,
              allowedValues: aircraftValues.map(({ value }) => value),
              allowedValueLabels: aircraftLabels,
            }
          : dimension
      ),
    };
  });
}

function getInventoryDatasetFieldCatalog(datasetKey: string) {
  return inventoryCatalog.getDatasetFields(datasetKey);
}

function resolveInventoryAIField(id: string) {
  return inventoryCatalog.resolve(id);
}

export {
  getInventoryDatasetFieldCatalog,
  buildInventoryAssistantCatalog,
  inventoryCatalog,
  inventorySchema,
  inventoryInputSchema,
  resolveInventoryAIField,
};
