import { columns as perennialPlantationColumns } from "./datasets/afat/perennial-plantation-stock/config";
import { buildPublicTransportFutureYears } from "./datasets/transport/public-transport/config";
import {
  airTransport,
  port,
  publicTransport,
  territoryVehicles,
} from "./InventorySchema/transport/config";
import {
  buildings,
  fleet,
  publicLighting,
  treesParksWaste,
} from "./InventorySchema/municipal/config";
import { electricity, naturalGas } from "./InventorySchema/energy/config";
import type { InventoryFormValues } from "./context/inventory-context";
import type { InventoryYear } from "./types";

export type InventoryDatasetProgress = {
  completed: number;
  total: number;
  percent: number;
  label: string;
};

type ProgressCalculator = (
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) => InventoryDatasetProgress;

const yearKeyPattern = /^y-\d{4}$/;
const publicTransportFutureYearCount = buildPublicTransportFutureYears().length;
const perennialPlantationInputColumnCount = perennialPlantationColumns.filter(
  (column) => !("calculatedFrom" in column)
).length;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFilledScalar(value: unknown) {
  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (typeof value === "string") {
    return value.trim() !== "";
  }

  return value !== null && value !== undefined;
}

function countFilledYearValues(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countFilledYearValues(item), 0);
  }

  if (!isRecord(value)) {
    return 0;
  }

  const keys = Object.keys(value);

  if (keys.length > 0 && keys.every((key) => yearKeyPattern.test(key))) {
    return Object.values(value).reduce<number>(
      (sum, item) => sum + (isFilledScalar(item) ? 1 : 0),
      0
    );
  }

  return Object.values(value).reduce<number>((sum, item) => sum + countFilledYearValues(item), 0);
}

function createProgress(completed: number, total: number): InventoryDatasetProgress {
  const normalizedCompleted = Math.min(completed, total);
  const percent = total > 0 ? Math.round((normalizedCompleted / total) * 100) : 0;

  return {
    completed: normalizedCompleted,
    total,
    percent,
    label: `${percent}%`,
  };
}

function countMatrixTotal(rowCount: number, yearCount: number) {
  return rowCount * yearCount;
}

function countGridTotal(rowCount: number, columnCount: number, yearCount: number) {
  return rowCount * columnCount * yearCount;
}

function countFilledField(value: unknown) {
  return isFilledScalar(value) ? 1 : 0;
}

function getArrayEntries(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function computeYearBlockProgress(
  blocks: unknown,
  rowCount: number,
  years: readonly InventoryYear[]
) {
  const blockEntries = getArrayEntries(blocks);
  const dataColumns = blockEntries.filter(
    (column) => isRecord(column) && typeof column.key === "string" && column.key !== "total"
  );
  const total = dataColumns.length * rowCount * years.length;
  const completed = dataColumns.reduce(
    (sum, column) => sum + countFilledYearValues(isRecord(column) ? column.value : undefined),
    0
  );

  return createProgress(completed, total);
}

function computeTerritorialEnergyBlockProgress(
  block: unknown,
  metricKeys: readonly string[],
  fixedLineCount: number,
  years: readonly InventoryYear[]
) {
  if (!isRecord(block)) {
    return createProgress(0, fixedLineCount * metricKeys.length * years.length);
  }

  const customRows = getArrayEntries(block.custom).filter(isRecord);
  const fixedRows = isRecord(block.fixed) ? Object.values(block.fixed).filter(isRecord) : [];
  const rows = [...fixedRows, ...customRows];
  const total = rows.length * metricKeys.length * years.length;
  const completed = rows.reduce(
    (sum, row) =>
      sum +
      metricKeys.reduce(
        (metricSum, metricKey) =>
          metricSum +
          countFilledYearValues(isRecord(row[metricKey]) ? row[metricKey].value : undefined),
        0
      ),
    0
  );

  return createProgress(completed, total);
}

function computeFleetProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const total =
    countMatrixTotal(fleet.carEngineKeys.length, years.length) +
    countMatrixTotal(fleet.fuelKeys.length, years.length) +
    countMatrixTotal(fleet.fuelKeys.length, years.length) +
    countGridTotal(fleet.categoryKeys.length, fleet.carEngineKeys.length, years.length);

  return createProgress(countFilledYearValues(values?.municipal?.fleet?.dataSet), total);
}

function computePublicLightingProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const total =
    countMatrixTotal(publicLighting.infrastructureKeys.length, years.length) +
    countGridTotal(publicLighting.lampKeys.length, publicLighting.lampCols.length, years.length) +
    countMatrixTotal(publicLighting.yearlyKeys.length, years.length);

  return createProgress(countFilledYearValues(values?.municipal?.publicLighting?.dataSet), total);
}

function computeBuildingsProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const total =
    countMatrixTotal(buildings.areaKeys.length, years.length) +
    countMatrixTotal(buildings.consumptionKeys.length, years.length);

  return createProgress(countFilledYearValues(values?.municipal?.buildings?.dataSet), total);
}

function computeTreesParksWasteProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const total = countMatrixTotal(treesParksWaste.yearlyKeys.length, years.length);

  return createProgress(countFilledYearValues(values?.municipal?.treesParksWaste?.dataSet), total);
}

function computeElectricityProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const dataSet = values?.energy?.electricity?.dataSet as
    | { lt?: unknown; mt?: unknown; ht?: unknown }
    | undefined;
  const metricKeys = ["consumption"] as const;
  const lt = computeTerritorialEnergyBlockProgress(
    dataSet?.lt,
    metricKeys,
    Object.keys(electricity.lines.lt).length,
    years
  );
  const mt = computeTerritorialEnergyBlockProgress(
    dataSet?.mt,
    metricKeys,
    Object.keys(electricity.lines.mt).length,
    years
  );
  const ht = computeTerritorialEnergyBlockProgress(
    dataSet?.ht,
    metricKeys,
    Object.keys(electricity.lines.ht).length,
    years
  );

  return createProgress(lt.completed + mt.completed + ht.completed, lt.total + mt.total + ht.total);
}

function computeNaturalGasProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const dataSet = values?.energy?.naturalGas?.dataSet as
    | { bp?: unknown; mp?: unknown; hp?: unknown }
    | undefined;
  const metricKeys = ["consumption"] as const;
  const bp = computeTerritorialEnergyBlockProgress(
    dataSet?.bp,
    metricKeys,
    Object.keys(naturalGas.lines.bp).length,
    years
  );
  const mp = computeTerritorialEnergyBlockProgress(
    dataSet?.mp,
    metricKeys,
    Object.keys(naturalGas.lines.mp).length,
    years
  );
  const hp = computeTerritorialEnergyBlockProgress(
    dataSet?.hp,
    metricKeys,
    Object.keys(naturalGas.lines.hp).length,
    years
  );

  return createProgress(bp.completed + mp.completed + hp.completed, bp.total + mp.total + hp.total);
}

function computeAirTransportProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const movementRows = Object.keys(
    values?.transport?.airTransport?.dataSet?.movements ?? {}
  ).length;
  const total =
    countGridTotal(movementRows, airTransport.movementColumnKeys.length, years.length) +
    countMatrixTotal(airTransport.energyKeys.length, years.length);

  return createProgress(countFilledYearValues(values?.transport?.airTransport?.dataSet), total);
}

function computeTerritoryVehiclesProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const rows = values?.transport?.territoryVehicles?.dataSet?.rows ?? [];
  const total = rows.length * (2 + territoryVehicles.measureKeys.length * years.length);
  const completed =
    rows.reduce(
      (sum, row) =>
        sum +
        countFilledField(isRecord(row) ? row.key : undefined) +
        countFilledField(isRecord(row) ? (row as Record<string, unknown>).fuel : undefined),
      0
    ) + countFilledYearValues(rows);

  return createProgress(completed, total);
}

function computePortProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const dataSet = values?.transport?.port?.dataSet;
  const fuelConsumption = dataSet?.fuelConsumption;
  const electricityConsumption = dataSet?.electricityConsumption;
  const total =
    port.fuelKeys.length * years.length +
    port.electricityKeys.length * years.length;
  const completed =
    countFilledYearValues(fuelConsumption) +
    countFilledYearValues(electricityConsumption);

  return createProgress(completed, total);
}

function computePublicTransportProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const operators = values?.transport?.publicTransport?.dataSet ?? [];
  const totalPerOperator =
    1 +
    publicTransport.exploitationRowKeys.length * years.length +
    publicTransport.fuelKeys.length * years.length * 3 +
    publicTransport.renewalRowKeys.length * years.length +
    publicTransport.ageRowKeys.length * years.length +
    publicTransportFutureYearCount;
  const total = operators.length * totalPerOperator;
  const completed =
    operators.reduce((sum, operator) => sum + countFilledField(operator?.key), 0) +
    countFilledYearValues(operators);

  return createProgress(completed, total);
}

function computePerennialPlantationProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const rows = values?.afat?.perennialPlantationStock?.rows ?? [];
  const total = rows.length * perennialPlantationInputColumnCount * years.length;

  return createProgress(countFilledYearValues(rows), total);
}

const progressCalculators: Partial<Record<string, ProgressCalculator>> = {
  fleet: computeFleetProgress,
  "public-lighting": computePublicLightingProgress,
  buildings: computeBuildingsProgress,
  "trees-parks-waste": computeTreesParksWasteProgress,
  electricity: computeElectricityProgress,
  "natural-gas": computeNaturalGasProgress,
  port: computePortProgress,
  "public-transport": computePublicTransportProgress,
  "air-transport": computeAirTransportProgress,
  transport: computeTerritoryVehiclesProgress,
  "perennial-plantation-stock": computePerennialPlantationProgress,
};

export function getInventoryDatasetProgress(
  datasetKey: string,
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const calculator = progressCalculators[datasetKey];

  return calculator ? calculator(values, years) : undefined;
}
