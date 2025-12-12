/* import React, { useEffect, useState } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import carsQuestions from "./index";
import Input from "../../../components/input";

function QMoto({
  setOnSubmit,
  setQuestions,
  mainForm,
  currentIndex,
  setIsDirty,
}: QuestionProps) {
  const t = useScopedI18n("forms.basic.transport.qMotos");
  const [prevValue] = useState(mainForm.getValues("transport.hasMoto") ?? 0);
  useEffect(() => {
    setOnSubmit(() => async () => {
      const hasMoto = mainForm.getValues("transport.hasMoto") ?? 0;
      console.log({ hasMoto });
      //add Car questions
      if (prevValue == 0 && hasMoto > 0)
        setQuestions((prev) => {
          const add = carsQuestions(hasMoto);
          const out = prev.toSpliced(currentIndex + 1, 0, ...add);
          return out;
        });
      //...carsQuestions));
      else if (prevValue < hasMoto) {
        const quesLength = carsQuestions(1).length;
        setQuestions((prev) =>
          prev.toSpliced(
            currentIndex + hasMoto * quesLength + 1,
            0,
            ...carsQuestions(hasMoto - prevValue, prevValue + 1),
          ),
        );
      }
      //remove Car questions
      else if (hasMoto < prevValue) {
        const quesLength = carsQuestions(1).length;
        setQuestions((prev) =>
          prev.toSpliced(
            currentIndex + hasMoto * quesLength + 1,
            quesLength * (prevValue - hasMoto),
          ),
        );
      }
    });
    return () => {
      setOnSubmit(() => async () => {});
    };
  }, [currentIndex, mainForm, prevValue, setOnSubmit, setQuestions]);

  useEffect(() => {
    if (mainForm.getValues("transport.hasMoto")) {
      setIsDirty(true);
    }
    return () => {
      setIsDirty(false);
    };
  });
  return (
    <div>
      <Question>{t("qMoto.q")}</Question>
      <Content>
        <Input name="transport.hasMoto" form={mainForm} type="number" />
      </Content>
    </div>
  );
}
QMoto["Symbol"] = {
  question: "forms.basic.transport.qMotos.qMoto.q",
  fields: [`transport.hasMoto`],
};

export default QMoto;
 */
