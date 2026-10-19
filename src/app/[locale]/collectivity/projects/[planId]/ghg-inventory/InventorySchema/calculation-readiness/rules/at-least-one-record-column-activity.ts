import { getInventoryYears, getPath, hasActivityValue, toPath } from "../helpers";
import type { CalculationReadinessIssue } from "../types";

export type AtLeastOneRecordColumnActivityRule = {
  datasetBasePath: string;
  recordsBasePath: string;
  columnKey: string;
  ghostErrorPath: string;
};

export function atLeastOneRecordColumnActivityRule(rule: AtLeastOneRecordColumnActivityRule) {
  return rule;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateAtLeastOneRecordColumnActivityRule(
  values: unknown,
  rule: AtLeastOneRecordColumnActivityRule
) {
  const dataset = getPath(values, toPath(rule.datasetBasePath));

  if (!isRecord(dataset) || Object.keys(dataset).length === 0) {
    return [];
  }

  const records = getPath(values, toPath(rule.recordsBasePath));

  if (!isRecord(records) || Object.keys(records).length === 0) {
    return getInventoryYears(values).map((year) => ({
      path: toPath(rule.ghostErrorPath, `y-${year}`),
      message: "Required",
    }));
  }

  const issues: CalculationReadinessIssue[] = [];

  for (const year of getInventoryYears(values)) {
    const yearKey = `y-${year}`;
    const hasYearActivity = Object.keys(records).some((recordKey) =>
      hasActivityValue(
        getPath(
          values,
          toPath(`${rule.recordsBasePath}.${recordKey}.${rule.columnKey}.value`, yearKey)
        )
      )
    );

    if (!hasYearActivity) {
      issues.push({
        path: toPath(rule.ghostErrorPath, yearKey),
        message: "Required",
      });
    }
  }

  return issues;
}

export function getAtLeastOneRecordColumnActivityRulePaths(
  rule: AtLeastOneRecordColumnActivityRule
) {
  return [toPath(rule.ghostErrorPath)];
}
