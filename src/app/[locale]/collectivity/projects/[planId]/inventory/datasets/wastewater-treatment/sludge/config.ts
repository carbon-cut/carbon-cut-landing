import React from "react";

import type {
  EditableTableRowField,
  EditableTableRows,
} from "@/components/table/editable-rows/types";
import { FieldHelp, FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";

import { wastewaterSanitation } from "../../../InventorySchema/wastewaterSanitation/config";

type LabelFunc = (...args: [string, ...any]) => string;

function label(
  text: string,
  options: { required?: boolean; help?: string; helpLabel?: string } = {}
) {
  return React.createElement(
    Typography,
    { variant: "label", size: "sm", className: "inline-flex items-center gap-1" },
    React.createElement("span", null, text),
    options.required ? React.createElement(FieldRequired, null) : null,
    options.help
      ? React.createElement(FieldHelp, {
          content: options.help,
          srLabel: options.helpLabel ?? text,
        })
      : null
  );
}

export function buildSludgeSection(t: LabelFunc) {
  const annual = (key: string, required = false) => ({
    key,
    label: label(t(`sludge.columns.${key}`), {
      required,
      help: t(`sludge.help.${key}`),
      helpLabel: t(`sludge.help.${key}Label`),
    }),
    unit: wastewaterSanitation.units.sludgeMass[key][0],
    className: key === "mass" ? "min-w-[220px]" : "min-w-[200px]",
  });
  const field = (key: string) => ({
    key,
    label: label(t(`sludge.columns.${key}`), {
      required: true,
      help: t(`sludge.help.${key}`),
      helpLabel: t(`sludge.help.${key}Label`),
    }),
  });
  return {
    title: t("sludge.title"),
    description: t("sludge.description"),
    rows: [],
    columns: [
      annual("mass", true),
      annual("methaneRecovery"),
      annual("nitrogenApplied"),
      field("sludgeType"),
      field("climate"),
      field("landfillSiteType"),
      field("landfillIdentifier"),
    ],
  };
}

export function buildSludgeRowFields(t: LabelFunc): EditableTableRowField[] {
  return [
    {
      key: "destination",
      type: "select",
      label: t("sludge.fields.destination"),
      headerLabel: label(t("sludge.fields.destination"), { required: true }),
      placeholder: t("sludge.fields.destinationPlaceholder"),
      options: wastewaterSanitation.sludgeDestinationKeys.map((value) => ({
        value,
        label: t(`sludge.destinations.${value}`),
      })),
    },
    {
      key: "withinMunicipalBoundary",
      type: "select",
      label: t("sludge.fields.withinMunicipalBoundary"),
      headerLabel: label(t("sludge.fields.withinMunicipalBoundary"), {
        required: true,
        help: t("sludge.help.withinMunicipalBoundary"),
        helpLabel: t("sludge.help.withinMunicipalBoundaryLabel"),
      }),
      placeholder: t("sludge.fields.withinMunicipalBoundaryPlaceholder"),
      options: ["true", "false"].map((value) => ({
        value,
        label: t(`sludge.withinMunicipalBoundary.${value}`),
      })),
    },
  ];
}

export function buildSludgeEditableRows(t: LabelFunc): EditableTableRows {
  return {
    addLabel: t("sludge.addLabel"),
    minRows: 0,
    rowLabelPrefix: t("sludge.rowLabelPrefix"),
    rowKeyFieldName: "destination",
  };
}
