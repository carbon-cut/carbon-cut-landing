"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function SurfaceToggle({
  active,
  children,
  onClick,
  tone = "default",
  level = "family",
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  tone?: "default" | "muted";
  level?: "family" | "dataset";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        level === "family"
          ? "min-h-11 px-5 text-[0.95rem] font-medium"
          : "min-h-9 px-4 text-sm font-normal",
        active
          ? "border-primary/25 bg-primary-subtle text-foreground"
          : "border-border/12 bg-background/80 text-secondary hover:border-primary/20 hover:bg-card hover:text-foreground",
        level === "dataset" && active ? "bg-primary/10" : "",
        tone === "muted" ? "border-dashed" : ""
      )}
    >
      {children}
    </button>
  );
}
