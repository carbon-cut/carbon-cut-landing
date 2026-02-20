import React from "react";
import { QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Radio from "../../../components/radio";

const keys = ["yes", "no"] as const;

function Destination({ mainForm }: QuestionProps) {
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
        />
      </Content>
    </div>
  );
}

export default Destination;
