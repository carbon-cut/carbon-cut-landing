import React from "react";
import Typography from "@/components/ui/typography";

type Props = {
  children: React.ReactNode;
};

/**
 * Small heading used inside questions.
 * Uses Typography primitives so questions don't hand-roll text styles.
 */
export default function QuestionSubheading({ children }: Props) {
  return (
    <Typography asChild variant="label" size="sm" className="text-foreground/90">
      <p>{children}</p>
    </Typography>
  );
}
