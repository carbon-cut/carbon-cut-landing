import { useScopedI18n } from "@/locales/client";
import React from "react";
import Question from "../../../components/question";
import Content from "../../../components/content";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import WastesTable from "./wastesTable";
import { QuestionProps } from "../../../types";

const wasteTypes = ["recylablePackaging", "paper", "glass", "organic"] as const;

function Precise({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.waste.precise");

  const [wastes, setWastes] = React.useState(() => {
    const res = mainForm.getValues("waste.precise") ?? {};

    return {
      recylablePackaging: res.recylablePackaging ? true : false,
      paper: res.paper ? true : false,
      glass: res.glass ? true : false,
      organic: res.organic ? true : false,
    };
  });

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <MultiCheckInput
          form={mainForm}
          name="waste.precise"
          onChange={(v, key) => {
            if (key) {
              setWastes((prev) => ({ ...prev, [key]: v }));
            }
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
}

export default Precise;
