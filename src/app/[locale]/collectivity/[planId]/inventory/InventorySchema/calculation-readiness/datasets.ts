import { buildings, fleet, publicLighting } from "../municipal/config";
import { electricity, naturalGas } from "../energy/config";
import {
  fallbackActivityRule,
  getFallbackActivityRulePaths,
  validateFallbackActivityRule,
} from "./rules/fallback-activity";
import {
  atLeastOneFallbackActivityRule,
  getAtLeastOneFallbackActivityRulePaths,
  validateAtLeastOneFallbackActivityRule,
} from "./rules/at-least-one-fallback-activity";
import {
  atLeastOneSectorConsumptionRule,
  getAtLeastOneSectorConsumptionRulePaths,
  validateAtLeastOneSectorConsumptionRule,
} from "./rules/at-least-one-sector-consumption";
import {
  atLeastOneRecordColumnActivityRule,
  getAtLeastOneRecordColumnActivityRulePaths,
  validateAtLeastOneRecordColumnActivityRule,
} from "./rules/at-least-one-record-column-activity";
import { publicTransport } from "../transport/config";
import { getPath } from "./helpers";
import type { CalculationReadinessResult } from "./types";

const fleetRule = atLeastOneFallbackActivityRule({
  activityBasePath: fleet.calculation.activityBasePath,
  priceBasePath: fleet.calculation.priceBasePath,
  ...fleet.calculation.atLeastOneFallbackActivity,
});

const publicLightingRules = publicLighting.calculation.fallbackActivities.map((activity) =>
  fallbackActivityRule({
    activityBasePath: publicLighting.calculation.activityBasePath,
    priceBasePath: publicLighting.calculation.priceBasePath,
    ...activity,
  })
);

const buildingsRules = buildings.calculation.fallbackActivities.map((activity) =>
  fallbackActivityRule({
    activityBasePath: buildings.calculation.activityBasePath,
    priceBasePath: buildings.calculation.priceBasePath,
    ...activity,
  })
);

const electricityIndustryRule = atLeastOneSectorConsumptionRule({
  datasetBasePath: "energy.electricity.dataSet",
  ghostErrorPath: "energy.electricity.__readiness.industry",
  blocks: electricity.lines,
  sector: "industry",
});

const naturalGasTertiaryRule = atLeastOneSectorConsumptionRule({
  datasetBasePath: "energy.naturalGas.dataSet",
  ghostErrorPath: "energy.naturalGas.__readiness.tertiary",
  blocks: naturalGas.lines,
  sector: "tertiary",
});

const naturalGasIndustryRule = atLeastOneSectorConsumptionRule({
  datasetBasePath: "energy.naturalGas.dataSet",
  ghostErrorPath: "energy.naturalGas.__readiness.industry",
  blocks: naturalGas.lines,
  sector: "industry",
});

const airTransportNationalMovementsRule = atLeastOneRecordColumnActivityRule({
  datasetBasePath: "transport.airTransport.dataSet",
  recordsBasePath: "transport.airTransport.dataSet.movements",
  columnKey: "national",
  ghostErrorPath: "transport.airTransport.__readiness.national",
});

function getPublicTransportRules(values: unknown) {
  const operators = getPath(values, ["transport", "publicTransport", "dataSet"]);

  if (!Array.isArray(operators)) {
    return [];
  }

  return operators.map((_, index) =>
    atLeastOneFallbackActivityRule({
      activityBasePath: `transport.publicTransport.dataSet.${index}`,
      priceBasePath: "priceAssumptions.energy",
      physicalGroupKey: "consumption",
      monetaryGroupKey: "spend",
      keys: publicTransport.fuelKeys,
    })
  );
}

function toResult(
  issues: ReturnType<typeof validateFallbackActivityRule>
): CalculationReadinessResult {
  return issues.length > 0 ? { success: false, error: { issues } } : { success: true };
}

function isPublicTransportDatasetKey(datasetKey: string) {
  return datasetKey === "publicTransport";
}

export function validateDatasetCalculationReadiness(
  datasetKey: string,
  values: unknown
): CalculationReadinessResult {
  if (datasetKey === "fleet") {
    return toResult(validateAtLeastOneFallbackActivityRule(values, fleetRule));
  }

  if (datasetKey === "publicLighting") {
    return toResult(
      publicLightingRules.flatMap((rule) => validateFallbackActivityRule(values, rule))
    );
  }

  if (datasetKey === "buildings") {
    return toResult(buildingsRules.flatMap((rule) => validateFallbackActivityRule(values, rule)));
  }

  if (datasetKey === "electricity") {
    return toResult(validateAtLeastOneSectorConsumptionRule(values, electricityIndustryRule));
  }

  if (datasetKey === "naturalGas") {
    return toResult([
      ...validateAtLeastOneSectorConsumptionRule(values, naturalGasTertiaryRule),
      ...validateAtLeastOneSectorConsumptionRule(values, naturalGasIndustryRule),
    ]);
  }

  if (datasetKey === "airTransport") {
    return toResult(
      validateAtLeastOneRecordColumnActivityRule(values, airTransportNationalMovementsRule)
    );
  }

  if (isPublicTransportDatasetKey(datasetKey)) {
    return toResult(
      getPublicTransportRules(values).flatMap((rule) =>
        validateAtLeastOneFallbackActivityRule(values, rule)
      )
    );
  }

  return { success: true };
}

export function getDatasetCalculationReadinessPaths(datasetKey: string, values: unknown) {
  if (datasetKey === "fleet") {
    return getAtLeastOneFallbackActivityRulePaths(values, fleetRule);
  }

  if (datasetKey === "publicLighting") {
    return publicLightingRules.flatMap((rule) => getFallbackActivityRulePaths(values, rule));
  }

  if (datasetKey === "buildings") {
    return buildingsRules.flatMap((rule) => getFallbackActivityRulePaths(values, rule));
  }

  if (datasetKey === "electricity") {
    return getAtLeastOneSectorConsumptionRulePaths(electricityIndustryRule);
  }

  if (datasetKey === "naturalGas") {
    return [
      ...getAtLeastOneSectorConsumptionRulePaths(naturalGasTertiaryRule),
      ...getAtLeastOneSectorConsumptionRulePaths(naturalGasIndustryRule),
    ];
  }

  if (datasetKey === "airTransport") {
    return getAtLeastOneRecordColumnActivityRulePaths(airTransportNationalMovementsRule);
  }

  if (isPublicTransportDatasetKey(datasetKey)) {
    return getPublicTransportRules(values).flatMap((rule) =>
      getAtLeastOneFallbackActivityRulePaths(values, rule)
    );
  }

  return [];
}
