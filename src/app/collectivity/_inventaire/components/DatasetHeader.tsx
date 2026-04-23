"use client";

import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";

import type { InventoryDataset, InventoryWorkspaceConfig } from "../types";

export default function DatasetHeader({
  dataset,
  hints,
}: {
  dataset: InventoryDataset | undefined;
  hints: InventoryWorkspaceConfig["hints"];
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Typography asChild variant="sectionTitle" size="sm">
            <h3>{dataset?.title}</h3>
          </Typography>
          <Badge variant={dataset?.surfaceKind === "placeholder" ? "outline" : "accent"}>
            {dataset?.status}
          </Badge>
        </div>
        <Typography asChild variant="body" size="body" className="mt-2 max-w-3xl text-secondary">
          <p>{dataset?.description}</p>
        </Typography>
      </div>

      <div className="flex flex-wrap gap-2">
        {dataset?.surfaceKind !== "placeholder" ? (
          <>
            <Badge variant="outline">{hints.sourceFirst}</Badge>
            <Badge variant="outline">{hints.multiYear}</Badge>
          </>
        ) : (
          <Badge variant="outline">{hints.todoLabel}</Badge>
        )}
      </div>
    </div>
  );
}
