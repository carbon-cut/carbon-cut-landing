import { buildFertilizerRows } from "./datasets/afat/fertilizers/config";
import { buildBusesFutureYears } from "./datasets/transport/buses/config";
import { port, buses, territoryVehicles, urbanRail } from "./InventorySchema/transport/config";
import {
  buildings,
  fleet,
  publicLighting,
  treesParksWaste,
} from "./InventorySchema/municipal/config";
import { electricity, naturalGas } from "./InventorySchema/energy/config";
import { livestock } from "./InventorySchema/afat/config";
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
const busesFutureYearCount = buildBusesFutureYears().length;
const livestockRowCount = livestock.keys.length;
const fertilizerRowCount = buildFertilizerRows((key) => key).length;

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
  const requiredKeys = treesParksWaste.yearlyKeys.filter(
    (key) => key !== "urbanTrees" && key !== "controlledLandfill" && key !== "uncontrolledLandfill"
  );
  const total = countMatrixTotal(requiredKeys.length, years.length);
  const dataSet = values?.municipal?.treesParksWaste?.dataSet;
  const completed = requiredKeys.reduce(
    (sum, key) => sum + countFilledYearValues(dataSet?.[key]?.value),
    0
  );

  return createProgress(completed, total);
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
    Object.keys(naturalGas.lines.lp).length,
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
        countFilledField(isRecord(row) ? (row as Record<string, unknown>).vehicleType : undefined) +
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
  const roundTripFuelConsumption = dataSet?.roundTripFuelConsumption;
  const outboundFuelConsumption = dataSet?.outboundFuelConsumption;
  const electricityConsumption = dataSet?.electricityConsumption;
  const total =
    port.fuelKeys.length * years.length * 2 + port.electricityKeys.length * years.length;
  const completed =
    countFilledYearValues(roundTripFuelConsumption) +
    countFilledYearValues(outboundFuelConsumption) +
    countFilledYearValues(electricityConsumption);

  return createProgress(completed, total);
}

function computeBusesProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const operators = values?.transport?.buses?.dataSet ?? [];
  const totalPerOperator =
    1 +
    buses.exploitationRowKeys.length * years.length +
    buses.fuelKeys.length * years.length * 3 +
    buses.renewalRowKeys.length * years.length +
    buses.ageRowKeys.length * years.length +
    busesFutureYearCount;
  const total = operators.length * totalPerOperator;
  const completed =
    operators.reduce((sum, operator) => sum + countFilledField(operator?.name), 0) +
    countFilledYearValues(operators);

  return createProgress(completed, total);
}

function computeUrbanRailProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const services = values?.transport?.urbanRail?.dataSet ?? [];
  const totalPerService = 2 + urbanRail.energyKeys.length * years.length * 2;
  const total = services.length * totalPerService;
  const completed = services.reduce(
    (sum, service) =>
      sum +
      countFilledField(service?.name) +
      countFilledField(service?.operationsWithinMunicipalBoundary) +
      countFilledYearValues(service?.energy) +
      countFilledYearValues(service?.spend),
    0
  );

  return createProgress(completed, total);
}

function computeTreesProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const rows = Array.isArray(values?.afat?.trees?.trackedTreeCrops?.dataSet)
    ? values.afat.trees.trackedTreeCrops.dataSet
    : [];
  const trackedTotal = rows.length * (1 + years.length * 3);
  const trackedCompleted =
    rows.reduce(
      (sum, row) =>
        sum +
        countFilledField(isRecord(row) ? (row as Record<string, unknown>).treeType : undefined),
      0
    ) +
    rows.reduce((sum, row) => {
      if (!isRecord(row) || !isRecord(row.value)) return sum;
      return (
        sum +
        countFilledYearValues((row.value as Record<string, unknown>).youngTreeCanopyArea) +
        countFilledYearValues((row.value as Record<string, unknown>).adultTreeCanopyArea) +
        countFilledYearValues((row.value as Record<string, unknown>).senescentTreeCanopyArea)
      );
    }, 0);
  const fruitTotal = years.length;
  const fruitCompleted = countFilledYearValues(
    values?.afat?.trees?.fruitTrees?.dataSet?.treeCanopyArea?.value
  );

  return createProgress(trackedCompleted + fruitCompleted, trackedTotal + fruitTotal);
}

function computeLivestockProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const total =
    countMatrixTotal(livestockRowCount, years.length) +
    countGridTotal(
      livestock.manureManagementAnimalKeys.length,
      livestock.manureManagementSystemKeys.length,
      years.length
    ) +
    countGridTotal(
      livestock.poultryManureManagementAnimalKeys.length,
      livestock.poultryManureManagementSystemKeys.length,
      years.length
    );
  const completed =
    countFilledYearValues(values?.afat?.livestock?.dataSet?.count) +
    countFilledYearValues(values?.afat?.livestock?.dataSet?.manureManagementShares) +
    countFilledYearValues(values?.afat?.livestock?.dataSet?.poultryManureManagementShares);

  return createProgress(completed, total);
}

function computeFertilizersProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const total = fertilizerRowCount * (years.length + 1);
  const completed =
    countFilledYearValues(values?.afat?.fertilizers?.dataSet) +
    Object.values(values?.afat?.fertilizers?.dataSet ?? {}).reduce(
      (sum, item) =>
        sum +
        countFilledField(isRecord(item) && isRecord(item.tenure) ? item.tenure.value : undefined),
      0
    );

  return createProgress(completed, total);
}

function wastewaterTreatmentRows(values: Partial<InventoryFormValues> | undefined) {
  const rows = values?.wastewaterSanitation?.treatmentDischarge?.dataSet;
  return Array.isArray(rows) ? rows : [];
}

function annualValue(row: unknown, key: string, year: InventoryYear) {
  if (!isRecord(row) || !isRecord(row.value)) return undefined;
  const metric = row.value[key];
  if (!isRecord(metric) || !isRecord(metric.value)) return undefined;

  return metric.value[`y-${year}`];
}

function computeWastewaterTreatmentProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const rows = wastewaterTreatmentRows(values);
  const total = rows.length * (2 + years.length);
  const completed = rows.reduce((sum, row) => {
    if (!isRecord(row)) return sum;

    const loadType = typeof row.loadType === "string" ? row.loadType : "";
    const fixedFields = countFilledField(row.system) + countFilledField(loadType);
    const annualFields = years.reduce((yearSum, year) => {
      const incomingLoad = annualValue(row, loadType, year);
      const populationAllocation =
        loadType === "domestic" ? annualValue(row, "populationAllocation", year) : undefined;
      return (
        yearSum + (isFilledScalar(incomingLoad) || isFilledScalar(populationAllocation) ? 1 : 0)
      );
    }, 0);

    return sum + fixedFields + annualFields;
  }, 0);

  return createProgress(completed, total);
}

function computeWastewaterNitrogenProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const rows = wastewaterTreatmentRows(values);
  const total = rows.length * years.length;
  const completed = rows.reduce(
    (sum, row) =>
      sum +
      years.reduce(
        (yearSum, year) => yearSum + countFilledField(annualValue(row, "nitrogen", year)),
        0
      ),
    0
  );

  return createProgress(completed, total);
}

function computeWastewaterSludgeProgress(
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const rows = values?.wastewaterSanitation?.sludgeDestination?.dataSet ?? [];
  const total = rows.length * years.length;
  const completed = rows.reduce(
    (sum, row) =>
      sum +
      years.reduce(
        (yearSum, year) => yearSum + countFilledField(annualValue(row, "mass", year)),
        0
      ),
    0
  );

  return createProgress(completed, total);
}

const progressCalculators: Partial<Record<string, ProgressCalculator>> = {
  fleet: computeFleetProgress,
  publicLighting: computePublicLightingProgress,
  buildings: computeBuildingsProgress,
  treesParksWaste: computeTreesParksWasteProgress,
  electricity: computeElectricityProgress,
  naturalGas: computeNaturalGasProgress,
  port: computePortProgress,
  buses: computeBusesProgress,
  urbanRail: computeUrbanRailProgress,
  territoryVehicles: computeTerritoryVehiclesProgress,
  trees: computeTreesProgress,
  livestock: computeLivestockProgress,
  fertilizers: computeFertilizersProgress,
  wastewaterTreatment: computeWastewaterTreatmentProgress,
  wastewaterNitrogen: computeWastewaterNitrogenProgress,
  wastewaterSludge: computeWastewaterSludgeProgress,
};

export function getInventoryDatasetProgress(
  datasetKey: string,
  values: Partial<InventoryFormValues> | undefined,
  years: readonly InventoryYear[]
) {
  const calculator = progressCalculators[datasetKey];

  return calculator ? calculator(values, years) : undefined;
}
