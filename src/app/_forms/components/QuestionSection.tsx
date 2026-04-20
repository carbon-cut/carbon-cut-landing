import React from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import QuestionPrompt from "./QuestionPrompt";

type Props = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

// Presentation-only wrapper for a section inside a multi-block question.
function QuestionSection({ title, description, children, className }: Props) {
  return (
    <section className={cn(className)}>
      {title != null && <QuestionPrompt>{title}</QuestionPrompt>}
      {description != null && (
        <Typography asChild variant="description" size="sm" className="mb-5">
          <p>{description}</p>
        </Typography>
      )}
      {children}
    </section>
  );
}

export default QuestionSection;
