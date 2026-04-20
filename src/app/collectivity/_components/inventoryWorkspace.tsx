"use client";

import { useState } from "react";

import { Upload, Download } from "lucide-react";

import { CollectivityInput, CollectivityTextarea } from "./fields";
import { CollectivityBulletList } from "./lists";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

type SectionKey =
  | "city-profile"
  | "collectivity-assets"
  | "territorial-data"
  | "documents"
  | "assumptions";

type ModuleItem = {
  title: string;
  description: string;
  count: string;
  scope: string;
  readiness: string;
  summary: string;
  checklist: string[];
  evidence: string[];
  fields?: Record<string, string>;
  placeholders?: Record<string, string>;
  helper?: string;
};

const sectionKeys: SectionKey[] = [
  "city-profile",
  "collectivity-assets",
  "territorial-data",
  "documents",
  "assumptions",
];

export default function InventoryWorkspace() {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const [activeSection, setActiveSection] = useState<SectionKey>("collectivity-assets");

  const selected = t(`modules.items.${activeSection}`) as unknown as ModuleItem;
  const fieldLabels = selected.fields ? Object.entries(selected.fields) : [];

  return (
    <section className="border border-border bg-card">
      <div className="overflow-x-auto border-b border-border">
        <Tabs
          value={activeSection}
          onValueChange={(value) => setActiveSection(value as SectionKey)}
        >
          <TabsList
            aria-label={t("inventory.navLabel") as string}
            className="h-auto min-w-max justify-start gap-5 rounded-none bg-transparent px-5 py-0 text-secondary md:px-6"
          >
            {sectionKeys.map((key) => {
              const item = t(`modules.items.${key}`) as unknown as ModuleItem;

              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-4 text-sm font-medium shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {item.title}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <header className="border-b border-border px-5 py-5 md:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
                  <p>{t("workspace.eyebrow") as string}</p>
                </Typography>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Typography asChild variant="title" size="2xl">
                    <h2>{selected.title}</h2>
                  </Typography>
                  <Badge variant="accent">{t("status.inProgress") as string}</Badge>
                  <Badge variant="accent">
                    {activeSection === "documents"
                      ? (t("priority.recommended") as string)
                      : activeSection === "assumptions"
                        ? (t("priority.advanced") as string)
                        : (t("priority.mandatory") as string)}
                  </Badge>
                </div>
                <Typography asChild variant="body" size="body" className="mt-3 max-w-3xl">
                  <p>{selected.description}</p>
                </Typography>
              </div>

              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
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
                  <Download aria-hidden="true" className="h-3.5 w-3.5" />
                  {t("actions.downloadTemplate") as string}
                </Button>
              </div>
            </div>
          </header>

          <div className="border-b border-border px-5 py-5 md:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Typography asChild variant="sectionTitle" size="sm">
                  <p>{t("workspace.scopeTitle") as string}</p>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-3">
                  <p>{selected.scope}</p>
                </Typography>
              </div>
              <div>
                <Typography asChild variant="sectionTitle" size="sm">
                  <p>{t("workspace.readinessTitle") as string}</p>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-3">
                  <p>{selected.readiness}</p>
                </Typography>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 md:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  {t("workspace.ownerLabel") as string}
                </label>
                <CollectivityInput
                  className="mt-2"
                  placeholder={t("workspace.ownerPlaceholder") as string}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  {t("workspace.summaryLabel") as string}
                </label>
                <CollectivityInput className="mt-2" placeholder={selected.summary} />
              </div>
            </div>

            {fieldLabels.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {fieldLabels.map(([fieldKey, label]) => (
                  <div key={fieldKey}>
                    <label className="text-sm font-medium text-foreground">{label}</label>
                    <CollectivityInput
                      className="mt-2"
                      placeholder={selected.placeholders?.[fieldKey] ?? ""}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6">
              <label className="text-sm font-medium text-foreground">
                {t("workspace.notesTitle") as string}
              </label>
              <CollectivityTextarea
                className="mt-2"
                placeholder={t("workspace.notesPlaceholder") as string}
              />
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <Typography asChild variant="sectionTitle" size="sm">
                <h3>{t("workspace.requirementsTitle") as string}</h3>
              </Typography>
              <CollectivityBulletList className="mt-4" items={selected.checklist} tone="primary" />
              {selected.helper ? (
                <p className="mt-5 text-sm leading-6 text-secondary">{selected.helper}</p>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="border-t border-border xl:border-l xl:border-t-0">
          <div className="space-y-0">
            <section className="px-5 py-5 md:px-6">
              <Typography asChild variant="sectionTitle" size="sm">
                <h3>{t("workspace.summaryTitle") as string}</h3>
              </Typography>
              <Typography asChild variant="body" size="body" className="mt-3">
                <p>{selected.summary}</p>
              </Typography>
            </section>

            <section className="border-t border-border px-5 py-5 md:px-6">
              <Typography asChild variant="sectionTitle" size="sm">
                <h3>{t("workspace.evidenceTitle") as string}</h3>
              </Typography>
              <ul className="mt-4 space-y-3">
                {selected.evidence.map((item) => (
                  <li key={item}>
                    <Typography asChild variant="body" size="body">
                      <span>{item}</span>
                    </Typography>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-border px-5 py-5 md:px-6">
              <Typography asChild variant="sectionTitle" size="sm">
                <h3>{t("workspace.qaTitle") as string}</h3>
              </Typography>
              <Typography asChild variant="body" size="body" className="mt-3">
                <p>{t("workspace.qaDescription") as string}</p>
              </Typography>
            </section>
          </div>
        </aside>
      </div>
    </section>
  );
}
