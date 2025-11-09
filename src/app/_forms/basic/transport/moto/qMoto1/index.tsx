import React, { useState } from "react";
import { QuestionProps } from "../../../../types";
//import QuestionCompo1 from "./qMoto1-1";
import QuestionCompo2 from "./qMoto1-2";

function QMoto1(index: number) {
  function MotoComponent(questionProps: QuestionProps) {
    return (
      <>
       {/*  <QuestionCompo1 index={index} {...questionProps} /> */}
        <QuestionCompo2 index={index} {...questionProps} />
      </>
    );
  }
  MotoComponent["Symbol"] = {
    question: "forms.basic.transport.qCar1-1.q",
    fields: [
      `transport.cars.${index}.carMake`,
      `transport.cars.${index}.carModel`,
      `transport.cars.${index}.carType`,
    ],
  };

  return MotoComponent;
}

export default QMoto1;
