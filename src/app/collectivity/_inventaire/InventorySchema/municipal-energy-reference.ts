import { number, z, ZodEnum, ZodString, type ZodRawShape, type ZodTypeAny } from "zod";

/*
  Standalone reference copy of the inventory schema pieces for:
  - _shared helpers
  - municipal schema
  - energy schema
  - transport port schema

  This file is intentionally separate from the production schema modules.
*/

type Year = `y-${number}${number}${number}${number}`;
const yearSchema = z.string().regex(/^y-\d{4}$/) as z.ZodType<Year>;
const currentYear = new Date().getFullYear();
const futureYearSchema = yearSchema.refine((value) => Number(value.slice(2)) >= currentYear, {
  message: "Year cannot be later than the current year",
});

const numberSchema = z.coerce.number({ errorMap: () => ({ message: "Required" }) });
const numberByYearSchema = z.record(yearSchema, numberSchema);

const metadataSourceTypeValues = ["invoice", "report", "excel", "manual", "estimate"] as const;
const metadataQualityStatusValues = ["missing", "provided", "estimated", "verified"] as const;
const metadataConfidenceValues = ["low", "medium", "high"] as const;

const metadata = z.object({
  source: z.object({
    organization: z.string().optional(),
    documentName: z.string().optional(),
    contactPerson: z.string().optional(),
    collectionDate: z.string().optional(),
    sourceType: z.enum(metadataSourceTypeValues).optional(),
    documents: z.array(z.instanceof(File)).optional(),
  }),
  quality: z.object({
    status: z.enum(metadataQualityStatusValues).optional(),
    confidence: z.enum(metadataConfidenceValues).optional(),
    comment: z.string().optional(),
  }),
});

const constructUnit = (input: [string, ...string[]]) => {
  return z.enum(input).default(input[0]);
};

type NonEmptyStringArray = [string, ...string[]];
type MatrixSchemaOptions =
  | {
      unit: NonEmptyStringArray;
      unitsByKeys?: never;
      unitsByCols?: never;
    }
  | {
      unit?: never;
      unitsByKeys: Record<string, NonEmptyStringArray>;
      unitsByCols?: never;
    };
type GridSchemaOptions =
  | MatrixSchemaOptions
  | {
      unit?: never;
      unitsByKeys?: never;
      unitsByCols: Record<string, NonEmptyStringArray>;
    };

const createGroupSchema = <Shape extends ZodRawShape>(shape: Shape) => {
  return z.object(shape).strict();
};

const createGridSchema = (
  keys: readonly string[],
  nestedKeys: readonly string[],
  GridSchemaOptions: GridSchemaOptions
) => {
  const { unit, unitsByKeys, unitsByCols } = GridSchemaOptions;
  return z.object(
    Object.fromEntries(
      keys.map((key) => [
        key,
        z.object(
          Object.fromEntries(
            nestedKeys.map((nestedKey) => [
              nestedKey,
              z.object({
                value: numberByYearSchema,
                unit: constructUnit(unit ?? unitsByKeys?.[key] ?? unitsByCols![nestedKey]),
              }),
            ])
          )
        ),
      ])
    )
  );
};

const createMatrixSchema = (
  keys: readonly string[],
  MatrixSchemaOptions: MatrixSchemaOptions,
  type: ZodEnum<[string, ...string[]]> | ZodString | undefined = undefined
) => {
  const { unit, unitsByKeys } = MatrixSchemaOptions;
  return z.object(
    Object.fromEntries(
      keys.map((key) => [
        key,
        z.object({
          value: numberByYearSchema,
          unit: constructUnit(unit ?? unitsByKeys![key]),
          type: type ?? z.undefined(),
        }),
      ])
    )
  );
};

const createRecordMatrixSchema = (
  keys: ZodString | ZodEnum<[string, ...string[]]>,
  MatrixSchemaOptions: MatrixSchemaOptions,
  type: ZodEnum<[string, ...string[]]> | ZodString | undefined = undefined
) => {
  const { unit } = MatrixSchemaOptions;

  return z.array(
    z.object({
      key: keys,
      value: z.object({
        value: numberByYearSchema,
        unit: constructUnit(unit ?? ["null"]),
        type: type ?? z.undefined(),
      }),
    })
  );
};

type UnitConf = {
  [key: string]: {
    [key: string]: [string, ...string[]];
  };
};

const consumptionUnitByFuel: { [key: string]: [string, ...string[]] } = {
  petrol: ["L"],
  diesel: ["L"],
  gpl: ["L"],
  electricity: ["kWh"],
  gnv: ["Nm3"],
};
const fleetFuelKeys = ["petrol", "diesel", "gpl", "electricity", "gnv"] as const;
const fleetCarEngineKeys = [...fleetFuelKeys, "hybrid"] as const;
const fleetCategoryKeys = ["service", "function", "serviceEngines", "other"] as const;

const fleetUnits: UnitConf = {
  vehicles: { default: [""] },
  consumption: consumptionUnitByFuel,
  spend: { default: ["$"] },
  composition: { default: [""] },
} as const;

const fleet = {
  units: fleetUnits,
  fuelKeys: fleetFuelKeys,
  categoryKeys: fleetCategoryKeys,
  carEngineKeys: fleetCarEngineKeys,
};

const publicLightingInfrastructureKeys = ["cabinets", "meters", "dimmers", "power"] as const;
const publicLightingLampKeys = ["shp", "hpl", "led"] as const;
const publicLightingLampCols = ["unitPower", "number"] as const;
const publicLightingYearlyKeys = ["consumption", "bill"] as const;

const publicLightingUnits: UnitConf = {
  infrastructure: {
    cabinets: [""],
    meters: [""],
    dimmers: [""],
    power: ["kW"],
  },
  lamps: {
    unitPower: ["W"],
    number: [""],
  },
  yearly: {
    consumption: ["kWh"],
    bill: ["$"],
  },
} as const;

const publicLighting = {
  infrastructureKeys: publicLightingInfrastructureKeys,
  lampKeys: publicLightingLampKeys,
  lampCols: ["unitPower", "number"] as const,
  yearlyKeys: publicLightingYearlyKeys,
  units: publicLightingUnits,
};

const buildingsAreaKeys = ["building", "openSurface", "closedSurface"] as const;

const buildingsConsumptionKeys = [
  "electricityConsumption",
  "electricityBill",
  "gasConsumption",
  "gasBill",
  "dieselConsumption",
  "dieselBill",
] as const;

const buildingsUnits: UnitConf = {
  areas: {
    building: [""],
    openSurface: ["m²"],
    closedSurface: ["m²"],
  },
  consumption: {
    electricityConsumption: ["kWh"],
    electricityBill: ["$"],
    gasConsumption: ["Nm3"],
    gasBill: ["$"],
    dieselConsumption: ["L"],
    dieselBill: ["$"],
  },
} as const;

const buildings = {
  areaKeys: buildingsAreaKeys,
  consumptionKeys: buildingsConsumptionKeys,
  units: buildingsUnits,
};

const treesParksWasteYearlyKeys = [
  "urbanTrees",
  "greenWaste",
  "composting",
  "controlledLandfill",
  "uncontrolledLandfill",
] as const;

const treesParksWasteUnits: UnitConf = {
  yearly: {
    urbanTrees: [""],
    greenWaste: ["t"],
    composting: ["t"],
    controlledLandfill: ["t"],
    uncontrolledLandfill: ["t"],
  },
} as const;

const treesParksWaste = {
  yearlyKeys: treesParksWasteYearlyKeys,
  units: treesParksWasteUnits,
};

/*
  Port rows are dynamic in the app: users can add custom rows.
  The UI initializes and protects these default vessel category rows.
*/
const portDefaultRowKeys = ["leisure", "fishing", "other"] as const;
const portFuelValues = ["diesel", "marineDiesel", "heavyFuelOil", "LNG", "electricity"] as const;

const portUnits: UnitConf = {
  vesselCount: {
    default: [""],
  },
  fuelConsumption: {
    default: ["L"],
  },
} as const;

const port = {
  defaultRowKeys: portDefaultRowKeys,
  fuels: portFuelValues,
  units: portUnits,
};

const fleetSchema = z.object({
  dataSet: z.object({
    vehicles: createMatrixSchema(fleet.carEngineKeys, { unit: fleet.units.vehicles.default }),
    consumption: createMatrixSchema(fleet.fuelKeys, { unitsByKeys: fleet.units.consumption }),
    spend: createMatrixSchema(fleet.fuelKeys, { unit: fleet.units.spend.default }),
    composition: createGridSchema(fleet.categoryKeys, fleet.carEngineKeys, {
      unit: fleet.units.composition.default,
    }),
  }),
  metadata,
});

const publicLightingSchema = z.object({
  dataSet: z.object({
    infrastructure: createMatrixSchema(publicLighting.infrastructureKeys, {
      unitsByKeys: publicLighting.units.infrastructure,
    }),
    lamps: createGridSchema(publicLighting.lampKeys, publicLighting.lampCols, {
      unitsByCols: publicLighting.units.lamps,
    }),
    yearly: createMatrixSchema(publicLighting.yearlyKeys, {
      unitsByKeys: publicLighting.units.yearly,
    }),
  }),
  metadata,
});

const buildingsSchema = z.object({
  dataSet: z.object({
    areas: createMatrixSchema(buildings.areaKeys, { unitsByKeys: buildings.units.areas }),
    consumption: createMatrixSchema(buildings.consumptionKeys, {
      unitsByKeys: buildings.units.consumption,
    }),
  }),
  metadata,
});

const treesParksWasteSchema = z.object({
  dataSet: createMatrixSchema(treesParksWaste.yearlyKeys, {
    unitsByKeys: treesParksWaste.units.yearly,
  }),
  metadata,
});

const portSchema = z.object({
  dataSet: z.object({
    concernedPorts: z.array(
      z.object({
        key: z.string(),
      })
    ),
    vesselCount: createRecordMatrixSchema(z.string(), { unit: port.units.vesselCount.default }),
    fuelConsumption: createRecordMatrixSchema(
      z.string(),
      {
        unit: port.units.fuelConsumption.default,
      },
      z.enum(port.fuels)
    ),
  }),
  metadata,
});

const municipalSchema = createGroupSchema({
  fleet: fleetSchema,
  publicLighting: publicLightingSchema,
  buildings: buildingsSchema,
  treesParksWaste: treesParksWasteSchema,
});

const electricityRowKeys = ["consumption", "subscribers"] as const;

const electricityltColumnKeys = [
  "domestic",
  "commercial",
  "administration",
  "publicLighting",
  "agriculture",
  "smallIndustry",
  "workshops",
  "industries",
  "total",
] as const;

const electricityMtColumnKeys = [
  "extractive",
  "chemical",
  "textile",
  "food",
  "misc",
  "agriculture",
  "pumping",
  "tourism",
  "transportTelco",
  "total",
] as const;

const electricityHtColumnKeys = ["cement", "water", "industrialZone", "total"] as const;

const electricityUnits: UnitConf = {
  tensions: {
    consumption: ["GWh"],
    subscribers: [""],
  },
} as const;

const electricity = {
  rowKeys: electricityRowKeys,
  ltColumnKeys: electricityltColumnKeys,
  mtColumnKeys: electricityMtColumnKeys,
  htColumnKeys: electricityHtColumnKeys,
  units: electricityUnits,
};

const photovoltaicRowKeys = ["subscribers", "capacity", "production", "balance"] as const;

const photovoltaicUnits: UnitConf = {
  tension: {
    subscribers: [""],
    capacity: ["kWc"],
    production: ["MWh"],
    balance: ["TND"],
  },
} as const;

const photovoltaic = {
  btRowKeys: photovoltaicRowKeys,
  mtRowKeys: photovoltaicRowKeys,
  units: photovoltaicUnits,
};

const naturalGasRowKeys = ["consumption", "subscribers"] as const;

const naturalGasBpColumnKeys = ["households", "commerce", "services", "total"] as const;

const naturalGasMpColumnKeys = ["industry", "tourism", "agriculture", "total"] as const;

const naturalGasHpColumnKeys = ["powerPlant", "industrialHub", "total"] as const;

const naturalGasUnits: UnitConf = {
  tensions: {
    consumption: ["Nm3"],
    subscribers: [""],
  },
} as const;

const naturalGas = {
  rowKeys: naturalGasRowKeys,
  bpColumnKeys: naturalGasBpColumnKeys,
  mpColumnKeys: naturalGasMpColumnKeys,
  hpColumnKeys: naturalGasHpColumnKeys,
  units: naturalGasUnits,
};

const solarWaterHeatingDefaultRowKeys = ["number", "area"] as const;

const solarWaterHeatingUnits: UnitConf = {
  default: {
    number: [""],
    area: ["m²"],
  },
} as const;

const solarWaterHeating = {
  defaultRowKeys: solarWaterHeatingDefaultRowKeys,
  units: solarWaterHeatingUnits,
};

const electricitySchema = z.object({
  dataSet: z.object({
    lt: createMatrixSchema(electricity.rowKeys, { unitsByKeys: electricity.units.tensions }),
    mt: createMatrixSchema(electricity.rowKeys, { unitsByKeys: electricity.units.tensions }),
    ht: createMatrixSchema(electricity.rowKeys, { unitsByKeys: electricity.units.tensions }),
  }),
  metadata,
});

const photovoltaicSchema = z.object({
  dataSet: z.object({
    bt: createMatrixSchema(photovoltaic.btRowKeys, {
      unitsByKeys: photovoltaic.units.tension,
    }),
    mt: createMatrixSchema(photovoltaic.mtRowKeys, {
      unitsByKeys: photovoltaic.units.tension,
    }),
  }),
  metadata,
});

const naturalGasSchema = z.object({
  dataSet: z.object({
    bp: createMatrixSchema(naturalGas.rowKeys, { unitsByKeys: naturalGas.units.tensions }),
    mp: createMatrixSchema(naturalGas.rowKeys, { unitsByKeys: naturalGas.units.tensions }),
    hp: createMatrixSchema(naturalGas.rowKeys, { unitsByKeys: naturalGas.units.tensions }),
  }),
  metadata,
});

const solarWaterHeatingSchema = z.object({
  dataSet: z.object({
    residential: createMatrixSchema(solarWaterHeating.defaultRowKeys, {
      unitsByKeys: solarWaterHeating.units.default,
    }),
    tertiary: createMatrixSchema(solarWaterHeating.defaultRowKeys, {
      unitsByKeys: solarWaterHeating.units.default,
    }),
    industrial: createMatrixSchema(solarWaterHeating.defaultRowKeys, {
      unitsByKeys: solarWaterHeating.units.default,
    }),
  }),
  metadata,
});

const energySchema = createGroupSchema({
  electricity: electricitySchema,
  photovoltaic: photovoltaicSchema,
  naturalGas: naturalGasSchema,
  solarWaterHeating: solarWaterHeatingSchema,
});

const transportSchema = createGroupSchema({
  port: portSchema,
});

export {
  yearSchema,
  futureYearSchema,
  numberByYearSchema,
  metadata,
  createGroupSchema,
  createGridSchema,
  createMatrixSchema,
  createRecordMatrixSchema,
  port,
  portSchema,
  municipalSchema,
  energySchema,
  transportSchema,
};

export const inventoryMunicipalEnergySchemaReference = createGroupSchema({
  municipal: municipalSchema,
  energy: energySchema,
  transport: transportSchema,
});
