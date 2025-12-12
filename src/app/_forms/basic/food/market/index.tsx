import React, { useEffect } from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { FormLabel } from "@/components/ui/forms";
import FormSelect from "@/components/forms/formSelect";

const markets = [
  "hyperMarket",
  "big_boxStore",
  "supermarket",
  "groceryStore",
  "weeklyMarket",
] as const;

const frequency = ["year", "month", "week"] as const;

const Market: QuestionFC = ({ mainForm, setSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food.markets");

  useEffect(() => {
    setSubmit(true);

    return () => {
      setSubmit(false);
    };
  }, []);

  return (
    <div>
      <Question>{t("q.text")}</Question>
      <Content className="mt-16">
        {markets.map((e) => (
          <div key={e} className="grid md:grid-cols-12 grid-cols-6 my-4 gap-4">
            <FormLabel className="self-center md:col-span-4 col-span-6 items-end">
              {t(`options.${e}`)}
            </FormLabel>
            <div className="md:col-span-3 col-span-2">
              <Input
                name={`food.market.${e}.frequency`}
                form={mainForm}
                type="number"
              />
            </div>
            <FormLabel className="self-center md:col-span-2 font-light mx-auto">
              {t("unit")}
            </FormLabel>
            <div className="md:col-span-3 col-span-3">
              <FormSelect
                name={`food.market.${e}.frequencyUnit`}
                form={mainForm}
                data={frequency.map((fE) => ({
                  label: t(`frequency.${fE}`),
                  value: fE,
                }))}
                placeholder={t("frequency.placeholder")}
              />
            </div>
          </div>
        ))}
      </Content>
    </div>
  );
};

Market["Symbol"] = {
  question: "forms.basic.food.markets.q.title",
  fields: ["food.market"],
};

export default Market;
