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

  return (
    <Button
      type="button"
      variant={"outline"}
      data-state={errorc ? "error" : ""}
      data-current={(currentIndex === index && tab === section) ? "true" : "false"}
      className={`
        w-full rounded-x text-start justify-start bg-white
        ring-ring
        data-[state=error]:bg-destructive/70
        data-[current=true]:ring-ring
        data-[current=true]:ring-1
        h-fit p-3
        grid grid-cols-12
        `}
      onClick={setInterface}
    >
      <Label
        data-state={errorc ? "error" : ""}
        className={`font-bold text-section-${section} hover:cursor-pointer data-[state=error]:text-muted-foreground `}
      >
        Q{index + 1}
      </Label>
      <Label className={`text-extrabold hover:cursor-pointer max-w-full text-wrap col-span-11`}>
        {typeof Symbol?.question === "string" ? t(Symbol.question): Symbol?.question ? t(Symbol.question[0], Symbol.question[1]) : ''}
      </Label>
    </Button>
  );
};

export default Question;