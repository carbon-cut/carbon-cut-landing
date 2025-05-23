import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import AirQuestions from "./index";
import Question from "../../../../components/question";
import Content from "../../../../components/content";
import { FormRadio } from "@/components/forms/formRadio";

function QAir({
  setOnSubmit,
  setQuestions,
  mainForm,
  currentIndex,
}: QuestionProps) {
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
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <FormRadio
          type={"boolean"}
          name="transport.hasAir"
          form={mainForm}
          data={[
            { label: t("lT"), value: "true" },
            { label: t("lF"), value: "false" },
          ]}
        />
      </Content>
    </div>
  );
}

QAir["Symbol"] = {
  question: "forms.basic.transport.commonTransport.qAir.q",
  fields: ["transport.hasAir"],
};

export default QAir;
