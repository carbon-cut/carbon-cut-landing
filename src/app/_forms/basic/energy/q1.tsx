import React from "react";
import Question from "../../components/QuestionPrompt";
import Content from "../../components/QuestionContent";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps, QuestionFC } from "../../types";
import SideQuestion from "../../components/sideQuestion";
import { FieldInput as Input } from "@/components/forms";
import { useSubmit } from "@/lib/hooks/useSubmit";

const Q1: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.q1");

  useSubmit();

  return (
    <div>
      <Question className="md:px-12 px-0">{t("q1")}</Question>
      <Content className="md:px-16 mb-6">
        <Input
          form={mainForm}
          name="energy.electricity.total"
          placeholder="kWh"
          type="number"
          attachedFields={["energy.electricity.money"]}
        />
      </Content>
      <SideQuestion
        className="py-1 md:w-2/4 w-11/12  bg-section-transport/20"
        question={t("q3")}
        content={
          <Input
            form={mainForm}
            name="energy.electricity.money"
            unit=""
            type="number"
            placeholder="€"
            attachedFields={["energy.electricity.total"]}
          />
        }
      />
    </div>
  );
};

Q1["Symbol"] = {
  question: "forms.basic.energy.q1.title",
  fields: ["energy.electricity"],
};

export default Q1;
