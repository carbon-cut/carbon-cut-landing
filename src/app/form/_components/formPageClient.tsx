"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabTrigger } from "./_tab";
import initEnergieQuestions from "../../_forms/basic/energie";
import initTransportQuestions from "../../_forms/basic/transport";
import initFoodQuestions from "../../_forms/basic/food";
import initWasteQuestions from "../../_forms/basic/waste";
import React, { useCallback, useMemo, useState } from "react";
import { Form } from "@/components/ui/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../_forms/formSchema";
import FormContext from "../_layout/_formContext";
import { Car, Zap, UtensilsCrossed, Trash2, Plane } from "lucide-react";
import ProgressBar from "./_progressBar";
import { getIndex, getName } from "@/lib/formTabs/geters";
import QuestionList from "./questionList";
import style from "../form.module.css";
import Container from "./container";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import PreAssessment from "./preAssessment";

export default function FormPageClient() {
  const { tab, setTab, currentIndexes, readyToSubmit } = React.useContext(FormContext);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const router = useRouter();

  const scrollToRef = React.useRef<HTMLDivElement>(null);

  const [questionList, setQuestionList] = useState<boolean>(false);
  const [showPreAssessment, setShowPreAssessment] = useState<boolean>(true);

  const transportQuestions = useState(initTransportQuestions);
  const energieQuestions = useState(initEnergieQuestions);
  const foodQuestions = useState(initFoodQuestions);
  const wasteQuestions = useState(initWasteQuestions);

  const mainForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: uuidv4(),
    },
  });

  const queryClient = useQueryClient();

  const submitMutation = useMutation<
    { id: string; [key: string]: unknown },
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: [`result-${mainForm.getValues("uid")}`],
    mutationFn: async (formResponse) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/basic`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formResponse),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.id) {
        throw new Error(data?.error?.message ?? "Failed to submit form");
      }
      console.log("result:", data);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["basic-form", data.id], data.result);
      router.push(`/form/result?id=${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (formResponse, e) => {
    e?.preventDefault();
    try {
      await submitMutation.mutateAsync(formResponse);
    } catch {
      // Error is handled inside the mutation's onError
    }
  };

  const handleError = (...args: unknown[]) => {
    console.log(mainForm.getValues());
    console.log(...args);
    setQuestionList(true);
  };

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") return;
    const target = event.target as HTMLElement;
    if (target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const dataLengths = useMemo(() => {
    return {
      transport: transportQuestions[0].length,
      energie: energieQuestions[0].length,
      food: foodQuestions[0].length,
      waste: wasteQuestions[0].length,
      vacation: 0,
      total:
        transportQuestions[0].length +
        energieQuestions[0].length +
        foodQuestions[0].length +
        wasteQuestions[0].length,
    };
  }, [foodQuestions, transportQuestions, energieQuestions, wasteQuestions]);

  const setNextTab = useCallback(() => {
    setTab((prev) => {
      switch (prev) {
        case "transport":
          return "energie";
        case "energie":
          return "food";
        case "food":
          return "waste";
        case "waste":
          return "waste";
        case "vacation":
          return "vacation";
        default:
          return "transport";
      }
    });
  }, [setTab]);
  return (
    <div className={style.body}>
      <div className={style.backgroundLayers} aria-hidden="true">
        <div className={style.sky}>
          <Image
            src={`${basePath}/form/background/sky.png`}
            alt=""
            width={1536}
            height={1024}
            priority
            sizes="100vw"
            className="h-auto w-full object-cover object-top"
          />
        </div>
        <div className={style.skyPhone}>
          <Image
            src={`${basePath}/form/background/skyPhone.png`}
            alt=""
            width={1536}
            height={1024}
            priority
            sizes="100vw"
            className="h-auto w-full object-cover object-top"
          />
        </div>
        <div className={style.sun}>
          <Image
            src={`${basePath}/form/background/sun.png`}
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className={style.land}>
          <Image
            src={`${basePath}/form/background/land1.png`}
            alt=""
            width={1536}
            height={1024}
            sizes="100vw"
            className="h-auto w-full object-cover object-bottom"
          />
        </div>
        <div className={style.landPhone}>
          <Image
            src={`${basePath}/form/background/landPhone.png`}
            alt=""
            width={1536}
            height={1024}
            sizes="100vw"
            className="h-auto w-full object-cover object-bottom"
          />
        </div>
      </div>
      <div className={style.content}>
        {showPreAssessment ? (
          <PreAssessment onContinue={() => setShowPreAssessment(false)} />
        ) : (
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
              onKeyDown={handleKeyDown}
              className="md:min-h-screen min-h-[93vh] h-full w-full"
            >
              <Tabs
                className="relative md:pt-32 pt-20 px-0 lg:w-[850px] mx-auto"
                value={tab}
                //@ts-expect-error because Tabs cannot access to possible values
                onValueChange={(v) => setTab(v)}
              >
                <div>
                  <ProgressBar
                    ref={scrollToRef}
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
                        food: foodQuestions[0],
                        waste: wasteQuestions[0],
                      }}
                      dialog={questionList}
                      setDialog={setQuestionList}
                    />
                  </ProgressBar>
                </div>
                <div className="flex justify-center mb-4 relative">
                  <TabsList className="flex max-w-full flex-wrap space-x-2 bg-white rounded-full p-2 shadow-lg h-fit">
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
                      <Car className="w-4 h-4" />
                    </TabTrigger>
                    <TabTrigger
                      value="energie"
                      data-state={
                        getIndex(tab) > 1 ? "completed" : tab === "energie" ? "active" : "inactive"
                      }
                    >
                      <Zap className="w-4 h-4" />
                    </TabTrigger>
                    <TabTrigger
                      value="food"
                      data-state={
                        getIndex(tab) > 2 ? "completed" : tab === "food" ? "active" : "inactive"
                      }
                    >
                      <UtensilsCrossed className="w-4 h-4" />
                    </TabTrigger>
                    <TabTrigger
                      value="waste"
                      data-state={
                        getIndex(tab) > 3 ? "completed" : tab === "waste" ? "active" : "inactive"
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </TabTrigger>
                    <TabTrigger disabled value="vacation">
                      <Plane className="w-4 h-4" />
                    </TabTrigger>
                  </TabsList>
                </div>
                <Container
                  scrollToRef={scrollToRef}
                  mainForm={mainForm}
                  initQuestions={{
                    transport: transportQuestions,
                    energie: energieQuestions,
                    food: foodQuestions,
                    waste: wasteQuestions,
                    vacation: [[], () => {}],
                  }}
                  setNextTab={setNextTab}
                  value="transport"
                  loading={submitMutation.isPending}
                />
              </Tabs>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
