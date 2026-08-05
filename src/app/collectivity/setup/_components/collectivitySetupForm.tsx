"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import AuthBrand from "@/app/auth/_components/auth-brand";
import {
  CollectivityApiError,
  collectivityQueryKeys,
  saveCollectivitySetupRequest,
} from "@/app/collectivity/_lib/queries";
import {
  collectivitySetupSchema,
  collectivityCountryOptions,
  type CollectivitySetupValues,
  getCollectivityYearOptions,
  latestCollectivityAvailableYear,
  slugifyCollectivitySlug,
} from "@/app/collectivity/setup/_lib/schema";
import { getCollectivityModuleRoute } from "@/app/collectivity/_lib/routing";
import {
  CollectivityCheckbox,
  CollectivityInput,
  CollectivitySelect,
} from "@/app/collectivity/_components/fields";
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

type CompletionKey =
  | "name"
  | "slug"
  | "country"
  | "territory"
  | "referenceYear"
  | "inventoryYears"
  | "applicability";

type CollectivitySetupFormProps = {
  countryOptions?: Array<{ value: string; label: string }>;
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
      airport: initialValues?.applicability?.airport ?? false,
      port: initialValues?.applicability?.port ?? false,
      agriculture: initialValues?.applicability?.agriculture ?? false,
    },
  };
}

export default function CollectivitySetupForm({
  countryOptions = collectivityCountryOptions,
  currentPlanId = null,
  initialValues,
  variant,
}: CollectivitySetupFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const tSetup = useScopedI18n("collectivitySetup");
  const isSlugEditable = !currentPlanId;
  const defaultValues = useMemo(() => getSetupFormDefaultValues(initialValues), [initialValues]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const setupMutation = useMutation({
    mutationFn: (values: CollectivitySetupValues) =>
      saveCollectivitySetupRequest({
        currentPlanId,
        values,
      }),
    onSuccess: (snapshot) => {
      queryClient.setQueryData(
        collectivityQueryKeys.setupSnapshot(snapshot.project.slug),
        snapshot
      );
      queryClient.setQueryData(
        collectivityQueryKeys.currentInventory(snapshot.project.slug),
        snapshot
      );

      if (currentPlanId && currentPlanId !== snapshot.project.slug) {
        void queryClient.invalidateQueries({
          queryKey: collectivityQueryKeys.setupSnapshot(currentPlanId),
        });
        void queryClient.invalidateQueries({
          queryKey: collectivityQueryKeys.currentInventory(currentPlanId),
        });
        void queryClient.invalidateQueries({
          queryKey: collectivityQueryKeys.result(currentPlanId),
        });
      }

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

  const outputItems = t("setupWorkspace.output.items") as string[];
  const [inventoryYearDraft, setInventoryYearDraft] = useState("");
  const name = form.watch("name");
  const slug = form.watch("slug");
  const country = form.watch("country");
  const territory = form.watch("territory");
  const referenceYear = form.watch("referenceYear");
  const inventoryYears = form.watch("inventoryYears");

  const yearOptions = useMemo(
    () => getCollectivityYearOptions(2010, latestCollectivityAvailableYear),
    []
  );
  const suggestedSlug = useMemo(() => slugifyCollectivitySlug(name), [name]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(
    Boolean(
      isSlugEditable &&
      defaultValues.slug &&
      defaultValues.slug !== slugifyCollectivitySlug(defaultValues.name ?? "")
    )
  );

  useEffect(() => {
    form.reset(defaultValues);
    setInventoryYearDraft("");
    setSubmitError(null);
    setSlugManuallyEdited(
      Boolean(
        isSlugEditable &&
        defaultValues.slug &&
        defaultValues.slug !== slugifyCollectivitySlug(defaultValues.name ?? "")
      )
    );
  }, [defaultValues, form, isSlugEditable]);

  useEffect(() => {
    if (!isSlugEditable || !name || !suggestedSlug || slugManuallyEdited) {
      return;
    }

    if (slug !== suggestedSlug) {
      form.setValue("slug", suggestedSlug, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [form, isSlugEditable, name, slug, slugManuallyEdited, suggestedSlug]);

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
        inventoryYears.length > 0 &&
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
      shouldValidate: true,
      shouldDirty: true,
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
        shouldValidate: true,
        shouldDirty: true,
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
        <div className={cn(variant === "workspace" && "grid xl:grid-cols-[minmax(0,1fr)_320px]")}>
          <div className="min-w-0 space-y-5">
            <section
              className={cn(variant === "workspace" && "border-b border-border px-5 py-5 md:px-6")}
            >
              {variant === "workspace" ? (
                <>
                  <Typography asChild variant="sectionTitle" size="sm">
                    <h3>{t("setupWorkspace.sections.scope.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                    <p>{t("setupWorkspace.sections.scope.description") as string}</p>
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
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("setupWorkspace.sections.scope.nameLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("setupWorkspace.sections.scope.nameHelper") as string}
                        />
                      </div>
                      <FormControl>
                        <CollectivityInput
                          {...field}
                          value={field.value ?? ""}
                          className="w-full"
                          placeholder={t("setupWorkspace.sections.scope.namePlaceholder") as string}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("setupWorkspace.sections.scope.countryLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("setupWorkspace.sections.scope.countryHelper") as string}
                        />
                      </div>
                      <FormControl>
                        <CollectivitySelect
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("territory", "", {
                              shouldDirty: true,
                              shouldValidate: false,
                            });
                            form.clearErrors("territory");
                          }}
                          placeholder={
                            t("setupWorkspace.sections.scope.countryPlaceholder") as string
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
                  name="territory"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("setupWorkspace.sections.territory.label") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("setupWorkspace.sections.territory.helper") as string}
                        />
                      </div>
                      <FormControl>
                        <CollectivityInput
                          {...field}
                          value={field.value ?? ""}
                          className="w-full"
                          placeholder={t("setupWorkspace.sections.territory.placeholder") as string}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("setupWorkspace.sections.scope.slugLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("setupWorkspace.sections.scope.slugHelper") as string}
                        />
                      </div>
                      <FormControl>
                        <CollectivityInput
                          {...field}
                          value={field.value ?? ""}
                          className={cn("w-full", !isSlugEditable && "bg-muted/40 text-secondary")}
                          placeholder={t("setupWorkspace.sections.scope.slugPlaceholder") as string}
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          readOnly={!isSlugEditable}
                          aria-readonly={!isSlugEditable}
                          onChange={(event) => {
                            if (!isSlugEditable) {
                              return;
                            }

                            setSlugManuallyEdited(true);
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

            <section
              className={cn(variant === "workspace" && "border-b border-border px-5 py-5 md:px-6")}
            >
              {variant === "workspace" ? (
                <>
                  <Typography asChild variant="sectionTitle" size="sm">
                    <h3>{t("setupWorkspace.sections.temporality.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                    <p>{t("setupWorkspace.sections.temporality.description") as string}</p>
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
                          {t("setupWorkspace.sections.temporality.referenceYearLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={
                            t("setupWorkspace.sections.temporality.referenceYearHelper") as string
                          }
                        />
                      </div>
                      <FormControl>
                        <CollectivitySelect
                          value={field.value ? String(field.value) : undefined}
                          onValueChange={(value) => {
                            const nextReferenceYear = Number(value);
                            field.onChange(nextReferenceYear);
                            form.setValue(
                              "inventoryYears",
                              sortInventoryYears(
                                Array.from(
                                  new Set([...form.getValues("inventoryYears"), nextReferenceYear])
                                )
                              ),
                              { shouldValidate: true, shouldDirty: true }
                            );
                          }}
                          placeholder={
                            t(
                              "setupWorkspace.sections.temporality.referenceYearPlaceholder"
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
                  name="inventoryYears"
                  render={({ fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel data-state={fieldState.error ? "error" : undefined}>
                          {t("setupWorkspace.sections.temporality.inventoryYearsLabel") as string}
                        </FormLabel>
                        <FieldHelp
                          content={t("setupWorkspace.sections.temporality.helper") as string}
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="min-w-0 flex-1">
                          <CollectivitySelect
                            value={inventoryYearDraft}
                            onValueChange={setInventoryYearDraft}
                            disabled={typeof referenceYear !== "number"}
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
                            className="w-full"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-10 w-full rounded-md px-3 shadow-none sm:w-auto sm:flex-none"
                          onClick={addInventoryYear}
                          disabled={!inventoryYearDraft}
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          {t("setupWorkspace.sections.temporality.addYear") as string}
                        </Button>
                      </div>
                      {inventoryYears.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {inventoryYears.map((year) => {
                            const isReferenceYear = year === referenceYear;

                            return (
                              <div
                                key={year}
                                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5"
                              >
                                <Typography asChild variant="caption" size="sm">
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
                          <Typography
                            asChild
                            variant="caption"
                            size="sm"
                            className="text-secondary"
                          >
                            <p>{t("setupWorkspace.sections.temporality.emptyState") as string}</p>
                          </Typography>
                        </div>
                      ) : null}
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
                    <h3>{t("setupWorkspace.sections.applicability.title") as string}</h3>
                  </Typography>
                  <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                    <p>{t("setupWorkspace.sections.applicability.description") as string}</p>
                  </Typography>
                </>
              ) : null}

              <div className={cn("space-y-4", variant === "workspace" && "mt-5")}>
                <div className="rounded-md border border-border p-4">
                  <div className="flex items-center gap-1.5">
                    <Typography asChild variant="body" size="body">
                      <p>{t("setupWorkspace.sections.applicability.legend") as string}</p>
                    </Typography>
                    <FieldHelp
                      content={t("setupWorkspace.sections.applicability.helper") as string}
                    />
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="applicability.airport"
                      render={({ field }) => (
                        <FormItem className="rounded-md border border-border p-4">
                          <div className="flex items-start gap-3">
                            <FormControl>
                              <CollectivityCheckbox
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                              />
                            </FormControl>
                            <div className="space-y-1">
                              <FormLabel>
                                {
                                  t(
                                    "setupWorkspace.sections.applicability.options.airport.label"
                                  ) as string
                                }
                              </FormLabel>
                              <Typography
                                asChild
                                variant="caption"
                                size="sm"
                                className="text-secondary"
                              >
                                <p>
                                  {
                                    t(
                                      "setupWorkspace.sections.applicability.options.airport.helper"
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
                      name="applicability.port"
                      render={({ field }) => (
                        <FormItem className="rounded-md border border-border p-4">
                          <div className="flex items-start gap-3">
                            <FormControl>
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
                              <Typography
                                asChild
                                variant="caption"
                                size="sm"
                                className="text-secondary"
                              >
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
                            <FormControl>
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
                              <Typography
                                asChild
                                variant="caption"
                                size="sm"
                                className="text-secondary"
                              >
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
                    <p>{t("setupWorkspace.sections.applicability.footer") as string}</p>
                  </Typography>
                ) : null}
                <Button
                  type="submit"
                  className={cn("h-11", variant === "setup" ? "w-full" : "min-w-44")}
                  disabled={setupMutation.isPending}
                >
                  {variant === "setup"
                    ? (tSetup("primaryCta") as string)
                    : (t("setupWorkspace.primaryCta") as string)}
                </Button>
              </div>
            </section>
          </div>

          {variant === "workspace" ? (
            <aside className="border-t border-border xl:border-l xl:border-t-0">
              <section className="border-b border-border px-5 py-5 md:px-6">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{t("setupWorkspace.output.title") as string}</h3>
                </Typography>
                <CollectivityBulletList className="mt-4" items={outputItems} tone="muted" />
              </section>

              <section className="px-5 py-5 md:px-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Typography asChild variant="sectionTitle" size="sm">
                    <h3>{t("setupWorkspace.completion.title") as string}</h3>
                  </Typography>
                  <Badge variant={isReady ? "accent" : "outline"}>
                    {isReady
                      ? (t("setupWorkspace.completion.ready") as string)
                      : (t("setupWorkspace.completion.incomplete") as string)}
                  </Badge>
                </div>
                <Typography asChild variant="caption" size="sm" className="mt-3 text-secondary">
                  <p>
                    {completedCount}/{Object.keys(completion).length}{" "}
                    {t("setupWorkspace.completion.progressSuffix") as string}
                  </p>
                </Typography>
                <div className="mt-4 space-y-3">
                  {(Object.keys(completion) as CompletionKey[]).map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-3"
                    >
                      <Typography asChild variant="body" size="body">
                        <span>{t(`setupWorkspace.completion.items.${key}`) as string}</span>
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
          <p>{t("setupWorkspace.eyebrow") as string}</p>
        </Typography>
        <Typography asChild variant="title" size="2xl" className="mt-2">
          <h2>{t("setupWorkspace.title") as string}</h2>
        </Typography>
        <Typography asChild variant="body" size="body" className="mt-3 max-w-3xl">
          <p>{t("setupWorkspace.description") as string}</p>
        </Typography>
      </header>
      {formBody}
    </section>
  );
}
