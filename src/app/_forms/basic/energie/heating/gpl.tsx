import React, { useContext } from "react";
import { QuestionProps } from "../../../types";
import { Label } from "@/components/ui/label";
import Input from "@/app/_forms/components/input";
import Select from "../../../components/select";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import { Separator } from "@/components/ui/separator";
import FormSelect from "@/components/forms/formSelect";
import { useSubmit } from "@/lib/hooks/useSubmit";

const gplBig = ["propane", "butane"] as const;
const gplSmall = [
  "butaneSmall",
  "butaneBig",
  "propaneBig",
  "propaneSmall",
] as const;

function Gpl({ mainForm,  }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heating.options");

  useSubmit();

  const { big, small } = mainForm.watch(
    "energie.heating.quantities.GPL.types"
  ) ?? { big: {}, small: {} };

  return (
    <div>
      <Question className="mb-9">{t("GPL.label")}</Question>
      <Content>
        <div className="flex flex-row mb-6">
        <Label className="w-1/6">{t("GPL.big")}</Label>
        
        <MultiCheckInput
          form={mainForm}
          name="energie.heating.quantities.GPL.types.big"
          options={[
            { label: "butane bleu foncé/rouge", value: "butane", unit: "null" },
            { label: "propane: vert/doré", value: "propane", unit: "null" },
          ]}
          type="boolean"
        />
        </div>
        <div className="flex flex-row">
        <Label className="w-1/6">{t("GPL.small")}</Label>
        <MultiCheckInput
          form={mainForm}
          name="energie.heating.quantities.GPL.types.small"
          options={gplSmall.map((e) => ({
            label: t(`GPL.types.${e}`),
            value: e,
            unit: "null",
          }))}
          type="boolean"
        />
        </div>
      </Content>
      <Separator className="mt-6" />
      <Content className="mt-9">
        <div>
        {gplBig.map((key) => (
          <div key={key}>
            {big?.[key] && (
              <div className="flex flex-row mb-6 space-x-3">
                <Label className="w-1/6 my-auto">{t(`GPL.types.${key}`)}:</Label>
                <div className="w-1/12"/>
                <div className="w-2/6">
                  <Input
                    form={mainForm}
                    name={`energie.heating.quantities.GPL.quantities.${key}.quantity`}
                    placeholder={t("GPL.unit")}
                  />
                </div>
                
                <div className="w-2/6">
                  <FormSelect
                    form={mainForm}
                    name={`energie.heating.quantities.GPL.quantities.${key}.frequency`}
                    placeholder={t("GPL.frequency.placeholder")}
                    data={[
                      { value: "month", label: t("GPL.frequency.month") },
                      { value: "year", label: t("GPL.frequency.year") },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        {gplSmall.map((key) => (
          <div key={key}>
            {small?.[key] && (
              <div className="flex flex-row mb-6 space-x-3">
                
                  <Label className="w-1/6 my-auto"> {t(`GPL.types.${key}`)}: </Label>

                <div className="w-1/12"/>
                <div className="w-2/6">
                  <Input
                    form={mainForm}
                    name={`energie.heating.quantities.GPL.quantities.${key}.quantity`}
                    placeholder={t("GPL.unit")}
                  />
                </div>
                <div className="w-2/6">
                  <FormSelect
                    form={mainForm}
                    name={`energie.heating.quantities.GPL.quantities.${key}.frequency`}
                    placeholder={t("GPL.frequency.placeholder")}
                    data={[
                      { value: "month", label: t("GPL.frequency.month") },
                      { value: "year", label: t("GPL.frequency.year") },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        </div>
      </Content>
    </div>
  );
}

Gpl['Symbol'] ={
  question: "forms.basic.energie.heating.options.GPL.label",
  fields: [
    "energie.heating.quantities.GPL.quantities",
  ],
};

export default Gpl;
