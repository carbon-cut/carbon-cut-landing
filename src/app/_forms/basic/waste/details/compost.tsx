import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Radio from "../../../components/radio";

const keys = ["yes", "no"] as const;

const Destination: QuestionFC = ({ mainForm }: QuestionProps) => {
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
            value: e === "yes" ? true : false,
          }))}
          className="md:w-1/2 w-5/6"
        />
      </Content>
    </div>
  );
};

Destination["Symbol"] = {
  question: "forms.basic.waste.details.personalCompost.title",
  fields: ["waste.details.personalCompost"],
};

export default Destination;
