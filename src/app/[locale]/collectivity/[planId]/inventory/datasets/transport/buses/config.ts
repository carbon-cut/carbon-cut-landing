import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import type {
  InventoryGroupedYearTableData,
  InventoryTableRow,
  InventoryTableSectionData,
} from "../../../types";
import { buses } from "../../../InventorySchema/transport/config";

function createMatrixBranch<TKeys extends readonly string[]>(
  keys: TKeys,
  unitByKey: (key: TKeys[number]) => string
) {
  return Object.fromEntries(
    keys.map((key) => [
      key,
      {
        value: {},
        unit: unitByKey(key),
      },
    ])
  );
}

export function buildBusesFutureYears(): number[] {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear + 1, currentYear + 2];
}

export function buildBusesRows(
  input: "exploitation" | "renewal" | "age",
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  const rowKeys =
    input === "exploitation"
      ? buses.exploitationRowKeys
      : input === "renewal"
        ? buses.renewalRowKeys
        : buses.ageRowKeys;

  return rowKeys.map((key) => ({
    key,
    label: labelFunc(`${input}.${key}`),
    unit: buses.units[input][key][0],
  }));
}

export function buildBusesExploitationRowsWithoutFuel(
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  return buildBusesRows("exploitation", labelFunc);
}

export function buildBusesEnergyRows(
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  return buses.fuelKeys.map((key) => ({
    key,
    label: labelFunc(`energyConsumption.${key}`),
    unit: buses.units.consumption[key][0],
  }));
}

export function buildBusesEnergyByFuelSection(
  labelFunc: (...args: [string, ...any]) => string
): InventoryGroupedYearTableData {
  return {
    title: React.createElement(
      Typography,
      {
        variant: "sectionTitle",
        size: "lg",
        className: "inline-flex items-center gap-1",
      },
      React.createElement("span", null, labelFunc("energyByFuel.title")),
      React.createElement(FieldRequired, {
        content: labelFunc("energyByFuel.requirementTooltip"),
      })
    ),
    rows: buildBusesEnergyRows(labelFunc),
    subcolumns: [
      {
        key: "buses",
        label: labelFunc("energyByFuel.buses"),
        unit: buses.units.buses.default[0],
      },
      {
        key: "consumption",
        label: labelFunc("energyByFuel.consumption"),
      },
      {
        key: "spend",
        label: labelFunc("energyByFuel.spend"),
        unit: buses.units.spend.default[0],
      },
    ],
  };
}

export function buildBusesOperatorsSection(
  labelFunc: (...args: [string, ...any]) => string
): Omit<InventoryTableSectionData, "rows"> {
  return {
    title: labelFunc("operators.title"),
    description: labelFunc("operators.description"),
    fieldBaseName: "transport.buses.dataSet",
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

export function buildBusesRenewalFutureRows(
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  return [
    {
      key: "renewalFuture",
      label: labelFunc("future.renewalFuture"),
      unit: "",
    },
  ];
}

export function buildBusesOperatorDefaultValues() {
  return {
    name: "",
    exploitation: createMatrixBranch(
      buses.exploitationRowKeys,
      (key) => buses.units.exploitation[key][0]
    ),
    buses: createMatrixBranch(buses.fuelKeys, () => buses.units.buses.default[0]),
    consumption: createMatrixBranch(buses.fuelKeys, (key) => buses.units.consumption[key][0]),
    spend: createMatrixBranch(buses.fuelKeys, () => buses.units.spend.default[0]),
    renewal: createMatrixBranch(buses.renewalRowKeys, (key) => buses.units.renewal[key][0]),
    age: createMatrixBranch(buses.ageRowKeys, (key) => buses.units.age[key][0]),
    renewalFuture: {
      value: {},
      unit: buses.units.future.default[0],
    },
  };
}
