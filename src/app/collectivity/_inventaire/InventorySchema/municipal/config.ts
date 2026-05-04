type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const consumptionUnitByFuel: { [key: string]: [string, ...string[]] } = {
  petrol: ["L"],
  diesel: ["L"],
  gpl: ["L"],
  electricity: ["kWh"],
  gnv: ["Nm3"],
};
const fleetFuelKeys = ["petrol", "diesel", "gpl", "electricity", "gnv"] as const;
const fleetCarEngineKeys = [...fleetFuelKeys, "hybrid"] as const;
const fleetCategoryKeys = ["service", "function", "serviceEngines", "other"] as const;

const fleetUnits: UnitConf = {
  vehicles: { default: [""] },
  consumption: consumptionUnitByFuel,
  spend: { default: ["$"] },
  composition: { default: [""] },
} as const;

export const fleet = {
  units: fleetUnits,
  fuelKeys: fleetFuelKeys,
  categoryKeys: fleetCategoryKeys,
  carEngineKeys: fleetCarEngineKeys,
};

const publicLightingInfrastructureKeys = ["cabinets", "meters", "dimmers", "power"] as const;
const publicLightingLampKeys = ["shp", "hpl", "led"] as const;
const publicLightingLampCols = ["unitPower", "number"] as const;
const publicLightingYearlyKeys = ["consumption", "bill"] as const;

const publicLightingUnits: UnitConf = {
  infrastructure: {
    cabinets: [""],
    meters: [""],
    dimmers: [""],
    power: ["kW"],
  },
  lamps: {
    unitPower: ["W"],
    number: [""],
  },
  yearly: {
    consumption: ["kWh"],
    bill: ["$"],
  },
} as const;

export const publicLighting = {
  infrastructureKeys: publicLightingInfrastructureKeys,
  lampKeys: publicLightingLampKeys,
  lampCols: ["unitPower", "number"] as const,
  yearlyKeys: publicLightingYearlyKeys,
  units: publicLightingUnits,
};
