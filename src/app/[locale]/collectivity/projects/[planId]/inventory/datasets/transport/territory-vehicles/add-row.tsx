"use client";

import { useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Plus } from "lucide-react";

import { InventoryTableActionButton } from "@/components/table/InventoryTableHeader";
import { Form } from "@/components/ui/forms";
import { InventoryTableSelectForm } from "@/components/table/InventoryTableSelect";
import {
  buildTerritoryVehicleFuelOptions,
  buildTerritoryVehicleRow,
  getTerritoryVehicleInsertIndex,
  type TerritoryVehicleRow,
} from "./config";

type Option = { value: string; label: string };

const schema = z.object({
  vehicleType: z.string().min(1, "Required"),
  fuel: z.string().min(1, "Required"),
});

type AddRowFormValues = z.infer<typeof schema>;

const defaultValues: AddRowFormValues = {
  vehicleType: "",
  fuel: "",
};

export default function TerritoryVehiclesAddRow({
  rows,
  vehicleTypePlaceholder,
  fuelPlaceholder,
  vehicleTypeOptions,
  addLabel,
  labelFunc,
  insertRow,
}: {
  rows: TerritoryVehicleRow[];
  vehicleTypePlaceholder: string;
  fuelPlaceholder: string;
  vehicleTypeOptions: Option[];
  addLabel: string;
  labelFunc: (...args: [string, ...any]) => string;
  insertRow: (index: number, row: Record<string, unknown>) => void;
}) {
  const form = useForm<AddRowFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const vehicleType = useWatch({
    control: form.control,
    name: "vehicleType",
  });

  const fuelOptions = useMemo(
    () =>
      buildTerritoryVehicleFuelOptions({
        rows,
        vehicleType: vehicleType ?? "",
        labelFunc,
      }),
    [labelFunc, rows, vehicleType]
  );

  return (
    <Form {...form}>
      <div className="flex items-start justify-between gap-3">
        <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-[minmax(0,260px)_minmax(0,220px)]">
          <InventoryTableSelectForm
            form={form}
            name="vehicleType"
            ariaLabel={vehicleTypePlaceholder}
            placeholder={vehicleTypePlaceholder}
            options={vehicleTypeOptions}
            fallback
            onChange={() => {
              form.setValue("fuel", "", {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: false,
              });
            }}
          />
          <InventoryTableSelectForm
            form={form}
            name="fuel"
            ariaLabel={fuelPlaceholder}
            placeholder={fuelPlaceholder}
            options={fuelOptions}
            fallback
          />
        </div>
        <InventoryTableActionButton
          type="button"
          title={addLabel}
          aria-label={addLabel}
          onClick={() => {
            void form.handleSubmit((values) => {
              const insertIndex = getTerritoryVehicleInsertIndex(rows, values.vehicleType);
              insertRow(insertIndex, buildTerritoryVehicleRow(values.vehicleType, values.fuel));
              form.reset(defaultValues);
            })();
          }}
        >
          <Plus aria-hidden="true" />
          {addLabel}
        </InventoryTableActionButton>
      </div>
    </Form>
  );
}
