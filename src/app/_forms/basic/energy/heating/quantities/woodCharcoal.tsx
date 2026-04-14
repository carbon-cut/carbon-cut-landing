import React, { useEffect } from "react";
import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import { FieldInput as Input } from "@/components/forms";
import { useScopedI18n } from "@/locales/client";
import Question from "@/app/_forms/components/QuestionPrompt";
import Content from "@/app/_forms/components/QuestionContent";
import { FieldSelect as FormSelect } from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { FormField, FormItem, FormMessage, useFormField } from "@/components/ui/forms";
import { set, useFormContext } from "react-hook-form";

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

  return (
    <>
      {wood && (
        <>
          <Question className="w-full">
            <p className="">{t("wood.label")}</p>
          </Question>
          {woodTypes.map((type, index) => (
            <React.Fragment key={type}>
              <FormField
                control={mainForm.control}
                name={`energy.heating.quantities.wood.${type}`}
                render={() => {
                  const { error } = useFormField();
                  return (
                    <FormItem>
                      <div
                        data-state={error ? "error" : "default"}
                        className="pt-4 mb-4 rounded-xl border border-transparent data-[state=error]:border-destructive"
                      >
                        <Content>
                          <p className="text-sm font-medium text-black/70">
                            {t(`wood.types.${type}`)}
                          </p>
                          <p className="text-xs text-black/60">
                            {t(`wood.types.${woodTypeExamples[type]}`)}
                          </p>
                          <div className="mt-4 grid md:grid-cols-2 md:space-x-6">
                            <div className="grid grid-cols-12 space-x-3">
                              <div className="col-span-7">
                                <Input
                                  labelClassName="text-black/70"
                                  label={t("wood.quantity")}
                                  form={mainForm}
                                  name={`energy.heating.quantities.wood.${type}.quantity`}
                                  placeholder={t("wood.quantity")}
                                  type="number"
                                  attachedFields={["energy.heating.quantities.wood"]}
                                  isError={Boolean(error)}
                                />
                              </div>
                              <div className="col-span-5">
                                <FormSelect
                                  form={mainForm}
                                  placeholder={t("wood.qunits.label")}
                                  label="&nbsp;"
                                  labelClassName="text-black/70"
                                  name={`energy.heating.quantities.wood.${type}.quantityUnit`}
                                  data={woodKeys.map((e) => ({
                                    label: t(`wood.qunits.${e}`),
                                    value: e,
                                  }))}
                                  attachedFields={["energy.heating.quantities.wood"]}
                                  isError={Boolean(error)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-12 space-x-3">
                              <div className="col-span-7">
                                <Input
                                  labelClassName="text-black/70"
                                  form={mainForm}
                                  name={`energy.heating.quantities.wood.${type}.frequency`}
                                  label={t("wood.funits.label")}
                                  placeholder={t("wood.funits.label")}
                                  type="number"
                                  attachedFields={["energy.heating.quantities.wood"]}
                                  isError={Boolean(error)}
                                />
                              </div>
                              <div className="col-span-5">
                                <FormSelect
                                  form={mainForm}
                                  label="&nbsp;"
                                  labelClassName="text-black/70"
                                  placeholder={t("wood.funits.label")}
                                  name={`energy.heating.quantities.wood.${type}.frequencyUnit`}
                                  data={frequencyKeys.map((e) => ({
                                    label: t(`wood.funits.${e}`),
                                    value: e,
                                  }))}
                                  attachedFields={["energy.heating.quantities.wood"]}
                                  isError={Boolean(error)}
                                />
                              </div>
                            </div>
                          </div>
                          <FormMessage />
                        </Content>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </React.Fragment>
          ))}
        </>
      )}
      {wood && charcoal && <Separator className="mb-3 mt-10" />}
      {charcoal && (
        <>
          <Question>
            <p>{t("charcoal.label")}</p>
          </Question>
          <Content>
            <div className="grid md:grid-cols-2 md:space-x-6">
              <div className="col-span-1">
                <Input
                  labelClassName="text-black/70"
                  label={t("wood.quantity")}
                  form={mainForm}
                  name={"energy.heating.quantities.charcoal.quantity"}
                  placeholder={t("wood.quantity")}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-12 space-x-3">
                <div className="col-span-7">
                  <Input
                    labelClassName="text-black/70"
                    form={mainForm}
                    name={"energy.heating.quantities.charcoal.frequency"}
                    label={t("charcoal.funits.label")}
                    placeholder={t("charcoal.funits.label")}
                    type="number"
                  />
                </div>
                <div className="col-span-5">
                  <FormSelect
                    form={mainForm}
                    label="&nbsp;"
                    labelClassName="text-black/70"
                    placeholder={t("charcoal.funits.label")}
                    name={"energy.heating.quantities.charcoal.frequencyUnit"}
                    data={frequencyKeys.map((e) => ({
                      label: t(`charcoal.funits.${e}`),
                      value: e,
                    }))}
                  />
                </div>
              </div>
            </div>
          </Content>
        </>
      )}
    </>
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
