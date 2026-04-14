import { QuestionProps } from "@/app/_forms/types";
import BasicFormContext from "./basicFormContext";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const QuestionRenderer = ({
  Question,
  props,
}: {
  Question: React.FC<QuestionProps>;
  props: QuestionProps;
}) => {
  const { getValues } = useFormContext();

  const [heatingQuantities, setHeatingQuantities] = useState({
    fioul: getValues("energy.heating.fioul") ?? false,
    gasTank: getValues("energy.heating.gasTank") ?? false,
    woodCharcoal:
      (getValues("energy.heating.wood") || getValues("energy.heating.charcoal")) ?? false,
    electricalHeating: getValues("energy.heating.electricHeating") ?? false,
    electricalCentralHeating: getValues("energy.heating.electricalCentralHeating") ?? false,
    GPL: getValues("energy.heating.GPL") ?? false,
    heatNetwork: getValues("energy.heating.heatNetwork") ?? false,
  });

  return (
    <BasicFormContext.Provider
      value={{
        heatingQuantities: heatingQuantities,
        setHeatingQuantities,
      }}
    >
      <Question {...props} />
    </BasicFormContext.Provider>
  );
};

export default QuestionRenderer;
