import type {
  InventoryGroupedYearTableData,
  InventoryTableRow,
  InventoryTableSectionData,
} from "../../../types";
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

export function buildPublicTransportExploitationRowsWithoutFuel(
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  return buildPublicTransportRows("exploitation", labelFunc);
}

export function buildPublicTransportEnergyRows(
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  return publicTransport.fuelKeys.map((key) => ({
    key,
    label: labelFunc(`energyConsumption.${key}`),
    unit: publicTransport.units.consumption[key][0],
  }));
}

export function buildPublicTransportEnergyByFuelSection(
  labelFunc: (key: string) => string
): InventoryGroupedYearTableData {
  return {
    title: labelFunc("energyByFuel.title"),
    rows: buildPublicTransportEnergyRows(labelFunc),
    subcolumns: [
      {
        key: "buses",
        label: labelFunc("energyByFuel.buses"),
        unit: publicTransport.units.buses.default[0],
      },
      {
        key: "consumption",
        label: labelFunc("energyByFuel.consumption"),
      },
      {
        key: "spend",
        label: labelFunc("energyByFuel.spend"),
        unit: publicTransport.units.spend.default[0],
      },
    ],
  };
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
