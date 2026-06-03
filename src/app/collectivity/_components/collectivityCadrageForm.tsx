"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import AuthBrand from "@/app/auth/_components/auth-brand";
import {
  collectivityCadrageSchema,
  collectivityCountryOptions,
  type CollectivityCadrageValues,
  getCollectivityPlanIdSuggestion,
  getCollectivityTerritoryOptions,
  getCollectivityYearOptions,
} from "@/app/collectivity/_cadrage/schema";
import { getCollectivityModuleRoute } from "@/app/collectivity/_lib/routing";
import { CollectivityInput, CollectivitySelect } from "@/app/collectivity/_components/fields";
import { CollectivityBulletList } from "@/app/collectivity/_components/lists";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldHelp } from "@/components/ui/field-help";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

type CompletionKey = "country" | "planId" | "territory" | "referenceYear" | "supportYears";

type CollectivityCadrageFormProps = {
  countryOptions?: Array<{ value: string; label: string }>;
  currentPlanId?: string | null;
  initialValues?: Partial<CollectivityCadrageValues> | null;
  variant: "setup" | "workspace";
};

type CadrageApiError = {
  message?: string;
  details?: {
    fieldErrors?: Partial<Record<keyof CollectivityCadrageValues, string>>;
  };
};

export default function CollectivityCadrageForm({
  countryOptions = collectivityCountryOptions,
  currentPlanId = null,
  initialValues,
  variant,
}: CollectivityCadrageFormProps) {
  const router = useRouter();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const tSetup = useScopedI18n("collectivitySetup");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CollectivityCadrageValues>({
    resolver: zodResolver(collectivityCadrageSchema),
    defaultValues: {
      country: initialValues?.country ?? "",
      planId: initialValues?.planId ?? "",
      territoryName: initialValues?.territoryName ?? "",
      referenceYear: initialValues?.referenceYear ?? "",
      supportYears: initialValues?.supportYears ?? [],
    },
    mode: "onSubmit",
  });

  const outputItems = t("cadrageWorkspace.output.items") as string[];
  const [supportYearDraft, setSupportYearDraft] = useState("");
  const country = form.watch("country");
  const planId = form.watch("planId");
  const territoryName = form.watch("territoryName");
  const referenceYear = form.watch("referenceYear");
  const supportYears = form.watch("supportYears");

  const yearOptions = useMemo(() => getCollectivityYearOptions(2018, 2035), []);
  const territoryOptions = useMemo(() => {
    const baseOptions = getCollectivityTerritoryOptions(country);

    if (!territoryName || baseOptions.some((option) => option.value === territoryName)) {
      return baseOptions;
    }

    return [{ value: territoryName, label: territoryName, planId }, ...baseOptions];
  }, [country, planId, territoryName]);
  const suggestedPlanId = useMemo(
    () => (country && territoryName ? getCollectivityPlanIdSuggestion(country, territoryName) : ""),
    [country, territoryName]
  );
  const [planIdManuallyEdited, setPlanIdManuallyEdited] = useState(
    Boolean(initialValues?.planId && initialValues.planId !== suggestedPlanId)
  );

  useEffect(() => {
    if (!territoryName || !suggestedPlanId || planIdManuallyEdited) {
      return;
    }

    if (planId !== suggestedPlanId) {
      form.setValue("planId", suggestedPlanId, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [form, planId, planIdManuallyEdited, suggestedPlanId, territoryName]);

  const supportYearOptions = yearOptions.filter(
    (option) => option.value !== referenceYear && !supportYears.includes(option.value)
  );

  const completion = useMemo<Record<CompletionKey, boolean>>(
    () => ({
      country: Boolean(country),
      planId: planId.trim().length > 0,
      territory: territoryName.trim().length > 0,
      referenceYear: Boolean(referenceYear),
      supportYears: supportYears.length > 0,
    }),
    [country, planId, referenceYear, supportYears.length, territoryName]
  );

  const completedCount = Object.values(completion).filter(Boolean).length;
  const isReady = completedCount === Object.keys(completion).length;

  const addSupportYear = () => {
    if (
      !supportYearDraft ||
      supportYears.includes(supportYearDraft) ||
      supportYearDraft === referenceYear
    ) {
      return;
    }

    form.setValue("supportYears", [...supportYears, supportYearDraft], {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSupportYearDraft("");
  };

  const removeSupportYear = (year: string) => {
    form.setValue(
      "supportYears",
      supportYears.filter((item) => item !== year),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  const onSubmit = async (values: CollectivityCadrageValues) => {
    setSubmitError(null);
    form.clearErrors();

    const response = await fetch(
      currentPlanId
        ? `/api/collectivity/cadrage?currentPlanId=${encodeURIComponent(currentPlanId)}`
        : "/api/collectivity/cadrage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(values),
      }
    );

    const payload = (await response.json()) as {
      data?: CollectivityCadrageValues;
      error?: CadrageApiError;
    };

    if (!response.ok || !payload.data) {
      const fieldErrors = payload.error?.details?.fieldErrors;

      if (fieldErrors) {
        for (const [fieldName, message] of Object.entries(fieldErrors)) {
          if (!message) {
            continue;
          }

          form.setError(fieldName as keyof CollectivityCadrageValues, {
            type: "server",
            message,
          });
        }
      }

      if (!fieldErrors || Object.keys(fieldErrors).length === 0) {
        setSubmitError(payload.error?.message ?? (tSetup("submitError") as string));
      }

      return;
    }

    router.push(getCollectivityModuleRoute(payload.data.planId, "cadrage"));
  };

  const formBody = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-5", variant === "workspace" && "space-y-0")}
      >
        <div className={cn(variant === "workspace" && "grid xl:grid-cols-[minmax(0,1fr)_320px]")}>
          <div className="min-w-0 space-y-5">
            <section
              className={cn(variant === "workspace" && "border-b border-border px-5 py-5 md:px-6")}
            >
              {variant === "workspace" ? (
                <>
                  <Typography asChild variant="sectionTitle" size="sm">
                    <h3>{t("cadrageWorkspace.sections.scope.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                    <p>{t("cadrageWorkspace.sections.scope.description") as string}</p>
                  </Typography>
                </>
              ) : null}

              <div
                className={cn(
                  "grid gap-5",
                  variant === "workspace" ? "mt-5 md:grid-cols-2" : "md:grid-cols-1"
                )}
              >
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("cadrageWorkspace.sections.scope.countryLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("cadrageWorkspace.sections.scope.countryHelper") as string}
                        />
                      </div>
                      <FormControl>
                        <CollectivitySelect
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("territoryName", "", {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            if (!planIdManuallyEdited) {
                              form.setValue("planId", "", {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                            }
                          }}
                          placeholder={
                            t("cadrageWorkspace.sections.scope.countryPlaceholder") as string
                          }
                          options={countryOptions}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="territoryName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("cadrageWorkspace.sections.territory.label") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("cadrageWorkspace.sections.territory.helper") as string}
                        />
                      </div>
                      <FormControl>
                        <CollectivitySelect
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (!planIdManuallyEdited) {
                              form.setValue(
                                "planId",
                                getCollectivityPlanIdSuggestion(country, value),
                                {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                }
                              );
                            }
                          }}
                          disabled={!country}
                          placeholder={
                            country
                              ? ((t("cadrageWorkspace.sections.territory.placeholder") as string) ??
                                "")
                              : (t(
                                  "cadrageWorkspace.sections.territory.disabledPlaceholder"
                                ) as string)
                          }
                          options={territoryOptions.map(({ value, label }) => ({ value, label }))}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="planId"
                  render={({ field, fieldState }) => (
                    <FormItem className={cn(variant === "workspace" && "md:col-span-2")}>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("cadrageWorkspace.sections.scope.planIdLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("cadrageWorkspace.sections.scope.planIdHelper") as string}
                        />
                      </div>
                      <FormControl>
                        <CollectivityInput
                          {...field}
                          value={field.value ?? ""}
                          className="w-full"
                          placeholder={
                            t("cadrageWorkspace.sections.scope.planIdPlaceholder") as string
                          }
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          onChange={(event) => {
                            setPlanIdManuallyEdited(true);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className={cn(variant === "workspace" && "px-5 py-5 md:px-6")}>
              {variant === "workspace" ? (
                <>
                  <Typography asChild variant="sectionTitle" size="sm">
                    <h3>{t("cadrageWorkspace.sections.temporality.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                    <p>{t("cadrageWorkspace.sections.temporality.description") as string}</p>
                  </Typography>
                </>
              ) : null}

              <div
                className={cn(
                  "grid gap-5",
                  variant === "workspace" ? "mt-5 md:grid-cols-2" : "md:grid-cols-2"
                )}
              >
                <FormField
                  control={form.control}
                  name="referenceYear"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("cadrageWorkspace.sections.temporality.referenceYearLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={
                            t("cadrageWorkspace.sections.temporality.referenceYearHelper") as string
                          }
                        />
                      </div>
                      <FormControl>
                        <CollectivitySelect
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue(
                              "supportYears",
                              form.getValues("supportYears").filter((year) => year !== value),
                              { shouldValidate: true, shouldDirty: true }
                            );
                          }}
                          placeholder={
                            t(
                              "cadrageWorkspace.sections.temporality.referenceYearPlaceholder"
                            ) as string
                          }
                          options={yearOptions}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supportYears"
                  render={({ fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("cadrageWorkspace.sections.temporality.supportYearsLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("cadrageWorkspace.sections.temporality.helper") as string}
                        />
                      </div>
                      <div className="flex gap-2">
                        <CollectivitySelect
                          value={supportYearDraft}
                          onValueChange={setSupportYearDraft}
                          placeholder={
                            t(
                              "cadrageWorkspace.sections.temporality.supportYearsPlaceholder"
                            ) as string
                          }
                          options={supportYearOptions}
                          className="w-full"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-10 rounded-md px-3 shadow-none"
                          onClick={addSupportYear}
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          {t("cadrageWorkspace.sections.temporality.addYear") as string}
                        </Button>
                      </div>
                      {supportYears.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {supportYears.map((year) => (
                            <div
                              key={year}
                              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5"
                            >
                              <Typography asChild variant="caption" size="sm">
                                <span>{year}</span>
                              </Typography>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 rounded-full"
                                onClick={() => removeSupportYear(year)}
                                aria-label={`${t("cadrageWorkspace.sections.temporality.removeYear") as string} ${year}`}
                              >
                                <X className="h-3 w-3" aria-hidden="true" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : variant === "workspace" ? (
                        <div className="rounded-md border border-dashed border-border px-3 py-3">
                          <Typography
                            asChild
                            variant="caption"
                            size="sm"
                            className="text-secondary"
                          >
                            <p>{t("cadrageWorkspace.sections.temporality.emptyState") as string}</p>
                          </Typography>
                        </div>
                      ) : null}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {submitError ? (
                <p className="mt-4 text-sm font-medium text-destructive">{submitError}</p>
              ) : null}

              <div
                className={cn(
                  "mt-6",
                  variant === "workspace" ? "flex items-center justify-between gap-4" : ""
                )}
              >
                {variant === "workspace" ? (
                  <Typography asChild variant="caption" size="sm" className="text-secondary">
                    <p>{t("cadrageWorkspace.sections.temporality.helper") as string}</p>
                  </Typography>
                ) : null}
                <Button
                  type="submit"
                  className={cn("h-11", variant === "setup" ? "w-full" : "min-w-44")}
                  disabled={form.formState.isSubmitting}
                >
                  {variant === "setup"
                    ? (tSetup("primaryCta") as string)
                    : (t("cadrageWorkspace.primaryCta") as string)}
                </Button>
              </div>
            </section>
          </div>

          {variant === "workspace" ? (
            <aside className="border-t border-border xl:border-l xl:border-t-0">
              <section className="border-b border-border px-5 py-5 md:px-6">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{t("cadrageWorkspace.output.title") as string}</h3>
                </Typography>
                <CollectivityBulletList className="mt-4" items={outputItems} tone="muted" />
              </section>

              <section className="px-5 py-5 md:px-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Typography asChild variant="sectionTitle" size="sm">
                    <h3>{t("cadrageWorkspace.completion.title") as string}</h3>
                  </Typography>
                  <Badge variant={isReady ? "accent" : "outline"}>
                    {isReady
                      ? (t("cadrageWorkspace.completion.ready") as string)
                      : (t("cadrageWorkspace.completion.incomplete") as string)}
                  </Badge>
                </div>
                <Typography asChild variant="caption" size="sm" className="mt-3 text-secondary">
                  <p>
                    {completedCount}/{Object.keys(completion).length}{" "}
                    {t("cadrageWorkspace.completion.progressSuffix") as string}
                  </p>
                </Typography>
                <div className="mt-4 space-y-3">
                  {(Object.keys(completion) as CompletionKey[]).map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-3"
                    >
                      <Typography asChild variant="body" size="body">
                        <span>{t(`cadrageWorkspace.completion.items.${key}`) as string}</span>
                      </Typography>
                      <Badge variant={completion[key] ? "accent" : "outline"}>
                        {completion[key]
                          ? (t("status.complete") as string)
                          : (t("priority.recommended") as string)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          ) : null}
        </div>
      </form>
    </Form>
  );

  if (variant === "setup") {
    return (
      <section aria-labelledby="collectivity-setup-title" className="mx-auto w-full">
        <div className="mx-auto mb-7 mt-1 w-fit">
          <AuthBrand />
        </div>
        <Typography asChild variant="title" size="md">
          <h1 id="collectivity-setup-title">{tSetup("title") as string}</h1>
        </Typography>
        <Typography asChild variant="description" size="md" className="mt-3">
          <p>{tSetup("description") as string}</p>
        </Typography>
        <div className="mt-6">{formBody}</div>
      </section>
    );
  }

  return (
    <section className="border border-border bg-card">
      <header className="border-b border-border px-5 py-5 md:px-6">
        <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
          <p>{t("cadrageWorkspace.eyebrow") as string}</p>
        </Typography>
        <Typography asChild variant="title" size="2xl" className="mt-2">
          <h2>{t("cadrageWorkspace.title") as string}</h2>
        </Typography>
        <Typography asChild variant="body" size="body" className="mt-3 max-w-3xl">
          <p>{t("cadrageWorkspace.description") as string}</p>
        </Typography>
      </header>
      {formBody}
    </section>
  );
}
