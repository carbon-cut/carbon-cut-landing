import React from "react";
import QuestionFrame from "../../../components/QuestionFrame";
import QuestionSection from "../../../components/QuestionSection";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/QuestionContent";
import { QuestionProps, QuestionFC } from "../../../types";
import { FieldInput as Input } from "@/components/forms";
import { FieldMultiCheckInput as MultiCheckInput } from "@/components/forms";
import { FieldAlert as FormAlert } from "@/components/forms";
import { FieldSelect as FormSelect } from "@/components/forms";

const Q1: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.housing.q1");

  return (
    <QuestionFrame>
      <FormAlert
        title={`${t("alert.title")}:`}
        description={t("alert.description")}
        variant="note"
      />
      <QuestionSection title={t("q1")}>
        <div className="grid md:grid-cols-2">
          <Content className="mb-0">
            <div className="md:w-2/3 md:mt-3">
              <FormSelect
                form={mainForm}
                name="energy.housing.category"
                label={t("q1Labels.type")}
                data={[
                  { label: t("options.0"), value: "appartment" },
                  { label: t("options.1"), value: "house" },
                  { label: t("options.2"), value: "villa" },
                  { label: t("options.3"), value: "other" },
                ]}
              />
            </div>
            <div className="md:w-2/3 md:mt-3">
              <Input
                label={t("q1Labels.area")}
                form={mainForm}
                name={"energy.housing.area"}
                unitAdornment="m²"
                unitAdornmentPlacement="end"
                type="number"
              />
            </div>
          </Content>
          <Content className="mb-0">
            <div className="md:w-2/3 md:mt-3">
              <Input
                label={t("q1Labels.heatedVolume")}
                form={mainForm}
                name={"energy.housing.heatedVolume"}
                unitAdornment="m³"
                unitAdornmentPlacement="end"
                type="number"
              />
            </div>
            <div className="md:w-2/3 md:mt-3">
              <Input
                label={t("q1Labels.conditionedVolume")}
                form={mainForm}
                name={"energy.housing.conditionedVolume"}
                unitAdornment="m³"
                unitAdornmentPlacement="end"
                type="number"
              />
            </div>
          </Content>
        </div>
      </QuestionSection>

      <QuestionSection title={t("q2")}>
        <Content>
          <div className=" mt-3">
            <Input form={mainForm} name={"energy.housing.rooms"} />
          </div>
        </Content>
      </QuestionSection>

      <QuestionSection title={t("q3")}>
        <Content className="px-0">
          <MultiCheckInput
            type="boolean"
            className="grid md:grid-rows-2 md:grid-cols-1 grid-cols-2 w-full px-0"
            form={mainForm}
            name={"energy.housing"}
            options={[
              {
                label: t("q3Labels.thermalInsulation"),
                value: "thermalInsulation",
                unit: "null",
              },
              {
                label: t("q3Labels.insulatedGlazing"),
                value: "insulatedGlazing",
                unit: "null",
              },
            ]}
          />
        </Content>
      </QuestionSection>
    </QuestionFrame>
  );
};

Q1["Symbol"] = {
  question: "forms.basic.energy.housing.title",
  fields: ["energy.housing"],
};

export default Q1;
