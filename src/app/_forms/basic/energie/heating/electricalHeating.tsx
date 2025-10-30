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
  const t = useScopedI18n("forms.basic.energie.heating.options");

  const [[isElectricHeating, isElecricCentral]] = [[true, true]];
  /*   useState(() => {
          return mainFields.map((v) => { const o =mainForm.getValues(`energie.heating.${v}`);console.log(v, o) ;return o});
        }); */

  return (
    <div>
      {isElectricHeating && (
        <>
          <Content className="my-8 ml-16">
            <Question>{t("electricHeating.label")}</Question>
            <div className="grid grid-cols-3">
              <FormSelect
                label={t("electricHeating.fields.energieLabel")}
                form={mainForm}
                //className="w-1/2"
                name={
                  "energie.heating.quantities.electricalHeating.energyLabel"
                }
                data={energieLabels.map((e) => ({
                  label: e,
                  value: e,
                }))}
              />
              <Input
                label={t("electricHeating.fields.dailyFrequency.label")}
                form={mainForm}
                name={
                  "energie.heating.quantities.electricalHeating.dailyFrequency"
                }
                unit={t("electricHeating.fields.dailyFrequency.unit")}
                
              />
              <Input
                label={t("electricHeating.fields.anualFrequency.label")}
                form={mainForm}
                name={
                  "energie.heating.quantities.electricalHeating.anualFrequency"
                }
                unit={t("electricHeating.fields.anualFrequency.unit")}
                
              />
              <Input
                label="nb d'unite individuelle"
                name="energie.heating.quantities.electricalHeating.number"
                form={mainForm}
                
              />
            </div>
          </Content>
          <Separator />
        </>
      )}
      {isElecricCentral && (
        <Content className="my-8 ml-16">
          <Question>{t("electricalCentralHeating.label")}</Question>
          <div className="grid grid-cols-3">
            <FormSelect
              label={t("electricalCentralHeating.fields.energieLabel")}
              form={mainForm}
              //className="w-1/2"
              name={"energie.heating.quantities.electricalCentral.energyLabel"}
              data={energieLabels.map((e) => ({
                label: e,
                value: e,
              }))}
            />
            <Input
              label={t("electricalCentralHeating.fields.dailyFrequency.label")}
              form={mainForm}
              name={
                "energie.heating.quantities.electricalCentral.dailyFrequency"
              }
              unit={t("electricalCentralHeating.fields.dailyFrequency.unit")}
              
            />
            <Input
              label={t("electricalCentralHeating.fields.anualFrequency.label")}
              form={mainForm}
              name={
                "energie.heating.quantities.electricalCentral.anualFrequency"
              }
              unit={t("electricalCentralHeating.fields.anualFrequency.unit")}
              
            />
          </div>
        </Content>
      )}
    </div>
  );
}

export default ElectricalHeating;
