import { QuestionProps, QuestionFC } from "@/app/[locale]/household/form/_forms/types";
import { useScopedI18n } from "@/locales/client";
import Content from "@/app/[locale]/household/form/_forms/components/QuestionContent";
import { FieldInput as Input } from "@/components/forms";
import QuestionPrompt from "@/app/[locale]/household/form/_forms/components/QuestionPrompt";
import React from "react";
import QuestionUnitPair from "@/app/[locale]/household/form/_forms/components/QuestionUnitPair";

const GasTank: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.heating.options");

  return (
    <>
      <QuestionPrompt>{t("QgasTank.q")}</QuestionPrompt>
      <Content>
        <QuestionUnitPair
          primary={
            <Input
              form={mainForm}
              name="energy.heating.quantities.gasTank.frequency"
              label={t("QgasTank.l1")}
              unitAdornment={t("QgasTank.u1")}
              unitAdornmentPlacement="end"
              type="number"
            />
          }
          secondary={
            <Input
              type="number"
              form={mainForm}
              name="energy.heating.quantities.gasTank.capacity"
              label={t("QgasTank.l2")}
              unitAdornment={t("QgasTank.u2")}
              unitAdornmentPlacement="end"
            />
          }
        />
      </Content>
    </>
  );
};

GasTank["Symbol"] = {
  question: "forms.basic.energy.heating.options.QgasTank.title",
  fields: [
    "energy.heating.quantities.gasTank",
    "energy.heating.quantities.gasTank.frequency",
    "energy.heating.quantities.gasTank.capacity",
  ],
};

export default GasTank;
