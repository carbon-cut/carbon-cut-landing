"use client";

import MatrixTable from "@/components/table/matrix";
import ScalarTable from "@/components/table/scalar";
import { InventoryTableHeader } from "@/components/table/InventoryTableHeader";
import YearMetricsTable from "@/components/table/year-metrics";
import type { YearMetricsColumn } from "@/components/table/year-metrics/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useScopedI18n } from "@/locales/client";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";

import InventoryYearSelector, {
  InventoryYearErrors,
} from "../../../components/InventoryYearSelector";
import { useInventoryContext } from "../../../context/inventory-context";
import { territorialEnergySectorValues } from "../../../InventorySchema/energy/territorial-energy";
import {
  buildNaturalGasAssumptionFields,
  buildNaturalGasFixedLines,
  buildNaturalGasMetrics,
  buildNaturalGasPopulationRows,
  buildNaturalGasTitleWithRequirement,
} from "./config";

const blockKeys = ["bp", "mp", "hp"] as const;
type NaturalGasBlockKey = (typeof blockKeys)[number];

export default function NaturalGasSurface() {
  const { years, mainForm } = useInventoryContext();
  const [selectedYearValue, setSelectedYearValue] = useState(years[0] ?? 0);
  const selectedYear = years.find((year) => year === selectedYearValue) ?? years[0];
  const tNaturalGas = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.naturalGas"
  );
  const tElectricity = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.electricity"
  );
  const tTable = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.yearMetricsTable"
  );
  const naturalGasFixedLabel = (blockKey: NaturalGasBlockKey, key: string) => {
    if (blockKey === "bp") {
      return tElectricity(`lt.${key}`);
    }

    if (blockKey === "mp") {
      return key === "services"
        ? (tNaturalGas("bp.services") as string)
        : tElectricity(`mt.${key}`);
    }

    return tNaturalGas(`hp.${key}`);
  };
  const { blocks, metrics, populationRows, assumptionFields, sectorOptions } = useState(() => ({
    blocks: blockKeys.map((key) => ({
      key,
      title: tNaturalGas(`${key}.title`),
      fixedColumns: buildNaturalGasFixedLines(
        key,
        (lineKey) => naturalGasFixedLabel(key, lineKey),
        (sector) => tTable(`sectors.${sector}`)
      ),
    })),
    metrics: buildNaturalGasMetrics(tNaturalGas),
    populationRows: buildNaturalGasPopulationRows(tNaturalGas),
    assumptionFields: buildNaturalGasAssumptionFields(tNaturalGas),
    sectorOptions: territorialEnergySectorValues.map((sector) => ({
      value: sector,
      label: tTable(`sectors.${sector}`),
    })),
  }))[0];
  const {
    fields: bpCustomFields,
    append: appendBpCustomColumn,
    remove: removeBpCustomColumn,
  } = useFieldArray({
    control: mainForm.control,
    name: "energy.naturalGas.dataSet.bp.custom",
  });
  const {
    fields: mpCustomFields,
    append: appendMpCustomColumn,
    remove: removeMpCustomColumn,
  } = useFieldArray({
    control: mainForm.control,
    name: "energy.naturalGas.dataSet.mp.custom",
  });
  const {
    fields: hpCustomFields,
    append: appendHpCustomColumn,
    remove: removeHpCustomColumn,
  } = useFieldArray({
    control: mainForm.control,
    name: "energy.naturalGas.dataSet.hp.custom",
  });
  const columnsByBlock = useMemo(
    () =>
      Object.fromEntries(
        blocks.map((block) => {
          const customArray =
            block.key === "bp"
              ? { fields: bpCustomFields, remove: removeBpCustomColumn }
              : block.key === "mp"
                ? { fields: mpCustomFields, remove: removeMpCustomColumn }
                : { fields: hpCustomFields, remove: removeHpCustomColumn };
          const customColumns: YearMetricsColumn[] = customArray.fields.map((field, index) => ({
            id: field.id,
            key: `custom-${index}`,
            label: tTable("customLabelPlaceholder"),
            kind: "custom",
            index,
            metaFieldName: `energy.naturalGas.dataSet.${block.key}.custom.${index}.label` as any,
            metaOptions: sectorOptions,
            metaPlaceholder: tTable("sectorPlaceholder"),
            onRemoveColumn: () => customArray.remove(index),
          }));

          return [block.key, [...block.fixedColumns, ...customColumns]];
        })
      ) as Record<NaturalGasBlockKey, YearMetricsColumn[]>,
    [
      blocks,
      bpCustomFields,
      hpCustomFields,
      mpCustomFields,
      removeBpCustomColumn,
      removeHpCustomColumn,
      removeMpCustomColumn,
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
              (blockKey === "bp"
                ? { append: appendBpCustomColumn }
                : blockKey === "mp"
                  ? { append: appendMpCustomColumn }
                  : { append: appendHpCustomColumn }
              ).append(
                {
                  label: "",
                  // @ts-expect-error - custom sector starts empty and schema maps it to Required
                  sector: "",
                  ...Object.fromEntries(metrics.map((metric) => [metric.key, { value: {} }])),
                },
                { shouldFocus: true }
              ),
          },
        ])
      ) as Record<NaturalGasBlockKey, { label: string; onAdd: () => void }>,
    [appendBpCustomColumn, appendHpCustomColumn, appendMpCustomColumn, metrics, tTable]
  );

  useEffect(() => {
    if (!years.length) return;

    setSelectedYearValue((currentYearValue) =>
      years.some((year) => year === currentYearValue) ? currentYearValue : years[0]
    );
  }, [years]);

  return (
    <section className="space-y-8">
      <MatrixTable
        title={buildNaturalGasTitleWithRequirement(
          tNaturalGas("populationTitle"),
          tNaturalGas("populationRequirementTooltip")
        )}
        rows={populationRows}
        form={mainForm}
        baseName="sharedData.population.dataSet"
      />
      <ScalarTable
        title={buildNaturalGasTitleWithRequirement(
          tNaturalGas("assumptionsTitle"),
          tNaturalGas("assumptionsRequirementTooltip")
        )}
        form={mainForm}
        fields={assumptionFields}
      />
      <InventoryTableHeader
        title={buildNaturalGasTitleWithRequirement(
          tNaturalGas("surface.title"),
          tNaturalGas("surface.requirementTooltip")
        )}
        endContent={
          <InventoryYearSelector
            datasetKey="naturalGas"
            years={years}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYearValue}
            className="flex flex-wrap justify-end gap-3"
          />
        }
      />
      <InventoryYearErrors datasetKey="naturalGas" years={years}>
        {(errorYears) =>
          errorYears.length > 0 ? (
            <Alert variant="destructive">
              <AlertTitle>{tNaturalGas("surface.readinessTitle")}</AlertTitle>
              <AlertDescription>
                {tNaturalGas("surface.readinessDescription", {
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
          baseName={`energy.naturalGas.dataSet.${block.key}`}
          rows={metrics}
          columns={columnsByBlock[block.key]}
          addRow={addRowByBlock[block.key]}
        />
      ))}
    </section>
  );
}
