import type { InventoryTableSectionData, InventoryTableRow } from "../../../types";
import type { MatrixEditableRows, MatrixRowField } from "@/components/table/matrix/types";
import { port } from "../../../InventorySchema/transport/config";

const { rowKeys: portRowKeys, units, fuels } = port;

function getDefaultUnit(input: "vesselCount" | "fuelConsumption") {
  return "default" in units[input] ? units[input].default[0] : "";
}

export function buildPortRows(
  input: "vesselCount" | "fuelConsumption",
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  return portRowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: getDefaultUnit(input),
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
    unit: getDefaultUnit(input),
  };
}

export function buildPortFuelRowFields(labelFunc: (key: string) => string): MatrixRowField[] {
  return [
    {
      key: "type",
      label: labelFunc("fuelConsumption.fuelType"),
      type: "select",
      placeholder: labelFunc("fuelConsumption.fuelPlaceholder"),
      options: fuels.map((fuel) => ({
        value: fuel,
        label: labelFunc(`fuelConsumption.fuels.${fuel}`),
        unit: units.fuelConsumption[fuel][0],
      })),
    },
  ];
}

export function buildPortSection(
  labelFunc: (key: string) => string
): Omit<InventoryTableSectionData, "rows"> {
  return {
    title: labelFunc("concernedPorts.title"),
    description: labelFunc("concernedPorts.description"),
    fieldBaseName: "transport.port.dataSet.concernedPorts",
    columns: [{ key: "port", label: labelFunc("concernedPorts.column"), type: "text" }],
    editableRows: {
      addLabel: labelFunc("concernedPorts.addLabel"),
      minRows: 0,
      rowLabelPrefix: labelFunc("concernedPorts.rowLabelPrefix"),
    },
  };
}
