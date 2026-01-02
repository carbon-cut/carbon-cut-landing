"use client";

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
              <span className="text-sm font-semibold text-primary">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
