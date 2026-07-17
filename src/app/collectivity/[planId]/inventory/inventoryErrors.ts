const datasetErrorPaths: Partial<Record<string, readonly string[]>> = {
  fleet: ["municipal", "fleet"],
  "public-lighting": ["municipal", "publicLighting"],
  buildings: ["municipal", "buildings"],
  "trees-parks-waste": ["municipal", "treesParksWaste"],
  electricity: ["energy", "electricity"],
  photovoltaic: ["energy", "photovoltaic"],
  "natural-gas": ["energy", "naturalGas"],
  "solar-water-heating": ["energy", "solarWaterHeating"],
  port: ["transport", "port"],
  "public-transport": ["transport", "publicTransport"],
  "air-transport": ["transport", "airTransport"],
  transport: ["transport", "territoryVehicles"],
  "perennial-plantation-stock": ["afat", "perennialPlantationStock"],
  livestock: ["afat", "livestock"],
  fertilizers: ["afat", "fertilizers"],
  "agricultural-production": ["afat", "agriculturalProduction"],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getNestedValue(value: unknown, path: readonly string[]) {
  return path.reduce<unknown>(
    (current, key) => (isRecord(current) ? current[key] : undefined),
    value
  );
}

function countFieldErrors(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countFieldErrors(item), 0);
  }

  if (!isRecord(value)) {
    return 0;
  }

  if (typeof value.type === "string") {
    return 1;
  }

  return Object.values(value).reduce<number>((sum, item) => sum + countFieldErrors(item), 0);
}

export function getInventoryDatasetErrorCount(datasetKey: string, errors: unknown) {
  const path = datasetErrorPaths[datasetKey];

  return path ? countFieldErrors(getNestedValue(errors, path)) : 0;
}
