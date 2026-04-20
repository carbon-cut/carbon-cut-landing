import React from "react";
import QuestionPrompt from "@/app/_forms/components/QuestionPrompt";

type Props = {
  prompt: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Target B core archetype (merged #1/#3/#7):
 * Simple question slide with one prompt and a vertical stack of fields.
 */
export default function QuestionPromptStack({ prompt, children }: Props) {
  return (
    <div>
      <QuestionPrompt>{prompt}</QuestionPrompt>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
