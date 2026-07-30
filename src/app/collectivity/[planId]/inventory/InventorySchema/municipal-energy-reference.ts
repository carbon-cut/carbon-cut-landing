import {
  number,
  z,
  ZodEnum,
  ZodString,
  ZodUndefined,
  type ZodRawShape,
  type ZodTypeAny,
} from "zod";

/*
  Standalone reference copy of the inventory schema pieces for:
  - _shared helpers
  - years schema
  - municipal schema
  - energy schema
  - transport schema
  - afat schema
  - wastewater sanitation schema
  - waste schema

  This file is intentionally separate from the production schema modules.
*/

type Year = `y-${number}${number}${number}${number}`;
const yearSchema = z.string().regex(/^y-\d{4}$/) as z.ZodType<Year>;
const currentYear = new Date().getFullYear();
const futureYearSchema = yearSchema.refine((value) => Number(value.slice(2)) >= currentYear, {
  message: "Year cannot be later than the current year",
});

const numberSchema = z.coerce.number({ errorMap: () => ({ message: "Required" }) });
const numberFutureSchema = z.record(futureYearSchema, numberSchema);
const numberByYearSchema = z.record(yearSchema, numberSchema);
const inventoryYearSchema = z.coerce.number().int();
const yearsSchema = z.object({
  reference: inventoryYearSchema,
  comparisons: z.array(inventoryYearSchema).min(1),
});

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

type NonEmptyStringArray = [string, ...string[]];
const normalizeUnitValue = (input: NonEmptyStringArray) => (value: unknown) =>
  value === undefined || value === null ? input[0] : value;
const constructUnit = (input: NonEmptyStringArray) => {
  return z.preprocess(normalizeUnitValue(input), z.enum(input));
};
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
type RecordGridSchemaOptions = MatrixSchemaOptions;

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

const createDynamicGridSchema = (
  nestedKeys: readonly string[],
  GridSchemaOptions: GridSchemaOptions
) => {
  const { unit, unitsByCols } = GridSchemaOptions;

  return z.record(
    z.string(),
    z.object(
      Object.fromEntries(
        nestedKeys.map((nestedKey) => [
          nestedKey,
          z.object({
            value: numberByYearSchema,
            unit: constructUnit(unit ?? unitsByCols![nestedKey]),
          }),
        ])
      )
    )
  );
};

const createRecordGridSchema = <RowFields extends ZodRawShape = Record<string, never>>(
  keys: readonly [string, ...string[]],
  nestedKeys: ZodString | ZodEnum<[string, ...string[]]>,
  GridSchemaOptions: RecordGridSchemaOptions,
  rowFields?: RowFields
) => {
  const { unit, unitsByKeys } = GridSchemaOptions;

  return z.array(
    z.object({
      key: nestedKeys,
      ...(rowFields ?? {}),
      value: z.object(
        Object.fromEntries(
          keys.map((key) => [
            key,
            z.object({
              value: numberByYearSchema,
              unit: constructUnit(unit ?? unitsByKeys?.[key]),
            }),
          ])
        )
      ),
    })
  );
};

const createRecordMatrix = (
  keys: ZodString | ZodEnum<[string, ...string[]]>,
  MatrixSchemaOptions: MatrixSchemaOptions,
  type: ZodEnum<[string, ...string[]]> | ZodString | ZodUndefined = z.undefined()
) => {
  const { unit, unitsByKeys } = MatrixSchemaOptions;
  const dynamicUnitSchema = unitsByKeys
    ? z
        .object({
          type: z.enum(Object.keys(unitsByKeys) as [string, ...string[]]),
          unit: z.string(),
          value: numberByYearSchema,
        })
        .superRefine((value, ctx) => {
          const validUnits = unitsByKeys[value.type];
          if (!validUnits.includes(value.unit)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["unit"],
              message: `Unit must match selected type (${validUnits.join(" or ")})`,
            });
          }
        })
    : undefined;

  return z.object({
    key: keys,
    value: unit
      ? z.object({
          value: numberByYearSchema,
          unit: constructUnit(unit),
          type,
        })
      : dynamicUnitSchema
        ? dynamicUnitSchema
        : z.object({}).strict(),
  });
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
  type: ZodEnum<[string, ...string[]]> | ZodString | ZodUndefined = z.undefined()
) => {
  return z.array(createRecordMatrix(keys, MatrixSchemaOptions, type));
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
const publicTransportExploitationRowKeys = [
  "kmTravelled",
  "staff",
  "passengerKm",
  "passengers",
] as const;
const publicTransportRenewalRowKeys = ["scrapped", "purchased", "purchaseCost"] as const;
const publicTransportAgeRowKeys = ["age0to5", "age6to10", "age10plus"] as const;
const publicTransportFuelKeys = ["diesel", "petrol", "gpl", "gnv", "electricity"] as const;
const airTransportMovementColumnKeys = ["international", "national"] as const;
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

const portFuelKeys = ["diesel"] as const;
const portElectricityKeys = ["electricityConsumption", "electricityBill"] as const;

const portUnits: UnitConf = {
  fuelConsumption: {
    diesel: ["L"],
  },
  electricityConsumption: {
    electricityConsumption: ["kWh"],
    electricityBill: ["currency"],
  },
} as const;

const port = {
  fuelKeys: portFuelKeys,
  electricityKeys: portElectricityKeys,
  units: portUnits,
};

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

const publicTransport = {
  exploitationRowKeys: publicTransportExploitationRowKeys,
  fuelKeys: publicTransportFuelKeys,
  renewalRowKeys: publicTransportRenewalRowKeys,
  ageRowKeys: publicTransportAgeRowKeys,
  units: publicTransportUnits,
};

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

const airTransport = {
  movementColumnKeys: airTransportMovementColumnKeys,
  energyKeys: airTransportEnergyKeys,
  units: airTransportUnits,
};

const territoryVehicleUnits: UnitConf = {
  measures: {
    vehicles: [""],
    avgConsumption: ["L/100km", "kWh/100km", "Nm3/100km"],
    avgMileage: ["km/year"],
  },
} as const;

const territoryVehicles = {
  vehicleTypeKeys: territoryVehicleTypeKeys,
  fuelKeys: territoryVehicleFuelKeys,
  measureKeys: territoryVehicleMeasureKeys,
  units: territoryVehicleUnits,
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
    fuelConsumption: createMatrixSchema(
      port.fuelKeys,
      {
        unitsByKeys: port.units.fuelConsumption,
      },
      true
    ),
    electricityConsumption: createMatrixSchema(
      port.electricityKeys,
      {
        unitsByKeys: port.units.electricityConsumption,
      },
      true
    ),
  }),
  metadata,
});

const publicTransportSchema = z.object({
  dataSet: z.array(
    z.object({
      name: z.string(),
      exploitation: createMatrixSchema(publicTransport.exploitationRowKeys, {
        unitsByKeys: publicTransport.units.exploitation,
      }),
      buses: createMatrixSchema(publicTransport.fuelKeys, {
        unit: publicTransport.units.buses.default,
      }),
      consumption: createMatrixSchema(publicTransport.fuelKeys, {
        unitsByKeys: publicTransport.units.consumption,
      }),
      spend: createMatrixSchema(publicTransport.fuelKeys, {
        unit: publicTransport.units.spend.default,
      }),
      renewal: createMatrixSchema(publicTransport.renewalRowKeys, {
        unitsByKeys: publicTransport.units.renewal,
      }),
      age: createMatrixSchema(publicTransport.ageRowKeys, {
        unitsByKeys: publicTransport.units.age,
      }),
      renewalFuture: z.object({
        value: numberFutureSchema,
        unit: constructUnit(publicTransport.units.future.default),
      }),
    })
  ),
  metadata,
});

const airTransportSchema = z.object({
  dataSet: z.object({
    movements: createDynamicGridSchema(airTransport.movementColumnKeys, {
      unit: airTransport.units.movements.default,
    }),
    energy: createMatrixSchema(airTransport.energyKeys, {
      unitsByKeys: airTransport.units.energy,
    }),
  }),
  metadata,
});

const territoryVehiclesSchema = z.object({
  dataSet: z.object({
    rows: createRecordGridSchema(
      territoryVehicles.measureKeys,
      z.enum(territoryVehicles.vehicleTypeKeys),
      {
        unitsByKeys: territoryVehicles.units.measures,
      },
      {
        fuel: z.enum(territoryVehicles.fuelKeys),
      }
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

const perennialPlantationMetricKeys = [
  "youngHectares",
  "adultHectares",
  "oldHectares",
  "youngTrees",
  "adultTrees",
  "oldTrees",
] as const;

const perennialPlantationUnits: UnitConf = {
  metrics: {
    youngHectares: ["ha"],
    adultHectares: ["ha"],
    oldHectares: ["ha"],
    youngTrees: [""],
    adultTrees: [""],
    oldTrees: [""],
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

const perennialPlantationStock = {
  metricKeys: perennialPlantationMetricKeys,
  plantOptions: perennialPlantationPlantOptions,
  units: perennialPlantationUnits,
};

const livestockRowKeys = [
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

const livestockUnits: UnitConf = {
  headcount: {
    default: [""],
  },
  confinedTimeShare: {
    default: ["%"],
  },
} as const;

const livestock = {
  rowKeys: livestockRowKeys,
  units: livestockUnits,
};

const fertilizerCommonRowKeys = ["ammonitrate", "dap", "compost", "sewageSludge"] as const;

const fertilizers = {
  commonRowKeys: fertilizerCommonRowKeys,
  units: {
    default: ["t"] as [string],
  },
};

const agriculturalProductionMeasureKeys = ["harvestedArea", "production"] as const;

const agriculturalProductionUnits: UnitConf = {
  measures: {
    harvestedArea: ["ha"],
    production: ["t"],
  },
} as const;

const agriculturalProduction = {
  measureKeys: agriculturalProductionMeasureKeys,
  units: agriculturalProductionUnits,
};

const perennialPlantationStockSchema = z.object({
  dataSet: createRecordGridSchema(
    perennialPlantationStock.metricKeys,
    z.enum(perennialPlantationStock.plantOptions),
    {
      unitsByKeys: perennialPlantationStock.units.metrics,
    }
  ),
  metadata,
});

const livestockSchema = z.object({
  dataSet: z.object({
    headcount: createMatrixSchema(livestock.rowKeys, {
      unit: livestock.units.headcount.default,
    }),
    confinedTimeShare: z.object(
      Object.fromEntries(
        livestock.rowKeys.map((key) => [
          key,
          z
            .object({
              value: z.coerce.number().min(0).max(100).optional(),
              unit: constructUnit(livestock.units.confinedTimeShare.default),
            })
            .optional(),
        ])
      )
    ),
  }),
  metadata,
});

const fertilizersSchema = z.object({
  dataSet: createRecordMatrixSchema(z.string(), {
    unit: fertilizers.units.default,
  }),
  metadata,
});

const agriculturalProductionSchema = z.object({
  dataSet: createRecordGridSchema(agriculturalProduction.measureKeys, z.string(), {
    unitsByKeys: agriculturalProduction.units.measures,
  }),
  metadata,
});

const afatSchema = createGroupSchema({
  perennialPlantationStock: perennialPlantationStockSchema,
  livestock: livestockSchema,
  fertilizers: fertilizersSchema,
  agriculturalProduction: agriculturalProductionSchema,
});

const transportSchema = createGroupSchema({
  publicTransport: publicTransportSchema,
  airTransport: airTransportSchema,
  port: portSchema,
  territoryVehicles: territoryVehiclesSchema,
});

const wastewaterSanitationSchema = createGroupSchema({});
const wasteSchema = createGroupSchema({});

export {
  yearSchema,
  inventoryYearSchema,
  yearsSchema,
  futureYearSchema,
  numberByYearSchema,
  numberFutureSchema,
  metadata,
  createGroupSchema,
  createGridSchema,
  createMatrixSchema,
  createRecordGridSchema,
  createRecordMatrixSchema,
  port,
  portSchema,
  publicTransport,
  publicTransportSchema,
  airTransport,
  airTransportSchema,
  territoryVehicles,
  territoryVehiclesSchema,
  municipalSchema,
  energySchema,
  transportSchema,
  perennialPlantationStock,
  perennialPlantationStockSchema,
  livestock,
  livestockSchema,
  fertilizers,
  fertilizersSchema,
  agriculturalProduction,
  agriculturalProductionSchema,
  afatSchema,
  wastewaterSanitationSchema,
  wasteSchema,
};

export const inventoryMunicipalEnergySchemaReference = createGroupSchema({
  municipal: municipalSchema,
  energy: energySchema,
  transport: transportSchema,
});

export const inventorySchemaReference = createGroupSchema({
  years: yearsSchema,
  municipal: municipalSchema,
  energy: energySchema,
  transport: transportSchema,
  afat: afatSchema,
  wastewaterSanitation: wastewaterSanitationSchema,
  waste: wasteSchema,
});
