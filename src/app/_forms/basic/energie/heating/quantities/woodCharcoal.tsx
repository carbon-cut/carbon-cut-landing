import React from "react";
import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import Input from "@/app/_forms/components/input";
import { useScopedI18n } from "@/locales/client";
import Question from "@/app/_forms/components/question";
import Content from "@/app/_forms/components/content";
import FormSelect from "@/components/forms/formSelect";
import { Separator } from "@/components/ui/separator";
import {  useFormContext } from "react-hook-form";

const woodKeys = ["m3", "kg", "stere"] as const;

const charcoalKeys = ["m3", "kg"] as const;

const frequencyKeys = ["day", "week", "month", "year"] as const;

const WoodCharcoal: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.heating.options");

  const { getValues } = useFormContext();

  const wood = getValues("energie.heating.wood");
  const charcoal = getValues("energie.heating.charcoal");

  return (
    <>
      {wood && (
        <>
          <Question className="w-full">
            <p className="">{t("wood.label")}</p>
          </Question>
          <Content>
            <div className="grid md:grid-cols-2 md:space-x-6">
              <div className="grid grid-cols-12 space-x-3">
                <div className="col-span-7">
                  <Input
                    labelClassName="text-black/70"
                    label={t("wood.quantity")}
                    form={mainForm}
                    name={"energie.heating.quantities.wood.quantity"}
                    placeholder={t("wood.quantity")}
                    type="number"
                  />
                </div>
                <div className="col-span-5">
                  <FormSelect
                    form={mainForm}
                    placeholder={t("wood.qunits.label")}
                    label="&nbsp;"
                    name={"energie.heating.quantities.wood.quantityUnit"}
                    data={woodKeys.map((e) => ({
                      label: t(`wood.qunits.${e}`),
                      value: e,
                    }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 space-x-3">
                <div className="col-span-7">
                <Input
                  labelClassName="text-black/70"
                  form={mainForm}
                  name={"energie.heating.quantities.wood.frequency"}
                  label={t("wood.funits.label")}
                  placeholder={t("wood.funits.label")}
                  type="number"
                />
                </div>
                <div className="col-span-5">
                  <FormSelect
                    form={mainForm}
                    label="&nbsp;"
                    placeholder={t("wood.qunits.label")}
                    name={"energie.heating.quantities.wood.frequencyUnit"}
                    data={frequencyKeys.map((e) => ({
                      label: t(`wood.funits.${e}`),
                      value: e,
                    }))}
                  />
                </div>
              </div>
            </div>
          </Content>
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
              <div className="grid grid-cols-12 space-x-3">
                <div className="col-span-7">
                  <Input
                    labelClassName="text-black/70"
                    label={t("wood.quantity")}
                    form={mainForm}
                    name={"energie.heating.quantities.charcoal.quantity"}
                    placeholder={t("wood.quantity")}
                    type="number"
                  />
                </div>
                <div className="col-span-5">
                  <FormSelect
                    form={mainForm}
                    label="&nbsp;"
                    name={"energie.heating.quantities.charcoal.quantityUnit"}
                    data={charcoalKeys.map((e) => ({
                      label: t(`charcoal.qunits.${e}`),
                      value: e,
                    }))}
                    placeholder={t("charcoal.qunits.label")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 space-x-3">
                <div className="col-span-7">
                  <Input
                    labelClassName="text-black/70"
                    form={mainForm}
                    name={"energie.heating.quantities.charcoal.frequency"}
                    label={t("charcoal.funits.label")}
                    placeholder={t("charcoal.funits.label")}
                    type="number"
                  />
                </div>
                <div className="col-span-5">
                  <FormSelect
                    form={mainForm}
                    label="&nbsp;"
                    placeholder={t("charcoal.qunits.label")}
                    name={"energie.heating.quantities.charcoal.frequencyUnit"}
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
  question: "forms.basic.energie.heating.options.wood.title",
  fields: [
    "energie.heating.quantities.wood",
    "energie.heating.quantities.charcoal",
  ],
};

export default WoodCharcoal;
