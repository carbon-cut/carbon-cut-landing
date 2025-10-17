import { formSchema } from "@/app/_forms/formSchema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

function CarTitle({
  mainForm,
  index,
}: {
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
  index: number;
}) {
  //TODO
  const {make: carMake, model: carModel} = {make: "", model: ""} ///mainForm.getValues(`transport.motos.${index}`) ?? {}

  if (carModel && carModel != "") return(
    <h3 className="font-semibold text-primary text-center">
      {carMake}:{" "}
      <span className="font-medium">
        {carModel}
      </span>
    </h3>
  )
  else if(carMake && carMake !='') return(
    <h3 className="font-semibold text-primary text-center">
      {carMake}
    </h3>
  )
  return (
    <></>
  );
}

export default CarTitle;
