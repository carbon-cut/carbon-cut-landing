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
  gnv: ["kg"],
};
const fleetFuelKeys = ["petrol", "diesel", "gpl", "electricity", "gnv"] as const;
const fleetCarEngineKeys = [...fleetFuelKeys, "hybrid"] as const;
const fleetCategoryKeys = ["service", "function", "serviceEngines", "other"] as const;

const fleetUnits: UnitConf = {
  vehicles: { default: [""] },
  consumption: consumptionUnitByFuel,
  spend: { default: ["currency"] },
  composition: { default: [""] },
} as const;

export const fleet = {
  units: fleetUnits,
  fuelKeys: fleetFuelKeys,
  categoryKeys: fleetCategoryKeys,
  carEngineKeys: fleetCarEngineKeys,
  calculation: {
    activityBasePath: "municipal.fleet.dataSet",
    priceBasePath: "priceAssumptions.energy",
    atLeastOneFallbackActivity: {
      physicalGroupKey: "consumption",
      monetaryGroupKey: "spend",
      keys: fleetFuelKeys,
    },
  },
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
    bill: ["currency"],
  },
} as const;

export const publicLighting = {
  infrastructureKeys: publicLightingInfrastructureKeys,
  lampKeys: publicLightingLampKeys,
  lampCols: ["unitPower", "number"] as const,
  yearlyKeys: publicLightingYearlyKeys,
  units: publicLightingUnits,
  calculation: {
    activityBasePath: "municipal.publicLighting.dataSet.yearly",
    priceBasePath: "priceAssumptions.energy",
    fallbackActivities: [
      {
        physicalKey: "consumption",
        monetaryKey: "bill",
        priceKey: "electricity",
      },
    ],
  },
};

const buildingsAreaKeys = ["building", "openSurface", "closedSurface"] as const;

const buildingsConsumptionKeys = [
  "electricityConsumption",
  "electricityBill",
  "gasConsumption",
  "gasBill",
  "dieselConsumption",
  "dieselBill",
  //"otherConsumption",
  //"otherBill",
] as const;

const buildingsUnits: UnitConf = {
  areas: {
    building: [""],
    openSurface: ["m²"],
    closedSurface: ["m²"],
  },
  consumption: {
    electricityConsumption: ["kWh"],
    electricityBill: ["currency"],
    gasConsumption: ["Nm3"],
    gasBill: ["currency"],
    dieselConsumption: ["L"],
    dieselBill: ["currency"],
    //otherConsumption: [""],
    //otherBill: ["currency"],
  },
} as const;

export const buildings = {
  areaKeys: buildingsAreaKeys,
  consumptionKeys: buildingsConsumptionKeys,
  units: buildingsUnits,
  calculation: {
    activityBasePath: "municipal.buildings.dataSet.consumption",
    priceBasePath: "priceAssumptions.energy",
    fallbackActivities: [
      {
        physicalKey: "electricityConsumption",
        monetaryKey: "electricityBill",
        priceKey: "electricity",
      },
    ],
  },
};

const treesParksWasteYearlyKeys = [
  "treeCanopyArea",
  "urbanTrees",
  "greenWaste",
  "composting",
  "controlledLandfill",
  "uncontrolledLandfill",
] as const;

const treesParksWasteUnits: UnitConf = {
  yearly: {
    treeCanopyArea: ["ha"],
    urbanTrees: [""],
    greenWaste: ["t"],
    composting: ["t"],
    controlledLandfill: ["t"],
    uncontrolledLandfill: ["t"],
  },
} as const;

export const treesParksWaste = {
  yearlyKeys: treesParksWasteYearlyKeys,
  units: treesParksWasteUnits,
};
