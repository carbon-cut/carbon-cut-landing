type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const electricityRowKeys = ["consumption", "subscribers"] as const;

const electricityltColumnKeys = [
  "domestic",
  "commercial",
  "administration",
  "publicLighting",
  "agriculture",
  "smallIndustry",
  "workshops",
  "industries",
  "total",
] as const;

const electricityMtColumnKeys = [
  "extractive",
  "chemical",
  "textile",
  "food",
  "misc",
  "agriculture",
  "pumping",
  "tourism",
  "transportTelco",
  "total",
] as const;

const electricityHtColumnKeys = ["cement", "water", "industrialZone", "total"] as const;

const electricityUnits: UnitConf = {
  tensions: {
    consumption: ["GWh"],
    subscribers: [""],
  },
} as const;

export const electricity = {
  rowKeys: electricityRowKeys,
  ltColumnKeys: electricityltColumnKeys,
  mtColumnKeys: electricityMtColumnKeys,
  htColumnKeys: electricityHtColumnKeys,
  units: electricityUnits,
};

const photovoltaicRowKeys = ["subscribers", "capacity", "production", "balance"] as const;

const photovoltaicUnits: UnitConf = {
  tension: {
    subscribers: [""],
    capacity: ["kWc"],
    production: ["MWh"],
    balance: ["TND"],
  },
} as const;

export const photovoltaic = {
  btRowKeys: photovoltaicRowKeys,
  mtRowKeys: photovoltaicRowKeys,
  units: photovoltaicUnits,
};

const naturalGasRowKeys = ["consumption", "subscribers"] as const;

const naturalGasBpColumnKeys = ["households", "commerce", "services", "total"] as const;

const naturalGasMpColumnKeys = ["industry", "tourism", "agriculture", "total"] as const;

const naturalGasHpColumnKeys = ["powerPlant", "industrialHub", "total"] as const;

const naturalGasUnits: UnitConf = {
  tensions: {
    consumption: ["Nm3"],
    subscribers: [""],
  },
} as const;

export const naturalGas = {
  rowKeys: naturalGasRowKeys,
  bpColumnKeys: naturalGasBpColumnKeys,
  mpColumnKeys: naturalGasMpColumnKeys,
  hpColumnKeys: naturalGasHpColumnKeys,
  units: naturalGasUnits,
};

const solarWaterHeatingDefaultRowKeys = ["number", "area"] as const;

const solarWaterHeatingUnits: UnitConf = {
  default: {
    number: [""],
    area: ["m²"],
  },
} as const;

export const solarWaterHeating = {
  defaultRowKeys: solarWaterHeatingDefaultRowKeys,
  units: solarWaterHeatingUnits,
};
