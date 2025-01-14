import React, { useEffect } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import Radio from "@/app/_forms/components/radio";
import { FuelTypes, QuestionProps } from "../../../../types";
import { useQuery } from "@tanstack/react-query";

const QuestionCompo2: React.FC<
  QuestionProps & { index: number; model?: any }
> = ({ model, index, mainForm, setIsDirty }) => {
  const t = useScopedI18n("forms.basic.transport.qCar1-2");

  useEffect(() => {
    const someField = mainForm.getValues(`transport.cars.${index}.carType`);

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

  const { data: fuelTypes } = useQuery({
    queryKey: [`fuelTypes.${model}`],
    queryFn: async () => {
      if (model) {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/fuel?model=${model}`,
        ).then((res) => res.json());
        if (data.error) throw new Error(data.error.message);
        return data;
      }
      return null;
    },
  });

  return (
    <>
      {fuelTypes && (
        <div>
          <Question>{t("q")}</Question>
          <Content>
            <Radio
              className="w-2/3 felx justify-between"
              name={`transport.cars.${index}.carType`}
              form={mainForm}
              options={fuelTypes.map((element: FuelTypes) => ({
                label: t(element),
                value: element,
              }))}
            />
          </Content>
        </div>
      )}
    </>
  );
};

export default QuestionCompo2;
