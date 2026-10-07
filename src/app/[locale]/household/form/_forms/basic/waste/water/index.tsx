import { Separator } from "@/components/ui/separator";
import { QuestionFC, QuestionProps } from "../../../types";
import Q1 from "./q1";
import Q2 from "./q2";
import React, { useEffect } from "react";

const Water: QuestionFC = ({ setSubmit, ...props }: QuestionProps) => {
  const questionProps: QuestionProps = { ...props, setSubmit };

  useEffect(() => {
    setSubmit(true);
    return () => {
      setSubmit(false);
    };
  }, [setSubmit]);

  return (
    <div>
      <Q1 {...questionProps} />
      <Separator />
      <Q2 {...questionProps} />
    </div>
  );
};

Water.Symbol = {
  question: "forms.basic.waste.water.q1.q",
  fields: [
    "waste.water.money.amount",
    "waste.water.money.frequencyUnit",
    "waste.water.wasteWater.amount",
    "waste.water.wasteWater.frequencyUnit",
  ],
};

export default Water;
