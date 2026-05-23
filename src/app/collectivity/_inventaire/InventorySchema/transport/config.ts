type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const portRowKeys = ["leisure", "fishing", "other"] as const;
const publicTransportExploitationRowKeys = [
  "buses",
  "fuelConsumption",
  "fuelSpend",
  "kmTravelled",
  "staff",
  "passengerKm",
  "passengers",
] as const;
const publicTransportRenewalRowKeys = ["scrapped", "purchased", "purchaseCost"] as const;
const publicTransportAgeRowKeys = ["age0to5", "age6to10", "age10plus"] as const;

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
    buses: [""],
    fuelConsumption: ["L"],
    fuelSpend: ["TND"],
    kmTravelled: ["km"],
    staff: [""],
    passengerKm: ["p/km"],
    passengers: [""],
  },
  renewal: {
    scrapped: [""],
    purchased: [""],
    purchaseCost: ["TND"],
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

export const port = {
  rowKeys: portRowKeys,
  units: portUnits,
  fuels: portFuels,
};

export const publicTransport = {
  exploitationRowKeys: publicTransportExploitationRowKeys,
  renewalRowKeys: publicTransportRenewalRowKeys,
  ageRowKeys: publicTransportAgeRowKeys,
  units: publicTransportUnits,
};
