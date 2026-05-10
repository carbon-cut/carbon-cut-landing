import type { InventoryTableSectionData, InventoryTableRow } from "../../../types";
import type { MatrixEditableRows } from "@/components/table/matrix/types";
import { port } from "../../../InventorySchema/transport/config";

const { rowKeys: portRowKeys, units } = port;

export function buildPortRows(
  input: "vesselCount" | "fuelConsumption",
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  return portRowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: units[input].default[0],
  }));
}

export function buildPortEditableRows(
  input: "vesselCount" | "fuelConsumption",
  labelFunc: (key: string) => string
): MatrixEditableRows {
  return {
    addLabel: labelFunc("concernedPorts.addLabel"),
    minRows: 0,
    unremovableRowKeys: portRowKeys,
    unit: units[input].default[0],
  };
}

export function buildPortSection(labelFunc: (key: string) => string): InventoryTableSectionData {
  return {
    title: labelFunc("concernedPorts.title"),
    description: labelFunc("concernedPorts.description"),
    columns: [{ key: "port", label: labelFunc("concernedPorts.column") }],
    rows: [],
    editableRows: {
      addLabel: labelFunc("concernedPorts.addLabel"),
      minRows: 0,
      rowLabelPrefix: "",
    },
  };
}
