"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabContent, TabTrigger } from "./_components/_tab";
import initEnergieQuestions from "../_forms/basic/energie";
import initTransportQuestions from "../_forms/basic/transport";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "@/components/ui/forms";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../_forms/formSchema";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import FormContext from "./_layout/_formContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Car, Zap, UtensilsCrossed, Trash2, Plane } from "lucide-react";
import ProgressBar from "./_components/_progressBar";
import {  getIndex, getName } from "@/lib/formTabs/geters";
import QuestionList from "./_components/questionList";
import style from "./form.module.css";
import Container  from "./_components/container";
import { useRouter } from "next/navigation";

function Page() {

  const {tab, setTab, currentIndexes, readyToSubmit} = React.useContext(FormContext);

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [questionList, setQuestionList] = useState<boolean>(false);

  const transportQuestions = useState(initTransportQuestions);
  const energieQuestions = useState(initEnergieQuestions);

  const mainForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    formResponse,
    e
  ) => {
    e?.preventDefault();
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/basic`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formResponse),
      }
    ).then((r) => r.json());
    setLoading(false);
    router.push(`/form/result?id=${res.id}`);
  };

  const handleError = (...args: unknown[]) => {
    console.log(...args);
    setQuestionList(true);
  };

  const dataLengths = useMemo(()=>{
    return {
      transport: transportQuestions[0].length,
      energie: energieQuestions[0].length,
      food: 0,
      waste: 0,
      vacation: 0,
      total: transportQuestions[0].length + energieQuestions[0].length
    }
  }, [transportQuestions, energieQuestions])


  const setNextTab = useCallback(() => {
    setTab((prev) => {
      switch (prev) {
        case "transport":
          return "energie";
        case "energie":
          return "energie";
        case "food":
          return "waste";
        case "waste":
          return "vacation";
        case "vacation":
          return "transport";
        default:
          return "transport";
      }
    });
  }, [setTab]);
  return (
    <div className={style.body}>
      {/* bg-[#e8e8e8] */}
      <Form {...mainForm}>
        <form
          onSubmit={(e) => {
            if (!readyToSubmit) {
              e.preventDefault();
              e.stopPropagation();
              console.warn("Prevented unintended submit on mount");
              return;
            }
            return mainForm.handleSubmit(handleSubmit, handleError)(e);
          }}
          className="min-h-screen h-full w-full"
        >
          <Tabs
            className="relative pt-48 px-0 lg:w-[850px] mx-auto"
            value={tab}
            //@ts-expect-error because Tabs cannot access to possible values
            onValueChange={(v) => setTab(v)}
          >
            <ProgressBar
              tab={tab}
              dataLengths={dataLengths}
              currentQuestion={currentIndexes[tab]}
              currentSectionDataLength={dataLengths[tab]}
              currentSectionName={getName(tab)}
            >
              <QuestionList
                mainForm={mainForm}
                list={{
                  transport: transportQuestions[0],
                  energie: energieQuestions[0],
                }}
                dialog={questionList}
                setDialog={setQuestionList}
              />
            </ProgressBar>

            <div className="flex justify-center mb-8 relative">
              <TabsList className="flex space-x-2 bg-white rounded-full p-2 shadow-lg h-fit">
                <TabTrigger
                  value="transport"
                  data-state={
                    getIndex(tab) > 0
                      ? "completed"
                      : tab === "transport"
                      ? "active"
                      : "inactive"
                  }
                >
                  <Car className={`w-4 h-4`} />
                </TabTrigger>
                <TabTrigger
                  value="energie"
                  data-state={
                    getIndex(tab) > 1
                      ? "completed"
                      : tab === "energie"
                      ? "active"
                      : "inactive"
                  }
                >
                  <Zap className={`w-4 h-4 `} />
                </TabTrigger>
                <TabTrigger disabled value="food">
                  <UtensilsCrossed className="w-4 h-4" />
                </TabTrigger>
                <TabTrigger disabled value="waste">
                  <Trash2 className="w-4 h-4" />
                </TabTrigger>
                <TabTrigger disabled value="vacation">
                  <Plane className="w-4 h-4" />
                </TabTrigger>
              </TabsList>
            </div>
            <Container
              mainForm={mainForm}
              initQuestions={{
                transport: transportQuestions,
                energie: energieQuestions,
                food: [[], () => {}],
                waste: [[], () => {}],
                vacation: [[], () => {}],
              }}
              setNextTab={setNextTab}
              value="transport"
              loading={loading}
            />
          </Tabs>
        </form>
      </Form>
    </div>
  );
}

export default Page;
