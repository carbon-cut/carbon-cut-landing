import React, { useEffect } from "react";
import { QuestionFC, QuestionProps } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/question";
import Content from "../../../../components/content";
import Radio from "../../../../components/radio";
import Detail from "./detail";

const Main: QuestionFC = ({ mainForm, setQuestions, currentIndex, setOnSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.details.biodigest.q1");

  const [prevHasBiodigest] = React.useState<boolean>(
    mainForm.getValues("waste.details.hasBiodigest")
  );

  useEffect(() => {
    setOnSubmit(() => async () => {
      const hasBiodigest = mainForm.getValues("waste.details.hasBiodigest");
      if (!prevHasBiodigest && hasBiodigest) {
        setQuestions((prev) => {
          const out = prev.slice();
          out.splice(currentIndex + 1, 0, Detail);
          return out;
        });
      } else if (prevHasBiodigest && !hasBiodigest) {
        setQuestions((prev) => {
          const out = prev.slice();
          out.splice(currentIndex + 1, 1);
          return out;
        });
      }
    });

    return () => {
      setOnSubmit(() => async () => {});
    };
  }, []);

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <Radio
          form={mainForm}
          name={"waste.details.hasBiodigest"}
          options={[
            { label: t("yes"), value: true },
            { label: t("no"), value: false },
          ]}
          className="md:w-1/2 w-5/6"
        />
      </Content>
    </div>
  );
};

Main["Symbol"] = {
  question: "forms.basic.waste.details.biodigest.q1.title",
  fields: ["waste.details.hasBiodigest"],
};

export default Main;
