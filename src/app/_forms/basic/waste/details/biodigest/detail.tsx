import React from "react";
import { QuestionFC, QuestionProps } from "../../../../types";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import Input from "../../../../components/input";
import Select from "../../../../components/select";

const contentKeys = ["electric", "biogas"] as const;
const frequencies = ["month", "year"] as const;
const Detail: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.details.biodigest.q2");

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        {contentKeys.map((e) => (
          <div key={e} className="grid grid-cols-4">
            <Input
              name={`waste.details.biodigest.${e}.amount`}
              form={mainForm}
              label={`${t(`${e}.q`)}`}
              type="number"
              unit={t(`${e}.unit`)}
            />
            <div className="ml-3">
              <Select
                form={mainForm}
                name={`waste.details.biodigest.${e}.frequencyUnit`}
                label={`${t(`${e}.frequency`)}`}
                options={frequencies.map((fE) => ({
                  label: t(`frequencies.${fE}`),
                  value: fE,
                }))}
              />
            </div>
          </div>
        ))}
      </Content>
    </div>
  );
};

Detail.Symbol = {
  question: "forms.basic.waste.details.biodigest.q2.q",
  fields: [
    "waste.details.biodigest.electric.amount",
    "waste.details.biodigest.electric.frequencyUnit",
    "waste.details.biodigest.biogas.amount",
    "waste.details.biodigest.biogas.frequencyUnit",
  ],
};

export default Detail;
