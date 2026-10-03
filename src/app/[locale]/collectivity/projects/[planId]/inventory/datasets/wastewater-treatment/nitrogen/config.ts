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

export function buildNitrogenSection(t: LabelFunc) {
  const column = (key: string, required = false) => ({
    key,
    label: label(t(`treatment.columns.${key}`), {
      required,
      help: t(`treatment.help.${key}`),
      helpLabel: t(`treatment.help.${key}Label`),
    }),
    unit: key === "nitrogen" ? wastewaterSanitation.units.organicLoad.nitrogen[0] : undefined,
    className: key === "nitrogen" ? "min-w-[200px]" : undefined,
  });

  return {
    title: t("nitrogen.title"),
    description: t("nitrogen.description"),
    rows: [],
    columns: [
      column("nitrogen"),
      column("biologicalTreatment", true),
      column("receivingWaterCondition", true),
    ],
  };
}

export function buildTreatmentRowFields(t: LabelFunc): EditableTableRowField[] {
  return [
    {
      key: "system",
      type: "select",
      label: t("treatment.fields.system"),
      headerLabel: label(t("treatment.fields.system"), { required: true }),
      placeholder: t("treatment.fields.systemPlaceholder"),
      options: wastewaterSanitation.treatmentSystemValues.map((value) => ({
        value,
        label: t(`treatment.systems.${value}`),
      })),
    },
    {
      key: "loadType",
      type: "select",
      label: t("treatment.fields.loadType"),
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
