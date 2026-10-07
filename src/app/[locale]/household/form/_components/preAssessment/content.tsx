"use client";

import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

type Item = {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
};

type Props = {
  items: Item[];
  className?: string;
};

export default function PreAssessmentContent({ items, className }: Props) {
  return (
    <div className={cn("flex w-full flex-1 flex-col items-center", className)}>
      <ul className="flex w-full max-w-md flex-col gap-4 text-left text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span
              className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-section-transport/20 bg-section-transport/10"
              aria-hidden="true"
            >
              <item.Icon className="h-4 w-4 text-section-transport" />
            </span>
            <div className="flex flex-col gap-1">
              <Typography asChild variant="subtitle" className="text-sm">
                <span>{item.title}</span>
              </Typography>
              <Typography asChild variant="description" className="text-xs">
                <span>{item.description}</span>
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
