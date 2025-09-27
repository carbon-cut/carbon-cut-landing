"use client"
import React, { useState } from 'react'
import FormContext from './_layout/_formContext';

type TabValue = "transport" | "energie" | "food" | "waste" | "vacation";

export default function FormLayout({children}:{children:React.ReactNode}) {
    const [tab, setTab] = useState<TabValue>("transport");
    const [currentIndexes, setCurrentIndexes] = useState<{
      [key in TabValue]: number;
    }>({
      transport: 0,
      energie: 0,
      food: 0,
      waste: 0,
      vacation: 0,
    });

    return (
      <FormContext.Provider
        value={{
          setTab: setTab,
          tab: tab,
          currentIndexes: currentIndexes,
          setCurrentIndexes: setCurrentIndexes,
        }}
      >
        {children}
      </FormContext.Provider>
    );
}