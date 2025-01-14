import { formSchema } from "@/app/form/formSchema";
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
  const {carMake, carModel} = mainForm.getValues(`transport.cars.${index}`)

  if (carModel && carModel != "") return(
    <h3 className="font-semibold text-primary">
      .{carMake}:{" "}
      <span className="font-medium">
        {carModel}
      </span>
    </h3>
  )
  else if(carMake && carMake !='') return(
    <h3 className="font-semibold text-primary">
      {carMake}
    </h3>
  )
  return (
    <></>
  );
}

export default CarTitle;
