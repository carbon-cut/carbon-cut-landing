import React from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
import QuestionCompo1 from "./qCar1-1";
import QuestionCompo2 from "./qCar1-2";
import QCar13 from "./qCar1-3Question";

function QCar1(index: number) {
  const CarComponent: QuestionFC = (questionProps: QuestionProps) => {
    return (
      <>
        <QuestionCompo1 index={index} {...questionProps} />
      </>
    );
  };
  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar1-1.title", { index: index }],
    fields: [`transport.cars.${index}.make`, `transport.cars.${index}.model`],
  };
  CarComponent.displayName = `QCar11-${index}`;

  return CarComponent;
}

function QCar12(index: number) {
  const CarComponent: QuestionFC = (questionProps: QuestionProps) => {
    return (
      <>
        <QuestionCompo2 index={index} {...questionProps} />
      </>
    );
  };
  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar1-2.title", { index: index }],
    fields: [`transport.cars.${index}.engine`, `transport.cars.${index}.otherEngine`],
  };

  CarComponent.displayName = `QCar12-${index}`;

  return CarComponent;
}

export { QCar1, QCar12, QCar13 };
