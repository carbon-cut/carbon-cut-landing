import { getInventoryYears, getPath, hasActivityValue, hasPriceValue, toPath } from "../helpers";
import type { CalculationReadinessIssue } from "../types";

export type FallbackActivityRule = {
  activityBasePath: string;
  priceBasePath: string;
  physicalKey: string;
  monetaryKey: string;
  priceKey: string;
};

export function fallbackActivityRule(rule: FallbackActivityRule) {
  return rule;
}

export function validateFallbackActivityRule(values: unknown, rule: FallbackActivityRule) {
  const issues: CalculationReadinessIssue[] = [];

  for (const year of getInventoryYears(values)) {
    const yearKey = `y-${year}`;
    const physicalPath = toPath(`${rule.activityBasePath}.${rule.physicalKey}.value`, yearKey);
    const monetaryPath = toPath(`${rule.activityBasePath}.${rule.monetaryKey}.value`, yearKey);
    const pricePath = toPath(`${rule.priceBasePath}.${rule.priceKey}.value`, yearKey);
    const hasPhysical = hasActivityValue(getPath(values, physicalPath));
    const hasMonetary = hasActivityValue(getPath(values, monetaryPath));
    const hasPrice = hasPriceValue(getPath(values, pricePath));

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

export function getFallbackActivityRulePaths(values: unknown, rule: FallbackActivityRule) {
  return getInventoryYears(values).flatMap((year) => {
    const yearKey = `y-${year}`;

    return [
      toPath(`${rule.activityBasePath}.${rule.physicalKey}.value`, yearKey),
      toPath(`${rule.activityBasePath}.${rule.monetaryKey}.value`, yearKey),
      toPath(`${rule.priceBasePath}.${rule.priceKey}.value`, yearKey),
    ];
  });
}
