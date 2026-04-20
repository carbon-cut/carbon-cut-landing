import React, { JSX } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

interface Props {
  question: string;
  content: JSX.Element | JSX.Element[];
  className?: string;
}

function SideQuestion({ question, content, className }: Props) {
  return (
    <div
      className={cn(
        "mt-6 w-full rounded-2xl border border-border/60 bg-muted/40 p-4 md:p-5",
        className
      )}
    >
      <Typography asChild variant="description" size="sm" className="text-foreground/80">
        <p className="leading-relaxed">{question}</p>
      </Typography>
      <div className="mt-4">{content}</div>
    </div>
  );
}

export default SideQuestion;
