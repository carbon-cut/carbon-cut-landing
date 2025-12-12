import React from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";

const meals = ["bread", "salty", "milk", "fruits"] as const;

const Meals: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food.breakfast");
  return (
    <div>
      <Question>{t("q1.text")}</Question>
      <Content className="grid grid-cols-2 gap-4">
        {meals.map((e) => (
          <div key={e}>
            <Input
              form={mainForm}
              name={`food.breakfast.meals.${e}`}
              type="number"
              label={t(`meals.${e}`)}
            />
          </div>
        ))}
      </Content>
    </div>
  );
};

Meals["Symbol"] = {
  question: "forms.basic.food.breakfast.q1.title",
  fields: ["food.breakfast.meals"],
};

export default Meals;
