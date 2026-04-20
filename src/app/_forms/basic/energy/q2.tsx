import React, { useEffect, useState } from "react";
import Question from "../../components/QuestionPrompt";
import Content from "../../components/QuestionContent";
import QuestionFrame from "../../components/QuestionFrame";
import QuestionSection from "../../components/QuestionSection";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps, QuestionFC } from "../../types";
import SideQuestion from "../../components/sideQuestion";
import { FieldInput as Input } from "@/components/forms";

const Q2: QuestionFC = ({ mainForm, setSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.q2");

  return (
    <QuestionFrame>
      <QuestionSection title={t("q1")}>
        <Content className="mb-6">
          <Input
            form={mainForm}
            name="energy.gas.total"
            type="number"
            unitAdornment="m³"
            unitAdornmentPlacement="end"
            attachedFields={["energy.gas.money"]}
          />
        </Content>
        <SideQuestion
          question={t("q3")}
          content={
            <Input
              form={mainForm}
              name="energy.gas.money"
              type="number"
              unitAdornment="€"
              unitAdornmentPlacement="end"
              attachedFields={["energy.gas.total"]}
            />
          }
        />
      </QuestionSection>
    </QuestionFrame>
  );
};

Q2["Symbol"] = {
  question: "forms.basic.energy.q2.title",
  fields: ["energy.gas"],
};

export default Q2;
