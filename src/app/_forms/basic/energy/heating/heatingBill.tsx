import { useScopedI18n } from "@/locales/client";
import React from "react";
import Question from "@/app/_forms/components/QuestionPrompt";
import Content from "@/app/_forms/components/QuestionContent";
import { FieldInput as Input } from "@/components/forms";
import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import SideQuestion from "@/app/_forms/components/sideQuestion";

const HeatingBill: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.heatingBill");
  return (
    <div>
      <Question className="md:px-12 px-0">{t("q")}</Question>
      <Content className="md:px-16 mb-6">
        <Input
          form={mainForm}
          name="energy.heating.quantities.heatingNetwork.total"
          type="number"
          unitAdornment="kWh"
          unitAdornmentPlacement="end"
          attachedFields={["energy.heating.quantities.heatingNetwork.money"]}
        />
      </Content>
      <SideQuestion
        question={t("q3.q")}
        content={
          <Input
            form={mainForm}
            name="energy.heating.quantities.heatingNetwork.money"
            type="number"
            unitAdornment="€"
            unitAdornmentPlacement="end"
            attachedFields={["energy.heating.quantities.heatingNetwork.total"]}
          />
        }
      />
      {/* <Separator className="mt-3" />
      <Question>{t("q2")}</Question>
      <Content>
        <Input form={mainForm} name="energy.electricity.index" type="number" />
      </Content> */}
    </div>
  );
};
HeatingBill["Symbol"] = {
  question: "forms.basic.energy.heatingBill.title",
  fields: [
    "energy.heating.quantities.heatingNetwork",
    "energy.heating.quantities.heatingNetwork.total",
    "energy.heating.quantities.heatingNetwork.money",
  ],
};

export default HeatingBill;
