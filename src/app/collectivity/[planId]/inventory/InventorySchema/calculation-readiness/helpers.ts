export function getPath(value: unknown, path: string[]) {
  return path.reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null || Array.isArray(current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, value);
}

export function hasActivityValue(value: unknown) {
  return value !== null && value !== undefined && value !== "";
}

export function hasPriceValue(value: unknown) {
  return hasActivityValue(value) && value !== 0;
}

export function toPath(path: string, yearKey?: string) {
  return yearKey ? [...path.split("."), yearKey] : path.split(".");
}

export function getInventoryYears(values: unknown) {
  const years = getPath(values, ["years"]);

  if (typeof years !== "object" || years === null || Array.isArray(years)) {
    return [];
  }

  const reference = (years as Record<string, unknown>).reference;
  const comparisons = (years as Record<string, unknown>).comparisons;

  return [
    ...(typeof reference === "number" ? [reference] : []),
    ...(Array.isArray(comparisons) ? comparisons : []),
  ];
}
