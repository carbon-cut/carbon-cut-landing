import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import Input from "../../../components/input";
import Select from "../../../components/select";

const Q2: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.water.q2");

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <div className="grid grid-cols-4">
          <Input
            label="&nbsp;"
            form={mainForm}
            name={"waste.water.wasteWater.amount"}
            type="number"
            unit={t("unit")}
          />
          <Select
            label="&nbsp;"
            form={mainForm}
            name={"waste.water.wasteWater.frequencyUnit"}
            options={[
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
