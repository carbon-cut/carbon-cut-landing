import React from "react";
import { QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";

const Q3: QuestionFC = () => {
  const t = useScopedI18n("forms.basic.waste.water.q3");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <span />
      </Content>
    </div>
  );
};

Q3.Symbol = {
  question: "forms.basic.waste.water.q3.q",
  fields: [],
};

export default Q3;
