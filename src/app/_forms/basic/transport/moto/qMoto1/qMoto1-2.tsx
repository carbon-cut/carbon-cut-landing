import React, { useEffect } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import Radio from "../../../../components/radio";
import { FuelTypes, QuestionProps } from "../../../../types";

const fuelTypes: FuelTypes[] = [
  "Electrique",
  "mild Hybrid",
  "Plug-in Hybrid",
  "Gasoline",
];

const QuestionCompo2: React.FC<QuestionProps & { index: number }> = ({
  index,
  mainForm,
  setIsDirty,
}) => {
  const t = useScopedI18n("forms.basic.transport.qMotos.qMoto1-2");

  useEffect(() => {
    const someField = mainForm.getValues(`transport.motos.${index}.motoType`);

    if (
      someField &&
      //@ts-ignore maybe the value is not entered yet
      someField != ""
    ) {
      setIsDirty(true);
    }
    return () => {
      setIsDirty(false);
    };
  });

  return (
    <>
      <div>
        <Question>{t("q")}</Question>
        <Content>
          <Radio
            className="w-2/3 felx justify-between"
            name={`transport.cars.${index}.engine`}
            form={mainForm}
            options={fuelTypes.map((element: FuelTypes) => ({
              label: t(element),
              value: element,
            }))}
          />
        </Content>
      </div>
    </>
  );
};

export default QuestionCompo2;
