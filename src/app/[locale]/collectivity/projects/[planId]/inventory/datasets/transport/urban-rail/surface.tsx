"use client";

import { useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import FieldCheckbox from "@/components/forms/fields/FieldCheckbox";
import InventoryTableInput from "@/components/table/InventoryTableInput";
import {
  InventoryTableActionButton,
  InventoryTableHeader,
  InventoryTableIconButton,
} from "@/components/table/InventoryTableHeader";
import GroupedYear from "@/components/table/grouped-year";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FieldHelp } from "@/components/ui/field-help";
import { FormField, FormItem, FormMessage } from "@/components/ui/forms";
import type { TName } from "@/components/ui/forms";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { cn } from "@/lib/utils";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { useInventoryContext } from "../../../context/inventory-context";
import PriceAssumptionsTable from "../../../components/PriceAssumptionsTable";
import { buildUrbanRailEnergySection, buildUrbanRailServiceDefaultValues } from "./config";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;

function UrbanRailServiceSection({
  fieldId,
  index,
  energySection,
  tUrbanRail,
}: {
  fieldId: string;
  index: number;
  energySection: ReturnType<typeof buildUrbanRailEnergySection>;
  tUrbanRail: (...args: [string, ...any]) => string;
}) {
  const { mainForm } = useInventoryContext();
  const serviceBaseName = useMemo(() => `transport.urbanRail.dataSet.${index}`, [index]);
  const serviceName = useWatch({
    control: mainForm.control,
    name: inventoryName(`${serviceBaseName}.name`),
  });
  const serviceHasError = mainForm.getFieldState(
    inventoryName(serviceBaseName),
    mainForm.formState
  ).invalid;
  const baseNameBySubcolumn = useMemo(
    () => ({
      energy: inventoryName(`${serviceBaseName}.energy`),
      spend: inventoryName(`${serviceBaseName}.spend`),
    }),
    [serviceBaseName]
  );

  return (
    <AccordionItem
      value={fieldId}
      data-state={serviceHasError ? "error" : ""}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border/10 bg-surface-warm/40 data-[state=error]:border-destructive/70"
      )}
    >
      <AccordionTrigger icon="chevron-down" className="px-4 py-3 hover:no-underline">
        <Typography className="text-center" asChild variant="sectionTitle" size="xl">
          <h4>{serviceName || tUrbanRail("services.default")}</h4>
        </Typography>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 px-4 pb-4">
        <div className="flex items-center gap-1">
          <FieldCheckbox
            id={`urban-rail-boundary-${fieldId}`}
            form={mainForm}
            name={inventoryName(`${serviceBaseName}.operationsWithinMunicipalBoundary`)}
            label={tUrbanRail("services.operationsWithinMunicipalBoundary")}
            required
          />
          <FieldHelp
            content={tUrbanRail("services.operationsWithinMunicipalBoundaryHelp")}
            srLabel={tUrbanRail("services.operationsWithinMunicipalBoundaryHelpLabel")}
          />
        </div>
        <FormField
          control={mainForm.control}
          name={inventoryName(`${serviceBaseName}.operationsWithinMunicipalBoundary`)}
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="border-t border-border/10 pt-8">
          <GroupedYear
            title={energySection.title}
            rows={energySection.rows}
            subcolumns={energySection.subcolumns}
            form={mainForm}
            baseNameBySubcolumn={baseNameBySubcolumn}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function UrbanRailSurface() {
  const { mainForm } = useInventoryContext();
  const tUrbanRail = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.urbanRail"
  );
  const energySection = useMemo(() => buildUrbanRailEnergySection(tUrbanRail), [tUrbanRail]);
  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: "transport.urbanRail.dataSet",
  });

  return (
    <div className="space-y-8">
      <FormField
        control={mainForm.control}
        name="transport.urbanRail.dataSet"
        render={({ fieldState }) => (
          <FormItem className="space-y-3">
            <InventoryTableHeader
              title={
                <Typography variant="sectionTitle" size="lg">
                  {tUrbanRail("services.title")}
                </Typography>
              }
              description={tUrbanRail("services.description")}
              endContent={
                <InventoryTableActionButton
                  type="button"
                  onClick={() =>
                    append(buildUrbanRailServiceDefaultValues(), { shouldFocus: false })
                  }
                >
                  <Plus aria-hidden="true" />
                  {tUrbanRail("services.addLabel")}
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
                    name={inventoryName(`transport.urbanRail.dataSet.${index}.name`)}
                    type="text"
                    placeholder={tUrbanRail("services.default")}
                  />
                  <InventoryTableIconButton
                    type="button"
                    title={tUrbanRail("services.removeLabel")}
                    aria-label={`${tUrbanRail("services.removeLabel")} ${index + 1}`}
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
                    append(buildUrbanRailServiceDefaultValues(), { shouldFocus: false })
                  }
                >
                  <Plus aria-hidden="true" />
                  {tUrbanRail("services.addLabel")}
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
          <UrbanRailServiceSection
            key={field.id}
            fieldId={field.id}
            index={index}
            energySection={energySection}
            tUrbanRail={tUrbanRail}
          />
        ))}
      </Accordion>

      <div className="border-t border-border/10 pt-8">
        <PriceAssumptionsTable
          titleKey="fuelsAndElectricity"
          priceKeys={["diesel", "electricity"]}
        />
      </div>
    </div>
  );
}
