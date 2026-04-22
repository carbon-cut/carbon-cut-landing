"use client";

import { type ReactNode, useMemo, useState } from "react";

import { CollectivityInput } from "./fields";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

type InventoryYear = {
  value: string;
  title: string;
  badge: string;
};

type InventoryDatasetKind = "fleet" | "publicLighting" | "placeholder";

type InventoryDataset = {
  key: string;
  familyKey: string;
  kind: InventoryDatasetKind;
  title: string;
  status: string;
  description: string;
  sourceMode: string;
  yearMode: string;
  implementationNote: string;
};

type InventoryFamily = {
  key: string;
  title: string;
};

type InventoryRowLabel = {
  key: string;
  label: string;
};

type InventoryWorkspaceCopy = {
  controls: {
    familyLabel: string;
    datasetLabel: string;
  };
  hints: {
    sourceFirst: string;
    multiYear: string;
    todoLabel: string;
    provenanceTodo: string;
    progressTodo: string;
    placeholderTitle: string;
  };
  sections: {
    entry: {
      fleet: {
        compositionTitle: string;
        compositionDescription: string;
        categories: InventoryRowLabel[];
        compositionColumns: string[];
        yearlyVehiclesTitle: string;
        yearlyVehiclesRows: InventoryRowLabel[];
        yearlyEnergyTitle: string;
        yearlyEnergyRows: InventoryRowLabel[];
        yearlySpendTitle: string;
        yearlySpendRows: InventoryRowLabel[];
      };
      lighting: {
        infrastructureTitle: string;
        infrastructureDescription: string;
        infrastructureRows: InventoryRowLabel[];
        valueColumn: string;
        lampsTitle: string;
        lampsDescription: string;
        lampRows: InventoryRowLabel[];
        lampsColumns: string[];
        yearlyTitle: string;
        yearlyRows: InventoryRowLabel[];
      };
    };
  };
  years: InventoryYear[];
  families: InventoryFamily[];
  datasets: InventoryDataset[];
};

const fleetCompositionSample: Record<string, string[]> = {
  fonction: ["8", "12", "2", "3", "0", "25"],
  service: ["4", "17", "1", "2", "0", "24"],
  engins: ["1", "9", "0", "1", "2", "13"],
  autres: ["2", "6", "0", "0", "0", "8"],
};

const fleetYearlySample: Record<
  string,
  {
    vehicles: Record<string, string>;
    energy: Record<string, string>;
    spend: Record<string, string>;
  }
> = {
  "2023": {
    vehicles: {
      petrol: "15",
      diesel: "44",
      electric: "3",
      hybrid: "6",
      gnv: "2",
      total: "70",
    },
    energy: {
      petrol: "12 400 L",
      diesel: "33 900 L",
      electricity: "6 800 kWh",
      gnv: "2 300 Nm3",
    },
    spend: {
      petrol: "31 000 TND",
      diesel: "94 000 TND",
      electricity: "2 900 TND",
      gnv: "5 400 TND",
    },
  },
  "2022": {
    vehicles: {
      petrol: "16",
      diesel: "46",
      electric: "2",
      hybrid: "4",
      gnv: "1",
      total: "69",
    },
    energy: {
      petrol: "13 100 L",
      diesel: "35 700 L",
      electricity: "4 400 kWh",
      gnv: "1 100 Nm3",
    },
    spend: {
      petrol: "29 800 TND",
      diesel: "88 600 TND",
      electricity: "1 700 TND",
      gnv: "2 900 TND",
    },
  },
  "2024": {
    vehicles: {
      petrol: "14",
      diesel: "41",
      electric: "5",
      hybrid: "7",
      gnv: "2",
      total: "69",
    },
    energy: {
      petrol: "11 700 L",
      diesel: "30 800 L",
      electricity: "9 200 kWh",
      gnv: "2 500 Nm3",
    },
    spend: {
      petrol: "30 500 TND",
      diesel: "91 300 TND",
      electricity: "4 200 TND",
      gnv: "5 900 TND",
    },
  },
};

const lightingInfrastructureSample: Record<string, string> = {
  cabinets: "184",
  meters: "196",
  dimmers: "38",
  power: "1 420 kW",
};

const lightingLampsSample: Record<string, string[]> = {
  shp: ["250", "1 180"],
  hpl: ["125", "640"],
  led: ["70", "2 460"],
};

const lightingYearlySample: Record<string, Record<string, string>> = {
  "2023": {
    consumption: "2 480 000 kWh",
    bill: "1 210 000 TND",
  },
  "2022": {
    consumption: "2 690 000 kWh",
    bill: "1 180 000 TND",
  },
  "2024": {
    consumption: "2 210 000 kWh",
    bill: "1 090 000 TND",
  },
};

function TableInput({ defaultValue }: { defaultValue: string }) {
  return (
    <CollectivityInput
      className="h-11 rounded-xl border-border/20 bg-background/85 shadow-none"
      defaultValue={defaultValue}
    />
  );
}

function SurfaceToggle({
  active,
  children,
  onClick,
  tone = "default",
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  tone?: "default" | "muted";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary/28 bg-primary/12 text-foreground shadow-[0_10px_24px_rgba(10,73,54,0.08)]"
          : "border-border/18 bg-card/65 text-secondary hover:bg-card/82 hover:text-foreground",
        tone === "muted" ? "border-dashed" : ""
      )}
    >
      {children}
    </button>
  );
}

function MatrixTable({
  title,
  rows,
  years,
  getValue,
}: {
  title: string;
  rows: InventoryRowLabel[];
  years: InventoryYear[];
  getValue: (rowKey: string, yearValue: string) => string;
}) {
  return (
    <section className="space-y-4">
      <Typography asChild variant="sectionTitle" size="sm">
        <h4>{title}</h4>
      </Typography>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/10">
              <TableHead className="min-w-[220px] pl-5 text-foreground" />
              {years.map((year) => (
                <TableHead key={year.value} className="min-w-[170px] text-foreground">
                  <div className="flex items-center gap-2">
                    <span>{year.title}</span>
                    <span className="rounded-full border border-border/18 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-secondary">
                      {year.badge}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key} className="border-border/8">
                <TableCell className="pl-5 font-medium text-foreground">{row.label}</TableCell>
                {years.map((year) => (
                  <TableCell key={`${row.key}-${year.value}`} className="py-3">
                    <TableInput defaultValue={getValue(row.key, year.value)} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

function FleetSurface({
  copy,
  years,
}: {
  copy: InventoryWorkspaceCopy["sections"]["entry"]["fleet"];
  years: InventoryYear[];
}) {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <Typography asChild variant="sectionTitle" size="sm">
            <h4>{copy.compositionTitle}</h4>
          </Typography>
          <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl text-secondary">
            <p>{copy.compositionDescription}</p>
          </Typography>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/10">
                <TableHead className="min-w-[220px] pl-5 text-foreground" />
                {copy.compositionColumns.map((column) => (
                  <TableHead key={column} className="min-w-[120px] text-foreground">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {copy.categories.map((category) => (
                <TableRow key={category.key} className="border-border/8">
                  <TableCell className="pl-5 font-medium text-foreground">
                    {category.label}
                  </TableCell>
                  {(fleetCompositionSample[category.key] ?? []).map((value, index) => (
                    <TableCell key={`${category.key}-${index}`} className="py-3">
                      <TableInput defaultValue={value} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <div className="space-y-8 border-t border-border/10 pt-8">
        <MatrixTable
          title={copy.yearlyVehiclesTitle}
          rows={copy.yearlyVehiclesRows}
          years={years}
          getValue={(rowKey, yearValue) => fleetYearlySample[yearValue]?.vehicles[rowKey] ?? ""}
        />
        <MatrixTable
          title={copy.yearlyEnergyTitle}
          rows={copy.yearlyEnergyRows}
          years={years}
          getValue={(rowKey, yearValue) => fleetYearlySample[yearValue]?.energy[rowKey] ?? ""}
        />
        <MatrixTable
          title={copy.yearlySpendTitle}
          rows={copy.yearlySpendRows}
          years={years}
          getValue={(rowKey, yearValue) => fleetYearlySample[yearValue]?.spend[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}

function PublicLightingSurface({
  copy,
  years,
}: {
  copy: InventoryWorkspaceCopy["sections"]["entry"]["lighting"];
  years: InventoryYear[];
}) {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <Typography asChild variant="sectionTitle" size="sm">
            <h4>{copy.infrastructureTitle}</h4>
          </Typography>
          <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl text-secondary">
            <p>{copy.infrastructureDescription}</p>
          </Typography>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/10">
                <TableHead className="min-w-[220px] pl-5 text-foreground" />
                <TableHead className="min-w-[180px] text-foreground">{copy.valueColumn}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {copy.infrastructureRows.map((row) => (
                <TableRow key={row.key} className="border-border/8">
                  <TableCell className="pl-5 font-medium text-foreground">{row.label}</TableCell>
                  <TableCell className="py-3">
                    <TableInput defaultValue={lightingInfrastructureSample[row.key] ?? ""} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4 border-t border-border/10 pt-8">
        <div>
          <Typography asChild variant="sectionTitle" size="sm">
            <h4>{copy.lampsTitle}</h4>
          </Typography>
          <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl text-secondary">
            <p>{copy.lampsDescription}</p>
          </Typography>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/10">
                <TableHead className="min-w-[180px] pl-5 text-foreground" />
                {copy.lampsColumns.map((column) => (
                  <TableHead key={column} className="min-w-[140px] text-foreground">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {copy.lampRows.map((row) => (
                <TableRow key={row.key} className="border-border/8">
                  <TableCell className="pl-5 font-medium text-foreground">{row.label}</TableCell>
                  {(lightingLampsSample[row.key] ?? []).map((value, index) => (
                    <TableCell key={`${row.key}-${index}`} className="py-3">
                      <TableInput defaultValue={value} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={copy.yearlyTitle}
          rows={copy.yearlyRows}
          years={years}
          getValue={(rowKey, yearValue) => lightingYearlySample[yearValue]?.[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}

function PlaceholderSurface({
  copy,
  dataset,
}: {
  copy: InventoryWorkspaceCopy["hints"];
  dataset: InventoryDataset;
}) {
  return (
    <section className="space-y-3 border-t border-dashed border-border/20 pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{copy.todoLabel}</Badge>
        <Typography asChild variant="label" size="sm" className="text-secondary">
          <p>{copy.placeholderTitle}</p>
        </Typography>
      </div>

      <Typography asChild variant="body" size="body" className="mt-4 max-w-3xl">
        <p>{dataset.description}</p>
      </Typography>
      <Typography asChild variant="body" size="body" className="mt-3 max-w-3xl text-secondary">
        <p>{dataset.implementationNote}</p>
      </Typography>
      <Typography asChild variant="caption" size="sm" className="mt-4 text-secondary">
        <p>{dataset.sourceMode}</p>
      </Typography>
      <Typography asChild variant="caption" size="sm" className="mt-2 text-secondary">
        <p>{dataset.yearMode}</p>
      </Typography>
    </section>
  );
}

export default function InventoryWorkspace() {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const copy = t("inventoryWorkspace") as unknown as InventoryWorkspaceCopy;

  const defaultFamily = useMemo(() => copy.families[0]?.key ?? "", [copy.families]);
  const [activeFamilyKey, setActiveFamilyKey] = useState(defaultFamily);
  const datasetsInFamily = useMemo(
    () => copy.datasets.filter((dataset) => dataset.familyKey === activeFamilyKey),
    [activeFamilyKey, copy.datasets]
  );

  const defaultDataset = useMemo(
    () => datasetsInFamily.find((dataset) => dataset.kind !== "placeholder") ?? datasetsInFamily[0],
    [datasetsInFamily]
  );

  const [activeDatasetKey, setActiveDatasetKey] = useState(defaultDataset?.key ?? "");

  const activeDataset =
    datasetsInFamily.find((dataset) => dataset.key === activeDatasetKey) ?? defaultDataset;

  const activeFamily =
    copy.families.find((family) => family.key === activeFamilyKey) ?? copy.families[0];

  const handleFamilyChange = (familyKey: string) => {
    setActiveFamilyKey(familyKey);
    const nextDatasets = copy.datasets.filter((dataset) => dataset.familyKey === familyKey);
    const nextDataset =
      nextDatasets.find((dataset) => dataset.kind !== "placeholder") ?? nextDatasets[0];
    setActiveDatasetKey(nextDataset?.key ?? "");
  };

  return (
    <section className="space-y-6">
      <div className="space-y-3 border-b border-border/10 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Typography asChild variant="label" size="sm" className="text-secondary">
            <p>{copy.controls.familyLabel}</p>
          </Typography>
          {copy.families.map((family) => (
            <SurfaceToggle
              key={family.key}
              active={family.key === activeFamily?.key}
              onClick={() => handleFamilyChange(family.key)}
            >
              <span>{family.title}</span>
            </SurfaceToggle>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Typography asChild variant="label" size="sm" className="text-secondary">
            <p>{copy.controls.datasetLabel}</p>
          </Typography>
          {datasetsInFamily.map((dataset) => (
            <SurfaceToggle
              key={dataset.key}
              active={dataset.key === activeDataset?.key}
              onClick={() => setActiveDatasetKey(dataset.key)}
              tone={dataset.kind === "placeholder" ? "muted" : "default"}
            >
              <span>{dataset.title}</span>
              {dataset.kind === "placeholder" ? (
                <span className="rounded-full border border-border/18 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-secondary">
                  {copy.hints.todoLabel}
                </span>
              ) : null}
            </SurfaceToggle>
          ))}
        </div>
      </div>

      <section className="rounded-[1.6rem] border border-border/10 bg-card/50 px-5 py-5 shadow-[0_14px_30px_rgba(9,35,31,0.03)] md:px-6 md:py-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Typography asChild variant="sectionTitle" size="sm">
                  <h3>{activeDataset?.title}</h3>
                </Typography>
                <Badge variant={activeDataset?.kind === "placeholder" ? "outline" : "accent"}>
                  {activeDataset?.status}
                </Badge>
              </div>
              <Typography
                asChild
                variant="body"
                size="body"
                className="mt-2 max-w-3xl text-secondary"
              >
                <p>{activeDataset?.description}</p>
              </Typography>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeDataset?.kind !== "placeholder" ? (
                <>
                  <Badge variant="outline">{copy.hints.sourceFirst}</Badge>
                  <Badge variant="outline">{copy.hints.multiYear}</Badge>
                </>
              ) : (
                <Badge variant="outline">{copy.hints.todoLabel}</Badge>
              )}
            </div>
          </div>

          {activeDataset?.kind === "fleet" ? (
            <FleetSurface copy={copy.sections.entry.fleet} years={copy.years} />
          ) : null}
          {activeDataset?.kind === "publicLighting" ? (
            <PublicLightingSurface copy={copy.sections.entry.lighting} years={copy.years} />
          ) : null}
          {activeDataset?.kind === "placeholder" ? (
            <PlaceholderSurface copy={copy.hints} dataset={activeDataset} />
          ) : null}

          <div className="grid gap-3 border-t border-border/10 pt-4 md:grid-cols-2">
            <Typography asChild variant="caption" size="sm" className="text-secondary">
              <p>{copy.hints.provenanceTodo}</p>
            </Typography>
            <Typography asChild variant="caption" size="sm" className="text-secondary">
              <p>{copy.hints.progressTodo}</p>
            </Typography>
          </div>
        </div>
      </section>
    </section>
  );
}
