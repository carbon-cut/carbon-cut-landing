import { createYearValueDefaults } from "../_sharedDefaults";

type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const portFuelKeys = ["diesel"] as const;
const portElectricityKeys = ["electricityConsumption", "electricityBill"] as const;
const busesExploitationRowKeys = ["kmTravelled", "staff", "passengerKm", "passengers"] as const;
const busesRenewalRowKeys = ["scrapped", "purchased", "purchaseCost"] as const;
const busesAgeRowKeys = ["age0to5", "age6to10", "age10plus"] as const;
const busesFuelKeys = ["diesel", "petrol", "gpl", "gnv", "electricity"] as const;
const airTransportMovementColumnKeys = [/* "international", */ "national"] as const;
const airTransportEnergyKeys = [
  "buildingElectricity",
  "diesel",
  "petrol",
  "electricFleet",
  /* "kerosene", */
] as const;
const urbanRailEnergyKeys = ["electricity", "diesel"] as const;
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
  gnv: "kg/100km",
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

const busesUnits: UnitConf = {
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
    gnv: ["kg"],
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

const urbanRailUnits: UnitConf = {
  energy: {
    electricity: ["kWh", "MWh", "GWh"],
    diesel: ["L", "m3", "t"],
  },
  spend: {
    default: ["currency"],
  },
} as const;

const territoryVehicleUnits: UnitConf = {
  measures: {
    vehicles: [""],
    avgConsumption: ["L/100km", "kg/100km", "kWh/100km"],
    avgMileage: ["km/year"],
  },
} as const;

export const port = {
  fuelKeys: portFuelKeys,
  electricityKeys: portElectricityKeys,
  units: portUnits,
};

export const buses = {
  exploitationRowKeys: busesExploitationRowKeys,
  fuelKeys: busesFuelKeys,
  renewalRowKeys: busesRenewalRowKeys,
  ageRowKeys: busesAgeRowKeys,
  units: busesUnits,
};

export const airTransport = {
  movementColumnKeys: airTransportMovementColumnKeys,
  energyKeys: airTransportEnergyKeys,
  units: airTransportUnits,
};

export const urbanRail = {
  energyKeys: urbanRailEnergyKeys,
  units: urbanRailUnits,
};

export const territoryVehicles = {
  allowedFuelsByType: territoryVehicleAllowedFuelsByType,
  fuelKeys: [...new Set(Object.values(territoryVehicleAllowedFuelsByType).flat())],
  measureKeys: territoryVehicleMeasureKeys,
  consumptionUnitByFuel: territoryVehicleConsumptionUnitByFuel,
  requiredDefaults: territoryVehicleRequiredDefaults,
  units: territoryVehicleUnits,
};

export function buildTerritoryVehicleDefaultRows(rows: unknown, years: readonly number[]) {
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
      fuel,
      value: {
        vehicles: {
          value: createYearValueDefaults(years),
          unit: territoryVehicleUnits.measures.vehicles[0],
        },
        avgConsumption: {
          value: createYearValueDefaults(years),
          unit: territoryVehicleConsumptionUnitByFuel[fuel],
        },
        avgMileage: {
          value: createYearValueDefaults(years),
          unit: territoryVehicleUnits.measures.avgMileage[0],
        },
      },
    }));

  return [...seededRows, ...currentRows];
}
