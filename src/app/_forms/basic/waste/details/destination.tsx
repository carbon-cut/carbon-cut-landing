import React from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import FormSelect from "@/components/forms/formSelect";

const destinationKeys = [
  "incineration",
  "recycling",
  "landfilling",
  "composting",
  "biomethanation",
  "idk",
] as const;

const Destination: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.waste.details.wasteDestination");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <FormSelect
          form={mainForm}
          name={"waste.details.wasteDestination"}
          placeholder={t("placeholder")}
          data={destinationKeys.map((e) => ({
            label: t(`options.${e}`),
            value: e,
          }))}
        />
      </Content>
    </div>
  );
};

Destination.Symbol = {
  question: "forms.basic.waste.details.wasteDestination.q",
  fields: ["waste.details.wasteDestination"],
};

export default Destination;
