import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import { useScopedI18n } from "@/locales/client";
import { FieldUnit as Unit } from "@/components/forms";
import Content from "@/app/_forms/components/QuestionContent";
import { FieldInput as Input } from "@/components/forms";
import Question from "@/app/_forms/components/QuestionPrompt";
import React from "react";

const GasTank: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.heating.options");

  return (
    <>
      <Question>{t("QgasTank.q")}</Question>
      <Content className="">
        <div className="">
          <Input
            form={mainForm}
            name="energy.heating.quantities.gasTank.frequency"
            placeholder={t("QgasTank.u1")}
            label={t("QgasTank.l1")}
            labelClassName="text-black/70"
            type="number"
          />
          <div className="">
            <Input
              type="number"
              form={mainForm}
              name="energy.heating.quantities.gasTank.capacity"
              placeholder={t("QgasTank.l2")}
              label={t("QgasTank.l2")}
              labelClassName="text-black/70"
              unit={<Unit unit={t("QgasTank.u2")} className="h-9 w-9 mt-auto col-span-2" />}
              className="flex flex-row space-x-2 mt-3 w-full"
            />
          </div>
        </div>
      </Content>
    </>
  );
};

GasTank["Symbol"] = {
  question: "forms.basic.energy.heating.options.QgasTank.title",
  fields: [
    "energy.heating.quantities.gasTank",
    "energy.heating.quantities.gasTank.frequency",
    "energy.heating.quantities.gasTank.capacity",
  ],
};

export default GasTank;
