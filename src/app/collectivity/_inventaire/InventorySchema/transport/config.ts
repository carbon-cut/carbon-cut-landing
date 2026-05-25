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
    default: ["TND"],
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
  fuelKeys: publicTransportFuelKeys,
  renewalRowKeys: publicTransportRenewalRowKeys,
  ageRowKeys: publicTransportAgeRowKeys,
  units: publicTransportUnits,
};
