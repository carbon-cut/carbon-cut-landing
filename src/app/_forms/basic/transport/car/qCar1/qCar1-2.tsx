import React, { useEffect, useState } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import Radio from "@/app/_forms/components/radio";
import { FuelTypes, QuestionProps } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import Input from "@/app/_forms/components/input";
import { useFormField } from "@/components/ui/forms";

const defaultFuelTypes: FuelTypes[] = [
  "Electrique",
  "mild Hybrid",
  "Plug-in Hybrid",
  "natural Gaz",
  "Diesel",
  "Gasoline",
  "other",
];

const QuestionCompo2: React.FC<
  QuestionProps & { index: number; model?: any }
> = ({ model, index, mainForm, setIsDirty }) => {
  const t = useScopedI18n("forms.basic.transport.qCar1-2");

  const [ carType, setCarType ] = useState(mainForm.getValues(`transport.cars.${index}.carType`)); 

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
        return [...data, "other"];
      }
      return defaultFuelTypes;
    },
  });
  
  return (
    <>
        <div>
          <Question>{t("q")}</Question>
          <Content className="flex flex-row justify-start">
            <div className="self-start w-1/2 ">
            <Radio
              className=" w-2/3 flex justify-between  mx-0"
              setState={setCarType}
              name={`transport.cars.${index}.carType`}
              form={mainForm}
              options={fuelTypes?.map((element: FuelTypes) => ({
                label: t(element),
                value: element,
              })) ?? []}
            />
            </div>
            <Input
              type="number"
              form={mainForm}
              name={`transport.cars.${index}.carTypeOther`}
              label={"Autre"}
              disabled={
                (carType !== "other") ? true : false
              }
            />
          </Content>
        </div>
    </>
  );
};

export default QuestionCompo2;
