import Content from "@/app/_forms/components/content";
import Input from "@/app/_forms/components/input";
import Question from "@/app/_forms/components/question";
import { QuestionProps } from "@/app/_forms/types";
import FormSelect from "@/components/forms/formSelect";

import { useScopedI18n } from "@/locales/client";
import React, { useEffect } from "react";

const Fioul = ({ mainForm, setSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.heating.options");

/*   useEffect(()=>{
    setSubmit(true);

    return ()=>{setSubmit(false)}
  }, []) */

  return (
    <>
      <Question>{t("fioul.q")}</Question>
      <Content className="" >
        <div className="grid grid-cols-2 space-x-3">
          <div className="col-span-1">
            <Input
              form={mainForm}
              name={"energie.heating.quantities.fioul.quantity"}
              placeholder={t("fioul.placeholder")}
              label={t("fioul.label")}
            />
          </div>
          <div className="col-span-1 w-3/12">
            <FormSelect
              form={mainForm}
              name="energie.heating.quantities.fioul.frequency"
              label={t("fioul.frequency.label")}
              
              data={[
                { value: "month", label: t("fioul.frequency.month") },
                { value: "year", label: t("fioul.frequency.year") },
              ]}
            />
          </div>
        </div>
      </Content>
    </>
  );
}
Fioul["Symbol"] = {
  question: "forms.basic.energie.heating.options.fioul.label",
  fields: ["energie.heating.quantities.fioul"],
}

export default Fioul;
