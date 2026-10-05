import React from "react";
import { cn } from "@/lib/utils";
import { FieldAlert as FormAlert } from "@/components/forms";

type Props = {
  note?: {
    title: string;
    description: string;
  };
  switchControl: React.ReactNode;
  primaryField: React.ReactNode;
  secondaryField?: React.ReactNode;
  className?: string;
};

// Archetype #8: mode switch + primary/secondary fields with optional note.
export default function QuestionModeSwitch({
  note,
  switchControl,
  primaryField,
  secondaryField,
  className,
}: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      {note ? (
        <FormAlert variant="note" title={`${note.title}:`} description={note.description} />
      ) : null}

      <div>{switchControl}</div>

      <div className="space-y-4">
        {primaryField}
        {secondaryField ? <div className="md:max-w-xs">{secondaryField}</div> : null}
      </div>
    </div>
  );
}
