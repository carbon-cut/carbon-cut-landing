import React from "react";
import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import { FieldInput as Input } from "@/components/forms";
import { useScopedI18n } from "@/locales/client";
import { FieldSelect as FormSelect } from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { FormField, FormItem, FormMessage, useFormField } from "@/components/ui/forms";
import { useFormContext } from "react-hook-form";
import QuestionFrame from "@/app/_forms/components/QuestionFrame";
import QuestionSection from "@/app/_forms/components/QuestionSection";
import QuestionMatrixBlock from "@/app/_forms/components/QuestionMatrixBlock";
import QuestionFieldPair from "@/app/_forms/components/QuestionFieldPair";

const woodKeys = ["m3", "kg", "stere"] as const;
const woodTypes = ["hardwood", "softwood"] as const;
const woodTypeExamples = {
  hardwood: "hardWoodExemples",
  softwood: "softWoodExemples",
} as const;

const frequencyKeys = ["day", "week", "month", "year"] as const;

const WoodCharcoal: QuestionFC = ({ mainForm, setVerifyFields }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.heating.options");

  const { getValues } = useFormContext();

  const wood = getValues("energy.heating.wood");
  const charcoal = getValues("energy.heating.charcoal");

  // Keep `setVerifyFields` in the signature for parity with other questions.
  void setVerifyFields;

  return (
    <QuestionFrame>
      {wood ? (
        <QuestionSection title={t("wood.label")}>
          <div className="space-y-4">
            {woodTypes.map((type) => (
              <FormField
                key={type}
                control={mainForm.control}
                name={`energy.heating.quantities.wood.${type}`}
                render={() => {
                  const { error } = useFormField();
                  const isError = Boolean(error);
                  return (
                    <FormItem>
                      <QuestionMatrixBlock
                        error={isError}
                        title={t(`wood.types.${type}`)}
                        description={t(`wood.types.${woodTypeExamples[type]}`)}
                      >
                        <div className="grid gap-6 md:grid-cols-2">
                          <QuestionFieldPair
                            primary={
                              <Input
                                label={t("wood.quantity")}
                                form={mainForm}
                                name={`energy.heating.quantities.wood.${type}.quantity`}
                                type="number"
                                attachedFields={["energy.heating.quantities.wood"]}
                                isError={isError}
                              />
                            }
                            secondary={
                              <FormSelect
                                form={mainForm}
                                label={t("wood.qunits.label")}
                                labelVisibility="hidden"
                                placeholder={t("wood.qunits.label")}
                                name={`energy.heating.quantities.wood.${type}.quantityUnit`}
                                data={woodKeys.map((e) => ({
                                  label: t(`wood.qunits.${e}`),
                                  value: e,
                                }))}
                                attachedFields={["energy.heating.quantities.wood"]}
                                isError={isError}
                              />
                            }
                          />

                          <QuestionFieldPair
                            primary={
                              <Input
                                form={mainForm}
                                name={`energy.heating.quantities.wood.${type}.frequency`}
                                label={t("wood.funits.label")}
                                type="number"
                                attachedFields={["energy.heating.quantities.wood"]}
                                isError={isError}
                              />
                            }
                            secondary={
                              <FormSelect
                                form={mainForm}
                                label={t("wood.funits.label")}
                                labelVisibility="hidden"
                                placeholder={t("wood.funits.label")}
                                name={`energy.heating.quantities.wood.${type}.frequencyUnit`}
                                data={frequencyKeys.map((e) => ({
                                  label: t(`wood.funits.${e}`),
                                  value: e,
                                }))}
                                attachedFields={["energy.heating.quantities.wood"]}
                                isError={isError}
                              />
                            }
                          />
                        </div>

                        <FormMessage />
                      </QuestionMatrixBlock>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </QuestionSection>
      ) : null}

      {wood && charcoal ? <Separator className="my-6" /> : null}

      {charcoal ? (
        <QuestionSection title={t("charcoal.label")}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="col-span-1">
              <Input
                label={t("wood.quantity")}
                form={mainForm}
                name={"energy.heating.quantities.charcoal.quantity"}
                type="number"
              />
            </div>

            <QuestionFieldPair
              primary={
                <Input
                  form={mainForm}
                  name={"energy.heating.quantities.charcoal.frequency"}
                  label={t("charcoal.funits.label")}
                  type="number"
                />
              }
              secondary={
                <FormSelect
                  form={mainForm}
                  label={t("charcoal.funits.label")}
                  labelVisibility="hidden"
                  placeholder={t("charcoal.funits.label")}
                  name={"energy.heating.quantities.charcoal.frequencyUnit"}
                  data={frequencyKeys.map((e) => ({
                    label: t(`charcoal.funits.${e}`),
                    value: e,
                  }))}
                />
              }
            />
          </div>
        </QuestionSection>
      ) : null}
    </QuestionFrame>
  );
};

WoodCharcoal["Symbol"] = {
  question: "forms.basic.energy.heating.options.wood.title",
  fields: [
    "energy.heating.quantities.wood.hardwood",
    "energy.heating.quantities.wood.softwood",
    "energy.heating.quantities.charcoal",
  ],
};

export default WoodCharcoal;
