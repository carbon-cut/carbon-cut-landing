import { createGroupSchema, datasetPlaceholderSchema } from "../_shared";

const transportSchema = createGroupSchema({
  publicTransport: datasetPlaceholderSchema,
  airTransport: datasetPlaceholderSchema,
  port: datasetPlaceholderSchema,
  vehicleCounts: datasetPlaceholderSchema,
});

export { transportSchema };
