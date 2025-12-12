import React from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";

const drinks = ["soda", "jus", "beer", "alcohol"] as const;

const Weekly: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food.drinks.q2");

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

Weekly["Symbol"] = {
  question: "forms.basic.food.drinks.q2.title",
  fields: ["food.drinks.soda", "food.drinks.jus", "food.drinks.beer", "food.drinks.alcohol"],
};

export default Weekly;
