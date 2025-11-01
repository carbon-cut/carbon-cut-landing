import React from "react";
import { QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import Question from "../../../components/question";
import Input from "../../../components/input";
import { Separator } from "@/components/ui/separator";
import FormSelect from "@/components/forms/formSelect";

const energieLabels = ["A", "B", "C", "D", "E", "F", "G"] as const;

function ElectricalHeating({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heating.options.electricHeating");

  return (
    <Content className="">
      <Question>{t("label")}</Question>
      <div className="grid grid-cols-3 space-x-4">
        <FormSelect
          label={t("fields.energyLabel")}
          form={mainForm}
          name={"energie.heating.quantities.electricalHeating.energyLabel"}
          data={energieLabels.map((e) => ({
            label: e,
            value: e,
          }))}
        />
        <Input
          label={t("fields.dailyFrequency.label")}
          form={mainForm}
          name={"energie.heating.quantities.electricalHeating.dailyFrequency"}
          placeholder={t("fields.dailyFrequency.unit")}
        />
        <Input
          label={t("fields.annualFrequency.label")}
          form={mainForm}
          name={"energie.heating.quantities.electricalHeating.annualFrequency"}
          placeholder={t("fields.annualFrequency.unit")}
        />
        
      </div>
      <div className="mt-6">
      <Input
          label={t("fields.nbUnit")}
          name="energie.heating.quantities.electricalHeating.number"
          form={mainForm}
        />
        </div>
    </Content>
  );
}

export default ElectricalHeating;
