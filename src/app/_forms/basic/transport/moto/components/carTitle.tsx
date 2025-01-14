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
  return (
    <h3 className="font-semibold text-primary">
      {mainForm.getValues(`transport.cars.${index}.carMake`)}:{" "}
      <span className="font-medium">
        {mainForm.getValues(`transport.cars.${index}.carModel`)}
      </span>
    </h3>
  );
}

export default CarTitle;
