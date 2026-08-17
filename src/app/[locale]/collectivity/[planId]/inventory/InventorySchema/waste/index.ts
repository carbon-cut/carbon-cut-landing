import { createAIFieldCatalog, createGroupSchema, type AIFieldCatalogEntry } from "../_shared";
export { wasteDefault } from "./default";

const wasteSchema = createGroupSchema({});
const wasteCatalog = createAIFieldCatalog<AIFieldCatalogEntry>([]);

export { wasteCatalog, wasteSchema };
