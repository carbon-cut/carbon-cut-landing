import { getInventoryYears, getPath, hasActivityValue, toPath } from "../helpers";
import type { CalculationReadinessIssue } from "../types";
import type {
  TerritorialEnergyLineDefinitions,
  TerritorialEnergySector,
} from "../../energy/territorial-energy";

export type AtLeastOneSectorConsumptionRule = {
  datasetBasePath: string;
  ghostErrorPath: string;
  blocks: Record<string, TerritorialEnergyLineDefinitions>;
  sector: TerritorialEnergySector;
};

export function atLeastOneSectorConsumptionRule(rule: AtLeastOneSectorConsumptionRule) {
  return rule;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getFixedSectorConsumptionPaths(rule: AtLeastOneSectorConsumptionRule, yearKey: string) {
  return Object.entries(rule.blocks).flatMap(([blockKey, lines]) =>
    Object.entries(lines)
      .filter(([, definition]) => definition.sector === rule.sector)
      .map(([lineKey]) =>
        toPath(`${rule.datasetBasePath}.${blockKey}.fixed.${lineKey}.consumption.value`, yearKey)
      )
  );
}

function getCustomSectorConsumptionPaths(
  values: unknown,
  rule: AtLeastOneSectorConsumptionRule,
  yearKey: string
) {
  return Object.keys(rule.blocks).flatMap((blockKey) => {
    const customRows = getPath(values, toPath(`${rule.datasetBasePath}.${blockKey}.custom`));

    if (!Array.isArray(customRows)) {
      return [];
    }

    return customRows.flatMap((row, index) => {
      if (!isRecord(row) || row.sector !== rule.sector) {
        return [];
      }

      return [
        toPath(`${rule.datasetBasePath}.${blockKey}.custom.${index}.consumption.value`, yearKey),
      ];
    });
  });
}

export function validateAtLeastOneSectorConsumptionRule(
  values: unknown,
  rule: AtLeastOneSectorConsumptionRule
) {
  const issues: CalculationReadinessIssue[] = [];

  for (const year of getInventoryYears(values)) {
    const yearKey = `y-${year}`;
    const consumptionPaths = [
      ...getFixedSectorConsumptionPaths(rule, yearKey),
      ...getCustomSectorConsumptionPaths(values, rule, yearKey),
    ];

    if (consumptionPaths.some((path) => hasActivityValue(getPath(values, path)))) {
      continue;
    }

    issues.push({ path: toPath(rule.ghostErrorPath, yearKey), message: "Required" });
  }

  return issues;
}

export function getAtLeastOneSectorConsumptionRulePaths(rule: AtLeastOneSectorConsumptionRule) {
  return [toPath(rule.ghostErrorPath)];
}
