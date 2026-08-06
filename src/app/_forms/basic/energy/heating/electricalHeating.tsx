import React from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/QuestionContent";
import Question from "../../../components/QuestionPrompt";
import { FieldInput as Input } from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { FieldSelect as FormSelect } from "@/components/forms";

const energyLabels = ["A", "B", "C", "D", "E", "F", "G"] as const;

const ElectricalHeating: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.heating.options.electricHeating");

  return (
    <Content className="">
      <Question>{t("label")}</Question>
      <div className="grid md:grid-cols-3 md:space-x-4">
        <FormSelect
          label={t("fields.energyLabel")}
          labelClassName="text-black/70"
          form={mainForm}
          name={"energy.heating.quantities.electricalHeating.energyLabel"}
          data={energyLabels.map((e) => ({
            label: e,
            value: e,
          }))}
        />
        <Input
          label={t("fields.dailyFrequency.label")}
          labelClassName="text-black/70"
          form={mainForm}
          name={"energy.heating.quantities.electricalHeating.dailyFrequency"}
          placeholder={t("fields.dailyFrequency.unit")}
          type="number"
        />
        <Input
          label={t("fields.annualFrequency.label")}
          labelClassName="text-black/70"
          form={mainForm}
          name={"energy.heating.quantities.electricalHeating.annualFrequency"}
          placeholder={t("fields.annualFrequency.unit")}
          type="number"
        />
      </div>
      <div className="md:mt-6">
        <Input
          label={t("fields.nbUnit")}
          labelClassName="text-black/70"
          name="energy.heating.quantities.electricalHeating.number"
          form={mainForm}
          type="number"
        />
      </div>
    </Content>
  );
};

ElectricalHeating["Symbol"] = {
  question: "forms.basic.energy.heating.options.electricHeating.label",
  fields: ["energy.heating.quantities.electricalHeating"],
};

export default ElectricalHeating;
