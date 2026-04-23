"use client";

import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";

import type { InventoryDataset, InventoryWorkspaceConfig } from "../types";

export default function PlaceholderSurface({
  hints,
  dataset,
}: {
  hints: InventoryWorkspaceConfig["hints"];
  dataset: InventoryDataset;
}) {
  return (
    <section className="space-y-3 border-t border-dashed border-border/20 pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{hints.todoLabel}</Badge>
        <Typography asChild variant="label" size="sm" className="text-secondary">
          <p>{hints.placeholderTitle}</p>
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
