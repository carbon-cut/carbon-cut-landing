import { getInventoryYears, getPath, hasActivityValue, hasPriceValue, toPath } from "../helpers";
import type { CalculationReadinessIssue } from "../types";

export type AtLeastOneFallbackActivityRule = {
  activityBasePath: string;
  priceBasePath: string;
  physicalGroupKey: string;
  monetaryGroupKey: string;
  keys: readonly string[];
};

export function atLeastOneFallbackActivityRule(rule: AtLeastOneFallbackActivityRule) {
  return rule;
}

export function validateAtLeastOneFallbackActivityRule(
  values: unknown,
  rule: AtLeastOneFallbackActivityRule
) {
  const issues: CalculationReadinessIssue[] = [];

  for (const year of getInventoryYears(values)) {
    const yearKey = `y-${year}`;
    const candidates = rule.keys.map((key) => {
      const physicalPath = toPath(
        `${rule.activityBasePath}.${rule.physicalGroupKey}.${key}.value`,
        yearKey
      );
      const monetaryPath = toPath(
        `${rule.activityBasePath}.${rule.monetaryGroupKey}.${key}.value`,
        yearKey
      );
      const pricePath = toPath(`${rule.priceBasePath}.${key}.value`, yearKey);
      const hasPhysical = hasActivityValue(getPath(values, physicalPath));
      const hasMonetary = hasActivityValue(getPath(values, monetaryPath));
      const hasPrice = hasPriceValue(getPath(values, pricePath));

      return {
        physicalPath,
        monetaryPath,
        pricePath,
        hasPhysical,
        hasMonetary,
        hasPrice,
      };
    });
    const hasCalculableCandidate = candidates.some(
      (candidate) => candidate.hasPhysical || (candidate.hasMonetary && candidate.hasPrice)
    );

    for (const candidate of candidates) {
      if (candidate.hasMonetary && !candidate.hasPrice) {
        issues.push({ path: candidate.pricePath, message: "Required" });
      }
    }

    if (hasCalculableCandidate) {
      continue;
    }

    for (const candidate of candidates) {
      issues.push(
        { path: candidate.physicalPath, message: "Required" },
        { path: candidate.monetaryPath, message: "Required" },
        { path: candidate.pricePath, message: "Required" }
      );
    }
  }

  return issues;
}

export function getAtLeastOneFallbackActivityRulePaths(
  values: unknown,
  rule: AtLeastOneFallbackActivityRule
) {
  return getInventoryYears(values).flatMap((year) => {
    const yearKey = `y-${year}`;

    return rule.keys.flatMap((key) => [
      toPath(`${rule.activityBasePath}.${rule.physicalGroupKey}.${key}.value`, yearKey),
      toPath(`${rule.activityBasePath}.${rule.monetaryGroupKey}.${key}.value`, yearKey),
      toPath(`${rule.priceBasePath}.${key}.value`, yearKey),
    ]);
  });
}
