import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { QuestionProps } from "../_forms/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";
import Stepper from "@/components/forms/multiStepForm/Stepper";
import QuestionRendrer from "./_questionRendere";
import { Button } from "@/components/ui/button";
import FormContext from "./_formContext";

const TabTrigger = React.forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      "rounded-2xl h-12 w-12 p-2  disabled:pointer-events-none disabled:bg-opacity-50 data-[state=active]:!bg-linear data-[state=active]:shadow-2xl",
      className,
    )}
    style={{
      background: '#D6D6D6'
    }}
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
  onSubmit: () => Promise<void>;
  setOnSubmit: React.Dispatch<React.SetStateAction<() => Promise<void>>>;
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}

const TabContent = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent> & TabCProps
>(
  (
    { setNextTab, initQuestions, onSubmit, setOnSubmit, mainForm, ...props },
    ref,
  ) => {
    const { tab, currentIndex, setCurrentIndex } = useContext(FormContext);
    const [questions, setQuestions] = initQuestions;
    const [isDirty, setIsDirty] = useState(false);

    const next = useCallback(() => {
      setCurrentIndex((prev) => prev + 1);
    }, []);

    useEffect(() => {
      console.log({
        currentIndex,
        len: questions.length,
        questions,
      });
      if (tab === props.value && currentIndex >= questions.length) {
        setNextTab();
        setCurrentIndex(0);
      }
    }, [currentIndex, questions, setNextTab]);

    const prev = useCallback(() => {
      setCurrentIndex((prev) => prev - 1);
    }, []);

    return (
      <TabsContent
        style={{ height: "72vh" }}
        ref={ref}
        className="mt-3 px-16 border-0 mx-4 rounded-md  max-h-screen overflow-y-auto"
        {...props}
      >
        <div className="relative h-full">
          <div className=" flex justify-center">
            {/* <Stepper
              currentStep={currentIndex}
              numberOfSteps={questions.length}
            /> */}
          </div>
          {questions[currentIndex] && (
            <QuestionRendrer
              props={{
                currentIndex,
                setQuestions,
                setOnSubmit,
                mainForm,
                setIsDirty,
              }}
              Question={questions[currentIndex]}
            />
          )}
          <div className="flex justify-center mb-12 absolute bottom-0 right-28">
            <Button
              className="text-xl"
              variant={'ghost'}
              size={"lg"}
              type="button"
              disabled={currentIndex == 0}
              onClick={prev}
            >
              Précédent
            </Button>
            <Button
              className={`text-xl rounded-full  w-64 ring-1`}
              style={{ background: isDirty ? undefined : "" }}
              size={"lg"}
              type="button"
              variant="default"
              onClick={async () => {
                await onSubmit();
                next();
              }}
            >
              Suivant
            </Button>
          </div>
        </div>
      </TabsContent>
    );
  },
);
TabContent.displayName = "TabContent";

export {TabTrigger, TabContent}