import { publicLighting } from "./municipal/config";

type CalculationReadinessIssue = {
  path: (string | number)[];
  message: string;
};

type CalculationReadinessResult =
  | { success: true }
  | { success: false; error: { issues: CalculationReadinessIssue[] } };

type FallbackActivityRule = {
  activityBasePath: string;
  priceBasePath: string;
  physicalKey: string;
  monetaryKey: string;
  priceKey: string;
};

const publicLightingRules = publicLighting.calculation.fallbackActivities.map((activity) =>
  fallbackActivityRule({
    activityBasePath: publicLighting.calculation.activityBasePath,
    priceBasePath: publicLighting.calculation.priceBasePath,
    ...activity,
  })
);

function fallbackActivityRule(rule: FallbackActivityRule) {
  return rule;
}

function getPath(value: unknown, path: string[]) {
  return path.reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null || Array.isArray(current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, value);
}

function exists(value: unknown) {
  return Boolean(value);
}

function toPath(path: string, yearKey?: string) {
  return yearKey ? [...path.split("."), yearKey] : path.split(".");
}

function getInventoryYears(values: unknown) {
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

function validateFallbackActivityRule(values: unknown, rule: FallbackActivityRule) {
  const issues: CalculationReadinessIssue[] = [];

  for (const year of getInventoryYears(values)) {
    const yearKey = `y-${year}`;
    const physicalPath = toPath(`${rule.activityBasePath}.${rule.physicalKey}.value`, yearKey);
    const monetaryPath = toPath(`${rule.activityBasePath}.${rule.monetaryKey}.value`, yearKey);
    const pricePath = toPath(`${rule.priceBasePath}.${rule.priceKey}.value`, yearKey);
    const hasPhysical = exists(getPath(values, physicalPath));
    const hasMonetary = exists(getPath(values, monetaryPath));
    const hasPrice = exists(getPath(values, pricePath));

    if (hasPhysical || (hasMonetary && hasPrice)) {
      continue;
    }

    if (!hasMonetary && !hasPrice) {
      issues.push(
        { path: physicalPath, message: "Required" },
        { path: monetaryPath, message: "Required" },
        { path: pricePath, message: "Required" }
      );
      continue;
    }

    if (!hasMonetary) {
      issues.push({ path: monetaryPath, message: "Required" });
    }

    if (!hasPrice) {
      issues.push({ path: pricePath, message: "Required" });
    }
  }

  return issues;
}

function getFallbackActivityRulePaths(values: unknown, rule: FallbackActivityRule) {
  return getInventoryYears(values).flatMap((year) => {
    const yearKey = `y-${year}`;

    return [
      toPath(`${rule.activityBasePath}.${rule.physicalKey}.value`, yearKey),
      toPath(`${rule.activityBasePath}.${rule.monetaryKey}.value`, yearKey),
      toPath(`${rule.priceBasePath}.${rule.priceKey}.value`, yearKey),
    ];
  });
}

function validatePublicLightingCalculationReadiness(values: unknown): CalculationReadinessResult {
  const issues = publicLightingRules.flatMap((rule) => validateFallbackActivityRule(values, rule));

  return issues.length > 0 ? { success: false, error: { issues } } : { success: true };
}

export function validateInventoryCalculationReadiness(
  datasetKey: string,
  values: unknown
): CalculationReadinessResult {
  if (datasetKey !== "publicLighting") {
    return { success: true };
  }

  return validatePublicLightingCalculationReadiness(values);
}

export function getInventoryCalculationReadinessPaths(datasetKey: string, values: unknown) {
  if (datasetKey !== "publicLighting") {
    return [];
  }

  return publicLightingRules.flatMap((rule) => getFallbackActivityRulePaths(values, rule));
}
