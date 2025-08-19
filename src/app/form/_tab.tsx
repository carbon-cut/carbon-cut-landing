import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { QuestionProps } from "../_forms/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";
import QuestionRendrer from "./_questionRendere";
import { Button } from "@/components/ui/button";
import FormContext from "./layout/_formContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import style from './form.module.css'
import LeftArrow from "./arrowLeft";
import Image from "next/image";

const TabTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      "bg-[#D6D6D6] rounded-2xl h-12 w-12 p-2  disabled:pointer-events-none disabled:bg-opacity-50 data-[state=active]:!bg-linear-2-2 data-[state=active]:shadow-2xl",
      className,
    )}
    {...props}
  />
));
TabTrigger.displayName = "TabTrigger";

interface TabCProps {
  setNextTab: () => void;
  initQuestions: [
    React.FC<QuestionProps>[],
    React.Dispatch<React.SetStateAction<React.FC<QuestionProps>[]>>,
  ];
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  submit: boolean;
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}

const TabContent = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent> & TabCProps
>(
  (
    { setNextTab, initQuestions,submit, setSubmit, mainForm, ...props },
    ref,
  ) => {
    const { tab, currentIndexes, setCurrentIndexes } = useContext(FormContext);
    const [questions, setQuestions] = initQuestions;
    const [isDirty, setIsDirty] = useState(false);
    const [onSubmit,setOnSubmit] = useState<()=>void>(()=>()=>{})

    const next = useCallback(() => {
      setCurrentIndexes((prev) => ({...prev , [tab]: prev[tab] + 1}));
    }, [tab]);

    useEffect(() => {
      const currentIndex = currentIndexes[tab];
      if (tab === props.value && currentIndex >= questions.length) {
        setNextTab();
        setCurrentIndexes(p=>({...p,[tab]:0}));
      }
    }, [currentIndexes, questions, setNextTab, tab]);

    const prev = useCallback(() => {
      setCurrentIndexes((p) =>( {...p , [tab]: p[tab] - 1}));
    }, [tab]);

    return (
      <TabsContent
        style={{ height: "72vh" }}
        ref={ref}
        className="mt-3 px-16 border-0 mx-4 rounded-md  max-h-screen overflow-y-auto"
        {...props}
      >
        <div className="h-full grid grid-rows-12">
          <div className=" flex justify-center self-start">
            {/* <Stepper
              currentStep={currentIndex}
              numberOfSteps={questions.length}
            /> */}
          </div>
          <div className="row-span-9 overflow-y-auto mb-3">
          {questions[currentIndexes[tab]] && (
            <QuestionRendrer
              props={{
                currentIndex: currentIndexes[tab],
                setQuestions,
                setOnSubmit,
                setSubmit,
                mainForm,
                setIsDirty,
              }}
              Question={questions[currentIndexes[tab]]}
            />
          )}
          </div>
          <div className="flex justify-end mb-12 mt-auto bottom-0 right-12 gap-12">
            <Button
              className={style.prevButton}
              variant={'ghost'}
              size={"lg"}
              type="button"
              disabled={currentIndexes[tab] == 0}
              onClick={prev}
            >
              <span className="flex items-center gap-3">
                <Image src={'/form/utils/arrow-left.svg'} width={18} height={18} alt="arrow-left"/>
              <span className="bg-linear-1 text-transparent bg-clip-text">
              Précédent
              </span>
              </span>
              
            </Button>
            <Button
              className={`text-lg  w-48 py-4`}
              style={{ background: isDirty ? undefined : "" }}
              size={"lg"}
              type={submit ?  "submit": "button" }
              variant="default"
              onClick={async () => {
                //console.log(onSubmit)
                onSubmit()
                next();
              }}
            >
             {submit ? 'Submit' : 'Continuer'}
             <Image src={'/form/utils/arrow-right.svg'} width={16} height={16} alt="arrow-right"/>
            </Button>
          </div>
        </div>
      </TabsContent>
    );
  },
);
TabContent.displayName = "TabContent";

export {TabTrigger, TabContent}