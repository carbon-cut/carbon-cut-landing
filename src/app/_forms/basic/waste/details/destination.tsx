import React from "react";
import { QuestionProps } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import Select from "../../../components/select";

const destinationKeys = [
  "incineration",
  "recycling",
  "landfilling",
  "composting",
  "biomethanation",
  "idk",
] as const;

function Destination({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.waste.details.wasteDestination");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <Select
          form={mainForm}
          name={"waste.details.wasteDestination"}
          placeholder={t("placeholder")}
          options={destinationKeys.map((e) => ({
            label: t(`options.${e}`),
            value: e,
          }))}
        />
      </Content>
    </div>
  );
}

export default Destination;
