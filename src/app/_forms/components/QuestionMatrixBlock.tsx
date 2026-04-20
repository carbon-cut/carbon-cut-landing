import React from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import QuestionSubheading from "@/app/_forms/components/QuestionSubheading";

type Props = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  error?: boolean;
  className?: string;
};

/**
 * Target B archetype helper (#10):
 * A titled block inside a matrix-like question section, with optional error border.
 */
export default function QuestionMatrixBlock({
  title,
  description,
  children,
  error = false,
  className,
}: Props) {
  return (
    <div
      data-state={error ? "error" : "default"}
      className={cn(
        "rounded-xl border border-transparent p-4 data-[state=error]:border-destructive",
        className
      )}
    >
      <div className="space-y-4">
        <div>
          <QuestionSubheading>{title}</QuestionSubheading>
          {description ? (
            <Typography asChild variant="caption" size="xs">
              <p>{description}</p>
            </Typography>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
