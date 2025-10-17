import React, { useEffect, useState } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import Radio from "@/app/_forms/components/radio";
import { FuelTypes, QuestionProps } from "../../../../types";
import Input from "@/app/_forms/components/input";
import CarTitle from "../components/carTitle";
import { formSchema } from "@/app/_forms/formSchema/formSchemav0";
import { UseFormReturn } from "react-hook-form";

const fuelTypes: FuelTypes[] = [
  "Electrique",
  "mild Hybrid",
  "Plug-in Hybrid",
  "natural Gaz",
  "Diesel",
  "Gasoline",
  "other",
];

const QuestionCompo2: React.FC<
  QuestionProps & { index: number; }
> = ({  index, mainForm, setVerifyFields,  }) => {
  const t = useScopedI18n("forms.basic.transport.qCar1-2");

  const [ carType, setCarType ] = useState(mainForm.getValues(`transport.cars.${index}.engine`)); 

  /* useEffect(() => {
    const someField = mainForm.getValues(`transport.cars.${index}.engine`);
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
  }); */ 
  useEffect(() => {
    setVerifyFields([`transport.cars.${index}.engine`, `transport.cars.${index}.otherEngine`]);
  } , [index]);

  return (
    <>
        <div>
          <CarTitle mainForm={mainForm} index={index} />
          <Question>{t("q")}</Question>
          <Content className="flex flex-row justify-start">
            <div className="self-start w-1/2 ">
            <Radio
              className=" w-2/3 flex justify-between  mx-0"
              setState={setCarType}
              name={`transport.cars.${index}.engine`}
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
              name={`transport.cars.${index}.otherEngine`}
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
