import React, { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QuestionSubheading from "@/app/_forms/components/QuestionSubheading";

type Props = {
  checked: boolean;
  onToggle: () => void;
  leading?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  tone?: "energy" | "transport" | "default";
};

const toneStyles: Record<NonNullable<Props["tone"]>, { checked: string }> = {
  energy: { checked: "border-section-energy bg-section-energy/5" },
  transport: { checked: "border-section-transport bg-section-transport/5" },
  default: { checked: "border-ring bg-muted/10" },
};

function TogglePill({ checked, tone }: { checked: boolean; tone: NonNullable<Props["tone"]> }) {
  const track = checked
    ? tone === "energy"
      ? "bg-section-energy"
      : tone === "transport"
        ? "bg-section-transport"
        : "bg-ring"
    : "bg-muted";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative inline-flex items-center h-6 w-11 rounded-full transition-colors",
        track
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-card transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </div>
  );
}

/**
 * Target B archetype helper (#11):
 * Selectable card with inline toggle and conditional nested fields.
 */
export default function QuestionSelectableCard({
  checked,
  onToggle,
  leading,
  title,
  children,
  className,
  tone = "default",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapRef.current) autoAnimate(wrapRef.current, { duration: 180 });
  }, []);

  return (
    <Card
      ref={wrapRef}
      className={cn(
        "p-0 transition-all duration-200 border-2",
        checked
          ? cn("shadow-md", toneStyles[tone].checked)
          : "border-border/60 hover:border-border",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between cursor-pointer text-left"
        aria-pressed={checked}
      >
        <div className="flex items-center gap-3">
          {leading ? <div className="shrink-0">{leading}</div> : null}
          <QuestionSubheading>{title}</QuestionSubheading>
        </div>
        <TogglePill checked={checked} tone={tone} />
      </button>

      {checked && children ? (
        <>
          <Separator className="mb-4" />
          <div className="px-4 pb-4">{children}</div>
        </>
      ) : null}
    </Card>
  );
}
