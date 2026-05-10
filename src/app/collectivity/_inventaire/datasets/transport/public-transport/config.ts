import type { InventoryTableRow, InventoryTableSectionData } from "../../../types";
import { publicTransport } from "../../../InventorySchema/transport/config";

export function buildPublicTransportFutureYears(): number[] {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear + 1, currentYear + 2];
}

export function buildPublicTransportRows(
  input: "exploitation" | "renewal" | "age",
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  const rowKeys =
    input === "exploitation"
      ? publicTransport.exploitationRowKeys
      : input === "renewal"
        ? publicTransport.renewalRowKeys
        : publicTransport.ageRowKeys;

  return rowKeys.map((key) => ({
    key,
    label: labelFunc(`${input}.${key}`),
    unit: publicTransport.units[input][key][0],
  }));
}

export function buildPublicTransportOperatorsSection(
  labelFunc: (key: string) => string
): Omit<InventoryTableSectionData, "rows"> {
  return {
    title: labelFunc("operators.title"),
    description: labelFunc("operators.description"),
    fieldBaseName: "transport.publicTransport.dataSet",
    columns: [{ key: "operator", label: labelFunc("operators.column"), type: "text" }],
    /* rows: [
      {
        key: "operator-1",
        label: labelFunc("operators.default"),
        unit: "",
      },
    ], */
    editableRows: {
      addLabel: labelFunc("operators.addLabel"),
      rowLabelPrefix: labelFunc("operators.rowPrefix"),
      minRows: 1,
      newRowValues: [""],
    },
  };
}

export function buildPublicTransportRenewalFutureRows(
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  return [
    {
      key: "renewalFuture",
      label: labelFunc("future.renewalFuture"),
      unit: "",
    },
  ];
}
