type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const portRowKeys = ["leisure", "fishing", "other"] as const;
const publicTransportExploitationRowKeys = [
  "kmTravelled",
  "staff",
  "passengerKm",
  "passengers",
] as const;
const publicTransportRenewalRowKeys = ["scrapped", "purchased", "purchaseCost"] as const;
const publicTransportAgeRowKeys = ["age0to5", "age6to10", "age10plus"] as const;
const publicTransportFuelKeys = ["diesel", "petrol", "gpl", "gnv", "electricity"] as const;
const airTransportMovementColumnKeys = [/* "international", */ "national"] as const;
const airTransportEnergyKeys = [
  "buildingElectricity",
  "diesel",
  "petrol",
  "electricFleet",
  "kerosene",
] as const;
const territoryVehicleTypeKeys = [
  "motorcycles",
  "publicTransportVehicles",
  "mopeds",
  "agriculturalEquipment",
  "privateVehicles",
  "specialPurposeVehicles",
  "touristBuses",
  "heavyTrucks",
  "lightTrucks",
  "tractors",
  "tricycles",
  "quadricycles",
  "trailers",
  "semiTrailers",
  "microbuses",
  "ambulances",
  "taxis",
  "sharedTaxis",
  "touristTaxis",
] as const;
const territoryVehicleFuelKeys = [
  "diesel",
  "petrol",
  "gpl",
  "gnv",
  "electricity",
  "hybrid",
  "other",
] as const;
const territoryVehicleMeasureKeys = ["vehicles", "avgConsumption", "avgMileage"] as const;

const portUnits: UnitConf = {
  vesselCount: {
    default: [""],
  },
  fuelConsumption: {
    diesel: ["L"],
    marineDiesel: ["L"],
    heavyFuelOil: ["L"],
    LNG: ["Nm3"],
    electricity: ["kWh"],
  },
} as const;

const portFuels = ["diesel", "marineDiesel", "heavyFuelOil", "LNG", "electricity"] as const;

const publicTransportUnits: UnitConf = {
  exploitation: {
    kmTravelled: ["km"],
    staff: [""],
    passengerKm: ["p/km"],
    passengers: [""],
  },
  buses: {
    default: [""],
  },
  consumption: {
    diesel: ["L"],
    petrol: ["L"],
    gpl: ["L"],
    gnv: ["Nm3"],
    electricity: ["kWh"],
  },
  spend: {
    default: ["currency"],
  },
  renewal: {
    scrapped: [""],
    purchased: [""],
    purchaseCost: ["currency"],
  },
  age: {
    age0to5: [""],
    age6to10: [""],
    age10plus: [""],
  },
  future: {
    default: [""],
  },
} as const;

const airTransportUnits: UnitConf = {
  movements: {
    default: [""],
  },
  energy: {
    buildingElectricity: ["kWh"],
    diesel: ["L"],
    petrol: ["L"],
    electricFleet: ["kWh"],
    kerosene: ["L"],
  },
} as const;

const territoryVehicleUnits: UnitConf = {
  measures: {
    vehicles: [""],
    avgConsumption: ["L/100km", "kWh/100km", "Nm3/100km"],
    avgMileage: ["km/year"],
  },
} as const;

export const port = {
  rowKeys: portRowKeys,
  units: portUnits,
  fuels: portFuels,
};

export const publicTransport = {
  exploitationRowKeys: publicTransportExploitationRowKeys,
  fuelKeys: publicTransportFuelKeys,
  renewalRowKeys: publicTransportRenewalRowKeys,
  ageRowKeys: publicTransportAgeRowKeys,
  units: publicTransportUnits,
};

export const airTransport = {
  movementColumnKeys: airTransportMovementColumnKeys,
  energyKeys: airTransportEnergyKeys,
  units: airTransportUnits,
};

export const territoryVehicles = {
  vehicleTypeKeys: territoryVehicleTypeKeys,
  fuelKeys: territoryVehicleFuelKeys,
  measureKeys: territoryVehicleMeasureKeys,
  units: territoryVehicleUnits,
};
