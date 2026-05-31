import type { InventoryGroupedYearTableData } from "../../../types";
import type {
  GroupedYearEditableRows,
  GroupedYearRowField,
} from "@/components/table/grouped-year/types";
import { territoryVehicles } from "../../../InventorySchema/transport/config";

const consumptionUnitByFuel: Record<(typeof territoryVehicles.fuelKeys)[number], string> = {
  diesel: "L/100km",
  petrol: "L/100km",
  gpl: "L/100km",
  gnv: "Nm3/100km",
  electricity: "kWh/100km",
  hybrid: "L/100km",
  other: "L/100km",
};

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
    })),
  };
}

export function buildTerritoryVehiclesRowFields(
  labelFunc: (key: string) => string
): GroupedYearRowField[] {
  return [
    {
      key: "key",
      label: labelFunc("fields.vehicleType"),
      type: "select",
      placeholder: labelFunc("fields.vehicleTypePlaceholder"),
      options: territoryVehicles.vehicleTypeKeys.map((vehicleType) => ({
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
      options: territoryVehicles.fuelKeys.map((fuel) => ({
        value: fuel,
        label: labelFunc(`fuels.${fuel}`),
        unit: consumptionUnitByFuel[fuel],
      })),
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
  };
}
