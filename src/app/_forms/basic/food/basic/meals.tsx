import React, { useEffect } from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";
import { FormAlert } from "../../../components/alert";
import { FormField, FormItem, FormMessage, useFormField } from "@/components/ui/forms";

const meals = ["redMeat", "whiteMeat", "oilyFish", "whiteFish", "vegan", "vegetarian"] as const;

const Meals: QuestionFC = ({ mainForm, setVerifyFields }: QuestionProps) => {
  useEffect(() => {
    setVerifyFields(["food.basic.meals"]);

    return () => {
      setVerifyFields([]);
    };
  }, []);

  const t = useScopedI18n("forms.basic.food.basic");
  return (
    <div>
      <Question>{t("q1.text")}</Question>
      <FormAlert title="" variant="note" description={t("nb")} />
      <FormField
        control={mainForm.control}
        name={"food.basic.meals"}
        render={() => {
          const { error } = useFormField();

          return (
            <FormItem>
              <div
                data-state={error ? "error" : "default"}
                className="p-6 rounded-xl mt-4 grid grid-cols-2 gap-4 border border-transparent data-[state=error]:border-destructive"
              >
                {meals.map((e) => (
                  <div key={e}>
                    <Input
                      form={mainForm}
                      name={`food.basic.meals.${e}`}
                      type="number"
                      label={t(`meals.${e}`)}
                    />
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

Meals["Symbol"] = {
  question: "forms.basic.food.basic.q1.title",
  fields: ["food.basic.meals"],
};

export default Meals;
