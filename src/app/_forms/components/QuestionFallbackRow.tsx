import React from "react";
import { cn } from "@/lib/utils";
import { FieldAlert as FormAlert } from "@/components/forms";

type Props = {
  note?: {
    title: string;
    description: string;
  };
  primary: React.ReactNode;
  fallback: React.ReactNode;
  className?: string;
  gridClassName?: string;
};

/**
 * Target B archetype helper:
 * Preferred + fallback inputs presented side-by-side on desktop, stacked on mobile.
 * This is presentation-only; validation stays in question logic / schema.
 */
export default function QuestionFallbackRow({
  note,
  primary,
  fallback,
  className,
  gridClassName,
}: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      {note ? (
        <FormAlert variant="note" title={`${note.title}:`} description={note.description} />
      ) : null}

      <div className={cn("grid gap-4 md:grid-cols-2", gridClassName)}>
        {primary}
        {fallback}
      </div>
    </div>
  );
}
