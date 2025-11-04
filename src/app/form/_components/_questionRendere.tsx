import { QuestionProps } from "@/app/_forms/types";
import BasicFormContext from "./basicFormContext";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { get } from "http";

const QuestionRendrer = ({
  Question,
  props,
}: {
  Question: React.FC<QuestionProps>;
  props: QuestionProps;
}) => {


  const {
    getValues
  } = useFormContext()


  const [heatingQuantities, setHaetingQuantities] = useState({
    fioul: getValues("energie.heating.fioul") ?? false,
    gasTank: getValues("energie.heating.gasTank") ?? false,
    woodCharcoal: (getValues("energie.heating.wood") || getValues("energie.heating.charcoal") )?? false,
    electricalHeating: getValues("energie.heating.electricHeating") ?? false,
    electricalCentralHeating: getValues("energie.heating.electricalCentralHeating") ?? false,
    GPL: getValues("energie.heating.GPL") ?? false,
    heatNetwork: getValues("energie.heating.heatNetwork") ?? false
  });

  return (
    <BasicFormContext.Provider value={{
      heatingQuantities: heatingQuantities,
      setHeatingQuantities: setHaetingQuantities}}>
      <Question {...props} />
      <div className="h-6"></div>
    </BasicFormContext.Provider>
  );
};

export default QuestionRendrer;
