import React from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";

const drinks = ["tea", "coffee", "hotChocolate"] as const;

const Daily: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food.drinks.q1");

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content className="md:grid md:grid-cols-2 md:gap-6">
        {drinks.map((e) => (
          <Input
            key={e}
            form={mainForm}
            name={`food.drinks.${e}`}
            type="number"
            placeholder={t("unit")}
            label={t(`${e}`)}
          />
        ))}
      </Content>
    </div>
  );
};

Daily["Symbol"] = {
  question: "forms.basic.food.drinks.q1.title",
  fields: ["food.drinks"],
};

export default Daily;
