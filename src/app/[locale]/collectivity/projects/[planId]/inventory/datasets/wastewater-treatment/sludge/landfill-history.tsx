"use client";

import { useFieldArray, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import { InventoryTableSelectForm } from "@/components/table/InventoryTableSelect";
import { Button } from "@/components/ui/button";
import { FieldHelp, FieldRequired } from "@/components/ui/field-help";
import { FormControl, FormField, FormItem, FormMessage, type TName } from "@/components/ui/forms";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

import type { InventoryFormValues } from "../../../context/inventory-context";
import { useInventoryContext } from "../../../context/inventory-context";
import { wastewaterSanitation } from "../../../InventorySchema/wastewaterSanitation/config";

const baseName = "wastewaterSanitation.sludgeDestination.landfillSites.dataSet";
const i18nScope =
  "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.wastewaterTreatment.sludge.history";

function FieldLabel({ children, help }: { children: ReactNode; help?: ReactNode }) {
  return (
    <Typography variant="label" size="sm" className="inline-flex items-center gap-1">
      <span>{children}</span>
      <FieldRequired />
      {help ? <FieldHelp content={help} /> : null}
    </Typography>
  );
}

function TextField({ name, label }: { name: TName<InventoryFormValues>; label: string }) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FieldLabel>{label}</FieldLabel>
          <FormControl>
            <Input {...field} value={field.value == null ? "" : String(field.value)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function NumberField({ name, ariaLabel }: { name: TName<InventoryFormValues>; ariaLabel: string }) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              min={0}
              step="any"
              aria-label={ariaLabel}
              value={field.value == null ? "" : String(field.value)}
              onBlur={field.onBlur}
              onChange={(event) =>
                field.onChange(event.target.value === "" ? undefined : Number(event.target.value))
              }
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function LandfillHistoryEditor() {
  const t = useScopedI18n(i18nScope);
  const { mainForm, years } = useInventoryContext();
  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: baseName,
  });
  const sites = useWatch({ control: mainForm.control, name: baseName });
  const firstInventoryYear = Math.min(...years);
  const lastInventoryYear = Math.max(...years);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <Typography asChild variant="subtitle" size="sm">
            <h2>{t("title")}</h2>
          </Typography>
          <Typography asChild variant="caption" size="sm" className="text-muted-foreground">
            <p>{t("description")}</p>
          </Typography>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              landfillIdentifier: "",
              commissioningYear: firstInventoryYear,
              climate: "temperateDry",
              landfillSiteType: "managedAnaerobic",
              oxidationCover: "noneOrUnspecified",
              disposalHistory: {
                domestic: { value: {}, unit: "t wet sludge" },
                industrial: { value: {}, unit: "t wet sludge" },
              },
              methaneRecovery: { value: {}, unit: "kg CH4" },
            })
          }
        >
          <Plus aria-hidden="true" />
          {t("add")}
        </Button>
      </div>

      {fields.map((field, siteIndex) => {
        const commissioningYear = Number(sites?.[siteIndex]?.commissioningYear);
        const historyYears = Number.isInteger(commissioningYear)
          ? Array.from(
              { length: Math.max(0, lastInventoryYear - commissioningYear + 1) },
              (_, index) => commissioningYear + index
            )
          : [];
        const sitePath = `${baseName}.${siteIndex}`;

        return (
          <div key={field.id} className="space-y-3 rounded-xl border border-border bg-card p-3">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <TextField
                name={`${sitePath}.landfillIdentifier` as TName<InventoryFormValues>}
                label={t("fields.landfillIdentifier")}
              />
              <FormField
                name={`${sitePath}.commissioningYear` as TName<InventoryFormValues>}
                render={({ field: formField }) => (
                  <FormItem>
                    <FieldLabel help={t("help.commissioningYear")}>
                      {t("fields.commissioningYear")}
                    </FieldLabel>
                    <FormControl>
                      <Input
                        type="number"
                        max={lastInventoryYear}
                        value={formField.value == null ? "" : String(formField.value)}
                        onBlur={formField.onBlur}
                        onChange={(event) =>
                          formField.onChange(
                            event.target.value === "" ? undefined : Number(event.target.value)
                          )
                        }
                        ref={formField.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {(
                [
                  ["climate", wastewaterSanitation.landfillClimateValues],
                  ["landfillSiteType", wastewaterSanitation.landfillSiteTypeValues],
                  ["oxidationCover", wastewaterSanitation.landfillOxidationCoverValues],
                ] as const
              ).map(([key, values]) => (
                <div key={key} className="space-y-2">
                  <FieldLabel
                    help={key === "oxidationCover" ? t("help.oxidationCover") : undefined}
                  >
                    {t(`fields.${key}`)}
                  </FieldLabel>
                  <InventoryTableSelectForm
                    form={mainForm}
                    name={`${sitePath}.${key}` as TName<InventoryFormValues>}
                    ariaLabel={t(`fields.${key}`)}
                    placeholder=""
                    options={values.map((value) => ({
                      value,
                      label: t(`options.${key}.${value}`),
                    }))}
                  />
                </div>
              ))}
            </div>

            {historyYears.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-1 text-left">
                  <thead>
                    <tr>
                      <th className="px-2 py-1">
                        <Typography variant="label" size="sm">
                          {t("columns.year")}
                        </Typography>
                      </th>
                      {(["domestic", "industrial", "methaneRecovery"] as const).map((key) => (
                        <th key={key} className="px-2 py-1">
                          <FieldLabel>{t(`columns.${key}`)}</FieldLabel>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historyYears.map((year) => (
                      <tr key={year}>
                        <td className="px-2 py-1">
                          <Typography variant="label" size="sm">
                            {year}
                          </Typography>
                        </td>
                        <td className="px-2 py-1">
                          <NumberField
                            name={
                              `${sitePath}.disposalHistory.domestic.value.y-${year}` as TName<InventoryFormValues>
                            }
                            ariaLabel={t("aria.domestic", { year })}
                          />
                        </td>
                        <td className="px-2 py-1">
                          <NumberField
                            name={
                              `${sitePath}.disposalHistory.industrial.value.y-${year}` as TName<InventoryFormValues>
                            }
                            ariaLabel={t("aria.industrial", { year })}
                          />
                        </td>
                        <td className="px-2 py-1">
                          <NumberField
                            name={
                              `${sitePath}.methaneRecovery.value.y-${year}` as TName<InventoryFormValues>
                            }
                            ariaLabel={t("aria.methaneRecovery", { year })}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(siteIndex)}>
                <Trash2 aria-hidden="true" />
                {t("remove")}
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
