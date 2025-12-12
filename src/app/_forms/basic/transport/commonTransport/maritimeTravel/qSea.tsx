import React, { useEffect, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import SeaQuestions from "./index";
import Question from "../../../../components/question";
import Content from "../../../../components/content";
import { FormRadio } from "@/components/forms/formRadio";
const QSea: QuestionFC = ({
  setOnSubmit,
  setQuestions,
  mainForm,
  currentIndex,
}: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.commonTransport.qSea");
  const [prevValue] = useState(mainForm.getValues("transport.hasSea") ?? 0);

  useEffect(() => {
    setOnSubmit(() => async () => {
      const hasSea = mainForm.getValues("transport.hasSea") ?? 0;
      //add Air questions
      if (!prevValue && hasSea)
        setQuestions((prev) => {
          const add = SeaQuestions;
          const out = prev.toSpliced(currentIndex + 1, 0, ...add);
          return out;
        });
      //remove Air questions
      else if (!hasSea && prevValue) {
        const quesLength = SeaQuestions.length;
        setQuestions((prev) =>
          prev.toSpliced(currentIndex + quesLength, quesLength),
        );
      }
    });
    return () => {
      setOnSubmit(() => async () => {});
    };
  }, [currentIndex, mainForm, prevValue, setOnSubmit, setQuestions]);

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <FormRadio
          type={"boolean"}
          name="transport.hasSea"
          form={mainForm}
          data={[
            { label: t("lT"), value: "true" },
            { label: t("lF"), value: "false" },
          ]}
        />
      </Content>
    </div>
  );
};

QSea["Symbol"] = {
  question: "forms.basic.transport.commonTransport.qSea.q",
  fields: ["transport.hasSea"],
};

export default QSea;
