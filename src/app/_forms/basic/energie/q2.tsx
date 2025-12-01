import React, { useEffect, useState } from "react";
import Question from "../../components/question";
import Content from "../../components/content";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps } from "../../types";
import SideQuestion from "../../components/sideQuestion";
import Input from "../../components/input";


const Q2 = ({ mainForm, setSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.q2");

  useEffect(()=>{
    setSubmit(true)

    return ()=>{
      setSubmit(false)
    }
  }, [])

  return (
    <div>
      <Question className='md:px-12 px-0'>{t("q1")}</Question>
      <Content className="md:px-16 mb-6">
        <Input
          form={mainForm}
          name="energie.gas.total"
          placeholder="m³"
          type="number"
          attachedFields={["energie.gas.money"]}
        />
      </Content>
      <SideQuestion
        className="py-1 md:w-2/4 w-11/12  bg-section-transport/20"
        question={t("q3")}
        content={
          <Input
            form={mainForm}
            name="energie.gas.money"
            placeholder="€"
            type="number"
            attachedFields={["energie.gas.total"]}
          />
        }
      />
    </div>
  );
};

Q2["Symbol"] = {
  question: "forms.basic.energie.q2.title",
  fields: ["energie.gas.total", "energie.gas.money"],
};

export default Q2;
