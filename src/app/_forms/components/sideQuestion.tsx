import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import React, { ReactNode } from "react";

interface Props {
  Question: ReactNode;
  Content: ReactNode;
}
function SideQuestion({ Question, Content }: Props) {
  return (
    <Card className="ml-8 w-11/12 p-3 bg-slate-500/30">
      <CardTitle className="text-gray-700 text-base font-light">
        {Question}
      </CardTitle>
      <CardContent className="mt-3 px-12 pb-3">{Content}</CardContent>
    </Card>
  );
}

export default SideQuestion;
