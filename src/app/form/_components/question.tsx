import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TabValues } from "@/lib/formTabs/types";
import { useScopedI18n } from "@/locales/client";
import { useContext, useEffect, useState } from "react";
import { set, UseFormReturn } from "react-hook-form";
import FormContext from "../_layout/_formContext";

const Question = ({
  mainForm,
  Symbol,
  section,
  setInterface,
  index,
  setError,
  error,
  currentIndex
}: {
  mainForm: UseFormReturn<any>;
  Symbol?: any;
  setInterface: () => void;
  section: TabValues;
  index: number;
  error: { [key in TabValues]: boolean };
  currentIndex: number;
  setError: React.Dispatch<React.SetStateAction<{ [key in TabValues]: boolean }>>;
}) => {
  const t = useScopedI18n();

  const { tab } = useContext(FormContext);

    const [errorc, setErrorc] = useState(false);

    useEffect(() => {
      for (const field of Symbol?.fields ?? []) {
        if (!mainForm.getFieldState(field)) throw new Error(`Field: "${field}" not found`);
        if (mainForm.getFieldState(field)?.error) {
        
          if(!error[section]) setError(prev => ({ ...prev, [section]: true }));
          setErrorc(true);
          return;
        }
      }
      setErrorc(false);
    }, [mainForm]);

    const isCurrent = currentIndex === index && tab === section;
  return (
    <Button
      type="button"
      variant={"outline"}
      data-state={errorc ? "error" : ""}
      data-current={isCurrent ? "true" : "false"}
      className={`
        w-full text-left p-3 rounded-md transition-all
        bg-gray-50 hover:bg-gray-100 text-foreground
        grid grid-cols-12 shadow-none border-0 h-fit
        data-[current=true]:bg-section-transport data-[current=true]text-white data-[current=true]shadow-md
        data-[state=error]:border-2 data-[state=error]:border-destructive
        `}
      onClick={setInterface}
    >
      <Label
        data-state={errorc ? "error" : ""}
        data-current={isCurrent ? "true" : "false"}
        className={`my-auto font-bold text-section-${section}
         data-[current=true]:text-white hover:cursor-pointer
          data-[state=error]:!text-destructive
         `}
      >
        Q{index + 1}
      </Label>
      <Label
      className={`text-extrabold hover:cursor-pointer max-w-full text-wrap col-span-11
        data-[current=true]:text-white data-[state=error]:!text-destructive`}
      data-state={errorc ? "error" : ""}
      data-current={isCurrent ? "true" : "false"}
      >
        {typeof Symbol?.question === "string" ? t(Symbol.question): Symbol?.question ? t(Symbol.question[0], Symbol.question[1]) : ''}
      </Label>
    </Button>
  );
};

export default Question;