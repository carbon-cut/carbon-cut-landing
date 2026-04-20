import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Plus } from "lucide-react";

type Props = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  onAdd: () => void;
  addLabel: React.ReactNode;
  className?: string;
  addButtonClassName?: string;
  children: React.ReactNode;
};

// Presentation-only wrapper for "repeatable rows" question sections.
export default function QuestionRepeaterSection({
  icon,
  title,
  onAdd,
  addLabel,
  className,
  addButtonClassName,
  children,
}: Props) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <Typography asChild variant="subtitle" size="sm" className="flex items-center gap-2">
          <h4>
            {icon ? <span className="text-xl">{icon}</span> : null}
            {title}
          </h4>
        </Typography>

        <Button
          type="button"
          onClick={onAdd}
          variant="outline"
          size="sm"
          className={cn("h-8 px-2", addButtonClassName)}
        >
          <Plus className="mr-1 h-3 w-3" />
          <Typography asChild variant="label" size="xs">
            <span>{addLabel}</span>
          </Typography>
        </Button>
      </div>
      {children}
    </section>
  );
}
