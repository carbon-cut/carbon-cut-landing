"use client";

import Typography from "@/components/ui/typography";

import InventoryDatasetButton from "./InventoryDatasetButton";
import type { InventoryDataset, InventoryFamily, InventoryWorkspaceConfig } from "../types";

export default function InventoryDatasetNav({
  label,
  activeFamily,
  datasets,
  activeDatasetKey,
  onDatasetChange,
}: {
  label: InventoryWorkspaceConfig["controls"]["datasetLabel"];
  activeFamily: InventoryFamily | undefined;
  datasets: InventoryDataset[];
  activeDatasetKey: string;
  onDatasetChange: (datasetKey: string) => void;
}) {
  return (
    <section aria-label={`${label} ${activeFamily?.title ?? ""}`.trim()}>
      <Typography asChild variant="sectionTitle" size="sm">
        <h2>
          {label}
          {activeFamily ? (
            <span className="font-normal text-secondary"> · {activeFamily.title}</span>
          ) : null}
        </h2>
      </Typography>

      <div className="mt-3 flex items-end gap-x-8 gap-y-2 border-b border-border/10">
        {datasets.map((dataset) => (
          <InventoryDatasetButton
            key={dataset.key}
            active={dataset.key === activeDatasetKey}
            iconKey={dataset.navIcon ?? "municipal"}
            label={dataset.title}
            statusText={dataset.navStatusLabel}
            badgeText={dataset.progressLabel}
            onClick={() => onDatasetChange(dataset.key)}
          />
        ))}
      </div>
    </section>
  );
}
