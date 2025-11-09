/* import React, { useEffect, useState } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import { QuestionProps } from "../../../../types";
import Input from "../../../../components/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import FormCombox from "../../../../components/combox";

interface Props {
  index: number;
}

const QuestionCompo1: React.FC<QuestionProps & Props> = ({
  index,
  mainForm,
}) => {
  const t = useScopedI18n("forms.basic.transport.qMotos.qMoto1-1");

  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <Content>
          <Input
            name={`transport.motos.${index}.motoMake`}
            form={mainForm}
            label={t("l1")}
          />
        </Content>

        <Content>
          <Input
            name={`transport.motos.${index}.motoModel`}
            form={mainForm}
            label={t("l2")}
          />
        </Content>
      </Content>
    </div>
  );
};
export default QuestionCompo1;
 */