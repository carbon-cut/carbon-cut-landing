"use client";

import YearMetricsTable from "@/components/table/year-metrics";
import type { YearMetricsColumn } from "@/components/table/year-metrics/types";
import { InventoryTableHeader } from "@/components/table/InventoryTableHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useScopedI18n } from "@/locales/client";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";

import InventoryYearSelector, {
  InventoryYearErrors,
} from "../../../components/InventoryYearSelector";
import { useInventoryContext } from "../../../context/inventory-context";
import { territorialEnergySectorValues } from "../../../InventorySchema/energy/territorial-energy";
import { buildElectricityFixedLines, buildElectricityMetrics } from "./config";

const blockKeys = ["lt", "mt", "ht"] as const;
type ElectricityBlockKey = (typeof blockKeys)[number];

export default function ElectricitySurface() {
  const { years, mainForm } = useInventoryContext();
  const [selectedYearValue, setSelectedYearValue] = useState(years[0] ?? 0);
  const selectedYear = years.find((year) => year === selectedYearValue) ?? years[0];
  const tElectricity = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.electricity"
  );
  const tTable = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.yearMetricsTable"
  );
  const { blocks, metrics, sectorOptions } = useState(() => ({
    blocks: blockKeys.map((key) => ({
      key,
      title: tElectricity(`${key}.title`),
      fixedColumns: buildElectricityFixedLines(key, tElectricity, (sector) =>
        tTable(`sectors.${sector}`)
      ),
    })),
    metrics: buildElectricityMetrics(tElectricity),
    sectorOptions: territorialEnergySectorValues.map((sector) => ({
      value: sector,
      label: tTable(`sectors.${sector}`),
    })),
  }))[0];
  const {
    fields: ltCustomFields,
    append: appendLtCustomColumn,
    remove: removeLtCustomColumn,
  } = useFieldArray({
    control: mainForm.control,
    name: "energy.electricity.dataSet.lt.custom",
  });
  const {
    fields: mtCustomFields,
    append: appendMtCustomColumn,
    remove: removeMtCustomColumn,
  } = useFieldArray({
    control: mainForm.control,
    name: "energy.electricity.dataSet.mt.custom",
  });
  const {
    fields: htCustomFields,
    append: appendHtCustomColumn,
    remove: removeHtCustomColumn,
  } = useFieldArray({
    control: mainForm.control,
    name: "energy.electricity.dataSet.ht.custom",
  });
  const columnsByBlock = useMemo(
    () =>
      Object.fromEntries(
        blocks.map((block) => {
          const customArray =
            block.key === "lt"
              ? { fields: ltCustomFields, remove: removeLtCustomColumn }
              : block.key === "mt"
                ? { fields: mtCustomFields, remove: removeMtCustomColumn }
                : { fields: htCustomFields, remove: removeHtCustomColumn };
          const customColumns: YearMetricsColumn[] = customArray.fields.map((field, index) => ({
            id: field.id,
            key: `custom-${index}`,
            label: tTable("customLabelPlaceholder"),
            kind: "custom",
            index,
            metaFieldName: `energy.electricity.dataSet.${block.key}.custom.${index}.label` as any,
            metaOptions: sectorOptions,
            metaPlaceholder: tTable("sectorPlaceholder"),
            onRemoveColumn: () => customArray.remove(index),
          }));

          return [block.key, [...block.fixedColumns, ...customColumns]];
        })
      ) as Record<ElectricityBlockKey, YearMetricsColumn[]>,
    [
      blocks,
      htCustomFields,
      ltCustomFields,
      mtCustomFields,
      removeHtCustomColumn,
      removeLtCustomColumn,
      removeMtCustomColumn,
      sectorOptions,
      tTable,
    ]
  );

  const addRowByBlock = useMemo(
    () =>
      Object.fromEntries(
        blockKeys.map((blockKey) => [
          blockKey,
          {
            label: tTable("addColumn"),
            onAdd: () =>
              (blockKey === "lt"
                ? { append: appendLtCustomColumn }
                : blockKey === "mt"
                  ? { append: appendMtCustomColumn }
                  : { append: appendHtCustomColumn }
              ).append(
                {
                  label: "",
                  // @ts-expect-error - initialization of dynamic territorial energy unit path
                  sector: "",
                  ...Object.fromEntries(metrics.map((metric) => [metric.key, { value: {} }])),
                },
                { shouldFocus: true }
              ),
          },
        ])
      ) as Record<ElectricityBlockKey, { label: string; onAdd: () => void }>,
    [
      appendHtCustomColumn,
      appendLtCustomColumn,
      appendMtCustomColumn,
      metrics,
      tTable,
    ]
  );

  useEffect(() => {
    if (!years.length) return;

    setSelectedYearValue((currentYearValue) =>
      years.some((year) => year === currentYearValue) ? currentYearValue : years[0]
    );
  }, [years]);

  return (
    <section className="space-y-8">
      <InventoryTableHeader
        title={tElectricity("surface.title")}
        endContent={
          <InventoryYearSelector
            datasetKey="electricity"
            years={years}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYearValue}
            className="flex flex-wrap justify-end gap-3"
          />
        }
      />
      <InventoryYearErrors datasetKey="electricity" years={years}>
        {(errorYears) =>
          errorYears.length > 0 ? (
            <Alert variant="destructive">
              <AlertTitle>{tElectricity("surface.readinessTitle")}</AlertTitle>
              <AlertDescription>
                {tElectricity("surface.readinessDescription", {
                  years: errorYears.join(", "),
                })}
              </AlertDescription>
            </Alert>
          ) : null
        }
      </InventoryYearErrors>
      {blocks.map((block) => (
        <YearMetricsTable
          key={block.key}
          title={block.title}
          selectedYear={selectedYear}
          form={mainForm}
          baseName={`energy.electricity.dataSet.${block.key}`}
          rows={metrics}
          columns={columnsByBlock[block.key]}
          addRow={addRowByBlock[block.key]}
        />
      ))}
    </section>
  );
}
