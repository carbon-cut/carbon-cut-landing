import { formSchema } from "@/app/_forms/formSchema";
import { TName } from "@/components/ui/forms";
import { TabValues } from "@/lib/formTabs/types";
import React, { createContext } from "react";
import { z } from "zod";

const FormContext = createContext<{
  tab: TabValues;
  setTab: React.Dispatch<React.SetStateAction<TabValues>>;
  currentIndexes: { [key in TabValues]: number };
  setCurrentIndexes: React.Dispatch<React.SetStateAction<{ [key in TabValues]: number }>>;
  readyToSubmit: boolean;
  setReadyToSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  verifyFields: TName<z.infer<typeof formSchema>>[];
  setVerifyFields: React.Dispatch<React.SetStateAction<TName<z.infer<typeof formSchema>>[]>>;
}>({
  tab: "transport",
  currentIndexes: { transport: 0, food: 0, vacation: 0, energie: 0, waste: 0 },
  setCurrentIndexes: () => {},
  setTab: () => {},
  readyToSubmit: true,
  setReadyToSubmit: () => {},
  verifyFields: [],
  setVerifyFields: () => {},
});

export default FormContext;
