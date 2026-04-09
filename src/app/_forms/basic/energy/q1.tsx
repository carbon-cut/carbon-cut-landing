import React from "react";
import Question from "../../components/question";
import Content from "../../components/content";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps, QuestionFC } from "../../types";
import SideQuestion from "../../components/sideQuestion";
import Input from "../../components/input";
import { useSubmit } from "@/lib/hooks/useSubmit";

const Q1: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.q1");

  useSubmit();

  return (
    <div>
      <Question className="md:px-12 px-0">{t("q1")}</Question>
      <Content className="md:px-16 mb-6">
        <Input
          form={mainForm}
          name="energie.electricity.total"
          placeholder="kWh"
          type="number"
          attachedFields={["energie.electricity.money"]}
        />
      </Content>
      <SideQuestion
        className="py-1 md:w-2/4 w-11/12  bg-section-transport/20"
        question={t("q3")}
        content={
          <Input
            form={mainForm}
            name="energie.electricity.money"
            unit=""
            type="number"
            placeholder="€"
            attachedFields={["energie.electricity.total"]}
          />
        }
      />
    </div>
  );
};

Q1["Symbol"] = {
  question: "forms.basic.energie.q1.title",
  fields: ["energie.electricity"],
};

export default Q1;
