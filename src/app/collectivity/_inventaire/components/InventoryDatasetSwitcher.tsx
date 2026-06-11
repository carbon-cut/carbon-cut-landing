"use client";

import Typography from "@/components/ui/typography";

import SurfaceToggle from "./SurfaceToggle";
import type { InventoryDataset, InventoryFamily, InventoryWorkspaceConfig } from "../types";

export default function InventoryDatasetSwitcher({
  families,
  activeFamily,
  activeDataset,
  datasetsInFamily,
  controls,
  onFamilyChange,
  onDatasetChange,
  todoLabel,
}: {
  families: InventoryFamily[];
  activeFamily: InventoryFamily | undefined;
  activeDataset: InventoryDataset | undefined;
  datasetsInFamily: InventoryDataset[];
  controls: InventoryWorkspaceConfig["controls"];
  onFamilyChange: (familyKey: string) => void;
  onDatasetChange: (datasetKey: string) => void;
  todoLabel: string;
}) {
  return (
    <section
      className="px-0 py-0"
      aria-label={`${controls.sourceLabel} / ${controls.datasetLabel}`}
    >
      <div className="space-y-4">
        <div>
          <Typography asChild variant="sectionTitle" size="sm" className="sr-only">
            <h2>{controls.sourceLabel}</h2>
          </Typography>
          <div className="flex flex-wrap items-center gap-3">
            {families.map((family) => (
              <SurfaceToggle
                key={family.key}
                active={family.key === activeFamily?.key}
                onClick={() => onFamilyChange(family.key)}
                level="family"
              >
                <span>{family.title}</span>
              </SurfaceToggle>
            ))}
          </div>
        </div>

        <div className="border-l border-border/15 pl-4 md:pl-6">
          <Typography asChild variant="sectionTitle" size="sm" className="sr-only">
            <h2>{controls.datasetLabel}</h2>
          </Typography>
          <div className="flex flex-wrap items-center gap-2.5">
            {datasetsInFamily.map((dataset) => (
              <SurfaceToggle
                key={dataset.key}
                active={dataset.key === activeDataset?.key}
                onClick={() => onDatasetChange(dataset.key)}
                tone={dataset.surfaceKind === "placeholder" ? "muted" : "default"}
                level="dataset"
              >
                <span>{dataset.title}</span>
                {dataset.surfaceKind === "placeholder" ? (
                  <span className="rounded-full border border-border/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-secondary">
                    {todoLabel}
                  </span>
                ) : null}
              </SurfaceToggle>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
