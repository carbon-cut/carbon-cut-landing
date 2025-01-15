import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import { useScopedI18n } from "@/locales/client";
import MinimalInput from "../../../components/minimalInput";

const heatingMethods = [
  "heatPump",
  "electricity",
  "gazNetwork",
  "heatNetwork",
  "GPL",
  "gazTank",
  "fioul",
  "charcoal",
  "wood",
] as const;

function QHeating({ mainForm, setOnSubmit }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heating");
  const tAdd = useScopedI18n("forms.basic.energie.heating.options.QgazTank");

  const [gazTank, setGazTank] = useState(
    mainForm.getValues("energie.heating.gazTank") ? true : false,
  );

  return (
    <div>
      <Question>{t("q")}</Question>
      <MultiCheckInput
      type="number"
        form={mainForm}
        name="energie.heating"
        options={heatingMethods.map((e) => ({
          label: t(`options.${e}.label`),
          value: e,
          unit: t(`options.${e}.unit`),
        }))}
        onChange={(v) => {
          const ui = mainForm.getValues("energie.heating.gazTank");
          console.log({ ui });
          setGazTank(ui != null);
        }}
      />
      {/* {gazTank && (
        <>
          <Question>{tAdd("q")}</Question>
          <div className="grid grid-cols-3 w-2/3">
            <MinimalInput
              form={mainForm}
              name="energie.heating.heatNetwork.volume"
              unit={tAdd("u1")}
              label={tAdd("l1")}
            />
            <MinimalInput
              form={mainForm}
              name="energie.heating.heatNetwork.frequency"
              unit={tAdd("u2")}
              label={tAdd("l2")}
            />
          </div>
        </>
      )} */}
    </div>
  );
}

QHeating["Symbol"] = {
  question: "forms.basic.energie.q1.q",
  fields: [`electricity`],
};

export default QHeating;
