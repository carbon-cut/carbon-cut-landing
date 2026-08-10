import type { InventoryFormValues } from "./context/inventory-context";
import { afatDefault } from "./InventorySchema/afat";
import { energyDefault } from "./InventorySchema/energy";
import { municipalDefault } from "./InventorySchema/municipal";
import { sharedDataDefault } from "./InventorySchema/shared-data";
import { buildTerritoryVehicleDefaultRows } from "./InventorySchema/transport/config";
import { transportDefault } from "./InventorySchema/transport";
import { wasteDefault } from "./InventorySchema/waste";
import { wastewaterSanitationDefault } from "./InventorySchema/wastewaterSanitation";
import type { InventoryWorkspaceConfig } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getActiveDatasetDefaults<T extends Record<string, unknown>>(
  defaults: T,
  activeDatasetKeys: ReadonlySet<string>
) {
  return Object.fromEntries(
    Object.entries(defaults).filter(([datasetKey]) => activeDatasetKeys.has(datasetKey))
  ) as Partial<T>;
}

export function buildInventoryDefaults(
  years: readonly number[],
  workspace: InventoryWorkspaceConfig
) {
  const activeDatasetKeys = new Set(workspace.datasets.map((dataset) => dataset.key));

  return {
    municipal: getActiveDatasetDefaults(municipalDefault(years), activeDatasetKeys),
    energy: getActiveDatasetDefaults(energyDefault(years), activeDatasetKeys),
    transport: getActiveDatasetDefaults(transportDefault(years), activeDatasetKeys),
    afat: getActiveDatasetDefaults(afatDefault(years), activeDatasetKeys),
    wastewaterSanitation: wastewaterSanitationDefault(),
    waste: wasteDefault(),
    sharedData: sharedDataDefault(years),
  };
}

function mergeInventoryDefaults(defaultValue: unknown, savedValue: unknown): unknown {
  if (savedValue === undefined || savedValue === null) {
    return defaultValue;
  }

  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? savedValue : defaultValue;
  }

  if (isRecord(defaultValue)) {
    if (!isRecord(savedValue)) {
      return defaultValue;
    }

    return Object.fromEntries(
      Array.from(new Set([...Object.keys(defaultValue), ...Object.keys(savedValue)])).map((key) => [
        key,
        mergeInventoryDefaults(defaultValue[key], savedValue[key]),
      ])
    );
  }

  return savedValue;
}

export function buildInventoryDefaultValues(
  inventoryInput: Record<string, unknown> | null | undefined,
  years: readonly number[],
  workspace: InventoryWorkspaceConfig
) {
  const defaults = buildInventoryDefaults(years, workspace);
  const merged = mergeInventoryDefaults(defaults, inventoryInput) as Partial<InventoryFormValues>;
  const hasTerritoryVehicles = workspace.datasets.some(
    (dataset) => dataset.key === "territoryVehicles"
  );

  if (!hasTerritoryVehicles) {
    return merged;
  }

  const mergedRecord = merged as Record<string, unknown>;
  const transport = isRecord(mergedRecord.transport) ? mergedRecord.transport : {};
  const territoryVehicles = isRecord(transport.territoryVehicles)
    ? transport.territoryVehicles
    : {};
  const dataSet = isRecord(territoryVehicles.dataSet) ? territoryVehicles.dataSet : {};

  return {
    ...merged,
    transport: {
      ...transport,
      territoryVehicles: {
        ...territoryVehicles,
        dataSet: {
          ...dataSet,
          rows: buildTerritoryVehicleDefaultRows(dataSet.rows, years),
        },
      },
    },
  } as Partial<InventoryFormValues>;
}
