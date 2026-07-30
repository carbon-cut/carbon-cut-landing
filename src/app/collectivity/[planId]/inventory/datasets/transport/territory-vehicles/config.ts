import type { InventoryGroupedYearTableData } from "../../../types";
import type {
  GroupedYearEditableRows,
  GroupedYearRowField,
} from "@/components/table/grouped-year/types";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { territoryVehicles } from "../../../InventorySchema/transport/config";

type TerritoryVehicleType = keyof typeof territoryVehicles.allowedFuelsByType;
type TerritoryVehicleFuel = (typeof territoryVehicles.fuelKeys)[number];
export type TerritoryVehicleRow = Partial<
  InventoryFormValues["transport"]["territoryVehicles"]["dataSet"]["rows"][number]
>;

const territoryVehicleTypeKeys = Object.keys(
  territoryVehicles.allowedFuelsByType
) as Array<TerritoryVehicleType>;

export function buildTerritoryVehicleTypeOptions(labelFunc: (key: string) => string) {
  return territoryVehicleTypeKeys.map((vehicleType) => ({
    value: vehicleType,
    label: labelFunc(`vehicleTypes.${vehicleType}`),
  }));
}

export function buildTerritoryVehicleFuelOptions({
  rows,
  vehicleType,
  currentFuel,
  labelFunc,
}: {
  rows: TerritoryVehicleRow[];
  vehicleType: string;
  currentFuel?: string;
  labelFunc: (key: string) => string;
}) {
  if (!vehicleType || !territoryVehicleTypeKeys.includes(vehicleType as TerritoryVehicleType)) {
    return [];
  }

  const typedVehicleType = vehicleType as TerritoryVehicleType;
  const allowedFuels = territoryVehicles.allowedFuelsByType[typedVehicleType];
  const usedFuels = new Set(
    rows
      .filter((row) => row?.vehicleType === typedVehicleType && row?.fuel !== currentFuel)
      .map((row) => row?.fuel)
      .filter(
        (fuel): fuel is TerritoryVehicleFuel =>
          typeof fuel === "string" && territoryVehicles.fuelKeys.includes(fuel as TerritoryVehicleFuel)
      )
  );

  return allowedFuels
    .filter((fuel: TerritoryVehicleFuel) => fuel === currentFuel || !usedFuels.has(fuel))
    .map((fuel) => ({
      value: fuel,
      label: labelFunc(`fuels.${fuel}`),
      unit: territoryVehicles.consumptionUnitByFuel[fuel],
    }));
}

export function buildTerritoryVehicleRow(vehicleType: string, fuel: string) {
  return {
    vehicleType,
    fuel,
    value: {
      vehicles: {
        value: {},
        unit: territoryVehicles.units.measures.vehicles[0],
      },
      avgConsumption: {
        value: {},
        unit: territoryVehicles.consumptionUnitByFuel[fuel as TerritoryVehicleFuel],
      },
      avgMileage: {
        value: {},
        unit: territoryVehicles.units.measures.avgMileage[0],
      },
    },
  };
}

export function getTerritoryVehicleInsertIndex(rows: TerritoryVehicleRow[], vehicleType: string) {
  let lastMatchingIndex = -1;

  rows.forEach((row, index) => {
    if (row?.vehicleType === vehicleType) {
      lastMatchingIndex = index;
    }
  });

  return lastMatchingIndex >= 0 ? lastMatchingIndex + 1 : rows.length;
}

export function buildTerritoryVehiclesSection(
  labelFunc: (key: string) => string
): InventoryGroupedYearTableData {
  return {
    title: labelFunc("title"),
    description: labelFunc("description"),
    rows: [],
    subcolumns: territoryVehicles.measureKeys.map((key) => ({
      key,
      label: labelFunc(`measures.${key}`),
      unit: territoryVehicles.units.measures[key][0],
      className: key === "avgConsumption" || key === "avgMileage" ? "min-w-[180px]" : undefined,
    })),
  };
}

export function buildTerritoryVehiclesRowFields(
  labelFunc: (key: string) => string
): GroupedYearRowField[] {
  return [
    {
      key: "vehicleType",
      label: labelFunc("fields.vehicleType"),
      type: "select",
      placeholder: labelFunc("fields.vehicleTypePlaceholder"),
      options: buildTerritoryVehicleTypeOptions(labelFunc),
    },
    {
      key: "fuel",
      label: labelFunc("fields.fuel"),
      type: "select",
      placeholder: labelFunc("fields.fuelPlaceholder"),
      unitSubcolumnKey: "avgConsumption",
      options: [],
      getOptions: ({ form, rowIndex }) => {
        const rows = (form.getValues("transport.territoryVehicles.dataSet.rows") ??
          []) as TerritoryVehicleRow[];
        const currentRow = rows[rowIndex];
        const vehicleType = currentRow?.vehicleType;

        return buildTerritoryVehicleFuelOptions({
          rows,
          vehicleType: vehicleType ?? "",
          currentFuel: currentRow?.fuel,
          labelFunc,
        });
      },
    },
  ];
}

export function buildTerritoryVehiclesEditableRows(
  labelFunc: (key: string) => string
): GroupedYearEditableRows {
  return {
    addLabel: labelFunc("addLabel"),
    minRows: 0,
    rowLabelPrefix: labelFunc("rowLabelPrefix"),
    rowKeyFieldName: "vehicleType",
    canRemoveRow: (row) => {
      if (!row || typeof row !== "object") {
        return true;
      }

      return (row as Record<string, unknown>).protected !== true;
    },
    isFieldDisabled: (row, fieldKey) => {
      if (!row || typeof row !== "object") {
        return false;
      }

      const record = row as Record<string, unknown>;

      if (record.protected !== true) {
        return false;
      }

      return fieldKey === "vehicleType" || fieldKey === "fuel";
    },
  };
}
