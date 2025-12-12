import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { JSX } from "react";
import Question from "./question";
import Content from "./content";
import { cn } from "@/lib/utils";

interface Props {
  question: string;
  content: JSX.Element | JSX.Element[];
  className?: string;
}
function SideQuestion({ question, content, className }: Props) {
  return (
    <div className={cn("md:ml-16 ml-3 w-7/12 p-3 bg-slate-500/30 rounded-xl", className)}>
      <Question className="text-gray-700 md:text-base font-light mb-0">{question}</Question>
      <Content className="mt-3 px-2 pb-0">{content}</Content>
    </div>
  );
}

export default SideQuestion;
