"use client";
import React, { useState } from "react";
import FormContext from "./_layout/_formContext";
import { TName } from "@/components/ui/forms";
import { formSchema } from "../_forms/formSchema";
import { z } from "zod";

type TabValue = "transport" | "energie" | "food" | "waste" | "vacation";

export default function FormLayout({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<TabValue>("waste");
  const [currentIndexes, setCurrentIndexes] = useState<{
    [key in TabValue]: number;
  }>({
    transport: 0,
    energie: 0,
    food: 0,
    waste: 0,
    vacation: 0,
  });
  const [readyToSubmit, setReadyToSubmit] = React.useState(true);
  const [verifyFields, setVerifyFields] = React.useState<TName<z.infer<typeof formSchema>>[]>([]);

  return (
    <FormContext.Provider
      value={{
        verifyFields: verifyFields,
        setVerifyFields: setVerifyFields,
        setTab: setTab,
        tab: tab,
        currentIndexes: currentIndexes,
        setCurrentIndexes: setCurrentIndexes,
        readyToSubmit: readyToSubmit,
        setReadyToSubmit: setReadyToSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
