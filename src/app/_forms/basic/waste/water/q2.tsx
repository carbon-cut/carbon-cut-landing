import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import Input from "../../../components/input";
import FormSelect from "@/components/forms/formSelect";

const Q2: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.water.q2");

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content className="mt-3">
        <div className="grid grid-cols-4 gap-4">
          <Input
            form={mainForm}
            name={"waste.water.wasteWater.amount"}
            type="number"
            placeholder={t("unit")}
          />
          <FormSelect
            form={mainForm}
            name={"waste.water.wasteWater.frequencyUnit"}
            data={[
              { label: t("frequency.month"), value: "month" },
              { label: t("frequency.year"), value: "year" },
            ]}
            placeholder={t("frequency.placeholder")}
          />
        </div>
      </Content>
    </div>
  );
};

Q2.Symbol = {
  question: "forms.basic.waste.water.q2.q",
  fields: ["waste.water.wasteWater.amount", "waste.water.wasteWater.frequencyUnit"],
};

export default Q2;
