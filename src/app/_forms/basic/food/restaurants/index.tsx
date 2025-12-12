import React from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";

const restos = ["fastFood", "bistro", "classic", "gastronomic", "bio"] as const;

const Output: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food.restaurants");

  return (
    <div>
      <Question>{t("q.text")}</Question>
      <Content className="md:grid md:grid-cols-2 md:gap-6">
        {restos.map((e) => (
          <div className="mb-4" key={e}>
            <Input
              form={mainForm}
              name={`food.restaurants.${e}`}
              type="number"
              label={t(`${e}`)}
              placeholder={t("unit")}
            />
          </div>
        ))}
      </Content>
    </div>
  );
};

Output["Symbol"] = {
  question: "forms.basic.food.restaurants.q.title",
  fields: ["food.restaurants"],
};

export default Output;
