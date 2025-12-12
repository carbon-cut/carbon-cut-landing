import { formSchema } from "@/app/_forms/formSchema";
import { Badge } from "@/components/ui/badge";
import { useScopedI18n } from "@/locales/client";
import { AlertTriangle } from "lucide-react";
import React, { useMemo } from "react";
import { UseFormReturn, useFormState } from "react-hook-form";
import { z } from "zod";

function CarTitle({
  mainForm,
  index,
}: {
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
  index: number;
}) {
  const t = useScopedI18n("forms.basic.transport.carStatus");
  const { errors } = useFormState({
    control: mainForm.control,
  });

  const hasErrors = useMemo(() => {
    const transportErrors = (errors as any)?.transport;
    const carErrors = transportErrors?.cars?.[index];
    return !!carErrors && Object.keys(carErrors).length > 0;
  }, [errors, index]);

  const { make: carMake, model: carModel } =
    mainForm.getValues(`transport.cars.${index}`) ?? {};

  const title = useMemo(() => {
    if (carModel && carModel !== "") {
      return (
        <>
          {carMake}:{" "}
          <span className="font-medium">
            {carModel}
          </span>
        </>
      );
    }
    if (carMake && carMake !== "") return carMake;
    return t("label", { index: index + 1 });
  }, [carMake, carModel, index, t]);

  return (
    <div className="flex items-center justify-center gap-3">
      <h3 className="font-semibold text-primary text-center">{title}</h3>
      {hasErrors && (
        <Badge
          variant="destructive"
          className="flex items-center gap-1 text-xs font-medium px-2 py-1"
          aria-live="polite"
        >
          <AlertTriangle className="h-3 w-3" aria-hidden="true" />
          <span>{t("incomplete")}</span>
        </Badge>
      )}
    </div>
  );
}

export default CarTitle;
