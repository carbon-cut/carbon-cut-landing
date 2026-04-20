import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Typography from "@/components/ui/typography";

type Props = {
  badge: React.ReactNode;
  onRemove: () => void;
  className?: string;
  badgeClassName?: string;
  removeButtonClassName?: string;
  childrenGridClassName?: string;
  children: React.ReactNode;
};

// Presentation-only wrapper for an item within a repeater list.
export default function QuestionRepeaterItem({
  badge,
  onRemove,
  className,
  badgeClassName,
  removeButtonClassName,
  childrenGridClassName,
  children,
}: Props) {
  return (
    <li className="space-y-2">
      <div className={cn("rounded border p-3 space-y-2", className)}>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            asChild
            variant="label"
            size="xs"
            className={cn("font-semibold", badgeClassName)}
          >
            <span>{badge}</span>
          </Typography>
          <Button
            type="button"
            onClick={onRemove}
            variant="ghost"
            size="sm"
            className={cn("h-5 w-5 p-0", removeButtonClassName)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <div
          className={cn("grid grid-cols-2 items-end gap-2 md:grid-cols-4", childrenGridClassName)}
        >
          {children}
        </div>
      </div>
    </li>
  );
}
