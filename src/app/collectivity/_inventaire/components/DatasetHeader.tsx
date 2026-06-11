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
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Typography asChild variant="title" size="lg">
            <h2>{dataset?.title}</h2>
          </Typography>
          <Badge
            variant="outline"
            size="lg"
            className={
              dataset?.surfaceKind === "placeholder"
                ? undefined
                : "border-[#ffd6cb] bg-[#fff7f4] text-[#f0674b]"
            }
          >
            {dataset?.status}
          </Badge>
        </div>
        <Typography asChild variant="body" size="body" className="max-w-3xl text-secondary">
          <p>{dataset?.description}</p>
        </Typography>
      </div>

      <div className="flex flex-wrap gap-2 lg:pt-1">
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
