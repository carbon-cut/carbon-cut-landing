"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { CollectivityInput, CollectivitySelect } from "./fields";
import { CollectivityBulletList } from "./lists";
import { useScopedI18n } from "@/locales/client";

type CompletionKey = "territory" | "referenceYear" | "supportYears";

function yearOptions(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => {
    const year = String(from + index);
    return { value: year, label: year };
  });
}

export default function CadrageWorkspace() {
  const t = useScopedI18n("(pages).collectivityDashboard");

  const outputItems = t("cadrageWorkspace.output.items") as string[];

  const [territoryName, setTerritoryName] = useState("");
  const [referenceYear, setReferenceYear] = useState("");
  const [supportYearDraft, setSupportYearDraft] = useState("");
  const [supportYears, setSupportYears] = useState<string[]>([]);

  const completion = useMemo<Record<CompletionKey, boolean>>(
    () => ({
      territory: territoryName.trim().length > 0,
      referenceYear: Boolean(referenceYear),
      supportYears: supportYears.length > 0,
    }),
    [referenceYear, supportYears.length, territoryName]
  );

  const completedCount = Object.values(completion).filter(Boolean).length;
  const isReady = completedCount === Object.keys(completion).length;

  const supportYearOptions = yearOptions(2018, 2035).filter(
    (option) => option.value !== referenceYear && !supportYears.includes(option.value)
  );

  const addSupportYear = () => {
    if (
      !supportYearDraft ||
      supportYears.includes(supportYearDraft) ||
      supportYearDraft === referenceYear
    ) {
      return;
    }

    setSupportYears([...supportYears, supportYearDraft]);
    setSupportYearDraft("");
  };

  const removeSupportYear = (year: string) => {
    setSupportYears(supportYears.filter((item) => item !== year));
  };

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

      <div className="grid xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <section className="border-b border-border px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{t("cadrageWorkspace.sections.territory.title") as string}</h3>
            </Typography>
            <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
              <p>{t("cadrageWorkspace.sections.territory.description") as string}</p>
            </Typography>

            <div className="mt-5">
              <label className="text-sm font-medium text-foreground">
                {t("cadrageWorkspace.sections.territory.label") as string}
              </label>
              <CollectivityInput
                className="mt-2"
                value={territoryName}
                onChange={(event) => setTerritoryName(event.target.value)}
                placeholder={t("cadrageWorkspace.sections.territory.placeholder") as string}
              />
              <Typography asChild variant="caption" size="sm" className="mt-3 text-secondary">
                <p>{t("cadrageWorkspace.sections.territory.helper") as string}</p>
              </Typography>
            </div>
          </section>

          <section className="px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{t("cadrageWorkspace.sections.temporality.title") as string}</h3>
            </Typography>
            <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
              <p>{t("cadrageWorkspace.sections.temporality.description") as string}</p>
            </Typography>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  {t("cadrageWorkspace.sections.temporality.referenceYearLabel") as string}
                </label>
                <CollectivitySelect
                  className="mt-2"
                  value={referenceYear}
                  onValueChange={setReferenceYear}
                  placeholder={
                    t("cadrageWorkspace.sections.temporality.referenceYearPlaceholder") as string
                  }
                  options={yearOptions(2018, 2035)}
                />
                <Typography asChild variant="caption" size="sm" className="mt-3 text-secondary">
                  <p>{t("cadrageWorkspace.sections.temporality.referenceYearHelper") as string}</p>
                </Typography>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  {t("cadrageWorkspace.sections.temporality.supportYearsLabel") as string}
                </label>
                <div className="mt-2 flex gap-2">
                  <CollectivitySelect
                    value={supportYearDraft}
                    onValueChange={setSupportYearDraft}
                    placeholder={
                      t("cadrageWorkspace.sections.temporality.supportYearsPlaceholder") as string
                    }
                    options={supportYearOptions}
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
              </div>
            </div>

            <div className="mt-6">
              {supportYears.length > 0 ? (
                <div className="space-y-2">
                  {supportYears.map((year) => (
                    <div
                      key={year}
                      className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-3"
                    >
                      <Typography asChild variant="body" size="body">
                        <span>{year}</span>
                      </Typography>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md"
                        onClick={() => removeSupportYear(year)}
                        aria-label={`${t("cadrageWorkspace.sections.temporality.removeYear") as string} ${year}`}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-border px-3 py-3">
                  <Typography asChild variant="caption" size="sm" className="text-secondary">
                    <p>{t("cadrageWorkspace.sections.temporality.emptyState") as string}</p>
                  </Typography>
                </div>
              )}
            </div>

            <Typography asChild variant="caption" size="sm" className="mt-4 text-secondary">
              <p>{t("cadrageWorkspace.sections.temporality.helper") as string}</p>
            </Typography>
          </section>
        </div>

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
      </div>
    </section>
  );
}
