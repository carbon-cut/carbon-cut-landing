type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const organicLoadKeys = ["domestic", "industrial", "unclassified"] as const;
const sludgeRemovedKeys = [
  "sludgeRemovedDomestic",
  "sludgeRemovedIndustrial",
  "sludgeRemovedUnclassified",
] as const;
const treatmentLoadKeys = [...organicLoadKeys, ...sludgeRemovedKeys] as const;
const sludgeRemovedKeyByOrganicLoadKey = {
  domestic: "sludgeRemovedDomestic",
  industrial: "sludgeRemovedIndustrial",
  unclassified: "sludgeRemovedUnclassified",
} as const;
const treatmentAdditionalKeys = ["nitrogen", "methaneRecovery", "populationAllocation"] as const;
const outgoingLoadKeys = [
  "outgoingDomestic",
  "outgoingIndustrial",
  "outgoingUnclassified",
] as const;
const outgoingLoadKeyByOrganicLoadKey = {
  domestic: "outgoingDomestic",
  industrial: "outgoingIndustrial",
  unclassified: "outgoingUnclassified",
} as const;
const treatmentValueKeys = [
  ...treatmentLoadKeys,
  ...treatmentAdditionalKeys,
  ...outgoingLoadKeys,
] as const;
const receivingWaterValues = ["otherAquatic", "reservoirLakeEstuary"] as const;
const yesNoValues = ["no", "yes"] as const;
const effluentPathValues = ["measuredOutgoingLoad", "treatmentLevel"] as const;
const effluentTreatmentLevelValues = [
  "untreated",
  "primaryMechanical",
  "secondaryBiological",
  "advancedBiological",
  "notEstimated",
] as const;
const biologicalTreatmentValues = ["standard", "advanced"] as const;
const receivingWaterConditionValues = ["normalOrUnknown", "nutrientImpactedOrHypoxic"] as const;
const sludgeValueKeys = ["mass", "methaneRecovery", "nitrogenApplied"] as const;
const populationFallbackMetricKeys = ["connectionPercentage"] as const;
const populationFallbackRowKeys = ["utility"] as const;
const treatmentSystemValues = [
  "centralizedAerobic",
  "anaerobicReactor",
  "anaerobicShallowFacultativeLagoon",
  "anaerobicDeepLagoon",
  "constructedWetlandSurfaceFlow",
  "constructedWetlandHorizontalSubsurfaceFlow",
  "constructedWetlandVerticalSubsurfaceFlow",
  "septicTank",
  "septicTankLandDispersal",
  "stagnantSewer",
  "flowingSewer",
  "latrineDryHousehold",
  "latrineDryCommunal",
  "latrineWetOrFlush",
  "aquaticDischarge",
] as const;
const sludgeRemovedSystemValues = [
  "centralizedAerobic",
  "anaerobicShallowFacultativeLagoon",
  "septicTank",
  "septicTankLandDispersal",
] as const;
const automaticEffluentDefaultSystemValues = [
  "septicTank",
  "septicTankLandDispersal",
  "latrineDryHousehold",
  "latrineDryCommunal",
  "latrineWetOrFlush",
] as const;
const sludgeDestinationKeys = [
  "anaerobicDigestion",
  "composting",
  "landfill",
  "incineration",
  "landApplication",
  "notEstimated",
] as const;

const wastewaterUnits: UnitConf = {
  organicLoad: {
    domestic: ["kg BOD"],
    industrial: ["kg COD"],
    unclassified: ["kg BOD"],
    sludgeRemovedDomestic: ["kg BOD"],
    sludgeRemovedIndustrial: ["kg COD"],
    sludgeRemovedUnclassified: ["kg BOD"],
    nitrogen: ["kg N"],
    methaneRecovery: ["kg CH4"],
    populationAllocation: ["%"],
    outgoingDomestic: ["kg BOD"],
    outgoingIndustrial: ["kg COD"],
    outgoingUnclassified: ["kg BOD"],
  },
  sludgeMass: {
    mass: ["t wet sludge"],
    methaneRecovery: ["kg CH4"],
    nitrogenApplied: ["kg N"],
  },
  populationFallback: {
    connectionPercentage: ["%"],
  },
} as const;

export const wastewaterSanitation = {
  organicLoadKeys,
  sludgeRemovedKeys,
  treatmentLoadKeys,
  treatmentAdditionalKeys,
  treatmentValueKeys,
  outgoingLoadKeys,
  outgoingLoadKeyByOrganicLoadKey,
  sludgeRemovedKeyByOrganicLoadKey,
  receivingWaterValues,
  yesNoValues,
  effluentPathValues,
  effluentTreatmentLevelValues,
  biologicalTreatmentValues,
  receivingWaterConditionValues,
  sludgeValueKeys,
  populationFallbackMetricKeys,
  populationFallbackRowKeys,
  treatmentSystemValues,
  sludgeRemovedSystemValues,
  automaticEffluentDefaultSystemValues,
  sludgeDestinationKeys,
  units: wastewaterUnits,
};
