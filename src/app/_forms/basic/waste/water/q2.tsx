import React, { use } from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import Input from "../../../components/input";
import FormSelect from "@/components/forms/formSelect";

const Q2: QuestionFC = ({ mainForm, setSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.water.q2");

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <div className="grid grid-cols-4 md:gap-6 gap-3">
          <div className="col-span-2">
            <Input
              form={mainForm}
              name={"waste.water.wasteWater.amount"}
              type={"number"}
              placeholder={t("unit")}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
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
        </div>
      </Content>
    </div>
  );
};

Q2["Symbol"] = {
  question: "forms.basic.waste.water.q2.title",
  fields: [
    "waste.water.wasteWater",
    "waste.water.wasteWater.amount",
    "waste.water.wasteWater.frequencyUnit",
  ],
};

export default Q2;
