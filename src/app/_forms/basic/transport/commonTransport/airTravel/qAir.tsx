import React, { useEffect, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import AirQuestions from "./index";
import { FieldRadio as Radio } from "@/components/forms";
import QuestionPromptStack from "@/app/_forms/components/QuestionPromptStack";

const QAir: QuestionFC = ({ setOnSubmit, setQuestions, mainForm, currentIndex }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.commonTransport.qAir");
  const [prevValue] = useState(mainForm.getValues("transport.hasAir") ?? 0);

  useEffect(() => {
    setOnSubmit(() => async () => {
      const hasAir = mainForm.getValues("transport.hasAir") ?? 0;
      //add Air questions
      if (!prevValue && hasAir)
        setQuestions((prev) => {
          const add = AirQuestions;
          const out = prev.slice();
          out.splice(currentIndex + 1, 0, ...add);
          return out;
        });
      //remove Air questions
      else if (!hasAir && prevValue) {
        const quesLength = AirQuestions.length;
        setQuestions((prev) => {
          const out = prev.slice();
          out.splice(currentIndex + quesLength, quesLength);
          return out;
        });
      }
    });
    return () => {
      setOnSubmit(() => async () => {});
    };
  }, [currentIndex, mainForm, prevValue, setOnSubmit, setQuestions]);

  return (
    <QuestionPromptStack prompt={t("q")}>
      <Radio
        className="w-4/6 md:w-3/6"
        form={mainForm}
        name="transport.hasAir"
        options={[
          { label: t("lT"), value: true },
          { label: t("lF"), value: false },
        ]}
      />
    </QuestionPromptStack>
  );
};

QAir["Symbol"] = {
  question: "forms.basic.transport.commonTransport.qAir.q",
  fields: ["transport.hasAir"],
};

export default QAir;
