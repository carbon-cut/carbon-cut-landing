import React from "react";
import Content from "../../components/QuestionContent";
import QuestionFrame from "../../components/QuestionFrame";
import QuestionSection from "../../components/QuestionSection";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps, QuestionFC } from "../../types";
import QuestionFallbackRow from "../../components/QuestionFallbackRow";
import { FieldInput as Input } from "@/components/forms";
import { useSubmit } from "@/lib/hooks/useSubmit";

const Q1: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.q1");

  useSubmit();

  return (
    <QuestionFrame>
      <QuestionSection title={t("q1")}>
        <Content className="mb-0">
          <QuestionFallbackRow
            note={{ title: t("note.title"), description: t("note.description") }}
            primary={
              <Input
                form={mainForm}
                name="energy.electricity.total"
                type="number"
                label={t("labels.preferred")}
                unitAdornment="kWh"
                unitAdornmentPlacement="end"
                attachedFields={["energy.electricity.money"]}
              />
            }
            fallback={
              <Input
                form={mainForm}
                name="energy.electricity.money"
                type="number"
                label={t("labels.fallback")}
                unitAdornment="€"
                unitAdornmentPlacement="end"
                attachedFields={["energy.electricity.total"]}
              />
            }
          />
        </Content>
      </QuestionSection>
    </QuestionFrame>
  );
};

Q1["Symbol"] = {
  question: "forms.basic.energy.q1.title",
  fields: ["energy.electricity"],
};

export default Q1;
