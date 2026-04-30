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
    <div className="space-y-3 border-b border-border/10 pb-4">
      <div className="flex flex-wrap items-center gap-2">
        <Typography asChild variant="label" size="sm" className="text-secondary">
          <p>{controls.sourceLabel}</p>
        </Typography>
        {families.map((family) => (
          <SurfaceToggle
            key={family.key}
            active={family.key === activeFamily?.key}
            onClick={() => onFamilyChange(family.key)}
          >
            <span>{family.title}</span>
          </SurfaceToggle>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Typography asChild variant="label" size="sm" className="text-secondary">
          <p>{controls.datasetLabel}</p>
        </Typography>
        {datasetsInFamily.map((dataset) => (
          <SurfaceToggle
            key={dataset.key}
            active={dataset.key === activeDataset?.key}
            onClick={() => onDatasetChange(dataset.key)}
            tone={dataset.surfaceKind === "placeholder" ? "muted" : "default"}
          >
            <span>{dataset.title}</span>
            {dataset.surfaceKind === "placeholder" ? (
              <span className="rounded-full border border-border/18 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-secondary">
                {todoLabel}
              </span>
            ) : null}
          </SurfaceToggle>
        ))}
      </div>
    </div>
  );
}
