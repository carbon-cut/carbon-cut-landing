"use client";

import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CalendarRange,
  CheckCircle2,
  Database,
  FileText,
  Map,
  Upload,
} from "lucide-react";

import { CollectivityInput, CollectivitySelect, CollectivityTextarea } from "./fields";
import { CollectivityBulletList } from "./lists";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

type InventoryLensKey = "territorial" | "municipal";

type InventoryYear = {
  value: string;
  title: string;
  badge: string;
  status: string;
  summary: string;
  coverage: string;
};

type InventoryDomain = {
  key: string;
  title: string;
  description: string;
  scope: string;
  status: string;
  completion: number;
  completionLabel: string;
  expectedDatasets: string[];
  sources: string[];
  gaps: string[];
  entry: {
    ownerPlaceholder: string;
    datasetPlaceholder: string;
    importPlaceholder: string;
    summaryPlaceholder: string;
    notesPlaceholder: string;
  };
};

type InventoryMetric = {
  label: string;
  value: string;
  note: string;
};

type InventoryResultGroupKey = "perimeter" | "source" | "category";

type InventoryResultsYear = {
  summary: string;
  metrics: Record<InventoryResultGroupKey, InventoryMetric[]>;
};

type InventoryWorkspaceCopy = {
  eyebrow: string;
  title: string;
  description: string;
  controls: {
    yearLabel: string;
    yearPlaceholder: string;
    lensLabel: string;
    lensPlaceholder: string;
    lenses: Record<InventoryLensKey, string>;
  };
  readingRule: {
    title: string;
    territorial: string;
    municipal: string;
  };
  sections: {
    years: {
      title: string;
      description: string;
    };
    domains: {
      title: string;
      description: string;
      scopeTitle: string;
      datasetsTitle: string;
    };
    entry: {
      title: string;
      description: string;
      ownerLabel: string;
      datasetLabel: string;
      importLabel: string;
      summaryLabel: string;
      notesLabel: string;
    };
    sources: {
      title: string;
      description: string;
    };
    assumptions: {
      title: string;
      description: string;
      textareaLabel: string;
    };
    results: {
      title: string;
      description: string;
      summaryLabel: string;
      groups: Record<InventoryResultGroupKey, string>;
    };
    completeness: {
      title: string;
      description: string;
      progressLabel: string;
      domainAverageLabel: string;
      checksLabel: string;
      ready: string;
      pending: string;
    };
  };
  aside: {
    currentTitle: string;
    currentYear: string;
    currentDomain: string;
    currentLens: string;
    signalTitle: string;
    signalItems: {
      years: string;
      domains: string;
      ire: string;
    };
  };
  years: InventoryYear[];
  domains: InventoryDomain[];
  results: Record<InventoryLensKey, Record<string, InventoryResultsYear>>;
  completeness: {
    checks: Array<{
      label: string;
      done: boolean;
    }>;
  };
};

const metricGroupIcons: Record<InventoryResultGroupKey, typeof Building2> = {
  perimeter: Building2,
  source: FileText,
  category: Database,
};

export default function InventoryWorkspace() {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const copy = t("inventoryWorkspace") as unknown as InventoryWorkspaceCopy;

  const [selectedYear, setSelectedYear] = useState(copy.years[0]?.value ?? "");
  const [activeDomainKey, setActiveDomainKey] = useState(copy.domains[0]?.key ?? "");
  const [activeLens, setActiveLens] = useState<InventoryLensKey>("territorial");

  const selectedYearData = copy.years.find((year) => year.value === selectedYear) ?? copy.years[0];
  const activeDomain =
    copy.domains.find((domain) => domain.key === activeDomainKey) ?? copy.domains[0];
  const activeResults =
    copy.results[activeLens]?.[selectedYearData?.value ?? ""] ??
    copy.results.territorial[copy.years[0]?.value ?? ""];

  const completedChecks = copy.completeness.checks.filter((item) => item.done).length;
  const completionPercent =
    copy.completeness.checks.length > 0
      ? Math.round((completedChecks / copy.completeness.checks.length) * 100)
      : 0;
  const domainAverage =
    copy.domains.length > 0
      ? Math.round(
          copy.domains.reduce((total, domain) => total + domain.completion, 0) / copy.domains.length
        )
      : 0;
  const lensOptions = (
    Object.entries(copy.controls.lenses) as Array<[InventoryLensKey, string]>
  ).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <section className="border border-border bg-card">
      <header className="border-b border-border px-5 py-5 md:px-6">
        <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
          <p>{copy.eyebrow}</p>
        </Typography>
        <Typography asChild variant="title" size="2xl" className="mt-2">
          <h2>{copy.title}</h2>
        </Typography>
        <Typography asChild variant="body" size="body" className="mt-3 max-w-4xl">
          <p>{copy.description}</p>
        </Typography>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-[220px_220px_minmax(0,1fr)]">
          <div>
            <label className="text-sm font-medium text-foreground">{copy.controls.yearLabel}</label>
            <CollectivitySelect
              className="mt-2"
              value={selectedYearData?.value}
              onValueChange={setSelectedYear}
              placeholder={copy.controls.yearPlaceholder}
              options={copy.years.map((year) => ({
                value: year.value,
                label: year.title,
              }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">{copy.controls.lensLabel}</label>
            <CollectivitySelect
              className="mt-2"
              value={activeLens}
              onValueChange={(value) => setActiveLens(value as InventoryLensKey)}
              placeholder={copy.controls.lensPlaceholder}
              options={lensOptions}
            />
          </div>

          <div className="rounded-lg border border-border bg-background px-4 py-4">
            <div className="flex items-start gap-3">
              <Map aria-hidden="true" className="mt-0.5 h-4 w-4 text-secondary" />
              <div className="min-w-0">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{copy.readingRule.title}</h3>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2">
                  <p>
                    {activeLens === "territorial"
                      ? copy.readingRule.territorial
                      : copy.readingRule.municipal}
                  </p>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <section className="border-b border-border px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <CalendarRange aria-hidden="true" className="mt-1 h-4 w-4 text-secondary" />
              <div className="min-w-0">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{copy.sections.years.title}</h3>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                  <p>{copy.sections.years.description}</p>
                </Typography>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {copy.years.map((year) => {
                const isActive = year.value === selectedYearData?.value;

                return (
                  <button
                    key={year.value}
                    type="button"
                    onClick={() => setSelectedYear(year.value)}
                    className={cn(
                      "rounded-lg border px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-3 focus-visible:ring-offset-2",
                      isActive
                        ? "border-primary bg-primary-subtle"
                        : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Typography asChild variant="sectionTitle" size="sm">
                        <span>{year.title}</span>
                      </Typography>
                      <Badge variant={isActive ? "accent" : "outline"}>{year.badge}</Badge>
                    </div>
                    <Typography asChild variant="caption" size="sm" className="mt-2">
                      <p>{year.status}</p>
                    </Typography>
                    <Typography asChild variant="body" size="body" className="mt-3">
                      <p>{year.summary}</p>
                    </Typography>
                    <Typography asChild variant="caption" size="sm" className="mt-3">
                      <p>{year.coverage}</p>
                    </Typography>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <Database aria-hidden="true" className="mt-1 h-4 w-4 text-secondary" />
              <div className="min-w-0">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{copy.sections.domains.title}</h3>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                  <p>{copy.sections.domains.description}</p>
                </Typography>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {copy.domains.map((domain) => {
                const isActive = domain.key === activeDomain.key;

                return (
                  <button
                    key={domain.key}
                    type="button"
                    onClick={() => setActiveDomainKey(domain.key)}
                    className={cn(
                      "rounded-lg border px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-3 focus-visible:ring-offset-2",
                      isActive
                        ? "border-primary bg-primary-subtle"
                        : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Typography asChild variant="sectionTitle" size="sm">
                        <span>{domain.title}</span>
                      </Typography>
                      <Badge variant={domain.completion >= 80 ? "accent" : "outline"}>
                        {domain.status}
                      </Badge>
                    </div>
                    <Typography asChild variant="body" size="body" className="mt-3">
                      <p>{domain.description}</p>
                    </Typography>
                    <Typography asChild variant="caption" size="sm" className="mt-3">
                      <p>{domain.completionLabel}</p>
                    </Typography>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 rounded-lg border border-border bg-background px-4 py-4 md:grid-cols-2">
              <div>
                <Typography asChild variant="label" size="sm">
                  <p>{copy.sections.domains.scopeTitle}</p>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-3">
                  <p>{activeDomain.scope}</p>
                </Typography>
              </div>
              <div>
                <Typography asChild variant="label" size="sm">
                  <p>{copy.sections.domains.datasetsTitle}</p>
                </Typography>
                <CollectivityBulletList
                  className="mt-4"
                  items={activeDomain.expectedDatasets}
                  tone="primary"
                />
              </div>
            </div>
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Upload aria-hidden="true" className="mt-1 h-4 w-4 text-secondary" />
                <div className="min-w-0">
                  <Typography asChild variant="sectionTitle" size="sm">
                    <h3>{copy.sections.entry.title}</h3>
                  </Typography>
                  <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                    <p>{copy.sections.entry.description}</p>
                  </Typography>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md px-2.5 text-xs font-medium shadow-none"
                  type="button"
                >
                  <Upload aria-hidden="true" className="h-3.5 w-3.5" />
                  {t("actions.import") as string}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md px-2.5 text-xs font-medium shadow-none"
                  type="button"
                >
                  {t("actions.addManual") as string}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md px-2.5 text-xs font-medium shadow-none"
                  type="button"
                >
                  {t("actions.downloadTemplate") as string}
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  {copy.sections.entry.ownerLabel}
                </label>
                <CollectivityInput
                  className="mt-2"
                  placeholder={activeDomain.entry.ownerPlaceholder}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  {copy.sections.entry.datasetLabel}
                </label>
                <CollectivityInput
                  className="mt-2"
                  placeholder={activeDomain.entry.datasetPlaceholder}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  {copy.sections.entry.importLabel}
                </label>
                <CollectivityInput
                  className="mt-2"
                  placeholder={activeDomain.entry.importPlaceholder}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  {copy.sections.entry.summaryLabel}
                </label>
                <CollectivityInput
                  className="mt-2"
                  placeholder={activeDomain.entry.summaryPlaceholder}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-foreground">
                {copy.sections.entry.notesLabel}
              </label>
              <CollectivityTextarea
                className="mt-2 min-h-[132px]"
                placeholder={activeDomain.entry.notesPlaceholder}
              />
            </div>
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <FileText aria-hidden="true" className="mt-1 h-4 w-4 text-secondary" />
              <div className="min-w-0">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{copy.sections.sources.title}</h3>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                  <p>{copy.sections.sources.description}</p>
                </Typography>
              </div>
            </div>

            <CollectivityBulletList className="mt-5" items={activeDomain.sources} tone="accent" />
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <AlertTriangle aria-hidden="true" className="mt-1 h-4 w-4 text-secondary" />
              <div className="min-w-0">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{copy.sections.assumptions.title}</h3>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                  <p>{copy.sections.assumptions.description}</p>
                </Typography>
              </div>
            </div>

            <CollectivityBulletList className="mt-5" items={activeDomain.gaps} tone="muted" />

            <div className="mt-6">
              <label className="text-sm font-medium text-foreground">
                {copy.sections.assumptions.textareaLabel}
              </label>
              <CollectivityTextarea
                className="mt-2 min-h-[132px]"
                placeholder={activeDomain.entry.notesPlaceholder}
              />
            </div>
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <BarChart3 aria-hidden="true" className="mt-1 h-4 w-4 text-secondary" />
              <div className="min-w-0">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{copy.sections.results.title}</h3>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                  <p>{copy.sections.results.description}</p>
                </Typography>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge variant="accent">{selectedYearData?.title}</Badge>
              <Badge variant="outline">{copy.controls.lenses[activeLens]}</Badge>
              <Badge variant="outline">{activeDomain.title}</Badge>
            </div>

            <div className="mt-5 rounded-lg border border-border bg-background px-4 py-4">
              <Typography asChild variant="label" size="sm">
                <p>{copy.sections.results.summaryLabel}</p>
              </Typography>
              <Typography asChild variant="body" size="body" className="mt-3">
                <p>{activeResults.summary}</p>
              </Typography>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {(
                Object.entries(copy.sections.results.groups) as Array<
                  [InventoryResultGroupKey, string]
                >
              ).map(([groupKey, groupTitle]) => {
                const Icon = metricGroupIcons[groupKey];
                const metrics = activeResults.metrics[groupKey];

                return (
                  <section
                    key={groupKey}
                    className="rounded-lg border border-border bg-background px-4 py-4"
                  >
                    <div className="flex items-center gap-2">
                      <Icon aria-hidden="true" className="h-4 w-4 text-secondary" />
                      <Typography asChild variant="sectionTitle" size="sm">
                        <h4>{groupTitle}</h4>
                      </Typography>
                    </div>

                    <div className="mt-4 space-y-4">
                      {metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="border-t border-border pt-4 first:border-t-0 first:pt-0"
                        >
                          <Typography asChild variant="label" size="sm">
                            <p>{metric.label}</p>
                          </Typography>
                          <Typography asChild variant="title" size="xl" className="mt-2">
                            <p>{metric.value}</p>
                          </Typography>
                          <Typography asChild variant="caption" size="sm" className="mt-2">
                            <p>{metric.note}</p>
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>

          <section className="px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 text-secondary" />
              <div className="min-w-0">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{copy.sections.completeness.title}</h3>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
                  <p>{copy.sections.completeness.description}</p>
                </Typography>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <Typography asChild variant="label" size="sm">
                    <p>{copy.sections.completeness.progressLabel}</p>
                  </Typography>
                  <Typography asChild variant="sectionTitle" size="sm">
                    <span>
                      {completedChecks}/{copy.completeness.checks.length}
                    </span>
                  </Typography>
                </div>
                <Progress
                  className="mt-4"
                  value={completionPercent}
                  color="bg-primary"
                  bg="bg-primary/10"
                />
                <Typography asChild variant="caption" size="sm" className="mt-3">
                  <p>{completionPercent}%</p>
                </Typography>
              </div>

              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <Typography asChild variant="label" size="sm">
                  <p>{copy.sections.completeness.domainAverageLabel}</p>
                </Typography>
                <Typography asChild variant="title" size="xl" className="mt-3">
                  <p>{domainAverage}%</p>
                </Typography>
                <Typography asChild variant="caption" size="sm" className="mt-2">
                  <p>{activeDomain.completionLabel}</p>
                </Typography>
              </div>
            </div>

            <div className="mt-6">
              <Typography asChild variant="label" size="sm">
                <p>{copy.sections.completeness.checksLabel}</p>
              </Typography>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {copy.completeness.checks.map((check) => (
                  <div
                    key={check.label}
                    className="rounded-lg border border-border bg-background px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Typography asChild variant="body" size="body">
                        <p>{check.label}</p>
                      </Typography>
                      <Badge variant={check.done ? "accent" : "outline"}>
                        {check.done
                          ? copy.sections.completeness.ready
                          : copy.sections.completeness.pending}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="border-t border-border xl:border-l xl:border-t-0">
          <section className="px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{copy.aside.currentTitle}</h3>
            </Typography>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <Typography asChild variant="caption" size="sm">
                  <p>{copy.aside.currentYear}</p>
                </Typography>
                <Typography asChild variant="sectionTitle" size="sm" className="mt-2">
                  <p>{selectedYearData?.title}</p>
                </Typography>
              </div>

              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <Typography asChild variant="caption" size="sm">
                  <p>{copy.aside.currentDomain}</p>
                </Typography>
                <Typography asChild variant="sectionTitle" size="sm" className="mt-2">
                  <p>{activeDomain.title}</p>
                </Typography>
              </div>

              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <Typography asChild variant="caption" size="sm">
                  <p>{copy.aside.currentLens}</p>
                </Typography>
                <Typography asChild variant="sectionTitle" size="sm" className="mt-2">
                  <p>{copy.controls.lenses[activeLens]}</p>
                </Typography>
              </div>
            </div>
          </section>

          <section className="border-t border-border px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{copy.aside.signalTitle}</h3>
            </Typography>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <div className="flex items-center gap-3">
                  <CalendarRange aria-hidden="true" className="h-4 w-4 text-secondary" />
                  <div>
                    <Typography asChild variant="caption" size="sm">
                      <p>{copy.aside.signalItems.years}</p>
                    </Typography>
                    <Typography asChild variant="sectionTitle" size="sm" className="mt-1">
                      <p>{copy.years.length}</p>
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <div className="flex items-center gap-3">
                  <Database aria-hidden="true" className="h-4 w-4 text-secondary" />
                  <div>
                    <Typography asChild variant="caption" size="sm">
                      <p>{copy.aside.signalItems.domains}</p>
                    </Typography>
                    <Typography asChild variant="sectionTitle" size="sm" className="mt-1">
                      <p>{copy.domains.length}</p>
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background px-4 py-4">
                <div className="flex items-center gap-3">
                  <Building2 aria-hidden="true" className="h-4 w-4 text-secondary" />
                  <div>
                    <Typography asChild variant="caption" size="sm">
                      <p>{copy.aside.signalItems.ire}</p>
                    </Typography>
                    <Typography asChild variant="sectionTitle" size="sm" className="mt-1">
                      <p>{copy.years.find((year) => year.badge === "IRE")?.title ?? "IRE"}</p>
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
