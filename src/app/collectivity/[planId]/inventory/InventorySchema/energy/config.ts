import type { TerritorialEnergyLineDefinitions } from "./territorial-energy";

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
  "otherIndustries",
  "agriculture",
  "pumping",
  "tourism",
  "transportTelco",
  "total",
] as const;

const electricityHtColumnKeys = ["cement", "water", "industrialZone", "total"] as const;

const electricityLtLines = {
  domestic: { sector: "residential", required: true },
  commercial: { sector: "tertiary", required: true },
  administration: { sector: "tertiary", required: true },
  publicLighting: { sector: "tertiary", required: true },
  agriculture: { sector: "agriculture" },
  smallIndustry: { sector: "industry" },
  workshops: { sector: "industry" },
  industries: { sector: "industry" },
} as const satisfies TerritorialEnergyLineDefinitions;

const electricityMtLines = {
  extractive: { sector: "industry" },
  chemical: { sector: "industry" },
  textile: { sector: "industry" },
  food: { sector: "industry" },
  otherIndustries: { sector: "industry" },
  agriculture: { sector: "agriculture" },
  pumping: { sector: "agriculture" },
  tourism: { sector: "tertiary" },
  transportTelco: { sector: "transport" },
} as const satisfies TerritorialEnergyLineDefinitions;

const electricityHtLines = {
  cement: { sector: "industry" },
  water: { sector: "tertiary" },
  industrialZone: { sector: "industry" },
} as const satisfies TerritorialEnergyLineDefinitions;

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
  lines: {
    lt: electricityLtLines,
    mt: electricityMtLines,
    ht: electricityHtLines,
  },
  units: electricityUnits,
};

const photovoltaicRowKeys = ["subscribers", "capacity", "production", "balance"] as const;

const photovoltaicUnits: UnitConf = {
  tension: {
    subscribers: [""],
    capacity: ["kWc"],
    production: ["MWh"],
    balance: ["currency"],
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

const naturalGasBpLines = {
  households: { sector: "residential", required: true },
  commerce: { sector: "tertiary" },
  services: { sector: "tertiary" },
} as const satisfies TerritorialEnergyLineDefinitions;

const naturalGasMpLines = {
  industry: { sector: "industry" },
  tourism: { sector: "tertiary" },
  agriculture: { sector: "agriculture" },
} as const satisfies TerritorialEnergyLineDefinitions;

const naturalGasHpLines = {
  powerPlant: { sector: "industry" },
  industrialHub: { sector: "industry" },
} as const satisfies TerritorialEnergyLineDefinitions;

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
  lines: {
    bp: naturalGasBpLines,
    mp: naturalGasMpLines,
    hp: naturalGasHpLines,
  },
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
