import { TabValues } from "@/lib/formTabs/types";
import React, { createContext } from "react";

type HeatingQuantities = {
    fioul: boolean;
    gasTank: boolean;
    woodCharcoal: boolean;
  }

const BasicFormContext = createContext<{
  heatingQuantities: HeatingQuantities,
  setHeatingQuantities: React.Dispatch<React.SetStateAction<HeatingQuantities>>
}>({
  heatingQuantities: { fioul: false, gasTank: false, woodCharcoal: false },
  setHeatingQuantities: () => {},
});

export default BasicFormContext;
