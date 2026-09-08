type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const trackedTreeCropMetricKeys = [
  "youngTreeCanopyArea",
  "adultTreeCanopyArea",
  "senescentTreeCanopyArea",
  "youngTrees",
  "adultTrees",
  "senescentTrees",
] as const;

const trackedTreeCropUnits: UnitConf = {
  metrics: {
    youngTreeCanopyArea: ["ha"],
    adultTreeCanopyArea: ["ha"],
    senescentTreeCanopyArea: ["ha"],
    youngTrees: [""],
    adultTrees: [""],
    senescentTrees: [""],
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

export const trees = {
  trackedTreeCropOptions: perennialPlantationPlantOptions,
  trackedTreeCropMetricKeys: trackedTreeCropMetricKeys,
  trackedTreeCropOptionalMetricKeys: [
    "youngTrees",
    "adultTrees",
    "senescentTrees",
  ] as const,
  units: trackedTreeCropUnits,
};

const livestockUnits: UnitConf = {
  count: {
    default: [""],
  },
  manureManagementShares: {
    default: ["%"],
  },
} as const;

const livestockKeys = [
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

const manureManagementAnimalKeys = [
  "dairyCattle",
  "otherCattle",
  "sheep",
  "goats",
  "horses",
  "donkeysMules",
  "camels",
] as const;

const poultryManureManagementAnimalKeys = ["broilers", "layingHens", "turkeys"] as const;

const manureManagementSystemKeys = [
  "solidStorage",
  "liquidSlurry",
  "dryLot",
  "pastureRangePaddock",
] as const;

const poultryManureManagementSystemKeys = [
  "poultryManureWithLitter",
  "poultryManureWithoutLitter",
  "dryLot",
  "anaerobicLagoon",
  "pastureRangePaddock",
] as const;

export const livestock = {
  keys: livestockKeys,
  manureManagementAnimalKeys,
  manureManagementSystemKeys,
  poultryManureManagementAnimalKeys,
  poultryManureManagementSystemKeys,
  units: livestockUnits,
};

const fertilizerKeys = ["ammonitrate", "dap", "urea"] as const;

const fertilizersUnits: UnitConf = {
  quantity: {
    default: ["t"],
  },
  tenure: {
    default: ["%"],
  },
} as const;

export const fertilizers = {
  keys: fertilizerKeys,
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
