"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  backLabel: string;
  nextLabel: string;
  backDisabled?: boolean;
  stepLabel: string;
  onBack: () => void;
  onNext: () => void;
  className?: string;
};

export default function PreAssessmentActions({
  backLabel,
  nextLabel,
  backDisabled = false,
  stepLabel,
  onBack,
  onNext,
  className,
}: Props) {
  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={onBack}
          disabled={backDisabled}
          className="h-12 w-full text-base font-semibold sm:w-[220px]"
        >
          {backLabel}
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          className="h-12 w-full bg-section-transport text-base font-semibold sm:w-[220px]"
        >
          {nextLabel}
        </Button>
      </div>
      <span className="text-xs text-muted-foreground">{stepLabel}</span>
    </div>
  );
}
