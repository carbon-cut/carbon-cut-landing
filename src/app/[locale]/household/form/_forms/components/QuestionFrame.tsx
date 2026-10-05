import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

// Presentation-only wrapper for a full question "slide".
function QuestionFrame({ children, className }: Props) {
  // Owns the vertical rhythm between sections in multi-block questions.
  return <div className={cn("space-y-10", className)}>{children}</div>;
}

export default QuestionFrame;
