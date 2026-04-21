"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { CollectivityCheckbox, CollectivityInput, CollectivitySelect } from "./fields";
import { CollectivityBulletList } from "./lists";
import { useScopedI18n } from "@/locales/client";

type CompletionKey = "identity" | "communes" | "perimeter" | "sectorsScopes" | "temporality";

function yearOptions(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => {
    const year = String(from + index);
    return { value: year, label: year };
  });
}

export default function CadrageWorkspace() {
  const t = useScopedI18n("(pages).collectivityDashboard");

  const territoryLevelOptions = t("cadrageWorkspace.sections.identity.territoryLevels") as {
    value: string;
    label: string;
  }[];
  const organizationalOptions = t(
    "cadrageWorkspace.sections.perimeter.organizationalOptions"
  ) as string[];
  const operationalOptions = t(
    "cadrageWorkspace.sections.perimeter.operationalOptions"
  ) as string[];
  const sectorOptions = t("cadrageWorkspace.sections.sectorsScopes.sectors") as string[];
  const scopeOptions = t("cadrageWorkspace.sections.sectorsScopes.scopes") as string[];
  const outputItems = t("cadrageWorkspace.output.items") as string[];

  const [territoryName, setTerritoryName] = useState("");
  const [territoryLevel, setTerritoryLevel] = useState("");
  const [communeDraft, setCommuneDraft] = useState("");
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([]);
  const [selectedOrganizational, setSelectedOrganizational] = useState<string[]>([]);
  const [selectedOperational, setSelectedOperational] = useState<string[]>([]);
  const [perimeterNote, setPerimeterNote] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [referenceYear, setReferenceYear] = useState("");
  const [targetHorizon, setTargetHorizon] = useState("");
  const [comparisonYearDraft, setComparisonYearDraft] = useState("");
  const [comparisonYears, setComparisonYears] = useState<string[]>([]);

  const completion = useMemo<Record<CompletionKey, boolean>>(
    () => ({
      identity: territoryName.trim().length > 0 && territoryLevel.length > 0,
      communes: selectedCommunes.length > 0,
      perimeter: selectedOrganizational.length > 0 && selectedOperational.length > 0,
      sectorsScopes: selectedSectors.length > 0 && selectedScopes.length > 0,
      temporality: Boolean(referenceYear) && Boolean(targetHorizon) && comparisonYears.length > 0,
    }),
    [
      comparisonYears.length,
      referenceYear,
      selectedCommunes.length,
      selectedOperational.length,
      selectedOrganizational.length,
      selectedScopes.length,
      selectedSectors.length,
      targetHorizon,
      territoryLevel,
      territoryName,
    ]
  );

  const completedCount = Object.values(completion).filter(Boolean).length;
  const isReady = completedCount === Object.keys(completion).length;

  const toggleInList = (
    currentItems: string[],
    item: string,
    setItems: (items: string[]) => void
  ) => {
    if (currentItems.includes(item)) {
      setItems(currentItems.filter((currentItem) => currentItem !== item));
      return;
    }

    setItems([...currentItems, item]);
  };

  const addCommune = () => {
    const trimmed = communeDraft.trim();
    if (!trimmed || selectedCommunes.includes(trimmed)) return;
    setSelectedCommunes([...selectedCommunes, trimmed]);
    setCommuneDraft("");
  };

  const removeCommune = (commune: string) => {
    setSelectedCommunes(selectedCommunes.filter((item) => item !== commune));
  };

  const addComparisonYear = () => {
    if (!comparisonYearDraft || comparisonYears.includes(comparisonYearDraft)) return;
    setComparisonYears([...comparisonYears, comparisonYearDraft]);
    setComparisonYearDraft("");
  };

  const removeComparisonYear = (year: string) => {
    setComparisonYears(comparisonYears.filter((item) => item !== year));
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
              <h3>{t("cadrageWorkspace.sections.identity.title") as string}</h3>
            </Typography>
            <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
              <p>{t("cadrageWorkspace.sections.identity.description") as string}</p>
            </Typography>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  {t("cadrageWorkspace.sections.identity.fields.planIdentity") as string}
                </label>
                <div className="mt-2 rounded-md border border-border bg-background px-3 py-3">
                  <Typography asChild variant="body" size="body">
                    <p>{t("cadrageWorkspace.sections.identity.planIdentityHint") as string}</p>
                  </Typography>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  {t("cadrageWorkspace.sections.identity.fields.territoryLevel") as string}
                </label>
                <CollectivitySelect
                  className="mt-2"
                  value={territoryLevel}
                  onValueChange={setTerritoryLevel}
                  placeholder={
                    t("cadrageWorkspace.sections.identity.fields.territoryLevel") as string
                  }
                  options={territoryLevelOptions}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-foreground">
                {t("cadrageWorkspace.sections.identity.fields.territory") as string}
              </label>
              <CollectivityInput
                className="mt-2"
                value={territoryName}
                onChange={(event) => setTerritoryName(event.target.value)}
                placeholder={
                  t("cadrageWorkspace.sections.identity.placeholders.territory") as string
                }
              />
            </div>
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{t("cadrageWorkspace.sections.territory.title") as string}</h3>
            </Typography>
            <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
              <p>{t("cadrageWorkspace.sections.territory.description") as string}</p>
            </Typography>

            <div className="mt-5">
              <label className="text-sm font-medium text-foreground">
                {t("cadrageWorkspace.sections.territory.communesLabel") as string}
              </label>
              <div className="mt-2 flex gap-2">
                <CollectivityInput
                  value={communeDraft}
                  onChange={(event) => setCommuneDraft(event.target.value)}
                  placeholder={
                    t("cadrageWorkspace.sections.territory.communesPlaceholder") as string
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addCommune();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-md px-3 shadow-none"
                  onClick={addCommune}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("cadrageWorkspace.sections.territory.addCommune") as string}
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {selectedCommunes.length > 0 ? (
                selectedCommunes.map((commune) => (
                  <div
                    key={commune}
                    className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-3"
                  >
                    <Typography asChild variant="body" size="body">
                      <span>{commune}</span>
                    </Typography>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-md"
                      onClick={() => removeCommune(commune)}
                      aria-label={`${t("cadrageWorkspace.sections.territory.removeCommune") as string} ${commune}`}
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="rounded-md border border-dashed border-border px-3 py-3">
                  <Typography asChild variant="caption" size="sm" className="text-secondary">
                    <p>{t("cadrageWorkspace.sections.territory.emptyState") as string}</p>
                  </Typography>
                </div>
              )}
            </div>

            <Typography asChild variant="caption" size="sm" className="mt-4 text-secondary">
              <p>{t("cadrageWorkspace.sections.territory.helper") as string}</p>
            </Typography>
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{t("cadrageWorkspace.sections.perimeter.title") as string}</h3>
            </Typography>
            <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
              <p>{t("cadrageWorkspace.sections.perimeter.description") as string}</p>
            </Typography>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <Typography asChild variant="label" size="sm">
                  <p>{t("cadrageWorkspace.sections.perimeter.organizationalLabel") as string}</p>
                </Typography>
                <div className="mt-3 space-y-3">
                  {organizationalOptions.map((item) => {
                    const checked = selectedOrganizational.includes(item);

                    return (
                      <label
                        key={item}
                        className="flex items-start gap-3 rounded-md border border-border px-3 py-3"
                      >
                        <CollectivityCheckbox
                          checked={checked}
                          onCheckedChange={() =>
                            toggleInList(selectedOrganizational, item, setSelectedOrganizational)
                          }
                          className="mt-0.5"
                        />
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <Typography asChild variant="label" size="sm">
                  <p>{t("cadrageWorkspace.sections.perimeter.operationalLabel") as string}</p>
                </Typography>
                <div className="mt-3 space-y-3">
                  {operationalOptions.map((item) => {
                    const checked = selectedOperational.includes(item);

                    return (
                      <label
                        key={item}
                        className="flex items-start gap-3 rounded-md border border-border px-3 py-3"
                      >
                        <CollectivityCheckbox
                          checked={checked}
                          onCheckedChange={() =>
                            toggleInList(selectedOperational, item, setSelectedOperational)
                          }
                          className="mt-0.5"
                        />
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-foreground">
                {t("cadrageWorkspace.sections.perimeter.noteLabel") as string}
              </label>
              <CollectivityInput
                className="mt-2"
                value={perimeterNote}
                onChange={(event) => setPerimeterNote(event.target.value)}
                placeholder={t("cadrageWorkspace.sections.perimeter.notePlaceholder") as string}
              />
              <Typography asChild variant="caption" size="sm" className="mt-3 text-secondary">
                <p>{t("cadrageWorkspace.sections.perimeter.helper") as string}</p>
              </Typography>
            </div>
          </section>

          <section className="border-b border-border px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{t("cadrageWorkspace.sections.sectorsScopes.title") as string}</h3>
            </Typography>
            <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl">
              <p>{t("cadrageWorkspace.sections.sectorsScopes.description") as string}</p>
            </Typography>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <Typography asChild variant="label" size="sm">
                  <p>{t("cadrageWorkspace.sections.sectorsScopes.sectorsTitle") as string}</p>
                </Typography>
                <div className="mt-3 space-y-3">
                  {sectorOptions.map((sector) => {
                    const checked = selectedSectors.includes(sector);

                    return (
                      <label
                        key={sector}
                        className="flex items-start gap-3 rounded-md border border-border px-3 py-3"
                      >
                        <CollectivityCheckbox
                          checked={checked}
                          onCheckedChange={() =>
                            toggleInList(selectedSectors, sector, setSelectedSectors)
                          }
                          className="mt-0.5"
                        />
                        <span className="text-sm font-medium text-foreground">{sector}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <Typography asChild variant="label" size="sm">
                  <p>{t("cadrageWorkspace.sections.sectorsScopes.scopesTitle") as string}</p>
                </Typography>
                <div className="mt-3 space-y-3">
                  {scopeOptions.map((scope) => {
                    const checked = selectedScopes.includes(scope);

                    return (
                      <label
                        key={scope}
                        className="flex items-start gap-3 rounded-md border border-border px-3 py-3"
                      >
                        <CollectivityCheckbox
                          checked={checked}
                          onCheckedChange={() =>
                            toggleInList(selectedScopes, scope, setSelectedScopes)
                          }
                          className="mt-0.5"
                        />
                        <span className="text-sm font-medium text-foreground">{scope}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
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
                  {t("cadrageWorkspace.sections.temporality.referenceYear") as string}
                </label>
                <CollectivitySelect
                  className="mt-2"
                  value={referenceYear}
                  onValueChange={setReferenceYear}
                  placeholder={t("cadrageWorkspace.sections.temporality.referenceYear") as string}
                  options={yearOptions(2018, 2025)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  {t("cadrageWorkspace.sections.temporality.horizon") as string}
                </label>
                <CollectivitySelect
                  className="mt-2"
                  value={targetHorizon}
                  onValueChange={setTargetHorizon}
                  placeholder={t("cadrageWorkspace.sections.temporality.horizon") as string}
                  options={yearOptions(2030, 2050)}
                />
              </div>
            </div>

            <div className="mt-6">
              <Typography asChild variant="label" size="sm">
                <p>{t("cadrageWorkspace.sections.temporality.comparisonYears") as string}</p>
              </Typography>
              <div className="mt-3 flex gap-2">
                <CollectivitySelect
                  value={comparisonYearDraft}
                  onValueChange={setComparisonYearDraft}
                  placeholder={
                    t("cadrageWorkspace.sections.temporality.comparisonYearsPlaceholder") as string
                  }
                  options={yearOptions(2018, 2035).filter(
                    (option) =>
                      option.value !== referenceYear && !comparisonYears.includes(option.value)
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-md px-3 shadow-none"
                  onClick={addComparisonYear}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("cadrageWorkspace.sections.temporality.addYear") as string}
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                {comparisonYears.length > 0 ? (
                  comparisonYears.map((year) => (
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
                        onClick={() => removeComparisonYear(year)}
                        aria-label={`${t("cadrageWorkspace.sections.temporality.removeYear") as string} ${year}`}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border border-dashed border-border px-3 py-3">
                    <Typography asChild variant="caption" size="sm" className="text-secondary">
                      <p>{t("cadrageWorkspace.sections.temporality.emptyState") as string}</p>
                    </Typography>
                  </div>
                )}
              </div>

              <Typography asChild variant="caption" size="sm" className="mt-3 text-secondary">
                <p>{t("cadrageWorkspace.sections.temporality.helper") as string}</p>
              </Typography>
            </div>
          </section>
        </div>

        <aside className="border-t border-border xl:border-l xl:border-t-0">
          <section className="border-b border-border px-5 py-5 md:px-6">
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{t("cadrageWorkspace.account.title") as string}</h3>
            </Typography>
            <Typography asChild variant="body" size="body" className="mt-3">
              <p>{t("cadrageWorkspace.account.description") as string}</p>
            </Typography>
          </section>

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
