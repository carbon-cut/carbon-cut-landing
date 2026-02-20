import React from "react";
import { QuestionProps } from "../../../../types";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import Input from "../../../../components/input";
import Select from "../../../../components/select";
import { Label } from "@/components/ui/label";

const contentKeys = ["electric", "biogas"] as const;
const frequencies = ["month", "year"] as const;
function Detail({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.waste.details.biodigest.q2");

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        {contentKeys.map((e) => (
          <div key={e} className="grid grid-cols-4">
            <Input
              name={`waste.details.biodigest.${e}.amount`}
              form={mainForm}
              label={`${t(`${e}.q`)}`}
              type="number"
              unit={t(`${e}.unit`)}
              half
              full
            />
            <div className="ml-3">
              <Select
                form={mainForm}
                name={`waste.details.biodigest.${e}.frequencyUnit`}
                label={`${t(`${e}.frequency`)}`}
                options={frequencies.map((fE) => ({
                  label: t(`frequencies.${fE}`),
                  value: fE,
                }))}
                className="w-2/3"
              />
            </div>
          </div>
        ))}
      </Content>
    </div>
  );
}

export default Detail;
