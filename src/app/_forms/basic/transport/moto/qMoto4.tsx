/* import React, { useEffect } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps, QuestionFC } from "../../../types";
import Input from "../../../components/input";

const QMoto4 = (index: number) => {
  const MotoComponent: QuestionFC = ({ mainForm, }: QuestionProps) => {
    const t = useScopedI18n("forms.basic.transport.qMotos.qMoto4");

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
  };
  MotoComponent["Symbol"] = {
    question: "forms.basic.transport.qMotos.qMoto4.q",
    fields: [`transport.motos.${index}.mileage`],
  };
  return MotoComponent;
};

export default QMoto4;
 */
