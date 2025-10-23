import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../../types";
import QuestionCompo1 from "./qCar1-1";
import QuestionCompo2 from "./qCar1-2";
import Question from "@/app/_forms/components/question";
import QuestionCompo3 from "./qCar1-3";

function QCar1(index: number) {
  function CarComponent(questionProps: QuestionProps) {
    const [make, setMake] = useState(() => {
      return questionProps.mainForm.getValues(
        `transport.cars.${index}.make`
      );
    });

    return (
      <>
        <QuestionCompo1
          make={make}
          setMake={setMake}
          index={index}
          {...questionProps}
        />
      </>
    );
  }
  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar1-1.title", {index: index}],
    fields: [
      `transport.cars.${index}.make`,
      `transport.cars.${index}.model`,
    ],
  };
  CarComponent.displayName = `QCar11-${index}`;

  return CarComponent;
}


function QCar12(index: number) {
  function CarComponent(questionProps: QuestionProps) {
    return (
      <>
        <QuestionCompo2 index={index} {...questionProps} />
      </>
    );
  }
  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar1-2.title", {index: index}],
    fields: [
      `transport.cars.${index}.engine`,
    ],
  };

  CarComponent.displayName = `QCar12-${index}`;

  return CarComponent;
}

 const QCar13 = (index: number) => {
  const CarComponent = (props: QuestionProps) => <QuestionCompo3 index={index} {...props} />;
  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar1-3.title", {index: index}],
    fields: [
      `transport.cars.${index}.secondThermal`,
    ],
  };
  return CarComponent;
}
export {QCar1, QCar12, QCar13};