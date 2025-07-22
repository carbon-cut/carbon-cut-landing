import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../../types";
import QuestionCompo1 from "./qCar1-1";
import QuestionCompo2 from "./qCar1-2";

function QCar1(index: number) {
  function CarComponent(questionProps: QuestionProps) {
    const [make, setMake] = useState(() => {
      console.log('lookk up for make')
      return questionProps.mainForm.getValues(
        `transport.cars.${index}.carMake`
      );
    });

    useEffect(()=>{
      console.log('useEffect',make);
    }, [make])

    const [model, setModel] = useState(
      questionProps.mainForm.getValues(`transport.cars.${index}.carModel`)
    );
    return (
      <>
        <QuestionCompo1
          setModel={setModel}
          make={make}
          setMake={setMake}
          index={index}
          {...questionProps}
        />
        <QuestionCompo2 model={model} index={index} {...questionProps} />
      </>
    );
  }
  CarComponent["Symbol"] = {
    question: "forms.basic.transport.qCar1-1.q",
    fields: [
      `transport.cars.${index}.carMake`,
      `transport.cars.${index}.carModel`,
      `transport.cars.${index}.carType`,
    ],
  };

  return CarComponent;
}

export default QCar1;
