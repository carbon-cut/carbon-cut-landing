"use client";

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form } from "@/components/ui/forms";
import FormContext from "../_layout/_formContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "@/app/_forms/formSchema";
import initTransportQuestions from "@/app/_forms/basic/transport";
import initEnergyQuestions from "@/app/_forms/basic/energy";
import initFoodQuestions from "@/app/_forms/basic/food";
import type { QuestionFC } from "@/app/_forms/types";
import type { TabValues } from "@/lib/formTabs/types";
import type { TName } from "@/components/ui/forms";

type StoryTabValue = TabValues;

type HarnessRenderProps = {
  mainForm: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  initQuestions: {
    [key in StoryTabValue]: [QuestionFC[], React.Dispatch<React.SetStateAction<QuestionFC[]>>];
  };
  scrollToRef: React.RefObject<HTMLDivElement | null>;
  setNextTab: () => void;
};

type FormShellStoryHarnessProps = {
  children: (props: HarnessRenderProps) => ReactNode;
  tab?: StoryTabValue;
  currentIndexes?: Partial<Record<StoryTabValue, number>>;
  onReady?: (props: HarnessRenderProps) => void;
};

const DEFAULT_INDEXES: Record<StoryTabValue, number> = {
  transport: 0,
  energy: 0,
  food: 0,
  waste: 0,
  vacation: 0,
};

export default function FormShellStoryHarness({
  children,
  tab: initialTab = "transport",
  currentIndexes: initialIndexes,
  onReady,
}: FormShellStoryHarnessProps) {
  const [tab, setTab] = useState<StoryTabValue>(initialTab);
  const [currentIndexes, setCurrentIndexes] = useState<Record<StoryTabValue, number>>({
    ...DEFAULT_INDEXES,
    ...(initialIndexes ?? {}),
  });
  const [readyToSubmit, setReadyToSubmit] = useState(true);
  const [verifyFields, setVerifyFields] = useState<TName<z.infer<typeof formSchema>>[]>([]);

  const queryClient = useMemo(() => new QueryClient(), []);
  const mainForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: "storybook-form-shell",
    },
  });

  const transportQuestions = useState(initTransportQuestions);
  const energyQuestions = useState(initEnergyQuestions);
  const foodQuestions = useState(initFoodQuestions);
  const scrollToRef = useRef<HTMLDivElement>(null);
  const didRunOnReady = useRef(false);

  const setNextTab = useCallback(() => {
    setTab((prev) => {
      switch (prev) {
        case "transport":
          return "energy";
        case "energy":
          return "food";
        case "food":
          return "food";
        case "waste":
          return "vacation";
        case "vacation":
          return "vacation";
        default:
          return "transport";
      }
    });
  }, []);

  const renderProps = useMemo(
    () =>
      ({
        mainForm,
        initQuestions: {
          transport: transportQuestions,
          energy: energyQuestions,
          food: foodQuestions,
          waste: [[], () => {}] as unknown as [
            QuestionFC[],
            React.Dispatch<React.SetStateAction<QuestionFC[]>>,
          ],
          vacation: [[], () => {}] as unknown as [
            QuestionFC[],
            React.Dispatch<React.SetStateAction<QuestionFC[]>>,
          ],
        },
        scrollToRef,
        setNextTab,
      }) satisfies HarnessRenderProps,
    [energyQuestions, foodQuestions, mainForm, setNextTab, transportQuestions]
  );

  useEffect(() => {
    if (didRunOnReady.current) return;
    didRunOnReady.current = true;
    onReady?.(renderProps);
  }, [onReady, renderProps]);

  return (
    <QueryClientProvider client={queryClient}>
      <FormContext.Provider
        value={{
          verifyFields,
          setVerifyFields,
          setTab,
          tab,
          currentIndexes,
          setCurrentIndexes,
          readyToSubmit,
          setReadyToSubmit,
        }}
      >
        <Form {...mainForm}>
          <form className="min-h-screen w-full">{children(renderProps)}</form>
        </Form>
      </FormContext.Provider>
    </QueryClientProvider>
  );
}
