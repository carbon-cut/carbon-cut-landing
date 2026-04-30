import { createGroupSchema, datasetPlaceholderSchema } from "../_shared";

const energySchema = createGroupSchema({
  electricity: datasetPlaceholderSchema,
  photovoltaic: datasetPlaceholderSchema,
  naturalGas: datasetPlaceholderSchema,
  solarWaterHeating: datasetPlaceholderSchema,
});

export { energySchema };
