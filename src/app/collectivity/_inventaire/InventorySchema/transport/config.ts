type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const portRowKeys = ["leisure", "fishing", "other"] as const;

const portUnits: UnitConf = {
  vesselCount: {
    default: [""],
  },
  fuelConsumption: {
    default: ["L"],
  },
} as const;

export const port = {
  rowKeys: portRowKeys,
  units: portUnits,
};
