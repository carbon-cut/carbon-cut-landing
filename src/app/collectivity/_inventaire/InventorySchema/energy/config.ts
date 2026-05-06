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
