import React from "react";
import Question from "../../../components/question";
import { QuestionProps } from "../../../types";
import Content from "../../../components/content";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import { useScopedI18n } from "@/locales/client";

const auxilaryTransport = ["bicycle", "scooter", "car"] as const;

function QAuxilary({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.transport.qAux");

  return (
    <div className="py-6">
      <Question>{t("q")}</Question>
      <Content>
        <>
          <MultiCheckInput
            form={mainForm}
            name={"transport.auxilary"}
            options={auxilaryTransport.map((e) => ({
              label: t(e),
              value: e,
              unit: "h/semaine",
            }))}
          />
        </>
      </Content>
    </div>
  );
}

QAuxilary["Symbol"] = {
  question: "forms.basic.transport.qMotos.qMoto.q",
  fields: [`transport.hasMoto`],
};

export default QAuxilary;
