import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Radio from "../../../components/radio";

const keys = ["yes", "no"] as const;

const Compost: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.details.personalCompost");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <Radio
          form={mainForm}
          name={"waste.details.personalCompost"}
          options={keys.map((e) => ({
            label: t(`${e}`),
            value: e === "yes",
          }))}
        />
      </Content>
    </div>
  );
};

Compost.Symbol = {
  question: "forms.basic.waste.details.personalCompost.q",
  fields: ["waste.details.personalCompost"],
};

export default Compost;
