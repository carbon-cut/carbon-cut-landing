import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../../types";
import QuestionCompo1 from "./qCar1-1";
import QuestionCompo2 from "./qCar1-2";
import Question from "@/app/_forms/components/question";
import QuestionCompo3 from "./qCar1-3";

function QCar1(index: number) {
  function CarComponent(questionProps: QuestionProps) {
    const [make, setMake] = useState(() => {
      console.log('lookk up for make')
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
    question: "forms.basic.transport.qCar1-1.q",
    fields: [
      `transport.cars.${index}.carMake`,
      `transport.cars.${index}.carModel`,
    ],
  };
  CarComponent.displayName = `QCar1-${index}`;

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
    question: "forms.basic.transport.qCar1-1.q",
    fields: [
      `transport.cars.${index}.carType`,
    ],
  };

  CarComponent.displayName = `QCar1-${index}`;

  return CarComponent;
}

 const QCar13 = (index: number) => 
  // eslint-disable-next-line react/display-name
  (props: QuestionProps) => <QuestionCompo3 index={index} {...props} />;

export {QCar1, QCar12, QCar13};