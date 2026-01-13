import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TabValues } from "@/lib/formTabs/types";
import { useScopedI18n } from "@/locales/client";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import FormContext from "../_layout/_formContext";
import { QuestionFC } from "@/app/_forms/types";

const Question = ({
  mainForm,
  Symbol,
  section,
  setInterface,
  index,
  currentIndex,
}: {
  mainForm: UseFormReturn<any>;
  Symbol: QuestionFC["Symbol"];
  setInterface: () => void;
  section: TabValues;
  index: number;
  currentIndex: number;
}) => {
  const t = useScopedI18n();

  const { tab } = useContext(FormContext);

  const isCurrent = currentIndex === index && tab === section;

  const error = Symbol.fields.some((field) => mainForm.getFieldState(field)?.error);

  return (
    <Button
      type="button"
      variant={"outline"}
      data-state={error ? "error" : ""}
      data-current={isCurrent ? "true" : "false"}
      className={`
        w-full text-left md:p-3 p-2 rounded-md transition-all
        bg-gray-50 hover:bg-gray-100 text-foreground
        flex justify-start md:grid md:grid-cols-12 shadow-none border-0 h-fit
        data-[current=true]:bg-section-transport data-[current=true]text-white data-[current=true]shadow-md
        data-[state=error]:border-2 data-[state=error]:border-destructive
        `}
      onClick={setInterface}
    >
      <Label
        data-state={error ? "error" : ""}
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
        data-state={error ? "error" : ""}
        data-current={isCurrent ? "true" : "false"}
      >
        {typeof Symbol?.question === "string"
          ? t(Symbol.question)
          : Symbol?.question
            ? t(Symbol.question[0], Symbol.question[1])
            : ""}
      </Label>
    </Button>
  );
};

export default Question;
