import Content from "@/app/_forms/components/content";
import Input from "@/app/_forms/components/input";
import Question from "@/app/_forms/components/question";
import { QuestionProps } from "@/app/_forms/types";
import FormSelect from "@/components/forms/formSelect";
import { useScopedI18n } from "@/locales/client";
import React from "react";

const energieLabels = ["A", "B", "C", "D", "E", "F", "G"] as const;

function CentralHeating({mainForm}: QuestionProps) {
    const t = useScopedI18n("forms.basic.energie.heating.options.electricalCentralHeating");
  return (
    <Content className="">
      <Question>{t("label")}</Question>
      <div className="grid grid-cols-3 space-x-4">
        <FormSelect
          label={t("fields.energyLabel")}
          form={mainForm}
          name={"energie.heating.quantities.electricalCentral.energyLabel"}
          data={energieLabels.map((e) => ({
            label: e,
            value: e,
          }))}
        />
        <Input
          label={t("fields.dailyFrequency.label")}
          form={mainForm}
          name={"energie.heating.quantities.electricalCentral.dailyFrequency"}
          placeholder={t("fields.dailyFrequency.unit")}
        />
        <Input
          label={t("fields.annualFrequency.label")}
          form={mainForm}
          name={"energie.heating.quantities.electricalCentral.annualFrequency"}
          placeholder={t("fields.annualFrequency.unit")}
        />
      </div>
    </Content>
  );
}

export default CentralHeating;
