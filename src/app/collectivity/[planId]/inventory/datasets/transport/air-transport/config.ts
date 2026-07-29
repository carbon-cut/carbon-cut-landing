import { airTransport } from "../../../InventorySchema/transport/config";
import type { InventoryGroupedYearTableData, InventoryTableRow } from "../../../types";

export function buildAirTransportMovementSection(
  rows: InventoryTableRow[],
  labelFunc: (key: string) => string
): InventoryGroupedYearTableData {
  return {
    title: labelFunc("movements.title"),
    description: labelFunc("movements.description"),
    subcolumns: airTransport.movementColumnKeys.map((key) => ({
      key,
      label: labelFunc(`movements.columns.${key}`),
      unit: airTransport.units.movements.default[0],
    })),
    rows,
  };
}

export function buildAirTransportEnergyRows(
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  return airTransport.energyKeys.map((key) => ({
    key,
    label: labelFunc(`energy.${key}`),
    unit: airTransport.units.energy[key][0],
  }));
}
