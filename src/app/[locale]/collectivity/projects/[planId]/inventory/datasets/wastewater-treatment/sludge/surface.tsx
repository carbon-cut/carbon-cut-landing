"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

import InventoryTableInput from "@/components/table/InventoryTableInput";
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
import { buildSludgeEditableRows, buildSludgeRowFields, buildSludgeSection } from "./config";
import LandfillHistoryEditor from "./landfill-history";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;
const i18nScope =
  "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.wastewaterTreatment";

function SludgeCell({
  form,
  baseName,
  row,
  column,
  name,
  selectedYear,
}: TableGridCellRendererArgs<InventoryFormValues>) {
  const t = useScopedI18n(i18nScope);
  const destination = useWatch({
    control: form.control,
    name: `${baseName}.${row.index}.destination` as TName<InventoryFormValues>,
  });
  const landfill = destination === "landfill";
  if (column.key === "methaneRecovery" && destination !== "anaerobicDigestion" && !landfill)
    return null;
  if (column.key === "nitrogenApplied" && destination !== "landApplication") return null;
  if (
    column.key === "sludgeType" ||
    column.key === "climate" ||
    column.key === "landfillSiteType"
  ) {
    if (!landfill) return null;
    const values =
      column.key === "sludgeType"
        ? wastewaterSanitation.sludgeTypeValues
        : column.key === "climate"
          ? wastewaterSanitation.landfillClimateValues
          : wastewaterSanitation.landfillSiteTypeValues;
    return (
      <InventoryTableSelectForm
        form={form}
        name={`${baseName}.${row.index}.${column.key}` as TName<InventoryFormValues>}
        ariaLabel={t(`sludge.columns.${column.key}`)}
        placeholder=""
        options={values.map((value) => ({
          value,
          label: t(`sludge.options.${column.key}.${value}`),
        }))}
      />
    );
  }
  if (column.key === "landfillIdentifier")
    return landfill ? (
      <InventoryTableInput
        form={form}
        name={`${baseName}.${row.index}.${column.key}` as TName<InventoryFormValues>}
        type="text"
      />
    ) : null;
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

export default function WastewaterSludgeSurface() {
  const { mainForm, years, selectedYear, setValue } = useSelectedYear();
  const t = useScopedI18n(i18nScope);
  const section = useMemo(() => buildSludgeSection(t), [t]);
  const rowFields = useMemo(() => buildSludgeRowFields(t), [t]);
  const editableRows = useMemo(() => buildSludgeEditableRows(t), [t]);
  const renderCell = useCallback(
    (args: TableGridCellRendererArgs<InventoryFormValues>) => <SludgeCell {...args} />,
    []
  );
  return (
    <div className="space-y-8">
      <InventoryTableHeader
        title={t("surface.title")}
        endContent={
          <InventoryYearSelector
            datasetKey="wastewaterSludge"
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
        name={inventoryName("wastewaterSanitation.sludgeDestination.dataSet")}
        render={() => (
          <FormItem>
            <TableGrid
              title={section.title}
              description={section.description}
              rows={section.rows}
              columns={section.columns}
              form={mainForm}
              baseName="wastewaterSanitation.sludgeDestination.dataSet"
              editableRows={editableRows}
              rowFields={rowFields}
              selectedYear={selectedYear}
              renderCell={renderCell}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <LandfillHistoryEditor />
    </div>
  );
}
