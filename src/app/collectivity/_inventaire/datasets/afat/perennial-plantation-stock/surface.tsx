"use client";

import { useFieldArray, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { FieldSelect as FormSelect } from "@/components/forms";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import {
  InventoryDataTable,
  InventoryDataTableHead,
  InventoryDataTableHeaderRow,
  InventoryDataTableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/InventoryDataTable";
import { InventoryFieldInput } from "@/app/collectivity/_components/fields";
import { useInventoryContext } from "../../../context/inventory-context";
import { customPlantValue, createPerennialPlantationRow, columns, plantOptions } from "./constants";

type ColumnKey = (typeof columns)[number]["key"];

function parseTableNumber(value: string) {
  const parsedValue = Number(value.trim().replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function formatTableNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(3)));
}

function PlantationRow({
  index,
  yearValues,
  canRemove,
  onRemove,
}: {
  index: number;
  yearValues: number[];
  canRemove: boolean;
  onRemove: () => void;
}) {
  const { mainForm } = useInventoryContext();
  const row = useWatch({
    control: mainForm.control,
    name: `perennialPlantationStock.rows.${index}` as const,
  });

  const plantType = row?.plantType ?? "";
  const customName = row?.customName ?? "";
  const rowLabel =
    plantType === customPlantValue ? customName || "Autre" : plantType || "Plantation";

  const getCalculatedValue = (yearValue: number, sourceKeys: readonly ColumnKey[]) => {
    const total = sourceKeys.reduce<number | null>((sum, key) => {
      const parsedValue = parseTableNumber(row?.values?.[yearValue]?.[key] ?? "");
      if (parsedValue === null) return sum;

      return (sum ?? 0) + parsedValue;
    }, null);

    return total === null ? "" : formatTableNumber(total);
  };

  return (
    <InventoryDataTableRow
      label={
        <div className="min-w-[190px] space-y-2">
          <FormSelect
            form={mainForm}
            name={`perennialPlantationStock.rows.${index}.plantType` as const}
            placeholder="Type de plantation"
            data={plantOptions
              .map((option) => ({
                value: option,
                label: option,
              }))
              .concat([{ value: customPlantValue, label: "Autre" }])}
            size="sm"
          />
          {plantType === customPlantValue ? (
            <InventoryFieldInput
              form={mainForm}
              name={`perennialPlantationStock.rows.${index}.customName` as const}
              placeholder="Nom de la plantation"
              className="w-full"
              size="sm"
            />
          ) : null}
        </div>
      }
      cells={yearValues.flatMap((yearValue) =>
        columns.map((column) => {
          const calculatedFrom = "calculatedFrom" in column ? column.calculatedFrom : null;

          return {
            key: `${index}-${yearValue}-${column.key}`,
            className: calculatedFrom ? "bg-yellow-100/70" : undefined,
            content: calculatedFrom ? (
              <div
                aria-label={`${rowLabel} ${yearValue} ${column.label}`}
                className="flex h-9 min-w-[40px] items-center justify-end rounded-lg border border-border/15 bg-yellow-200 px-3 text-sm font-semibold text-foreground"
              >
                {getCalculatedValue(yearValue, calculatedFrom)}
              </div>
            ) : (
              <InventoryFieldInput
                form={mainForm}
                name={
                  `perennialPlantationStock.rows.${index}.values.${yearValue}.${column.key}` as const
                }
                type="number"
                className="w-full"
                size="sm"
              />
            ),
          };
        })
      )}
    >
      <TableCell className="px-3 py-2.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Supprimer"
          aria-label={`Supprimer ${rowLabel}`}
          disabled={!canRemove}
          onClick={onRemove}
        >
          <Trash2 aria-hidden="true" />
        </Button>
      </TableCell>
    </InventoryDataTableRow>
  );
}

export default function PerennialPlantationStockSurface() {
  const { years, mainForm } = useInventoryContext();
  const yearValues = years;
  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: "perennialPlantationStock.rows",
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography asChild variant="sectionTitle" size="sm">
            <h4>Plantations perennes</h4>
          </Typography>
          <Typography asChild variant="body" size="body" className="mt-2">
            <p>Ajouter un groupe de plantation, choisir un type ou saisir un nom libre.</p>
          </Typography>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(createPerennialPlantationRow(fields.length))}
        >
          <Plus aria-hidden="true" />
          Ajouter une plantation
        </Button>
      </div>

      <InventoryDataTable>
        <TableHeader>
          <InventoryDataTableHeaderRow stickySrLabel="Plantation">
            {years.flatMap((year) =>
              columns.map((column) => (
                <InventoryDataTableHead
                  key={`${year}-${column.key}`}
                  className="min-w-[132px]"
                  tone="secondary"
                >
                  <span className="flex flex-col gap-1">
                    <span>{year}</span>
                    <span className="font-semibold text-foreground">{column.label}</span>
                  </span>
                </InventoryDataTableHead>
              ))
            )}
            <InventoryDataTableHead className="w-12">
              <span className="sr-only">Actions</span>
            </InventoryDataTableHead>
          </InventoryDataTableHeaderRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <PlantationRow
              key={field.id}
              index={index}
              yearValues={yearValues}
              canRemove={fields.length > 1}
              onRemove={() => remove(index)}
            />
          ))}
        </TableBody>
      </InventoryDataTable>
    </section>
  );
}
