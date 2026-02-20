import React from "react";
import { QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";

function Q3({ mainForm }: QuestionProps) {
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
}

export default Q3;
