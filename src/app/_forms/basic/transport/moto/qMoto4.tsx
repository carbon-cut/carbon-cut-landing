import React, { useEffect } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import Input from "../../../components/input";

const QMoto4 = (index: number) => {
  function MotoComponent({ mainForm, setIsDirty }: QuestionProps) {
    const t = useScopedI18n("forms.basic.transport.qMotos.qMoto4");

    useEffect(() => {
      const someField = mainForm.getValues(
        `transport.motos.${index}.motoMileage`,
      );
      //@ts-ignore
      if (someField && someField != "") {
        setIsDirty(true);
      }
      return () => {
        setIsDirty(false);
      };
    });

    return (
      <div>
        <Question>{t("q")}</Question>
        <Content>
          <Input
            form={mainForm}
            name={`transport.motos.${index}.motoMileage`}
            type="number"
          />
        </Content>
      </div>
    );
  }
  MotoComponent["Symbol"] = {
    question: "forms.basic.transport.qMotos.qMoto4.q",
    fields: [`motos.${index}.motoMileage`],
  };
  return MotoComponent;
};

export default QMoto4;
