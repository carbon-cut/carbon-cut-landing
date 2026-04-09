import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import { FormControl, FormField, FormItem } from "@/components/ui/forms";
import { Card } from "@/components/ui/card";
import React, { useEffect, useRef } from "react";
import Input from "@/app/_forms/components/input";
import autoAnimate from "@formkit/auto-animate";
import { Separator } from "@/components/ui/separator";
import { useScopedI18n } from "@/locales/client";
import FormDescription from "@/app/_forms/components/formDescription";
import FormTitle from "@/app/_forms/components/formTitle";
import Question from "@/app/_forms/components/question";
import FormSelect from "@/components/forms/formSelect/formSelect";

const gasTypes: {
  id: "butane" | "propane" | "butaneSmall" | "butaneBig" | "propaneBig" | "propaneSmall";
  name: string;
  format: "Grand Format" | "Petit Format";
  color: string;
  icon: React.ReactNode;
  className?: string;
  url: string;
  url2: string;
}[] = [
  {
    id: "butane",
    name: "Butane bleu foncé/rouge",
    format: "Grand Format",
    color: "from-green-400 to-teal-500",
    icon: null,
    url: "./icons/gpl/butane13kg.png",
    url2: "",
  },
  {
    id: "propane",
    name: "Propane: vert/doré",
    format: "Grand Format",
    color: "from-green-400 to-teal-500",
    icon: null,
    url: "./icons/gpl/Propane35kg.png",
    className: "h-8 w-8",
    url2: "",
  },
  {
    id: "butaneSmall",
    name: "Butane 5.5kg rouge",
    format: "Petit Format",
    color: "from-blue-300 to-blue-400",
    icon: null,
    url: "./icons/gpl/butane5 5.png",
    url2: "",
  },
  {
    id: "butaneBig",
    name: "Butane 10kg rouge/bleu",
    format: "Petit Format",
    color: "from-blue-300 to-blue-400",
    icon: null,
    url: "./icons/gpl/butane10kg.png",
    url2: "",
  },
  {
    id: "propaneBig",
    name: "Propane: 13kg vert/doré",
    format: "Petit Format",
    color: "from-teal-300 to-teal-400",
    icon: null,
    url: "./icons/gpl/Frame 1.svg",
    url2: "./icons/gpl/Frame 2.svg",
  },
  {
    id: "propaneSmall",
    name: "Propane: 5kg jaune",
    format: "Petit Format",
    color: "from-teal-300 to-teal-400",
    icon: null,
    url: "./icons/gpl/propane 5kg.png",
    url2: "",
  },
] as const;

const groupedByFormat = {
  big: gasTypes.filter((g) => g.format === "Grand Format"),
  small: gasTypes.filter((g) => g.format === "Petit Format"),
};
const Gpl: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.heating.options.GPL");

  return (
    <div className="space-y-8">
      <div>
        <FormTitle>{t("title")}</FormTitle>
        <FormDescription>{t("description")}</FormDescription>

        {Object.entries(groupedByFormat).map(([format, items]) => (
          <div key={format} className="mb-8">
            <Question className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              {t(format)}
            </Question>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((gasType) => (
                <FormField
                  key={gasType.id}
                  control={mainForm.control}
                  //@ts-expect-error
                  name={`energie.heating.quantities.GPL.types.${format}.${gasType.id}`}
                  render={({ field }) => {
                    const parent = useRef(null);

                    useEffect(() => {
                      if (parent.current) autoAnimate(parent.current, { duration: 200 });
                    }, [parent]);

                    return (
                      <FormItem>
                        <Card
                          ref={parent}
                          className={`p-0  transition-all duration-200 border-2 ${
                            field.value === true
                              ? "border-section-transport bg-primary/5 shadow-md"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            onClick={() => {
                              field.onChange(!field.value);
                            }}
                            className="p-4 flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gasType.color} flex items-center justify-center text-xl`}
                              >
                                {gasType.icon ? (
                                  gasType.icon
                                ) : gasType.url2 ? (
                                  <div className="grid grid-cols-2">
                                    <img
                                      src={gasType.url}
                                      alt={gasType.name}
                                      className={gasType.className ? gasType.className : "w-6 h-6"}
                                    />
                                    <img
                                      src={gasType.url2}
                                      alt={gasType.name}
                                      className="w-6 h-6"
                                    />
                                  </div>
                                ) : (
                                  <img
                                    src={gasType.url}
                                    alt={gasType.name}
                                    className={gasType.className ? gasType.className : "w-6 h-6"}
                                  />
                                )}
                              </div>

                              <div>
                                <p className="font-medium text-sm">{t(`types.${gasType.id}`)}</p>
                              </div>
                            </div>
                            <FormControl>
                              <div
                                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                                  field.value === true ? "bg-section-energie" : "bg-gray-300"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    field.value === true ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              </div>
                            </FormControl>
                          </div>

                          {field.value === true && (
                            <>
                              <Separator className="mb-4 " />
                              <div className="grid grid-cols-2 gap-4 px-4 mb-2">
                                <Input
                                  form={mainForm}
                                  name={`energie.heating.quantities.GPL.quantities.${gasType.id}.quantity`}
                                  type="number"
                                  fallback
                                  placeholder={t("unit")}
                                  labelClassName="text-black/70"
                                  label={t("quantity")}
                                  size="sm"
                                />

                                <FormSelect
                                  fallback
                                  labelClassName="text-black/70"
                                  label={t("frequency.placeholder")}
                                  form={mainForm}
                                  name={`energie.heating.quantities.GPL.quantities.${gasType.id}.frequency`}
                                  size="sm"
                                  data={[
                                    {
                                      value: "month",
                                      label: t("frequency.month"),
                                    },
                                    {
                                      value: "year",
                                      label: t("frequency.year"),
                                    },
                                  ]}
                                />
                              </div>
                            </>
                          )}
                        </Card>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Gpl["Symbol"] = {
  question: "forms.basic.energie.heating.options.GPL.title",
  fields: ["energie.heating.quantities.GPL", "energie.heating.quantities.GPL.quantities"],
};

export default Gpl;
