import { TabValues } from "@/lib/formTabs/types";
import React, { createContext } from "react";

type HeatingQuantities = {
    fioul: boolean;
    gasTank: boolean;
    woodCharcoal: boolean;
    electricalHeating: boolean;
    electricalCentralHeating: boolean;
    GPL: boolean;
  }

const BasicFormContext = createContext<{
  heatingQuantities: HeatingQuantities,
  setHeatingQuantities: React.Dispatch<React.SetStateAction<HeatingQuantities>>
}>({
  heatingQuantities: { GPL: false, fioul: false, gasTank: false, woodCharcoal: false , electricalHeating: false, electricalCentralHeating: false},
  setHeatingQuantities: () => {},
});

export default BasicFormContext;
