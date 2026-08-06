"use client";

import { useMemo, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import GroupedYear from "@/components/table/grouped-year";
import InventoryTableInput from "@/components/table/InventoryTableInput";
import {
  InventoryTableActionButton,
  InventoryTableHeader,
  InventoryTableIconButton,
} from "@/components/table/InventoryTableHeader";
import MatrixTable from "@/components/table/matrix";
import PriceAssumptionsTable from "../../../components/PriceAssumptionsTable";
import { FieldRequired } from "@/components/ui/field-help";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/forms";
import { Separator } from "@/components/ui/separator";
import type { TName } from "@/components/ui/forms";
import Typography from "@/components/ui/typography";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { useInventoryContext } from "../../../context/inventory-context";
import { Plus, Trash2 } from "lucide-react";
import { useScopedI18n } from "@/locales/client";
import { cn } from "@/lib/utils";
import {
  buildPublicTransportEnergyByFuelSection,
  buildPublicTransportExploitationRowsWithoutFuel,
  buildPublicTransportFutureYears,
  buildPublicTransportOperatorDefaultValues,
  buildPublicTransportRenewalFutureRows,
  buildPublicTransportRows,
} from "./config";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;

function PublicTransportOperatorSection({
  fieldId,
  index,
  exploitationRows,
  energyByFuelSection,
  renewalRows,
  ageRows,
  renewalFutureRows,
  futureYears,
  tPublicTransport,
}: {
  fieldId: string;
  index: number;
  exploitationRows: ReturnType<typeof buildPublicTransportExploitationRowsWithoutFuel>;
  energyByFuelSection: ReturnType<typeof buildPublicTransportEnergyByFuelSection>;
  renewalRows: ReturnType<typeof buildPublicTransportRows>;
  ageRows: ReturnType<typeof buildPublicTransportRows>;
  renewalFutureRows: ReturnType<typeof buildPublicTransportRenewalFutureRows>;
  futureYears: number[];
  tPublicTransport: ReturnType<typeof useScopedI18n>;
}) {
  const { mainForm } = useInventoryContext();
  const operatorBaseNamePath = useMemo(() => `transport.publicTransport.dataSet.${index}`, [index]);
  const operatorBaseName = useWatch({
    control: mainForm.control,
    name: inventoryName(`${operatorBaseNamePath}.name`),
  });
  const operatorHasError = mainForm.getFieldState(
    inventoryName(operatorBaseNamePath),
    mainForm.formState
  ).invalid;
  const baseNameBySubcolumn = useMemo(
    () => ({
      buses: inventoryName(`${operatorBaseNamePath}.buses`),
      consumption: inventoryName(`${operatorBaseNamePath}.consumption`),
      spend: inventoryName(`${operatorBaseNamePath}.spend`),
    }),
    [operatorBaseNamePath]
  );

  return (
    <AccordionItem
      value={fieldId}
      data-state={operatorHasError ? "error" : ""}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border/10 bg-surface-warm/40 data-[state=error]:border-destructive/70"
      )}
    >
      <AccordionTrigger icon="chevron-down" className="px-4 py-3 hover:no-underline">
        <Typography className="text-center" asChild variant="sectionTitle" size="xl">
          <h4>{operatorBaseName || tPublicTransport("operators.default")}</h4>
        </Typography>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 px-4 pb-4">
        <div className="border-t border-border/10 pt-8">
          <MatrixTable
            title={tPublicTransport("exploitation.title")}
            rows={exploitationRows}
            form={mainForm}
            baseName={inventoryName(`${operatorBaseNamePath}.exploitation`)}
          />
        </div>

        <div className="border-t border-border/10 pt-8">
          <GroupedYear
            title={energyByFuelSection.title}
            description={energyByFuelSection.description}
            rows={energyByFuelSection.rows}
            subcolumns={energyByFuelSection.subcolumns}
            form={mainForm}
            baseNameBySubcolumn={baseNameBySubcolumn}
          />
        </div>

        <div className="border-t border-border/10 pt-8">
          <MatrixTable
            title={tPublicTransport("renewal.title")}
            rows={renewalRows}
            form={mainForm}
            baseName={inventoryName(`${operatorBaseNamePath}.renewal`)}
          />
        </div>

        <div className="border-t border-border/10 pt-8">
          <MatrixTable
            title={tPublicTransport("age.title")}
            rows={ageRows}
            form={mainForm}
            baseName={inventoryName(`${operatorBaseNamePath}.age`)}
          />
        </div>

        <div className="border-t border-border/10 pt-8">
          <MatrixTable
            title={tPublicTransport("future.title")}
            rows={renewalFutureRows}
            form={mainForm}
            baseName={inventoryName(operatorBaseNamePath)}
            years={futureYears}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function PublicTransportSurface() {
  const { mainForm, years } = useInventoryContext();
  const tPublicTransport = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.publicTransport"
  );

  const {
    futureYears,
    exploitationRows,
    energyByFuelSection,
    renewalRows,
    ageRows,
    renewalFutureRows,
  } = useState(() => ({
    futureYears: buildPublicTransportFutureYears(),
    exploitationRows: buildPublicTransportExploitationRowsWithoutFuel(tPublicTransport),
    energyByFuelSection: buildPublicTransportEnergyByFuelSection(tPublicTransport),
    renewalRows: buildPublicTransportRows("renewal", tPublicTransport),
    ageRows: buildPublicTransportRows("age", tPublicTransport),
    renewalFutureRows: buildPublicTransportRenewalFutureRows(tPublicTransport),
  }))[0];

  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: "transport.publicTransport.dataSet",
  });

  return (
    <div className="space-y-8">
      <FormField
        control={mainForm.control}
        name={inventoryName("transport.publicTransport.dataSet")}
        render={({ fieldState }) => (
          <FormItem className="space-y-3">
            <InventoryTableHeader
              title={
                <Typography
                  variant="sectionTitle"
                  size="lg"
                  className="inline-flex items-center gap-1"
                >
                  <span>{tPublicTransport("operators.title")}</span>
                  <FieldRequired />
                </Typography>
              }
              description={tPublicTransport("operators.description")}
              endContent={
                <InventoryTableActionButton
                  type="button"
                  onClick={() =>
                    append(buildPublicTransportOperatorDefaultValues(), { shouldFocus: false })
                  }
                >
                  <Plus aria-hidden="true" />
                  {tPublicTransport("operators.addLabel")}
                </InventoryTableActionButton>
              }
            />
            <div
              data-state={fieldState.error ? "error" : ""}
              className="space-y-3 rounded-2xl border border-border/10 bg-card p-4 data-[state=error]:border-destructive/70"
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto]"
                >
                  <InventoryTableInput
                    form={mainForm}
                    name={inventoryName(`transport.publicTransport.dataSet.${index}.name`)}
                    type="text"
                    placeholder={tPublicTransport("operators.default")}
                  />
                  <InventoryTableIconButton
                    type="button"
                    title="Supprimer"
                    aria-label={`Supprimer ${tPublicTransport("operators.rowPrefix")} ${index + 1}`}
                    disabled={fields.length <= 0}
                    onClick={() => remove(index)}
                  >
                    <Trash2 aria-hidden="true" />
                  </InventoryTableIconButton>
                </div>
              ))}
              {fields.length === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start rounded-xl border-dashed"
                  onClick={() =>
                    append(buildPublicTransportOperatorDefaultValues(), { shouldFocus: false })
                  }
                >
                  <Plus aria-hidden="true" />
                  {tPublicTransport("operators.addLabel")}
                </Button>
              ) : null}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <Accordion
        type="multiple"
        className="space-y-4"
        defaultValue={fields.map((field) => field.id)}
      >
        {fields.map((field, index) => (
          <PublicTransportOperatorSection
            key={field.id}
            fieldId={field.id}
            index={index}
            exploitationRows={exploitationRows}
            energyByFuelSection={energyByFuelSection}
            renewalRows={renewalRows}
            ageRows={ageRows}
            renewalFutureRows={renewalFutureRows}
            futureYears={futureYears}
            tPublicTransport={tPublicTransport}
          />
        ))}
      </Accordion>

      <div className="border-t border-border/10 pt-8">
        <PriceAssumptionsTable
          titleKey="fuelsAndElectricity"
          priceKeys={["diesel", "petrol", "gpl", "electricity", "gnv"]}
        />
      </div>
    </div>
  );
}
