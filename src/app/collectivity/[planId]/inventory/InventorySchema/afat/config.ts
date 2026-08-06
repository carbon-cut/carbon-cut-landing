type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const trackedTreeCropMetricKeys = [
  "youngHectares",
  "adultHectares",
  "senescentHectares",
  "youngTrees",
  "adultTrees",
  "senescentTrees",
] as const;

const trackedTreeCropUnits: UnitConf = {
  metrics: {
    youngHectares: ["ha"],
    adultHectares: ["ha"],
    senescentHectares: ["ha"],
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
    "youngHectares",
    "adultHectares",
    "senescentHectares",
  ] as const,
  units: trackedTreeCropUnits,
};

const livestockUnits: UnitConf = {
  count: {
    default: [""],
  },
  confinedTimeShare: {
    default: ["%"],
  },
} as const;

export const livestock = {
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
