import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";

const Q3: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.water.q3");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <Input
          form={mainForm}
          name={"waste.water.index.value"}
          type={"number"}
          full
          onChange={() => {
            mainForm.setValue("waste.water.index.date", new Date());
          }}
        />
      </Content>
    </div>
  );
};

Q3["Symbol"] = {
  question: "forms.basic.waste.water.q3.title",
  fields: ["waste.water.index", "waste.water.index.value", "waste.water.index.date"],
};

export default Q3;
