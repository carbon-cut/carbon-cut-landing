import React from "react";
import { QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import Input from "../../../components/input";
import Select from "../../../components/select";

function Q2({ mainForm }: QuestionProps) {
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
            half
            full
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
            className="w-2/3"
          />
        </div>
      </Content>
    </div>
  );
}

export default Q2;
