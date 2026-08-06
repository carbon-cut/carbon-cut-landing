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
        <div className="max-w-3xl md:space-y-4">
          <div className="grid grid-cols-1 md:gap-3 md:grid-cols-[minmax(0,240px)_110px_auto_160px] md:items-end">
            <div className="min-w-0">
              <Input
                form={mainForm}
                name={"waste.general.waste.amount"}
                type="number"
                placeholder={t("amount")}
                fallback
              />
            </div>
            <div className="w-full">
              <FormSelect
                form={mainForm}
                name="waste.general.waste.amountUnit"
                placeholder={t("amountUnit.placeholder")}
                data={[
                  { label: t("amountUnit.labels.bag"), value: "bag" },
                  { label: t("amountUnit.labels.kg"), value: "kg" },
                ]}
                fallback
              />
            </div>
            <div className="text-sm md:text-base text-muted-foreground md:pb-2 md:justify-self-center">
              <div className="md:py-1 text-center">
                {t("every")}
                <p className="md:h-auto h-0">{"\u00A0"}</p>
              </div>
            </div>
            <div className="w-full ">
              <FormSelect
                label="&nbsp;"
                form={mainForm}
                name="waste.general.waste.frequencyUnit"
                placeholder={t("frequencyUnit.placeholder")}
                data={[
                  { label: t("frequencyUnit.labels.day"), value: "day" },
                  { label: t("frequencyUnit.labels.week"), value: "week" },
                ]}
                fallback
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
  fields: ["waste.general.waste"],
};

export default Q1;
