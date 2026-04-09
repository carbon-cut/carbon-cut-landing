import Content from "@/app/_forms/components/content";
import Input from "@/app/_forms/components/input";
import Question from "@/app/_forms/components/question";
import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import FormSelect from "@/components/forms/formSelect";

import { useScopedI18n } from "@/locales/client";
import React, { useEffect } from "react";

const Fioul: QuestionFC = ({ mainForm, setSubmit }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.heating.options");

  /*   useEffect(()=>{
    setSubmit(true);

    return ()=>{setSubmit(false)}
  }, []) */

  return (
    <>
      <Question>{t("fioul.q")}</Question>
      <Content className="">
        <div className="grid md:grid-cols-2 md:space-x-3">
          <div className="col-span-1">
            <Input
              form={mainForm}
              name={"energy.heating.quantities.fioul.quantity"}
              placeholder={t("fioul.placeholder")}
              label={t("fioul.label")}
              labelClassName="text-black/70"
              type="number"
            />
          </div>
          <div className="col-span-1 md:w-6/12">
            <FormSelect
              form={mainForm}
              name="energy.heating.quantities.fioul.frequency"
              label={t("fioul.frequency.label")}
              labelClassName="text-black/70"
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
};
Fioul["Symbol"] = {
  question: "forms.basic.energy.heating.options.fioul.label",
  fields: ["energy.heating.quantities.fioul"],
};

export default Fioul;
