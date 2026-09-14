"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

import { InventoryTableHeader } from "@/components/table/InventoryTableHeader";
import { InventoryTableSelectForm } from "@/components/table/InventoryTableSelect";
import TableGrid from "@/components/table/table-grid";
import { NumberInputCell } from "@/components/table/table-grid/cells";
import type { TableGridCellRendererArgs } from "@/components/table/table-grid/types";
import { FormField, FormItem, FormMessage, type TName } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";

import InventoryYearSelector from "../../../components/InventoryYearSelector";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { useInventoryContext } from "../../../context/inventory-context";
import { wastewaterSanitation } from "../../../InventorySchema/wastewaterSanitation/config";
import {
  buildNitrogenSection,
  buildTreatmentEditableRows,
  buildTreatmentRowFields,
} from "./config";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;
const i18nScope =
  "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.wastewaterTreatment";

function NitrogenCell({
  form,
  baseName,
  row,
  column,
  name,
  selectedYear,
}: TableGridCellRendererArgs<InventoryFormValues>) {
  const t = useScopedI18n(i18nScope);
  const system = useWatch({
    control: form.control,
    name: `${baseName}.${row.index}.system` as TName<InventoryFormValues>,
  });
  const discharges = useWatch({
    control: form.control,
    name: `${baseName}.${row.index}.dischargesToWater` as TName<InventoryFormValues>,
  });
  const nitrogen = useWatch({
    control: form.control,
    name: `${baseName}.${row.index}.value.nitrogen.value.y-${selectedYear}` as TName<InventoryFormValues>,
    disabled: selectedYear === undefined,
  });
  const hasNitrogen = nitrogen !== undefined && nitrogen !== "";
  const select = (field: string, values: readonly string[], path: string) => (
    <InventoryTableSelectForm
      form={form}
      name={`${baseName}.${row.index}.${field}` as TName<InventoryFormValues>}
      ariaLabel={t(`treatment.columns.${field}`)}
      placeholder=""
      options={values.map((value) => ({ value, label: t(`${path}.${value}`) }))}
    />
  );
  if (column.key === "biologicalTreatment")
    return system === "centralizedAerobic" && hasNitrogen
      ? select(
          "biologicalTreatment",
          wastewaterSanitation.biologicalTreatmentValues,
          "treatment.biologicalTreatments"
        )
      : null;
  if (column.key === "receivingWaterCondition")
    return (system === "aquaticDischarge" || discharges === "yes") && hasNitrogen
      ? select(
          "receivingWaterCondition",
          wastewaterSanitation.receivingWaterConditionValues,
          "treatment.receivingWaterConditions"
        )
      : null;
  return (
    <NumberInputCell
      form={form}
      baseName={baseName}
      row={row}
      column={column}
      name={name}
      selectedYear={selectedYear}
      editableRows
    />
  );
}

function useSelectedYear() {
  const { mainForm, years } = useInventoryContext();
  const [value, setValue] = useState(years[0] ?? 0);
  const selectedYear = years.find((year) => year === value) ?? years[0];
  useEffect(() => {
    if (years.length) setValue((current) => (years.includes(current) ? current : years[0]));
  }, [years]);
  return { mainForm, years, selectedYear, setValue };
}

export default function WastewaterNitrogenSurface() {
  const { mainForm, years, selectedYear, setValue } = useSelectedYear();
  const t = useScopedI18n(i18nScope);
  const section = useMemo(() => buildNitrogenSection(t), [t]);
  const rowFields = useMemo(() => buildTreatmentRowFields(t), [t]);
  const editableRows = useMemo(() => buildTreatmentEditableRows(t), [t]);
  const renderCell = useCallback(
    (args: TableGridCellRendererArgs<InventoryFormValues>) => <NitrogenCell {...args} />,
    []
  );
  return (
    <div className="space-y-8">
      <InventoryTableHeader
        title={t("surface.title")}
        endContent={
          <InventoryYearSelector
            datasetKey="wastewaterNitrogen"
            years={years}
            selectedYear={selectedYear}
            onSelectYear={setValue}
            ariaLabel={t("yearSelector")}
            className="flex flex-wrap justify-end gap-3"
          />
        }
      />
      <FormField
        control={mainForm.control}
        name={inventoryName("wastewaterSanitation.treatmentDischarge.dataSet")}
        render={() => (
          <FormItem>
            <TableGrid
              title={section.title}
              description={section.description}
              rows={section.rows}
              columns={section.columns}
              form={mainForm}
              baseName="wastewaterSanitation.treatmentDischarge.dataSet"
              editableRows={editableRows}
              rowFields={rowFields}
              selectedYear={selectedYear}
              renderCell={renderCell}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
