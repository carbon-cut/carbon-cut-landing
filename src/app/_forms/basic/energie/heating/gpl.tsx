/* import React from "react";
import { QuestionProps } from "../../../types";
import { Label } from "@/components/ui/label";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import { MultiCheckInput } from "../../../components/multiCheckInput";

const gplBig = ["propane", "butane"] as const;
const gplSmall = [
  "butaneSmall",
  "butaneBig",
  "propaneBig",
  "propaneSmall",
] as const;

function Gpl({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heating.options");

  const { big, small } = mainForm.watch(
    "energie.heating.quantitties.GPL.types",
  ) ?? {big:{}, small:{} };

  return (
    <div>
      <Question className="">{t("GPL.label")}</Question>
      <Content>
        <Label className="">Grand Format</Label>
        <MultiCheckInput
          form={mainForm}
          name="energie.heating.quantitties.GPL.types.big"
          options={[
            { label: "butane bleu foncé/rouge", value: "butane", unit:"null" },
            { label: "propane: vert/doré", value: "propane", unit:"null" },
          ]}
          type="boolean"
        />
        <Label className="">Petit Format</Label>
        <MultiCheckInput
          form={mainForm}
          name="energie.heating.quantitties.GPL.types.small"
          options={gplSmall.map((e) => ({ label: t(`GPL.types.${e}`), value: e, unit:"null" }))}
          type="boolean"
        />
      </Content>
      <div>
        {gplBig.map((key) => (
          <div key={key}>
            {big?.[key] && (
              <div className="grid grid-cols-12 mt-3">
                <div>{}</div>
                <div className="col-span-3">
                  <Input
                    form={mainForm}
                    name={`energie.heating.quantitties.GPL.quantitties.${key}.quantity`}
                    unit={t("GPL.unit")}
                    full
                    
                  />
                </div>
                <div></div>
                <Select
                  form={mainForm}
                  name={`energie.heating.quantitties.GPL.quantitties.${key}.frequency`}
                  placeholder={t("GPL.frequency.placeholder")}
                  options={[
                    { value: "month", label: t("GPL.frequency.month") },
                    { value: "year", label: t("GPL.frequency.year") },
                  ]}
                  className="col-span-3"
                />
              </div>
            )}
          </div>
        ))}
        {gplSmall.map((key) => (
          <div key={key}>{small?.[key] && <div className="grid grid-cols-12 mt-3">
            <div className="col-span-2 flex flex-col align-center justify-center"><span className=""> {t(`GPL.types.${key}`)}:{' '}</span></div>
            <div className="col-span-3">
              <Input
                form={mainForm}
                name={`energie.heating.quantitties.GPL.quantitties.${key}.quantity`}
                unit={t("GPL.unit")}
                full
                
              />
            </div>
            <div></div>
            <Select
              form={mainForm}
              name={`energie.heating.quantitties.GPL.quantitties.${key}.frequency`}
              placeholder={t("GPL.frequency.placeholder")}
              options={[
                { value: "month", label: t("GPL.frequency.month") },
                { value: "year", label: t("GPL.frequency.year") },
              ]}
              className="col-span-3"
            />
          </div>}</div>
        ))}
      </div>
    </div>
  );
}

export default Gpl;
 */