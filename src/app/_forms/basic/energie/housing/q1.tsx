import React from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import { FormAlert } from "../../../components/alert";
import FormSelect from "@/components/forms/formSelect";

function Q1({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.housing.q1");

  return (
    <div>
      <FormAlert
        title={`${t("alert.title")}:`}
        description={t("alert.description")}
        variant="note"
      />
      <Question>{t("q1")}</Question>
      <div className="grid grid-cols-2">
        <Content>
          <div className="w-2/3 mt-3">
            <FormSelect
              form={mainForm}
              name="energie.housing.category"
              label={t("q1Labels.type")}
              data={[
                { label: t("options.0"), value: "appartment" },
                { label: t("options.1"), value: "house" },
                { label: t("options.2"), value: "villa" },
                { label: t("options.3"), value: "other" },
              ]}
            />
          </div>
          <div className="w-2/3 mt-3">
            <Input
              label={t("q1Labels.area")}
              placeholder="m²"
              form={mainForm}
              name={"energie.housing.area"}
              
            />
          </div>
        </Content>
        <Content>
          <div className="w-2/3 mt-3">
            <Input
              label={t("q1Labels.heatedVolume")}
              form={mainForm}
              placeholder="m³"
              name={"energie.housing.heatedVolume"}
              
            />
          </div>
          <div className="w-2/3 mt-3">
            <Input
              label={t("q1Labels.conditionedVolume")}
              form={mainForm}
              placeholder="m³"
              name={"energie.housing.conditionedVolume"}
              
            />
          </div>
        </Content>
      </div>
      <Question>{t("q2")}</Question>
      <Content>
        <div className=" mt-3">
          <Input form={mainForm} name={"energie.housing.rooms"}  />
        </div>
      </Content>
      <Question>{t("q3")}</Question>
      <Content>
        <MultiCheckInput
          type="boolean"
          className="grid grid-rows-2 grid-cols-1 ml-0"
          form={mainForm}
          name={"energie.housing"}
          options={[
            {
              label: t("q3Labels.thermalInsulation"),
              value: "thermalInsulation",
              unit: "null",
            },
            {
              label: t("q3Labels.insulatedGlazing"),
              value: "insulatedGlazing",
              unit: "null",
            },
          ]}
        />
      </Content>
    </div>
  );
}

Q1['Symbol'] = {
  question: "forms.basic.energie.housing.title",
  fields: ['energie.housing'],
}

export default Q1;
