import React, { useEffect } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import Input from "../../../components/input";
import CarTitle from "./components/carTitle";

const QCar4 = (index: number) => {
  function CarComponent({ mainForm }: QuestionProps) {
    const t = useScopedI18n("forms.basic.transport.qCar4");

/*     useEffect(() => {
      const someField = mainForm.getValues(`transport.cars.${index}.mileage`);

      if (someField) {
        setIsDirty(true);
      }
      return () => {
        setIsDirty(false);
      };
    }); */

    return (
      <div className="py-24">
        <CarTitle mainForm={mainForm} index={index} />
        <Question>{t("q")}</Question>
        <Content>
          <Input
            form={mainForm}
            name={`transport.cars.${index}.mileage`}
            type="number"
          />
        </Content>
      </div>
    );
  }
  CarComponent["Symbol"] = {
    question: "forms.basic.transport.qCar4.q",
    fields: [`transport.cars.${index}.carMileage`],
  };
  return CarComponent;
};

export default QCar4;
