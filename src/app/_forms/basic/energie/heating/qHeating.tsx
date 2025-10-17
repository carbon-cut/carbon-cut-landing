import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import { useScopedI18n } from "@/locales/client";
import MinimalInput from "../../../components/minimalInput";

const heatingMethods = [
  "heatPump",
  "gasNetwork",
  "heatNetwork",
  "GPL",
  "gasTank",
  "fioul",
  "charcoal",
  "wood",
] as const;

function QHeating({ mainForm, setOnSubmit }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heating");
  const tAdd = useScopedI18n("forms.basic.energie.heating.options.QgasTank");

  const [gasTank, setGasTank] = useState(
    mainForm.getValues("energie.heating.gasTank") ? true : false,
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
          const ui = mainForm.getValues("energie.heating.gasTank");
          console.log({ ui });
          setGasTank(ui != null);
        }}
      />
      {/* {gasTank && (
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
  question: "forms.basic.energie.heating.title",
  fields: [`electricity`],
};

export default QHeating;
