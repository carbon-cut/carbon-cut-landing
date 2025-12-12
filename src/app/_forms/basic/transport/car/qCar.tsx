import React, { useContext, useEffect, useState } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps, QuestionFC } from "../../../types";
import carsQuestions from "./index";
import Input from "../../../components/input";
import FormContext from "@/app/form/_layout/_formContext";

const QCar: QuestionFC = ({ setOnSubmit, setQuestions, mainForm, currentIndex }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.qCar");
  const [prevValue] = useState(mainForm.getValues("transport.hasCar") ?? 0);
  const { tab } = useContext(FormContext);
  useEffect(() => {
    setOnSubmit(() => async () => {
      const hasCar = mainForm.getValues("transport.hasCar") ?? 0;
      //add Car questions
      if (prevValue == 0 && hasCar > 0)
        setQuestions((prev) => {
          const add = carsQuestions(hasCar);
          const out = prev.slice();
          out.splice(currentIndex + 1, 0, ...add);
          return out;
        });
      //...carsQuestions));
      else if (prevValue < hasCar) {
        const quesLength = carsQuestions(1).length;
        setQuestions((prev) => {
          const copy = prev.slice();
          copy.splice(
            currentIndex + hasCar * quesLength + 1,
            0,
            ...carsQuestions(hasCar - prevValue, prevValue + 1)
          );
          return copy;
        });
      }
      //remove Car questions
      else if (hasCar < prevValue) {
        const quesLength = carsQuestions(1).length;
        setQuestions((prev) => {
          const copy = prev.slice();
          copy.splice(currentIndex + hasCar * quesLength + 1, quesLength * (prevValue - hasCar));
          return copy;
        });
      }
    });
    return () => {
      setOnSubmit(() => async () => {});
    };
  }, [currentIndex, mainForm, prevValue, setOnSubmit, setQuestions, tab]);

  return (
    <div className="space-y-3 mt-6 mb-24">
      <Question>{t("q")}</Question>
      <Content className="pl-0 ">
        <Input name="transport.hasCar" form={mainForm} type="number" />
      </Content>
    </div>
  );
};

QCar.Symbol = {
  question: "forms.basic.transport.qCar.q",
  fields: [`transport.hasCar`],
};

export default QCar;
