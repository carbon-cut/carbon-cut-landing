import { useScopedI18n } from "@/locales/client";
import React from "react";
import Question from "../../../components/question";
import Content from "../../../components/content";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import WastesTable from "./wastesTable";
import { QuestionFC, QuestionProps } from "../../../types";

const wasteTypes = ["recylablePackaging", "paper", "glass", "organic"] as const;

const Precise: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.precise");
  const [wastes, setWastes] = React.useState(() => {
    const preciseValues = mainForm.getValues("waste.precise") ?? {};

    return {
      recylablePackaging: Boolean(preciseValues.recylablePackaging),
      paper: Boolean(preciseValues.paper),
      glass: Boolean(preciseValues.glass),
      organic: Boolean(preciseValues.organic),
    };
  });

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <MultiCheckInput
          className="px-3"
          form={mainForm}
          name="waste.precise"
          onChange={(checked, key) => {
            if (!key) return;
            setWastes((prev) => ({ ...prev, [key]: Boolean(checked) }));
          }}
          options={wasteTypes.map((e) => ({
            label: t(`labels.${e}`),
            value: e,
            unit: "null",
          }))}
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
