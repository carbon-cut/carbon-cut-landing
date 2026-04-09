import React, { useEffect, useState } from "react";
import Question from "../../components/question";
import Content from "../../components/content";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps, QuestionFC } from "../../types";
import SideQuestion from "../../components/sideQuestion";
import Input from "../../components/input";

const Q2: QuestionFC = ({ mainForm, setSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.q2");

  return (
    <div>
      <Question className="md:px-12 px-0">{t("q1")}</Question>
      <Content className="md:px-16 mb-6">
        <Input
          form={mainForm}
          name="energy.gas.total"
          placeholder="m³"
          type="number"
          attachedFields={["energy.gas.money"]}
        />
      </Content>
      <SideQuestion
        className="py-1 md:w-2/4 w-11/12  bg-section-transport/20"
        question={t("q3")}
        content={
          <Input
            form={mainForm}
            name="energy.gas.money"
            placeholder="€"
            type="number"
            attachedFields={["energy.gas.total"]}
          />
        }
      />
    </div>
  );
};

Q2["Symbol"] = {
  question: "forms.basic.energy.q2.title",
  fields: ["energy.gas"],
};

export default Q2;
