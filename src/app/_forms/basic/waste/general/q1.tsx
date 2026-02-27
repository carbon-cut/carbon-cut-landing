import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import Input from "../../../components/input";
import FormSelect from "@/components/forms/formSelect";
import { useWatch } from "react-hook-form";

const Q1: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.general.waste");
  const amountUnit = useWatch({
    control: mainForm.control,
    name: "waste.general.waste.amountUnit",
  });
  const isBag = amountUnit === "bag";

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <div className="max-w-3xl space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,240px)_110px_auto_160px] md:items-end">
            <div className="min-w-0">
              <Input
                label="&nbsp;"
                form={mainForm}
                name={"waste.general.waste.amount"}
                type="number"
                placeholder={t("amount")}
              />
            </div>
            <div className="w-full">
              <FormSelect
                label="&nbsp;"
                form={mainForm}
                name="waste.general.waste.amountUnit"
                placeholder={t("amountUnit.placeholder")}
                data={[
                  { label: t("amountUnit.labels.bag"), value: "bag" },
                  { label: t("amountUnit.labels.kg"), value: "kg" },
                ]}
              />
            </div>
            <div className="text-sm md:text-base text-muted-foreground md:pb-2 md:justify-self-center">
              <div className="py-1">
              {t("every")}
              </div>
            </div>
            <div className="w-full">
              <FormSelect
                label="&nbsp;"
                form={mainForm}
                name="waste.general.waste.frequencyUnit"
                placeholder={t("frequencyUnit.placeholder")}
                data={[
                  { label: t("frequencyUnit.labels.day"), value: "day" },
                  { label: t("frequencyUnit.labels.week"), value: "week" },
                ]}
              />
            </div>
          </div>

          <div className="w-full md:max-w-[260px]">
            <Input
              disabled={!isBag}
              form={mainForm}
              name={"waste.general.waste.bagVolume"}
              type="number"
              label={t("bagVolume.placeholder")}
              placeholder={t("bagVolume.placeholder")}
            />
          </div>
        </div>
      </Content>
    </div>
  );
};

Q1.Symbol = {
  question: "forms.basic.waste.general.waste.q",
  fields: [
    "waste.general.waste.amount",
    "waste.general.waste.amountUnit",
    "waste.general.waste.frequencyUnit",
    "waste.general.waste.bagVolume",
  ],
};

export default Q1;
