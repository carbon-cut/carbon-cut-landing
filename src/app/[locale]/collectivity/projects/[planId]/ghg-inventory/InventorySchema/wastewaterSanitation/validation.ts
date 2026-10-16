import type { components } from "@/generated/backend-api";

import { wastewaterSanitation } from "./config";

type ReasonCode = components["schemas"]["CalculationReasonCode"];
type WarningCode = components["schemas"]["CalculationWarningCode"];

export type WastewaterValidationIssue = {
  code: ReasonCode;
  message: ReasonCode;
  path: (string | number)[];
  year?: number;
};

export type WastewaterValidationWarning = {
  code: WarningCode;
  path: (string | number)[];
  year?: number;
  details?: Record<string, unknown>;
};

export type WastewaterValidationResult = {
  issues: WastewaterValidationIssue[];
  warnings: WastewaterValidationWarning[];
};

type UnknownRecord = Record<string, unknown>;

const ROOT = "wastewaterSanitation";
const TREATMENT_ROWS = `${ROOT}.treatmentDischarge.dataSet`;
const SLUDGE_ROWS = `${ROOT}.sludgeDestination.dataSet`;
const LANDFILL_SITES = `${ROOT}.sludgeDestination.landfillSites.dataSet`;
const CONNECTION_PERCENTAGE = `${ROOT}.populationFallback.dataSet.utility.connectionPercentage`;
const SHARED_POPULATION = "sharedData.population.dataSet.count";

function record(value: unknown): UnknownRecord | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as UnknownRecord)
    : undefined;
}

function at(value: unknown, path: string) {
  return path.split(".").reduce<unknown>((current, key) => record(current)?.[key], value);
}

function path(value: string): (string | number)[] {
  return value.split(".").map((part) => (/^\d+$/.test(part) ? Number(part) : part));
}

function values(metric: unknown): UnknownRecord {
  return record(record(metric)?.value) ?? {};
}

function supplied(series: UnknownRecord, yearKey: string) {
  return Object.prototype.hasOwnProperty.call(series, yearKey) && series[yearKey] !== undefined;
}

function numberValue(series: UnknownRecord, yearKey: string) {
  const value = series[yearKey];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function yearFromKey(yearKey: string) {
  return /^y-\d{4}$/.test(yearKey) ? Number(yearKey.slice(2)) : undefined;
}

function activeYears(input: unknown) {
  const years = record(at(input, "years"));
  const reference = years?.reference;
  const comparisons = years?.comparisons;
  return [
    ...(typeof reference === "number" ? [reference] : []),
    ...(Array.isArray(comparisons)
      ? comparisons.filter((year): year is number => typeof year === "number")
      : []),
  ];
}

function enumIncludes(values: readonly string[], value: unknown): value is string {
  return typeof value === "string" && values.includes(value);
}

export function validateWastewaterCalculation(input: unknown): WastewaterValidationResult {
  const issues: WastewaterValidationIssue[] = [];
  const warnings: WastewaterValidationWarning[] = [];
  const years = activeYears(input);
  const activeYearKeys = new Set(years.map((year) => `y-${year}`));
  const wastewater = record(at(input, ROOT));

  if (!wastewater) return { issues, warnings };

  const addIssue = (code: ReasonCode, target: string, year?: number) => {
    issues.push({ code, message: code, path: path(target), ...(year ? { year } : {}) });
  };
  const addWarning = (
    code: WarningCode,
    target: string,
    year?: number,
    details?: Record<string, unknown>
  ) => {
    warnings.push({
      code,
      path: path(target),
      ...(year ? { year } : {}),
      ...(details ? { details } : {}),
    });
  };

  const connectionValues = values(at(input, CONNECTION_PERCENTAGE));
  const populationValues = values(at(input, SHARED_POPULATION));
  const allocationTotals = new Map<string, number>();
  const allocationPaths = new Map<string, string[]>();
  const treatmentRows = at(input, TREATMENT_ROWS);

  Object.entries(connectionValues).forEach(([yearKey, value]) => {
    if (!activeYearKeys.has(yearKey) || typeof value !== "number") return;
    if (value < 0 || value > 100) {
      addIssue("invalidRange", `${CONNECTION_PERCENTAGE}.value.${yearKey}`, yearFromKey(yearKey));
    }
  });

  if (Array.isArray(treatmentRows)) {
    treatmentRows.forEach((rawRow, rowIndex) => {
      const row = record(rawRow);
      if (!row || row.withinMunicipalBoundary !== true) return;
      const source = `${TREATMENT_ROWS}.${rowIndex}`;
      const rowValues = record(row.value) ?? {};
      const relevant = Object.values(rowValues).some((metric) =>
        Object.keys(values(metric)).some((yearKey) => activeYearKeys.has(yearKey))
      );
      if (!relevant) return;

      const loadType = row.loadType;
      const system = row.system;
      if (!enumIncludes(wastewaterSanitation.organicLoadKeys, loadType)) {
        addIssue("invalidControlledValue", `${source}.loadType`);
        return;
      }
      if (!enumIncludes(wastewaterSanitation.treatmentSystemValues, system)) {
        addIssue("invalidControlledValue", `${source}.system`);
        return;
      }
      if (
        loadType === "industrial" &&
        !wastewaterSanitation.industrialTreatmentSystemValues.includes(system as never)
      ) {
        addIssue("unsupportedWastewaterMethod", `${source}.system`);
      }

      const loadKey =
        loadType as keyof typeof wastewaterSanitation.sludgeRemovedKeyByOrganicLoadKey;
      const sludgeKey = wastewaterSanitation.sludgeRemovedKeyByOrganicLoadKey[loadKey];
      const outgoingKey = wastewaterSanitation.outgoingLoadKeyByOrganicLoadKey[loadKey];
      const load = values(rowValues[loadType]);
      const sludgeRemoved = values(rowValues[sludgeKey]);
      const nitrogen = values(rowValues.nitrogen);
      const outgoingNitrogen = values(rowValues.outgoingNitrogen);
      const allocation = values(rowValues.populationAllocation);
      const recovery = values(rowValues.methaneRecovery);
      const outgoing = values(rowValues[outgoingKey]);
      const participatingYears = new Set(
        [load, sludgeRemoved, nitrogen, outgoingNitrogen, allocation, recovery, outgoing].flatMap(
          (series) => Object.keys(series).filter((yearKey) => activeYearKeys.has(yearKey))
        )
      );

      participatingYears.forEach((yearKey) => {
        const year = yearFromKey(yearKey);
        const hasLoad = supplied(load, yearKey);
        const hasNitrogen = supplied(nitrogen, yearKey);
        const hasAllocation = supplied(allocation, yearKey);
        const hasOrganicActivity = hasLoad || hasAllocation;

        if (hasAllocation && (hasLoad || hasNitrogen)) {
          addIssue(
            "populationActivityConflict",
            `${source}.value.populationAllocation.value.${yearKey}`,
            year
          );
        }
        if (hasAllocation) {
          if (loadType !== "domestic") {
            addIssue(
              "unsupportedWastewaterMethod",
              `${source}.value.populationAllocation.value.${yearKey}`,
              year
            );
          }
          if (!supplied(connectionValues, yearKey)) {
            addIssue("missingAnnualDependency", `${CONNECTION_PERCENTAGE}.value.${yearKey}`, year);
          }
          if (!supplied(populationValues, yearKey)) {
            addIssue("missingAnnualDependency", `${SHARED_POPULATION}.value.${yearKey}`, year);
          }
          const allocationValue = numberValue(allocation, yearKey);
          if (allocationValue !== undefined) {
            if (allocationValue < 0 || allocationValue > 100) {
              addIssue(
                "invalidRange",
                `${source}.value.populationAllocation.value.${yearKey}`,
                year
              );
            }
            allocationTotals.set(yearKey, (allocationTotals.get(yearKey) ?? 0) + allocationValue);
            allocationPaths.set(yearKey, [
              ...(allocationPaths.get(yearKey) ?? []),
              `${source}.value.populationAllocation.value.${yearKey}`,
            ]);
          }
        }

        for (const [key, series] of [
          [sludgeKey, sludgeRemoved],
          ["methaneRecovery", recovery],
          [outgoingKey, outgoing],
        ] as const) {
          if (supplied(series, yearKey) && !hasOrganicActivity) {
            addIssue("orphanAnnualValue", `${source}.value.${key}.value.${yearKey}`, year);
          }
        }
        if (supplied(outgoingNitrogen, yearKey) && !hasNitrogen && !hasAllocation) {
          addIssue("orphanAnnualValue", `${source}.value.outgoingNitrogen.value.${yearKey}`, year);
        }

        if (
          hasOrganicActivity &&
          wastewaterSanitation.sludgeRemovedSystemValues.includes(system as never)
        ) {
          if (!supplied(sludgeRemoved, yearKey)) {
            addIssue(
              "missingAnnualDependency",
              `${source}.value.${sludgeKey}.value.${yearKey}`,
              year
            );
          } else {
            const removed = numberValue(sludgeRemoved, yearKey);
            const incoming = numberValue(load, yearKey);
            if (removed !== undefined && incoming !== undefined && removed > incoming) {
              addIssue("RExceedInput", `${source}.value.${sludgeKey}.value.${yearKey}`, year);
              addIssue("RExceedInput", `${source}.value.${loadType}.value.${yearKey}`, year);
            }
          }
        } else if (
          supplied(sludgeRemoved, yearKey) &&
          numberValue(sludgeRemoved, yearKey) !== 0 &&
          !wastewaterSanitation.sludgeRemovedSystemValues.includes(system as never)
        ) {
          addIssue(
            "unsupportedWastewaterMethod",
            `${source}.value.${sludgeKey}.value.${yearKey}`,
            year
          );
        }

        if (
          supplied(recovery, yearKey) &&
          !wastewaterSanitation.methaneRecoverySystemValues.includes(system as never)
        ) {
          addIssue(
            "methaneRecoveryNotSupported",
            `${source}.value.methaneRecovery.value.${yearKey}`,
            year
          );
        }

        if (loadType === "unclassified" && hasOrganicActivity) {
          addWarning("wastewaterUnclassifiedDomesticProxyUsed", `${source}.loadType`, year);
        }

        const aquatic = system === "aquaticDischarge" || row.dischargesToWater === "yes";
        if ((hasOrganicActivity || hasNitrogen) && aquatic && !row.receivingWater) {
          addIssue("missingAnnualDependency", `${source}.receivingWater`, year);
        }
        if (aquatic && row.receivingWater === "unknown") {
          addWarning("wastewaterReceivingWaterTier1FallbackUsed", `${source}.receivingWater`, year);
        }

        if (
          hasOrganicActivity &&
          system !== "aquaticDischarge" &&
          row.dischargesToWater === "yes"
        ) {
          if (!row.effluentPath) {
            addIssue("missingAnnualDependency", `${source}.effluentPath`, year);
          } else if (row.effluentPath === "measuredOutgoingLoad" && !supplied(outgoing, yearKey)) {
            addIssue(
              "missingAnnualDependency",
              `${source}.value.${outgoingKey}.value.${yearKey}`,
              year
            );
          } else if (row.effluentPath === "treatmentLevel" && !row.effluentTreatmentLevel) {
            addIssue("invalidControlledValue", `${source}.effluentTreatmentLevel`, year);
          }
        }

        if (
          (hasNitrogen || hasAllocation) &&
          wastewaterSanitation.constructedWetlandSystemValues.includes(system as never) &&
          row.dischargesToWater === "yes"
        ) {
          if (supplied(outgoingNitrogen, yearKey)) {
            const outgoingValue = numberValue(outgoingNitrogen, yearKey);
            const nitrogenValue = numberValue(nitrogen, yearKey);
            if (
              outgoingValue !== undefined &&
              nitrogenValue !== undefined &&
              outgoingValue > nitrogenValue
            ) {
              addIssue("RExceedInput", `${source}.value.outgoingNitrogen.value.${yearKey}`, year);
              addIssue("RExceedInput", `${source}.value.nitrogen.value.${yearKey}`, year);
            }
          } else {
            addWarning(
              "wastewaterEffluentNitrogenNotEstimated",
              `${source}.value.outgoingNitrogen.value.${yearKey}`,
              year
            );
          }
        }
      });
    });
  }

  allocationTotals.forEach((total, yearKey) => {
    const year = yearFromKey(yearKey);
    if (total > 100) {
      for (const allocationPath of allocationPaths.get(yearKey) ?? []) {
        addIssue("populationAllocationExceeded", allocationPath, year);
      }
    } else if (total < 100) {
      addWarning("wastewaterPopulationUnallocated", TREATMENT_ROWS, year, {
        allocatedPercent: total,
        unallocatedPercent: 100 - total,
      });
    }
  });

  validateSludgeAndLandfills(input, years, issues, warnings);
  return { issues, warnings };
}

function validateSludgeAndLandfills(
  input: unknown,
  years: number[],
  issues: WastewaterValidationIssue[],
  warnings: WastewaterValidationWarning[]
) {
  const addIssue = (code: ReasonCode, target: string, year?: number) =>
    issues.push({ code, message: code, path: path(target), ...(year ? { year } : {}) });
  const addWarning = (code: WarningCode, target: string, details?: Record<string, unknown>) =>
    warnings.push({ code, path: path(target), ...(details ? { details } : {}) });
  const activeYearKeys = new Set(years.map((year) => `y-${year}`));
  const rows = at(input, SLUDGE_ROWS);
  const landfillMasses = new Map<string, number>();
  const referencedIds = new Set<string>();

  if (Array.isArray(rows)) {
    rows.forEach((rawRow, rowIndex) => {
      const row = record(rawRow);
      if (!row || row.withinMunicipalBoundary !== true) return;
      const source = `${SLUDGE_ROWS}.${rowIndex}`;
      const rowValues = record(row.value) ?? {};
      const mass = values(rowValues.mass);
      const massYears = Object.keys(mass).filter((yearKey) => activeYearKeys.has(yearKey));
      if (massYears.length === 0) return;
      const recovery = values(rowValues.methaneRecovery);

      Object.keys(recovery)
        .filter((yearKey) => activeYearKeys.has(yearKey))
        .forEach((yearKey) => {
          const year = yearFromKey(yearKey);
          if (!supplied(mass, yearKey)) {
            addIssue("orphanAnnualValue", `${source}.value.methaneRecovery.value.${yearKey}`, year);
          }
          if (row.destination === "anaerobicDigestion") {
            warnings.push({
              code: "wastewaterRecoveryIncludedInFactor",
              path: path(`${source}.value.methaneRecovery.value.${yearKey}`),
              ...(year ? { year } : {}),
            });
          } else if (row.destination !== "landfill") {
            addIssue(
              "methaneRecoveryNotSupported",
              `${source}.value.methaneRecovery.value.${yearKey}`,
              year
            );
          }
        });

      if (row.destination !== "landfill") return;
      const landfillId =
        typeof row.landfillIdentifier === "string" ? row.landfillIdentifier.trim() : "";
      if (!landfillId) {
        addIssue("missingLandfillSite", `${source}.landfillIdentifier`);
        return;
      }
      referencedIds.add(landfillId);
      if (!enumIncludes(wastewaterSanitation.sludgeTypeValues, row.sludgeType)) {
        addIssue("invalidControlledValue", `${source}.sludgeType`);
        return;
      }
      massYears.forEach((yearKey) => {
        const amount = numberValue(mass, yearKey);
        if (amount === undefined) return;
        const key = `${landfillId}:${row.sludgeType}:${yearKey}`;
        landfillMasses.set(key, (landfillMasses.get(key) ?? 0) + amount);
      });
    });
  }

  const sites = at(input, LANDFILL_SITES);
  const siteRows = Array.isArray(sites) ? sites : [];
  const seen = new Set<string>();
  const maxYear = Math.max(...years);

  siteRows.forEach((rawSite, siteIndex) => {
    const site = record(rawSite);
    if (!site) return;
    const source = `${LANDFILL_SITES}.${siteIndex}`;
    const landfillId =
      typeof site.landfillIdentifier === "string" ? site.landfillIdentifier.trim() : "";
    if (!landfillId) {
      addIssue("missingLandfillSite", `${source}.landfillIdentifier`);
      return;
    }
    if (seen.has(landfillId)) addIssue("landfillSiteConflict", `${source}.landfillIdentifier`);
    seen.add(landfillId);

    const commissioningYear = site.commissioningYear;
    if (!Number.isInteger(commissioningYear) || Number(commissioningYear) > maxYear) {
      addIssue("invalidRange", `${source}.commissioningYear`);
      return;
    }
    if (
      site.oxidationCover === "managedCoveredWithOxidizingMaterial" &&
      site.landfillSiteType !== "managedAnaerobic"
    ) {
      addIssue("landfillSiteConflict", `${source}.oxidationCover`);
    }

    const history = record(site.disposalHistory) ?? {};
    const domestic = values(history.domestic);
    const industrial = values(history.industrial);
    let complete = true;
    for (let year = Number(commissioningYear); year <= maxYear; year += 1) {
      const yearKey = `y-${year}`;
      if (!supplied(domestic, yearKey) || !supplied(industrial, yearKey)) complete = false;
    }
    if (!complete) {
      addWarning("wastewaterLandfillNotEstimated", `${source}.disposalHistory`, {
        landfillId,
        commissioningYear,
        throughYear: maxYear,
      });
      return;
    }

    years.forEach((year) => {
      const yearKey = `y-${year}`;
      for (const [sludgeType, series] of [
        ["domestic", domestic],
        ["industrial", industrial],
      ] as const) {
        const expected = landfillMasses.get(`${landfillId}:${sludgeType}:${yearKey}`) ?? 0;
        const actual = numberValue(series, yearKey);
        if (year >= Number(commissioningYear) && actual !== undefined && actual !== expected) {
          addIssue(
            "landfillHistoryMismatch",
            `${source}.disposalHistory.${sludgeType}.value.${yearKey}`,
            year
          );
        }
      }
    });
  });

  referencedIds.forEach((landfillId) => {
    if (!seen.has(landfillId)) {
      addWarning("wastewaterLandfillNotEstimated", LANDFILL_SITES, { landfillId });
    }
  });
}

export function getWastewaterCalculationReadinessPaths() {
  return [path(ROOT), path("sharedData.population")];
}
