import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TabValues } from "@/lib/formTabs/types";
import { useScopedI18n } from "@/locales/client";
import { useCallback, useEffect, useState } from "react";
import { set, UseFormReturn } from "react-hook-form";

const Question = ({
  mainForm,
  Symbol,
  section,
  setInterface,
  index,
  setError,
  error,
  transportError,
  setTransportError
}: {
  mainForm: UseFormReturn<any>;
  Symbol?: any;
  setInterface: () => void;
  section: TabValues;
  index: number;
  error: { [key in TabValues]: boolean };
  setError: React.Dispatch<React.SetStateAction<{ [key in TabValues]: boolean }>>;
  transportError: boolean
  setTransportError: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const t = useScopedI18n();

    const [errorc, setErrorc] = useState(!error[section]);

    useEffect(() => {
      for (const field of Symbol?.fields) {
        if (mainForm.getFieldState(field)?.error) {
          //console.log(section,' : ', error[section])
          if(!error[section]) setError(prev => ({ ...prev, [section]: true }));
          setErrorc(false);
        }
      }
    }, [mainForm]);

  const getState = useCallback(() => {
    if (Symbol?.fields){
      for (const field of Symbol?.fields) {
        if (mainForm.getFieldState(field)?.error) {
          //console.log(section,' : ', error[section])
          if(!error[section]) setError(prev => ({ ...prev, [section]: true }));
          return false;
        }
      }
    }
    return true;
  }, [mainForm]);

  return (
    <Button
      type="button"
      variant={"outline"}
      className={`
        ${errorc ? "bg-white" : "bg-red-400"}
        w-full rounded-x text-start justify-start
        `}
      onClick={setInterface}
    >
      <Label
        className={`font-bold text-section-${section} hover:cursor-pointer`}
      >
        Q{index + 1}
      </Label>
      <Label className={`text-extrabold max-w-1 hover:cursor-pointer`}>
        {typeof Symbol?.question === "string" ? t(Symbol.question): Symbol?.question ? t(Symbol.question[0], Symbol.question[1]) : ''}
      </Label>
    </Button>
  );
};

export default Question;