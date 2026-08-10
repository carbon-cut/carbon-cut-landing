type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const populationMetricKeys = ["count"] as const;

const populationUnits: UnitConf = {
  dataSet: {
    count: ["capita"],
  },
} as const;

const householdEnergyUnits: UnitConf = {
  assumptions: {
    consumptionNorm: ["tep/capita"],
  },
} as const;

export const sharedData = {
  population: {
    metricKeys: populationMetricKeys,
    units: populationUnits,
  },
  householdEnergy: {
    units: householdEnergyUnits,
  },
};
