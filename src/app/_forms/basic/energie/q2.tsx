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
      <Question className='px-12'>{t("q1")}</Question>
      <Content className="px-16 mb-6">
      <Input
      form={mainForm}
      name="energie.gaz.total"
      placeholder="m³"
      type="number"
      />
      </Content>
      <SideQuestion
      className="py-1 w-2/4 bg-section-transport/20"
        question={t("q3")}
        content={
          <Input form={mainForm} name="energie.gaz.money" placeholder="€" type="number" />
        }
      />
    </div>
  );
};

Q2["Symbol"] = {
  question: "forms.basic.energie.q2.title",
  fields: ["energie.gaz.total", "energie.gaz.money"],
};

export default Q2;
