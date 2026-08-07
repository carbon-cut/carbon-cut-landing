const datasetErrorPaths: Partial<Record<string, readonly string[]>> = {
  fleet: ["municipal", "fleet"],
  publicLighting: ["municipal", "publicLighting"],
  buildings: ["municipal", "buildings"],
  treesParksWaste: ["municipal", "treesParksWaste"],
  electricity: ["energy", "electricity"],
  naturalGas: ["energy", "naturalGas"],
  port: ["transport", "port"],
  publicTransport: ["transport", "publicTransport"],
  airTransport: ["transport", "airTransport"],
  territoryVehicles: ["transport", "territoryVehicles"],
  trees: ["afat", "trees"],
  livestock: ["afat", "livestock"],
  fertilizers: ["afat", "fertilizers"],
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

export function getInventoryDatasetHasError(datasetKey: string, errors: unknown) {
  const path = datasetErrorPaths[datasetKey];

  return path ? getNestedValue(errors, path) !== undefined : false;
}

export function getInventoryDatasetErrorSignature(datasetKeys: readonly string[], errors: unknown) {
  return datasetKeys
    .map((datasetKey) => `${datasetKey}:${getInventoryDatasetErrorCount(datasetKey, errors)}`)
    .join("|");
}

function hasYearError(value: unknown, yearKey: string): boolean {
  if (Array.isArray(value)) {
    return value.some((item) => hasYearError(item, yearKey));
  }

  if (!isRecord(value)) {
    return false;
  }

  if (Object.keys(value).some((key) => key === yearKey || key.endsWith(`.${yearKey}`))) {
    return true;
  }

  return Object.values(value).some((item) => hasYearError(item, yearKey));
}

export function getInventoryDatasetErrorPath(datasetKey: string) {
  return datasetErrorPaths[datasetKey];
}

export function getInventoryDatasetErrorYears(
  datasetKey: string,
  errors: unknown,
  years: readonly number[]
) {
  const path = datasetErrorPaths[datasetKey];
  return path ? getInventoryErrorYearsAtPath(errors, path, years) : [];
}

function getInventoryErrorYearsAtPath(
  errors: unknown,
  path: readonly string[],
  years: readonly number[]
) {
  const nestedErrors = getNestedValue(errors, path);

  return years.filter((year) => hasYearError(nestedErrors, `y-${year}`));
}

export function getInventoryDatasetYearErrorSignature(
  datasetKey: string,
  errors: unknown,
  years: readonly number[]
) {
  return getInventoryDatasetErrorYears(datasetKey, errors, years).join("|");
}

export function getInventoryDatasetFieldName(datasetKey: string) {
  return datasetErrorPaths[datasetKey]?.join(".") ?? null;
}
