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
import { ArrowRight, ArrowLeft, Car } from "lucide-react";
import style from './form.module.css'
import LeftArrow from "./arrowLeft";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TabTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200  
      disabled:pointer-events-none disabled:bg-opacity-50 
      data-[state=active]:bg-[#00A261] data-[state=active]:text-white data-[state=active]:shadow-md
      data-[state=completed]:bg-[#D1FAE5] data-[state=completed]:text-[#00A261] data-[state=completed]:hover:bg-[#ECFDF5]
      bg-gray-100 text-gray-500 hover:bg-gray-200
      `,
      className,
    )}
    {...props}
  >
    {props.children}
    <span className="font-medium text-sm">{props.value}</span>
  </TabsTrigger>
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
        //style={{ height: "72vh" }}
        ref={ref}
        className="px-32 border-0 mx-4 overflow-y-hidden"
        {...props}
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6 mt-7">
              <div className="flex justify-center mb-4">
                {(() => {
                  const Icon = Car
                  return (
                    <div className={`p-4 rounded-full bg-[#00A261]`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  )
                })()}
              </div>
              <CardTitle className="text-2xl font-bold">{tab}</CardTitle>
              <CardDescription className="text-base">
                Question { 1} of {3}
              </CardDescription>
            </CardHeader>
          <CardContent className="md:p-12">
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
          </CardContent>
        </Card>
        <div className="flex justify-end gap-12 mb-8 mt-8">
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
        
      </TabsContent>
    );
  },
);
TabContent.displayName = "TabContent";

export {TabTrigger, TabContent}