import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import { useScopedI18n } from "@/locales/client";
import Unit from "@/app/_forms/components/unit";
import Content from "@/app/_forms/components/content";
import Input from "@/app/_forms/components/input";
import Question from "@/app/_forms/components/question";
import React from "react";

const GasTank: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.heating.options");

  return (
    <>
      <Question>{t("QgasTank.q")}</Question>
      <Content className="">
        <div className="">
          <Input
            form={mainForm}
            name="energie.heating.quantities.gasTank.frequency"
            placeholder={t("QgasTank.u1")}
            label={t("QgasTank.l1")}
            labelClassName="text-black/70"
            type="number"
          />
          <div className="">
            <Input
              type="number"
              form={mainForm}
              name="energie.heating.quantities.gasTank.capacity"
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
  question: "forms.basic.energie.heating.options.QgasTank.title",
  fields: [
    "energie.heating.quantities.gasTank",
    "energie.heating.quantities.gasTank.frequency",
    "energie.heating.quantities.gasTank.capacity",
  ],
};

export default GasTank;
