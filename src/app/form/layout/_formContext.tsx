import { createContext } from "react";

type TabValues = "transport" | "food" | "vacation" | "energie" | "waste";

const FormContext = createContext<{
  tab: TabValues;
  setTab: React.Dispatch<React.SetStateAction<TabValues>>;
  currentIndexes: { [key in TabValues]: number };
  setCurrentIndexes: React.Dispatch<
    React.SetStateAction<{ [key in TabValues]: number }>
  >;
}>({
  tab: "transport",
  currentIndexes: { transport: 0, food: 0, vacation: 0, energie: 0, waste: 0 },
  setCurrentIndexes: () => {},
  setTab: () => {},
});

export default FormContext;
