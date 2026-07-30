import type { InventoryGroupedYearTableData } from "../../../types";
import type {
  GroupedYearEditableRows,
  GroupedYearRowField,
} from "@/components/table/grouped-year/types";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { territoryVehicles } from "../../../InventorySchema/transport/config";

type TerritoryVehicleType = keyof typeof territoryVehicles.allowedFuelsByType;
type TerritoryVehicleFuel = (typeof territoryVehicles.fuelKeys)[number];
type TerritoryVehicleRow = Partial<
  InventoryFormValues["transport"]["territoryVehicles"]["dataSet"]["rows"][number]
>;

const territoryVehicleTypeKeys = Object.keys(
  territoryVehicles.allowedFuelsByType
) as Array<TerritoryVehicleType>;

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
      options: territoryVehicleTypeKeys.map((vehicleType) => ({
        value: vehicleType,
        label: labelFunc(`vehicleTypes.${vehicleType}`),
      })),
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

        if (
          !vehicleType ||
          !territoryVehicleTypeKeys.includes(vehicleType as TerritoryVehicleType)
        ) {
          return [];
        }

        const typedVehicleType = vehicleType as TerritoryVehicleType;
        const allowedFuels = territoryVehicles.allowedFuelsByType[typedVehicleType];
        const usedFuels = new Set(
          rows
            .filter((row, index) => index !== rowIndex && row?.vehicleType === typedVehicleType)
            .map((row) => row?.fuel)
            .filter(
              (fuel): fuel is TerritoryVehicleFuel =>
                typeof fuel === "string" &&
                territoryVehicles.fuelKeys.includes(fuel as TerritoryVehicleFuel)
            )
        );

        const currentFuel = currentRow?.fuel;

        return allowedFuels
          .filter((fuel: TerritoryVehicleFuel) => fuel === currentFuel || !usedFuels.has(fuel))
          .map((fuel) => ({
            value: fuel,
            label: labelFunc(`fuels.${fuel}`),
            unit: territoryVehicles.consumptionUnitByFuel[fuel],
          }));
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
