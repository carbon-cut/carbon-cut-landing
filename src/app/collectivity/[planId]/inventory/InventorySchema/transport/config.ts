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
const territoryVehicleAllowedFuelsByType = {
  motorcycles: ["petrol", "electricity"],
  publicTransportVehicles: ["diesel", "gpl", "gnv", "electricity"],
  mopeds: ["petrol", "electricity"],
  agriculturalEquipment: ["diesel", "petrol"],
  privateVehicles: ["diesel", "petrol", "gpl", "gnv", "electricity"],
  specializedMachinery: ["diesel", "electricity"],
  touristBuses: ["diesel", "gnv", "electricity"],
  heavyTrucks: ["diesel", "electricity"],
  lightTrucks: ["diesel", "petrol", "gpl", "gnv", "electricity"],
  agriculturalTractors: ["diesel", "electricity"],
  tricycles: ["petrol", "electricity"],
  quadricycles: ["petrol", "electricity"],
  semiTrailerTractors: ["diesel", "electricity"],
  microbuses: ["diesel", "petrol", "gpl", "gnv", "electricity"],
  doubleDeckerCoaches: ["diesel", "gnv", "electricity"],
  emergencyInterventionVehicles: ["diesel", "petrol", "electricity"],
  taxis: ["diesel", "petrol", "gpl", "gnv", "electricity"],
  sharedTaxis: ["diesel", "petrol", "gpl", "gnv", "electricity"],
  touristTaxis: ["diesel", "petrol", "gpl", "gnv", "electricity"],
  motorbikes: ["petrol", "electricity"],
  specialVehicles: ["diesel", "petrol", "electricity"],
  mixedCars: ["diesel", "petrol", "gpl", "gnv", "electricity"],
} as const;
const territoryVehicleMeasureKeys = ["vehicles", "avgConsumption", "avgMileage"] as const;

const territoryVehicleConsumptionUnitByFuel = {
  diesel: "L/100km",
  petrol: "L/100km",
  gpl: "kg/100km",
  gnv: "Nm3/100km",
  electricity: "kWh/100km",
} as const;

const territoryVehicleRequiredDefaults = [
  { key: "privateVehicles", fuel: "petrol" },
  { key: "lightTrucks", fuel: "diesel" },
  { key: "heavyTrucks", fuel: "diesel" },
  { key: "publicTransportVehicles", fuel: "diesel" },
  { key: "taxis", fuel: "petrol" },
] as const;

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
    avgConsumption: ["L/100km", "kg/100km", "kWh/100km", "Nm3/100km"],
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
  allowedFuelsByType: territoryVehicleAllowedFuelsByType,
  fuelKeys: [...new Set(Object.values(territoryVehicleAllowedFuelsByType).flat())],
  measureKeys: territoryVehicleMeasureKeys,
  consumptionUnitByFuel: territoryVehicleConsumptionUnitByFuel,
  requiredDefaults: territoryVehicleRequiredDefaults,
  units: territoryVehicleUnits,
};

export function buildTerritoryVehicleDefaultRows(rows: unknown) {
  const currentRows = Array.isArray(rows)
    ? rows
        .filter((row) => row && typeof row === "object")
        .map((row) => {
          const record = row as Record<string, unknown>;

          if (typeof record.vehicleType === "string") {
            return record;
          }

          if (typeof record.key === "string") {
            return {
              ...record,
              vehicleType: record.key,
            };
          }

          return record;
        })
    : [];
  const existingTypes = new Set(
    currentRows
      .map((row) => (row as Record<string, unknown>).vehicleType)
      .filter(
        (value): value is keyof typeof territoryVehicleAllowedFuelsByType =>
          typeof value === "string"
      )
  );

  const seededRows = territoryVehicleRequiredDefaults
    .filter(({ key }) => !existingTypes.has(key))
    .map(({ key, fuel }) => ({
      vehicleType: key,
      protected: true,
      fuel,
      value: {
        vehicles: {
          value: {},
          unit: territoryVehicleUnits.measures.vehicles[0],
        },
        avgConsumption: {
          value: {},
          unit: territoryVehicleConsumptionUnitByFuel[fuel],
        },
        avgMileage: {
          value: {},
          unit: territoryVehicleUnits.measures.avgMileage[0],
        },
      },
    }));

  return [...seededRows, ...currentRows];
}
