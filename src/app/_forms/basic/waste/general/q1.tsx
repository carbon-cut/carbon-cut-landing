import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import Input from "../../../components/input";
import Select from "../../../components/select";

const Q1: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.general.waste");

  const [isBag, setIsBag] = React.useState(
    mainForm.getValues("waste.general.waste.amountUnit") === "bag"
  );

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content className="flex justify-start">
        <Input
          label="&nbsp;"
          form={mainForm}
          name={"waste.general.waste.amount"}
          type="number"
          placeholder={t("amount")}
        />
        <div className="w-[100px] mr-4">
          <Select
            label="&nbsp;"
            form={mainForm}
            name="waste.general.waste.amountUnit"
            placeholder={t("amountUnit.placeholder")}
            onChange={(v) => setIsBag(v === "bag")}
            options={[
              { label: t("amountUnit.labels.bag"), value: "bag" },
              { label: t("amountUnit.labels.kg"), value: "kg" },
            ]}
          />
        </div>
        <div className="w-[130px] mr-4">
          <Select
            label="&nbsp;"
            form={mainForm}
            name="waste.general.waste.frequencyUnit"
            placeholder={t("frequencyUnit.placeholder")}
            options={[
              { label: t("frequencyUnit.labels.day"), value: "day" },
              { label: t("frequencyUnit.labels.week"), value: "week" },
            ]}
          />
        </div>
      </Content>
      <Content>
        <div className="w-[200px] mr-4">
          <Input
            disabled={!isBag}
            form={mainForm}
            name={"waste.general.waste.bagVolume"}
            type="number"
            label={t("bagVolume.placeholder")}
            placeholder={t("bagVolume.placeholder")}
          />
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
