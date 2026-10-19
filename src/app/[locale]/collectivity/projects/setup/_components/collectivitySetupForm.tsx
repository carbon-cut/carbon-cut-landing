"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import AuthBrand from "@/app/[locale]/auth/_components/auth-brand";
import {
  CollectivityApiError,
  collectivityQueryKeys,
  saveCollectivitySetupRequest,
} from "@/app/[locale]/collectivity/_lib/queries";
import {
  collectivitySetupSchema,
  type CollectivitySetupValues,
  getCollectivityCountryOptions,
  getCollectivityYearOptions,
  latestCollectivityAvailableYear,
  slugifyCollectivitySlug,
} from "@/app/[locale]/collectivity/projects/setup/_lib/schema";
import { getCollectivityModuleRoute } from "@/app/[locale]/collectivity/_lib/routing";
import {
  CollectivityCheckbox,
  InventoryFieldInput,
  InventoryFieldSelect,
} from "@/app/[locale]/collectivity/_components/fields";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldHelp } from "@/components/ui/field-help";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/forms";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

type CompletionKey =
  | "name"
  | "slug"
  | "country"
  | "territory"
  | "referenceYear"
  | "inventoryYears"
  | "applicability";

type CollectivitySetupFormProps = {
  approvedClaimId?: number | null;
  countryOptions?: Array<{ value: string; label: ReactNode }>;
  currentPlanId?: string | null;
  initialValues?: Partial<CollectivitySetupValues> | null;
  variant: "setup" | "workspace";
};

function sortInventoryYears(years: number[]) {
  return [...years].sort((left, right) => left - right);
}

function getSetupFormDefaultValues(
  initialValues?: Partial<CollectivitySetupValues> | null
): Partial<CollectivitySetupValues> {
  return {
    name: initialValues?.name ?? "",
    slug: initialValues?.slug ?? "",
    country: initialValues?.country ?? "",
    territory: initialValues?.territory ?? "",
    referenceYear: initialValues?.referenceYear,
    inventoryYears: initialValues?.inventoryYears ?? [],
    applicability: {
      port: initialValues?.applicability?.port ?? false,
      agriculture: initialValues?.applicability?.agriculture ?? false,
    },
  };
}

export default function CollectivitySetupForm({
  approvedClaimId = null,
  countryOptions = [],
  currentPlanId = null,
  initialValues,
  variant,
}: CollectivitySetupFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const tSetup = useScopedI18n("collectivitySetup");
  const locale = useCurrentLocale();
  const isCountryEditable = !currentPlanId;
  const defaultValues = useMemo(() => getSetupFormDefaultValues(initialValues), [initialValues]);
  const resolvedCountryOptions = useMemo(
    () =>
      countryOptions.length > 0
        ? countryOptions
        : defaultValues.country
          ? getCollectivityCountryOptions([defaultValues.country], locale)
          : [],
    [countryOptions, defaultValues.country, locale]
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const setupMutation = useMutation({
    mutationFn: (values: CollectivitySetupValues) =>
      saveCollectivitySetupRequest({
        currentPlanId,
        approvedClaimId,
        values,
      }),
    onSuccess: (snapshot) => {
      if (currentPlanId && currentPlanId !== snapshot.project.slug) {
        void queryClient.invalidateQueries({
          queryKey: collectivityQueryKeys.currentInventory(currentPlanId),
        });
        void queryClient.invalidateQueries({
          queryKey: collectivityQueryKeys.result(currentPlanId),
        });
      }

      void queryClient.invalidateQueries({
        queryKey: collectivityQueryKeys.currentInventory(snapshot.project.slug),
      });
      void queryClient.invalidateQueries({
        queryKey: collectivityQueryKeys.result(snapshot.project.slug),
      });
      router.replace(getCollectivityModuleRoute(snapshot.project.slug, "setup"));
    },
  });

  const form = useForm<CollectivitySetupValues>({
    resolver: zodResolver(collectivitySetupSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const [inventoryYearDraft, setInventoryYearDraft] = useState("");
  const name = form.watch("name");
  const slug = form.watch("slug");
  const country = form.watch("country");
  const territory = form.watch("territory");
  const referenceYear = form.watch("referenceYear");
  const inventoryYears = form.watch("inventoryYears");
  const applicability = form.watch("applicability");

  const yearOptions = useMemo(
    () => getCollectivityYearOptions(2010, latestCollectivityAvailableYear),
    []
  );
  const suggestedSlug = useMemo(() => slugifyCollectivitySlug(name), [name]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(
    Boolean(
      defaultValues.slug && defaultValues.slug !== slugifyCollectivitySlug(defaultValues.name ?? "")
    )
  );
  const destructiveWarnings = useMemo(() => {
    if (!currentPlanId || !initialValues) {
      return [];
    }

    const warnings: string[] = [];
    const initialYears = initialValues.inventoryYears ?? [];
    const nextYears = new Set(inventoryYears);

    initialYears
      .filter((year) => !nextYears.has(year))
      .forEach((year) => {
        warnings.push(
          t("setupWorkspace.destructiveWarnings.items.removeYear", {
            year,
          }) as string
        );
      });

    const initialApplicability = initialValues.applicability;

    if (initialApplicability?.port && !applicability.port) {
      warnings.push(t("setupWorkspace.destructiveWarnings.items.disablePort") as string);
    }

    if (initialApplicability?.agriculture && !applicability.agriculture) {
      warnings.push(t("setupWorkspace.destructiveWarnings.items.disableAgriculture") as string);
    }

    return warnings;
  }, [
    applicability.agriculture,
    applicability.port,
    currentPlanId,
    initialValues,
    inventoryYears,
    t,
  ]);

  useEffect(() => {
    form.reset(defaultValues);
    setInventoryYearDraft("");
    setSubmitError(null);
    setSlugManuallyEdited(
      Boolean(
        defaultValues.slug &&
        defaultValues.slug !== slugifyCollectivitySlug(defaultValues.name ?? "")
      )
    );
  }, [defaultValues, form]);

  useEffect(() => {
    if (!name || !suggestedSlug || slugManuallyEdited) {
      return;
    }

    if (slug !== suggestedSlug) {
      form.setValue("slug", suggestedSlug, {
        shouldDirty: true,
      });
    }
  }, [form, name, slug, slugManuallyEdited, suggestedSlug]);

  const inventoryYearOptions = yearOptions.filter(
    (option) => !inventoryYears.includes(Number(option.value))
  );

  const completion = useMemo<Record<CompletionKey, boolean>>(
    () => ({
      name: name.trim().length > 0,
      slug: slug.trim().length > 0,
      country: Boolean(country),
      territory: territory.trim().length > 0,
      referenceYear: typeof referenceYear === "number",
      inventoryYears:
        inventoryYears.some((year) => year !== referenceYear) &&
        typeof referenceYear === "number" &&
        inventoryYears.includes(referenceYear),
      applicability:
        Boolean(initialValues?.applicability) || Boolean(form.formState.dirtyFields.applicability),
    }),
    [
      country,
      form.formState.dirtyFields.applicability,
      initialValues?.applicability,
      inventoryYears,
      name,
      referenceYear,
      slug,
      territory,
    ]
  );

  const completedCount = Object.values(completion).filter(Boolean).length;
  const isReady = completedCount === Object.keys(completion).length;

  const addInventoryYear = () => {
    const nextYear = Number(inventoryYearDraft);

    if (!inventoryYearDraft || Number.isNaN(nextYear) || inventoryYears.includes(nextYear)) {
      return;
    }

    form.setValue("inventoryYears", sortInventoryYears([...inventoryYears, nextYear]), {
      shouldDirty: true,
      shouldValidate: form.formState.isSubmitted,
    });
    setInventoryYearDraft("");
  };

  const removeInventoryYear = (year: number) => {
    if (year === referenceYear) {
      return;
    }

    form.setValue(
      "inventoryYears",
      inventoryYears.filter((item) => item !== year),
      {
        shouldDirty: true,
        shouldValidate: form.formState.isSubmitted,
      }
    );
  };

  const onSubmit = async (values: CollectivitySetupValues) => {
    setSubmitError(null);
    form.clearErrors();

    try {
      await setupMutation.mutateAsync(values);
    } catch (error) {
      const payload = error instanceof CollectivityApiError ? error.payload : null;
      const fieldErrors = payload?.error?.details?.fieldErrors;

      if (fieldErrors) {
        for (const [fieldName, message] of Object.entries(fieldErrors)) {
          if (!message) {
            continue;
          }

          form.setError(fieldName as keyof CollectivitySetupValues, {
            type: "server",
            message,
          });
        }
      }

      if (!fieldErrors || Object.keys(fieldErrors).length === 0) {
        setSubmitError(error instanceof Error ? error.message : (tSetup("submitError") as string));
      }
    }
  };

  const formBody = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-5", variant === "workspace" && "space-y-0")}
      >
        <div
          className={cn(
            /* variant === "workspace" && "grid xl:grid-cols-[minmax(0,1fr)_320px]" */ ""
          )}
        >
          <div className="min-w-0 space-y-5">
            <section
              className={cn(variant === "workspace" && "border-b border-border px-5 py-5 md:px-6")}
            >
              {variant === "workspace" ? (
                <>
                  <Typography asChild variant="heading3">
                    <h3>{t("setupWorkspace.sections.scope.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="bodySubframe" className="mt-2 max-w-3xl">
                    <p>{t("setupWorkspace.sections.scope.description") as string}</p>
                  </Typography>
                </>
              ) : null}

              <div
                className={cn(
                  "grid gap-2",
                  variant === "workspace" ? "mt-5 md:grid-cols-2" : "md:grid-cols-2"
                )}
              >
                <InventoryFieldInput
                  form={form}
                  name="name"
                  label={t("setupWorkspace.sections.scope.nameLabel") as string}
                  placeholder={t("setupWorkspace.sections.scope.namePlaceholder") as string}
                />

                <InventoryFieldSelect
                  form={form}
                  name="country"
                  label={t("setupWorkspace.sections.scope.countryLabel") as string}
                  placeholder={t("setupWorkspace.sections.scope.countryPlaceholder") as string}
                  options={resolvedCountryOptions}
                  disabled={!isCountryEditable}
                  onValueChange={(value) => {
                    form.setValue("country", value, { shouldDirty: true });
                    form.setValue("territory", "", { shouldDirty: true });
                    form.clearErrors("territory");
                  }}
                />

                <InventoryFieldInput
                  form={form}
                  name="territory"
                  label={t("setupWorkspace.sections.territory.label") as string}
                  placeholder={t("setupWorkspace.sections.territory.placeholder") as string}
                />

                <InventoryFieldInput
                  form={form}
                  name="slug"
                  label={t("setupWorkspace.sections.scope.slugLabel") as string}
                  placeholder={t("setupWorkspace.sections.scope.slugPlaceholder") as string}
                  onChange={() => setSlugManuallyEdited(true)}
                />
              </div>
            </section>

            <section
              className={cn(variant === "workspace" && "border-b border-border px-5 py-5 md:px-6")}
            >
              {variant === "workspace" ? (
                <>
                  <Typography asChild variant="heading3">
                    <h3>{t("setupWorkspace.sections.temporality.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="bodySubframe" className="mt-2 max-w-3xl">
                    <p>{t("setupWorkspace.sections.temporality.description") as string}</p>
                  </Typography>
                </>
              ) : null}

              <div
                className={cn(
                  "grid gap-2",
                  variant === "workspace" ? "mt-5 md:grid-cols-2" : "md:grid-cols-2"
                )}
              >
                <InventoryFieldSelect
                  form={form}
                  name="referenceYear"
                  value={referenceYear ? String(referenceYear) : ""}
                  label={t("setupWorkspace.sections.temporality.referenceYearLabel") as string}
                  placeholder={
                    t("setupWorkspace.sections.temporality.referenceYearPlaceholder") as string
                  }
                  options={yearOptions}
                  onValueChange={(value) => {
                    const nextReferenceYear = Number(value);
                    form.setValue("referenceYear", nextReferenceYear, {
                      shouldDirty: true,
                    });
                    form.setValue(
                      "inventoryYears",
                      sortInventoryYears(
                        Array.from(
                          new Set([...form.getValues("inventoryYears"), nextReferenceYear])
                        )
                      ),
                      { shouldDirty: true }
                    );
                  }}
                />

                <div className="space-y-2">
                  <InventoryFieldSelect
                    form={form}
                    name="inventoryYears"
                    value={inventoryYearDraft}
                    onValueChange={setInventoryYearDraft}
                    disabled={typeof referenceYear !== "number"}
                    showError={form.formState.isSubmitted}
                    label={t("setupWorkspace.sections.temporality.inventoryYearsLabel") as string}
                    placeholder={
                      typeof referenceYear === "number"
                        ? (t(
                            "setupWorkspace.sections.temporality.inventoryYearsPlaceholder"
                          ) as string)
                        : (t(
                            "setupWorkspace.sections.temporality.inventoryYearsDisabledPlaceholder"
                          ) as string)
                    }
                    options={inventoryYearOptions}
                  />
                  <Button
                    type="button"
                    variant="brand-secondary"
                    size="sm"
                    className="w-full h-8 shadow-none sm:w-auto"
                    onClick={addInventoryYear}
                    disabled={!inventoryYearDraft}
                    icon={<Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                  >
                    {t("setupWorkspace.sections.temporality.addYear") as string}
                  </Button>
                  {inventoryYears.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {inventoryYears.map((year) => {
                        const isReferenceYear = year === referenceYear;

                        return (
                          <div
                            key={year}
                            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5"
                          >
                            <Typography asChild variant="captionSubframe">
                              <span>{year}</span>
                            </Typography>
                            {isReferenceYear ? (
                              <Badge variant="outline">
                                {
                                  t(
                                    "setupWorkspace.sections.temporality.referenceYearBadge"
                                  ) as string
                                }
                              </Badge>
                            ) : (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 rounded-full"
                                onClick={() => removeInventoryYear(year)}
                                aria-label={`${t("setupWorkspace.sections.temporality.removeYear") as string} ${year}`}
                              >
                                <X className="h-3 w-3" aria-hidden="true" />
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : variant === "workspace" ? (
                    <div className="rounded-md border border-dashed border-border px-3 py-3">
                      <Typography asChild variant="captionSubframe">
                        <p>{t("setupWorkspace.sections.temporality.emptyState") as string}</p>
                      </Typography>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>

            <section className={cn(variant === "workspace" && "px-5 py-5 md:px-6")}>
              {variant === "workspace" ? (
                <>
                  <Typography asChild variant="heading3">
                    <h3>{t("setupWorkspace.sections.applicability.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="bodySubframe" className="mt-2 max-w-3xl">
                    <p>{t("setupWorkspace.sections.applicability.description") as string}</p>
                  </Typography>
                </>
              ) : null}

              <div className={cn("space-y-4", variant === "workspace" && "mt-5")}>
                <div className="flex items-center gap-1.5">
                  <Typography asChild variant="bodyBold">
                    <p>{t("setupWorkspace.sections.applicability.legend") as string}</p>
                  </Typography>
                  <FieldHelp
                    content={t("setupWorkspace.sections.applicability.helper") as string}
                  />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="applicability.port"
                    render={({ field }) => (
                      <FormItem className="rounded-md border border-border p-4">
                        <div className="flex items-start gap-3">
                          <FormControl className="mt-1">
                            <CollectivityCheckbox
                              checked={field.value}
                              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>
                              {
                                t(
                                  "setupWorkspace.sections.applicability.options.port.label"
                                ) as string
                              }
                            </FormLabel>
                            <Typography asChild variant="captionSubframe">
                              <p>
                                {
                                  t(
                                    "setupWorkspace.sections.applicability.options.port.helper"
                                  ) as string
                                }
                              </p>
                            </Typography>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicability.agriculture"
                    render={({ field }) => (
                      <FormItem className="rounded-md border border-border p-4">
                        <div className="flex items-start gap-3">
                          <FormControl className="mt-1">
                            <CollectivityCheckbox
                              checked={field.value}
                              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>
                              {
                                t(
                                  "setupWorkspace.sections.applicability.options.agriculture.label"
                                ) as string
                              }
                            </FormLabel>
                            <Typography asChild variant="captionSubframe">
                              <p>
                                {
                                  t(
                                    "setupWorkspace.sections.applicability.options.agriculture.helper"
                                  ) as string
                                }
                              </p>
                            </Typography>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {submitError ? (
                <p className="mt-4 text-sm font-medium text-destructive">{submitError}</p>
              ) : null}
              {destructiveWarnings.length > 0 ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{t("setupWorkspace.destructiveWarnings.title") as string}</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc space-y-1 pl-4">
                      {destructiveWarnings.map((warning) => (
                        <li key={warning}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : null}

              <div
                className={cn(
                  "mt-6",
                  variant === "workspace" ? "flex items-center justify-between gap-4" : ""
                )}
              >
                {variant === "workspace" ? (
                  <Typography asChild variant="captionSubframe">
                    <p>{t("setupWorkspace.sections.applicability.footer") as string}</p>
                  </Typography>
                ) : null}
                <Button
                  type="submit"
                  variant="brand-primary"
                  className={cn("", variant === "setup" ? "w-full rounded-full" : "")}
                  disabled={setupMutation.isPending}
                >
                  {variant === "setup"
                    ? (tSetup("primaryCta") as string)
                    : (t("setupWorkspace.primaryCta") as string)}
                </Button>
              </div>
            </section>
          </div>
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
        <Typography asChild variant="heading1">
          <h1 id="collectivity-setup-title">{tSetup("title") as string}</h1>
        </Typography>
        <Typography asChild variant="bodySubframe" className="mt-3">
          <p>{tSetup("description") as string}</p>
        </Typography>
        <div className="mt-3">{formBody}</div>
      </section>
    );
  }

  return (
    <section className="">
      <header className="px-5 py-5 md:px-6">
        <Typography asChild variant="heading1">
          <h2>{t("setupWorkspace.title") as string}</h2>
        </Typography>
        <Typography asChild variant="bodySubframe" className="mt-3 max-w-3xl">
          <p>{t("setupWorkspace.description") as string}</p>
        </Typography>
      </header>
      <div className="bg-card rounded-xl">{formBody}</div>
    </section>
  );
}
