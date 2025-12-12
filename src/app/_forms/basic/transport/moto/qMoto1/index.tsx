/* import React, { useState } from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
//import QuestionCompo1 from "./qMoto1-1";
import QuestionCompo2 from "./qMoto1-2";

function QMoto1(index: number) {
  const MotoComponent: QuestionFC = (questionProps: QuestionProps) => {
    return (
      <>
        <QuestionCompo2 index={index} {...questionProps} />
      </>
    );
  };
  MotoComponent["Symbol"] = {
    question: "forms.basic.transport.qCar1-1.q",
    fields: [
      `transport.motos.${index}.make`,
      `transport.motos.${index}.model`,
      `transport.motos.${index}.engine`,
    ],
  };

  return MotoComponent;
}

export default QMoto1;
 */