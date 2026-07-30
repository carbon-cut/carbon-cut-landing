type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const portFuelKeys = ["diesel"] as const;
const portElectricityKeys = ["electricityConsumption", "electricityBill"] as const;
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
  "specializedMachinery",
  "touristBuses",
  "heavyTrucks",
  "lightTrucks",
  "agriculturalTractors",
  "tricycles",
  "quadricycles",
  "trailers",
  "semiTrailerTractors",
  "microbuses",
  "ambulances",
  "taxis",
  "sharedTaxis",
  "touristTaxis",
  "motorbikes",
  "specialVehicles",
  "mixedCars",
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
  fuelConsumption: {
    diesel: ["L"],
  },
  electricityConsumption: {
    electricityConsumption: ["kWh"],
    electricityBill: ["currency"],
  },
} as const;

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
    gpl: ["kg"],
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
  fuelKeys: portFuelKeys,
  electricityKeys: portElectricityKeys,
  units: portUnits,
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
