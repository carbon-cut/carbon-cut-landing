const consumptionUnitByFuel: { [key: string]: [string, ...string[]] } = {
  petrol: ["L"],
  diesel: ["L"],
  gpl: ["L"],
  electricity: ["kWh"],
  gnv: ["Nm3"],
};
export const fleetFuelKeys = ["petrol", "diesel", "gpl", "electricity", "gnv"] as const;
export const fleetCarEngineKeys = [...fleetFuelKeys, "hybrid"] as const;
export const fleetCategoryKeys = ["service", "function", "serviceEngines", "other"] as const;

type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const fleetUnits: UnitConf = {
  vehicles: { default: [""] },
  consumption: Object.fromEntries(fleetFuelKeys.map((key) => [key, consumptionUnitByFuel[key]])),
  spend: { default: ["$"] },
  composition: { default: [""] },
} as const;

export { fleetUnits };
