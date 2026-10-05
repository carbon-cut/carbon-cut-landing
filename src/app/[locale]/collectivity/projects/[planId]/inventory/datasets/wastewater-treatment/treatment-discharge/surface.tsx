"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

import { useEditableTableRows } from "@/components/table/editable-rows/useEditableTableRows";
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
  buildPopulationFallbackSection,
  buildTreatmentEditableRows,
  buildTreatmentRowFields,
  buildTreatmentSection,
} from "./config";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;
const i18nScope =
  "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.wastewaterTreatment";

function TreatmentCell({
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
  const loadType = useWatch({
    control: form.control,
    name: `${baseName}.${row.index}.loadType` as TName<InventoryFormValues>,
  });
  const dischargesToWater = useWatch({
    control: form.control,
    name: `${baseName}.${row.index}.dischargesToWater` as TName<InventoryFormValues>,
  });
  const effluentPath = useWatch({
    control: form.control,
    name: `${baseName}.${row.index}.effluentPath` as TName<InventoryFormValues>,
  });
  const direct = system === "aquaticDischarge";
  const automatic = wastewaterSanitation.automaticEffluentDefaultSystemValues.includes(
    system as never
  );
  const supportsSludge = wastewaterSanitation.sludgeRemovedSystemValues.includes(system as never);
  const select = (
    field: string,
    values: readonly string[],
    labelKey: string,
    optionKey: string
  ) => (
    <InventoryTableSelectForm
      form={form}
      name={`${baseName}.${row.index}.${field}` as TName<InventoryFormValues>}
      ariaLabel={t(labelKey)}
      placeholder=""
      options={values.map((value) => ({ value, label: t(`${optionKey}.${value}`) }))}
    />
  );

  if (column.key === "dischargesToWater")
    return direct
      ? null
      : select(
          "dischargesToWater",
          wastewaterSanitation.yesNoValues,
          "treatment.columns.dischargesToWater",
          "treatment.yesNo"
        );
  if (column.key === "receivingWater")
    return !direct && dischargesToWater !== "yes"
      ? null
      : select(
          "receivingWater",
          wastewaterSanitation.receivingWaterValues,
          "treatment.columns.receivingWater",
          "treatment.receivingWater"
        );
  if (column.key === "effluentPath")
    return direct || dischargesToWater !== "yes" || automatic
      ? null
      : select(
          "effluentPath",
          wastewaterSanitation.effluentPathValues,
          "treatment.columns.effluentPath",
          "treatment.effluentPaths"
        );
  if (column.key === "effluentTreatmentLevel")
    return direct || dischargesToWater !== "yes" || automatic || effluentPath !== "treatmentLevel"
      ? null
      : select(
          "effluentTreatmentLevel",
          wastewaterSanitation.effluentTreatmentLevelValues,
          "treatment.columns.effluentTreatmentLevel",
          "treatment.effluentTreatmentLevels"
        );
  if (!wastewaterSanitation.organicLoadKeys.includes(loadType as never)) return null;
  if (column.key === "sludgeRemoved" && !supportsSludge) return null;
  if (column.key === "populationAllocation" && loadType !== "domestic") return null;
  if (column.key === "outgoingLoad" && !automatic && effluentPath !== "measuredOutgoingLoad")
    return null;
  const valueKey =
    column.key === "methaneRecovery"
      ? "methaneRecovery"
      : column.key === "populationAllocation"
        ? "populationAllocation"
        : column.key === "outgoingLoad"
          ? wastewaterSanitation.outgoingLoadKeyByOrganicLoadKey[
              loadType as keyof typeof wastewaterSanitation.outgoingLoadKeyByOrganicLoadKey
            ]
          : column.key === "sludgeRemoved"
            ? wastewaterSanitation.sludgeRemovedKeyByOrganicLoadKey[
                loadType as keyof typeof wastewaterSanitation.sludgeRemovedKeyByOrganicLoadKey
              ]
            : loadType;
  return (
    <NumberInputCell
      form={form}
      baseName={baseName}
      row={row}
      column={{
        ...column,
        key: valueKey,
        unit: wastewaterSanitation.units.organicLoad[valueKey][0],
      }}
      name={name}
      selectedYear={selectedYear}
      editableRows
    />
  );
}

function PopulationFallbackCell({
  form,
  baseName,
  row,
  column,
  name,
  selectedYear,
}: TableGridCellRendererArgs<InventoryFormValues>) {
  const t = useScopedI18n(i18nScope);
  if (column.key === "foodWasteToSewer")
    return (
      <InventoryTableSelectForm
        form={form}
        name={`${baseName}.${row.original.key}.foodWasteToSewer` as TName<InventoryFormValues>}
        ariaLabel={t("fallback.columns.foodWasteToSewer")}
        placeholder=""
        options={wastewaterSanitation.yesNoValues.map((value) => ({
          value,
          label: t(`treatment.yesNo.${value}`),
        }))}
      />
    );
  return (
    <NumberInputCell
      form={form}
      baseName={baseName}
      row={row}
      column={column}
      name={name}
      selectedYear={selectedYear}
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

export default function WastewaterTreatmentSurface() {
  const { mainForm, years, selectedYear, setValue } = useSelectedYear();
  const t = useScopedI18n(i18nScope);
  const treatment = useMemo(
    () => ({
      section: buildTreatmentSection(t),
      rowFields: buildTreatmentRowFields(t),
      editableRows: buildTreatmentEditableRows(t),
    }),
    [t]
  );
  const fallback = useMemo(() => buildPopulationFallbackSection(t), [t]);
  const state = useEditableTableRows({
    form: mainForm,
    baseName: inventoryName("wastewaterSanitation.treatmentDischarge.dataSet"),
    editableRows: treatment.editableRows,
  });
  const renderTreatment = useCallback(
    (args: TableGridCellRendererArgs<InventoryFormValues>) => <TreatmentCell {...args} />,
    []
  );
  const renderFallback = useCallback(
    (args: TableGridCellRendererArgs<InventoryFormValues>) => <PopulationFallbackCell {...args} />,
    []
  );
  const sections = useMemo(
    () => ({
      core: {
        title: treatment.section.title,
        description: treatment.section.description,
        columns: treatment.section.columns.filter((column) =>
          ["organicLoad", "populationAllocation", "sludgeRemoved", "methaneRecovery"].includes(
            column.key
          )
        ),
      },
      discharge: {
        title: t("discharge.title"),
        description: t("discharge.description"),
        columns: treatment.section.columns.filter((column) =>
          [
            "dischargesToWater",
            "receivingWater",
            "effluentPath",
            "outgoingLoad",
            "effluentTreatmentLevel",
          ].includes(column.key)
        ),
      },
    }),
    [t, treatment.section]
  );
  const grid = (title: string, description: string, columns: typeof sections.core.columns) => (
    <TableGrid
      title={title}
      description={description}
      rows={[]}
      columns={columns}
      form={mainForm}
      baseName="wastewaterSanitation.treatmentDischarge.dataSet"
      editableRows={treatment.editableRows}
      editableRowState={state}
      rowFields={treatment.rowFields}
      selectedYear={selectedYear}
      renderCell={renderTreatment}
    />
  );
  return (
    <div className="space-y-8">
      <InventoryTableHeader
        title={t("surface.title")}
        endContent={
          <InventoryYearSelector
            datasetKey="wastewaterTreatment"
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
        name={inventoryName("wastewaterSanitation.populationFallback.dataSet")}
        render={() => (
          <FormItem>
            <TableGrid
              title={fallback.title}
              description={fallback.description}
              rows={fallback.rows}
              columns={fallback.columns}
              form={mainForm}
              baseName="wastewaterSanitation.populationFallback.dataSet"
              selectedYear={selectedYear}
              renderCell={renderFallback}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={mainForm.control}
        name={inventoryName("wastewaterSanitation.treatmentDischarge.dataSet")}
        render={() => (
          <FormItem>
            {grid(sections.core.title, sections.core.description, sections.core.columns)}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={mainForm.control}
        name={inventoryName("wastewaterSanitation.treatmentDischarge.dataSet")}
        render={() => (
          <FormItem>
            {grid(
              sections.discharge.title,
              sections.discharge.description,
              sections.discharge.columns
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
