import { useScopedI18n } from "@/locales/client";
import React from "react";
import Question from "../../../components/QuestionPrompt";
import Content from "../../../components/QuestionContent";
import { FieldMultiCheckInput as MultiCheckInput } from "@/components/forms";
import WastesTable from "./wastesTable";
import { QuestionFC, QuestionProps } from "../../../types";
import { useWatch } from "react-hook-form";

const wasteTypes = ["recylablePackaging", "paper", "glass", "organic"] as const;

const Precise: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.precise");
  const preciseValues = useWatch({
    control: mainForm.control,
    name: "waste.precise",
  });

  const wastes = {
    recylablePackaging: Boolean(preciseValues?.recylablePackaging),
    paper: Boolean(preciseValues?.paper),
    glass: Boolean(preciseValues?.glass),
    organic: Boolean(preciseValues?.organic),
  };

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <MultiCheckInput
          className="px-3"
          form={mainForm}
          name="waste.precise"
          options={wasteTypes.map((e) => ({
            label: t(`labels.${e}`),
            value: e,
            unit: "null",
          }))}
          disableError
        />
      </Content>
      <WastesTable mainForm={mainForm} wastes={wastes} />
    </div>
  );
};

Precise.Symbol = {
  question: "forms.basic.waste.precise.q",
  fields: ["waste.precise"],
};

export default Precise;
