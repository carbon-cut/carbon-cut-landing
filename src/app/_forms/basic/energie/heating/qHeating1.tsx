import React, { useContext, useEffect, useState } from "react";
import { QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { MultiCheckInput } from "../../../components/multiCheckInput";
import { useScopedI18n } from "@/locales/client";
import { Fioul, GasTank, WoodCharcoal } from "./quantities";
import BasicFormContext from "@/app/form/_components/basicFormContext";
import { addQestions, deleteQuestions } from "@/lib/utils/addQuestion";

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

function QHeating({ mainForm, setOnSubmit, setQuestions, currentIndex }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heating");

  const {
    heatingQuantities:{
      gasTank: prevGasTank,
      fioul: prevFioul,
      woodCharcoal: prevWoodCharcoal,
    },
    setHeatingQuantities
  } = useContext(BasicFormContext)

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
      
      let addFioul = null;
      let addGasTank = null;
      let addWoodCharcoal = null;

      const acc: Array<[boolean | undefined, boolean | null]> = []

      if (gasTank && !prevGasTank) {
        setQuestions(addQestions(acc, currentIndex, [GasTank]));
        addGasTank = true;
      }else if(!gasTank && prevGasTank){
        setQuestions(deleteQuestions(acc, currentIndex, 1));
        addGasTank = false;
      }
      acc.push([gasTank, addGasTank])
      if (fioul && !prevFioul) {
        setQuestions(addQestions(acc, currentIndex, [Fioul]));
        addFioul = true;
      }else if(!fioul && prevFioul){
        setQuestions(deleteQuestions(acc, currentIndex, 1));
        addFioul = false;
      }
      acc.push([fioul, addFioul])
      if ((wood || charcoal) && !prevWoodCharcoal) {
        setQuestions(addQestions(acc, currentIndex, [WoodCharcoal]));
        addWoodCharcoal = true;
      }else if(!( wood || charcoal) && prevWoodCharcoal){
        setQuestions(deleteQuestions(acc, currentIndex, 1));
        addWoodCharcoal = false;
      }
      setHeatingQuantities(p=>({
        gasTank: addGasTank === null ? p.gasTank : addGasTank, 
        fioul: addFioul === null ? p.fioul : addFioul,
        woodCharcoal: addWoodCharcoal === null ? p.woodCharcoal : addWoodCharcoal
      }))
    });
    return () => {
      console.log("effect return")
      setOnSubmit(() => () => {});}
  }, []);

  useEffect(() => {
    console.log({prevGasTank, prevFioul, prevWoodCharcoal});
  }, [prevGasTank, prevFioul, prevWoodCharcoal]);


  return (
    <div>
      <Question>{t("q")}</Question>
      <MultiCheckInput
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
}

QHeating["Symbol"] = {
  question: "forms.basic.energie.heating.title",
  fields: heatingMethods.map((e) => `energie.heating.${e}`),
};

export default QHeating;
