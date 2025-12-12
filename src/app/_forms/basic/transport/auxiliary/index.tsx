import React from "react";
import Question from "../../../components/question";
import { QuestionProps, QuestionFC } from "../../../types";
import Content from "../../../components/content";
import Input from "@/app/_forms/components/input";
import { useScopedI18n } from "@/locales/client";

const auxilaryTransport = ["electricBike", "electricScooter"] as const;

const QAuxilary: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.qAux");

  return (
    <div className="py-6">
      <Question>{t("q")}</Question>
      <Content>
        <>
          <Input
            form={mainForm}
            name={"transport.auxilary.electricBike"}
            type="number"
            label={t("electricBike")}
            placeholder="h/semaine"
          />
          <div className="my-4" />
          <Input
            form={mainForm}
            name={"transport.auxilary.electricScooter"}
            type="number"
            label={t("electricScooter")}
            placeholder="h/semaine"
          />
        </>
      </Content>
    </div>
  );
};

QAuxilary["Symbol"] = {
  question: "forms.basic.transport.qAux.q",
  fields: [
    "transport.auxilary",
    "transport.auxilary.electricBike",
    "transport.auxilary.electricScooter",
  ],
};

export default QAuxilary;
