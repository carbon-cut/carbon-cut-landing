"use client";

import Typography from "@/components/ui/typography";

import InventoryDatasetButton from "./InventoryDatasetButton";
import type { InventoryDataset, InventoryFamily, InventoryWorkspaceConfig } from "../types";
import { useI18n, useScopedI18n } from "@/locales/client";

export default function InventoryDatasetNav({
  activeFamily,
  datasets,
  activeDatasetKey,
  onDatasetChange,
}: {
  activeFamily: InventoryFamily | undefined;
  datasets: InventoryDataset[];
  activeDatasetKey: InventoryDataset["key"];
  onDatasetChange: (datasetKey: InventoryDataset["key"]) => void;
}) {
  const tFamily = useScopedI18n("(pages).collectivityDashboard.inventoryWorkspace.families");
  const tDataset = useScopedI18n("(pages).collectivityDashboard.inventoryWorkspace.datasets");
  const label = useI18n()("(pages).collectivityDashboard.inventoryWorkspace.controls.datasetLabel");
  return (
    <section
      aria-label={`${label} ${activeFamily ? tFamily(`${activeFamily.key}.title`) : ""}`.trim()}
    >
      <Typography asChild variant="sectionTitle" size="sm">
        <h2>
          {label}
          {activeFamily ? (
            <span className="font-normal text-secondary">
              {" "}
              · {activeFamily ? tFamily(`${activeFamily.key}.title`) : ""}
            </span>
          ) : null}
        </h2>
      </Typography>

      <div className="mt-3 flex items-end gap-x-8 gap-y-2 border-b border-border/10">
        {datasets.map((dataset) => (
          <InventoryDatasetButton
            key={dataset.key}
            active={dataset.key === activeDatasetKey}
            hasError={dataset.hasError ?? false}
            isComplete={dataset.isComplete ?? false}
            datasetKey={dataset.key}
            label={tDataset(`${dataset.key}.title`)}
            statusText={dataset.navStatusLabel}
            badgeText={dataset.progressLabel}
            progressPercent={dataset.progressPercent}
            onClick={() => onDatasetChange(dataset.key)}
          />
        ))}
      </div>
    </section>
  );
}
