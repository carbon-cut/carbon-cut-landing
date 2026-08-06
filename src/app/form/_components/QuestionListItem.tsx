import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TabValues } from "@/lib/formTabs/types";
import { useScopedI18n } from "@/locales/client";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import FormContext from "../_layout/_formContext";
import { QuestionFC } from "@/app/_forms/types";
import Typography from "@/components/ui/typography";

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
        w-full text-left md:p-3 p-2 rounded-md
        bg-muted 
        flex justify-start md:grid md:grid-cols-12 shadow-none border-0 h-fit
        data-[current=true]:bg-section-transport data-[current=true]:text-primary-foreground data-[current=true]shadow-md
        data-[state=error]:border-2 data-[state=error]:border-destructive
        `}
      onClick={setInterface}
    >
      <Typography
        data-state={error ? "error" : ""}
        data-current={isCurrent ? "true" : "false"}
        variant="label"
        size="sm"
        className={`my-auto text-section-${section}
         data-[current=true]:text-primary-foreground hover:cursor-pointer
          data-[state=error]:!text-destructive
         `}
      >
        Q{index + 1}
      </Typography>
      <Typography
        variant="label"
        size="sm"
        className={`col-span-11 max-w-full text-wrap hover:cursor-pointer
        data-[current=true]:text-primary-foreground data-[state=error]:!text-destructive`}
        data-state={error ? "error" : ""}
        data-current={isCurrent ? "true" : "false"}
      >
        {typeof Symbol?.question === "string"
          ? t(Symbol.question)
          : Symbol?.question
            ? t(Symbol.question[0], Symbol.question[1])
            : ""}
      </Typography>
    </Button>
  );
};

export default Question;
