import React, { useEffect } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import Input from "../../../components/input";

const QCar4 = (index: number) => {
  function CarComponent({ mainForm, setIsDirty }: QuestionProps) {
    const t = useScopedI18n("forms.basic.transport.qCar4");

    useEffect(() => {
      //@ts-ignore
      const someField = mainForm.getValues(`cars.${index}.carMileage`);

      if (someField && someField != "") {
        setIsDirty(true);
      }
      return () => {
        setIsDirty(false);
      };
    });

    return (
      <div className="py-12">
        <Question>{t("q")}</Question>
        <Content>
          <Input
            form={mainForm}
            name={`transport.cars.${index}.carMileage`}
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
