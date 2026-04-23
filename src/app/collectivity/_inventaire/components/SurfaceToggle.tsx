"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function SurfaceToggle({
  active,
  children,
  onClick,
  tone = "default",
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  tone?: "default" | "muted";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary/28 bg-primary/12 text-foreground shadow-[0_10px_24px_rgba(10,73,54,0.08)]"
          : "border-border/18 bg-card/65 text-secondary hover:bg-card/82 hover:text-foreground",
        tone === "muted" ? "border-dashed" : ""
      )}
    >
      {children}
    </button>
  );
}
