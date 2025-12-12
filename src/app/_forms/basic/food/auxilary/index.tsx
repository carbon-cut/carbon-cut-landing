import { useScopedI18n } from "@/locales/client";
import React from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Radio from "@/app/_forms/components/radio";
import { FormAlert } from "../../../components/alert";

const options = [0, 20,40, 60, 80, 100] as const;

const Output: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food.auxilary");

  return (
    <div>
      <FormAlert title="" variant="note" description={"indication que le remplissage est approximative"} />
      <Question>{t("q1.text")}</Question>
      <Content>
        <Radio
          form={mainForm}
          name={"food.auxilary.seasonProducts"}
          className="flex md:justify-between justify-center self-center md:w-1/2 w-full"
          options={options.map((e) => ({
            value: e,
            label: `${e}%`,
          }))}
        />
      </Content>
      <Question>{t("q2.text")}</Question>
      <Content>
        <Radio
          form={mainForm}
          name={"food.auxilary.localProducts"}
          className="flex md:justify-between justify-center self-center md:w-1/2 w-full"
          options={options.map((e) => ({
            value: e,
            label: `${e}%`,
          }))}
        />
      </Content>
    </div>
  );
};

Output["Symbol"] = {
  question: "forms.basic.food.auxilary.q1.title",
  fields: ["food.auxilary.seasonProducts", "food.auxilary.localProducts"],
};

export default Output;
