import { getInventoryYears, getPath, hasActivityValue, toPath } from "../helpers";
import type { CalculationReadinessIssue } from "../types";

const treatmentRowsPath = "wastewaterSanitation.treatmentDischarge.dataSet";
const connectionPercentagePath =
  "wastewaterSanitation.populationFallback.dataSet.utility.connectionPercentage.value";
const populationPath = "sharedData.population.dataSet.count.value";

function getDomesticRows(values: unknown) {
  const rows = getPath(values, toPath(treatmentRowsPath));

  return Array.isArray(rows)
    ? rows
        .map((row, index) => ({ row, index }))
        .filter(
          ({ row }) =>
            typeof row === "object" &&
            row !== null &&
            (row as Record<string, unknown>).loadType === "domestic"
        )
    : [];
}

function getFallbackPaths(index: number, yearKey: string) {
  return {
    directLoad: toPath(`${treatmentRowsPath}.${index}.value.domestic.value`, yearKey),
    population: toPath(populationPath, yearKey),
    connectionPercentage: toPath(connectionPercentagePath, yearKey),
    allocationPercentage: toPath(
      `${treatmentRowsPath}.${index}.value.populationAllocation.value`,
      yearKey
    ),
  };
}

export function validateDomesticLoadFallbackRule(values: unknown) {
  const issues: CalculationReadinessIssue[] = [];

  for (const { index } of getDomesticRows(values)) {
    for (const year of getInventoryYears(values)) {
      const paths = getFallbackPaths(index, `y-${year}`);

      if (hasActivityValue(getPath(values, paths.directLoad))) continue;

      const hasPopulation = hasActivityValue(getPath(values, paths.population));
      const hasConnectionPercentage = hasActivityValue(getPath(values, paths.connectionPercentage));
      const hasAllocationPercentage = hasActivityValue(getPath(values, paths.allocationPercentage));

      if (hasPopulation && hasConnectionPercentage && hasAllocationPercentage) continue;

      if (!hasPopulation && !hasConnectionPercentage && !hasAllocationPercentage) {
        issues.push(
          { path: paths.directLoad, message: "Required" },
          { path: paths.population, message: "Required" },
          { path: paths.connectionPercentage, message: "Required" },
          { path: paths.allocationPercentage, message: "Required" }
        );
        continue;
      }

      if (!hasPopulation) issues.push({ path: paths.population, message: "Required" });
      if (!hasConnectionPercentage) {
        issues.push({ path: paths.connectionPercentage, message: "Required" });
      }
      if (!hasAllocationPercentage) {
        issues.push({ path: paths.allocationPercentage, message: "Required" });
      }
    }
  }

  return issues;
}

export function getDomesticLoadFallbackRulePaths(values: unknown) {
  return getDomesticRows(values).flatMap(({ index }) =>
    getInventoryYears(values).flatMap((year) => Object.values(getFallbackPaths(index, `y-${year}`)))
  );
}
