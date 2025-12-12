import React, { useContext, useEffect, useMemo, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import Question from "../../../components/question";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import { useScopedI18n } from "@/locales/client";
import { Fioul, GasTank, WoodCharcoal } from "./quantities";
import BasicFormContext from "@/app/form/_components/basicFormContext";
import { addQestions, deleteQuestions } from "@/lib/utils/addQuestion";
import ElectricalHeating from "./electricalHeating";
import CentralHeating from "./centralHeating";
import Gpl from "./quantities/gpl";
import HeatingBill from "./heatingBill";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { useFormState } from "react-hook-form";

const heatingMethods = [
  "heatPump",
  "gasNetwork",
  "heatNetwork",
  "GPL",
  "gasTank",
  "fioul",
  "wood",
  "electricHeating",
  "charcoal",
  "electricalCentralHeating",
] as const;

type heatingQuestions = 'heatNetwork' | 'GPL' | 'fioul' | 'gasTank' | 'woodCharcoal' | 'electricalHeating' | 'electricalCentralHeating';

const QHeating: QuestionFC = ({ mainForm, setOnSubmit, setQuestions, currentIndex }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.heating");
  const { errors } = useFormState({ control: mainForm.control });

  const hasErrors = useMemo(() => {
    const heatingErrors = (errors as any)?.energie?.heating;
    const walk = (err: unknown): boolean => {
      if (!err) return false;
      if (typeof err !== "object") return true;
      return Object.values(err).some((value) => walk(value));
    };
    return walk(heatingErrors);
  }, [errors]);

  const {
    heatingQuantities:{
      gasTank: prevGasTank,
      fioul: prevFioul,
      woodCharcoal: prevWoodCharcoal,
      electricalHeating: prevElectricalHeating,
      electricalCentralHeating: prevElectricalCentralHeating,
      GPL: prevGpl,
      heatNetwork: prevHeatNetwork,
    },
    setHeatingQuantities
  } = useContext(BasicFormContext);

  useEffect(() => {
    setOnSubmit(() =>  () => {
      const {
        heatPump,
        gasNetwork,
        heatNetwork,
        GPL,
        gasTank,
        fioul,
        wood,
        electricHeating,
        charcoal,
        electricalCentralHeating,
      } = mainForm.getValues("energie.heating");

      const heatingMethods: {
        name: heatingQuestions;
        form: boolean | undefined;
        component: QuestionFC[];
        prev: boolean;
        add: boolean | null;
      }[] = [
        {
          name: "fioul",
          form: fioul,
          component: [Fioul],
          prev: prevFioul,
          add: null,
        },
        {
          name: "gasTank",
          form: gasTank,
          component: [GasTank],
          prev: prevGasTank,
          add: null,
        },
        {
          name: "woodCharcoal",
          form: wood || charcoal,
          component: [WoodCharcoal],
          prev: prevWoodCharcoal,
          add: null,
        },
        {
          name: "electricalHeating",
          form: electricHeating,
          component: [ElectricalHeating],
          prev: prevElectricalHeating,
          add: null,
        },
        {
          name: "electricalCentralHeating",
          form: electricalCentralHeating,
          component: [CentralHeating],
          prev: prevElectricalCentralHeating,
          add: null,
        },
        {
          name: "GPL",
          form: GPL,
          component: [Gpl],
          prev: prevGpl,
          add: null,
        },
        {
          name: "heatNetwork",
          form: heatNetwork,
          component: [HeatingBill],
          prev: prevHeatNetwork,
          add: null,
        },
      ];
      const acc: Array<[boolean | undefined, boolean | null]> = [];

      for (const item of heatingMethods) {
        const { form, component, prev } = item;
        const accSnapshot = [...acc];
        if (form && !prev) {
          setQuestions(addQestions(accSnapshot, currentIndex, component));
          item.add = true;
        } else if (!form && prev) {
          setQuestions(
            deleteQuestions(accSnapshot, currentIndex, component.length)
          );
          item.add = false;
        }
        acc.push([form, item.add]);
      }

      setHeatingQuantities((p) =>
        heatingMethods.reduce(
          (acc, item) => {
            return {
              ...acc,
              [item.name]: item.add === null ? p[item.name] : item.add,
            };
          },
          {} as {
            [k in heatingQuestions]: boolean;
          }
        )
      );
    });
    return () => {
      setOnSubmit(() => () => {});}
  }, []);

  return (
    <div>
      {hasErrors && (
        <div className="flex justify-center mb-3">
          <Badge
            variant="destructive"
            className="flex items-center gap-1 text-xs font-medium px-3 py-1"
            aria-live="polite"
          >
            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
            <span>{t("badge.incomplete")}</span>
          </Badge>
        </div>
      )}
      <Question className="mb-0">{t("q")}</Question>
      <MultiCheckInput
        className="md:px-20 px-0"
        type="boolean"
        form={mainForm}
        name="energie.heating"
        options={heatingMethods.map((e) => ({
          label: t(`options.${e}.label`),
          value: e,
          unit: "null",
        }))}
      />
    </div>
  );
};

QHeating["Symbol"] = {
  question: "forms.basic.energie.heating.title",
  fields: heatingMethods.map((e) => `energie.heating.${e}` as const),
};

export default QHeating;
