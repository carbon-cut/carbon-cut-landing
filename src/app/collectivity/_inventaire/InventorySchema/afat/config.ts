type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const perennialPlantationMetricKeys = [
  "youngHectares",
  "adultHectares",
  "oldHectares",
  "youngTrees",
  "adultTrees",
  "oldTrees",
] as const;

const perennialPlantationUnits: UnitConf = {
  metrics: {
    youngHectares: ["ha"],
    adultHectares: ["ha"],
    oldHectares: ["ha"],
    youngTrees: [""],
    adultTrees: [""],
    oldTrees: [""],
  },
} as const;

const perennialPlantationPlantOptions = [
  "oliveTrees",
  "almondTrees",
  "palmTrees",
  "tableGrapes",
  "citrus",
  "applesPears",
  "apricots",
  "pomegranates",
  "figs",
  "quinces",
  "loquats",
  "peaches",
  "plums",
  "pistachios",
  "cherryTrees",
  "nutsAndOthers",
] as const;

export const perennialPlantationStock = {
  metricKeys: perennialPlantationMetricKeys,
  plantOptions: perennialPlantationPlantOptions,
  units: perennialPlantationUnits,
};

const livestockRowKeys = [
  "dairyCattle",
  "otherCattle",
  "sheep",
  "goats",
  "horses",
  "donkeysMules",
  "camels",
  "broilers",
  "layingHens",
  "turkeys",
] as const;

const livestockUnits: UnitConf = {
  headcount: {
    default: [""],
  },
  confinedTimeShare: {
    default: ["%"],
  },
} as const;

export const livestock = {
  rowKeys: livestockRowKeys,
  units: livestockUnits,
};

const fertilizerCommonRowKeys = ["ammonitrate", "dap", "compost", "sewageSludge"] as const;

const fertilizersUnits = {
  default: ["t"] as [string],
};

export const fertilizers = {
  commonRowKeys: fertilizerCommonRowKeys,
  units: fertilizersUnits,
};

const agriculturalProductionMeasureKeys = ["harvestedArea", "production"] as const;

const agriculturalProductionUnits: UnitConf = {
  measures: {
    harvestedArea: ["ha"],
    production: ["t"],
  },
} as const;

export const agriculturalProduction = {
  measureKeys: agriculturalProductionMeasureKeys,
  units: agriculturalProductionUnits,
};
