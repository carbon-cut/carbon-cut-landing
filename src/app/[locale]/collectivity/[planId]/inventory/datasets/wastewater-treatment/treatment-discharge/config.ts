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

export function buildTreatmentSection(t: LabelFunc) {
  const numericKeys = new Set([
    "organicLoad",
    "populationAllocation",
    "sludgeRemoved",
    "methaneRecovery",
    "outgoingLoad",
  ]);
  const column = (key: string, required = false) => ({
    key,
    label: label(t(`treatment.columns.${key}`), {
      required,
      help: t(`treatment.help.${key}`),
      helpLabel: t(`treatment.help.${key}Label`),
    }),
    className: numericKeys.has(key) ? "min-w-[200px]" : undefined,
  });

  return {
    title: t("treatment.title"),
    description: t("treatment.description"),
    rows: [],
    columns: [
      column("organicLoad", true),
      column("populationAllocation"),
      column("sludgeRemoved"),
      column("methaneRecovery"),
      column("dischargesToWater", true),
      column("receivingWater", true),
      column("effluentPath", true),
      column("outgoingLoad", true),
      column("effluentTreatmentLevel", true),
    ],
  };
}

export function buildTreatmentRowFields(t: LabelFunc): EditableTableRowField[] {
  return [
    {
      key: "system",
      label: t("treatment.fields.system"),
      type: "select",
      headerLabel: label(t("treatment.fields.system"), { required: true }),
      placeholder: t("treatment.fields.systemPlaceholder"),
      options: wastewaterSanitation.treatmentSystemValues.map((value) => ({
        value,
        label: t(`treatment.systems.${value}`),
      })),
    },
    {
      key: "loadType",
      label: t("treatment.fields.loadType"),
      type: "select",
      headerLabel: label(t("treatment.fields.loadType"), {
        required: true,
        help: t("treatment.help.loadType"),
        helpLabel: t("treatment.help.loadTypeLabel"),
      }),
      placeholder: t("treatment.fields.loadTypePlaceholder"),
      options: wastewaterSanitation.organicLoadKeys.map((value) => ({
        value,
        label: t(`treatment.loadTypes.${value}`),
      })),
    },
  ];
}

export function buildTreatmentEditableRows(t: LabelFunc): EditableTableRows {
  return {
    addLabel: t("treatment.addLabel"),
    minRows: 0,
    rowLabelPrefix: t("treatment.rowLabelPrefix"),
    rowKeyFieldName: "system",
  };
}

export function buildPopulationFallbackSection(t: LabelFunc) {
  return {
    title: t("fallback.title"),
    description: t("fallback.description"),
    rows: wastewaterSanitation.populationFallbackRowKeys.map((key) => ({
      key,
      label: t(`fallback.rows.${key}`),
      unit: null,
    })),
    columns: [
      {
        key: "connectionPercentage",
        label: label(t("fallback.columns.connectionPercentage"), {
          help: t("fallback.help.connectionPercentage"),
          helpLabel: t("fallback.help.connectionPercentageLabel"),
        }),
        unit: "%",
        className: "min-w-[200px]",
      },
      {
        key: "foodWasteToSewer",
        label: label(t("fallback.columns.foodWasteToSewer"), {
          help: t("fallback.help.foodWasteToSewer"),
          helpLabel: t("fallback.help.foodWasteToSewerLabel"),
        }),
      },
    ],
  };
}
