"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import {TabContent, TabTrigger, } from "./_tab";
import {
  Car,
  MessageCircleQuestion,
  Plane,
  Trash,
  Utensils,
  Zap,
} from "lucide-react";
import initEnergieQuestions from "../_forms/basic/energie";
import initTransportQuestions from "../_forms/basic/transport";
import React, {
  useCallback,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/forms";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import QuestionList from "./questionList";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FormContext from "./_formContext";

function Page() {
  const [tab, setTab] = useState("transport");
  const [currentIndex, setCurrentIndex] = useState(0);

  const transportQuestions = useState(initTransportQuestions);
  const energieQuestions = useState(initEnergieQuestions);

  const mainForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [onSubmit, setOnSubmit] = useState<() => Promise<void>>(
    () => async () => {},
  );

  const setNextTab = useCallback(() => {
    setTab((prev) => {
      switch (prev) {
        case "transport":
          return "energie";
        case "energie":
          mainForm.trigger();
          return "energie";
        case "food":
          return "trash";
        case "trash":
          return "vacation";
        case "vacation":
          //TODO
          return "transport";
        default:
          return "transport";
      }
    });
  }, []);
  return (
    <FormContext.Provider
      value={{
        tab: tab,
        currentIndex: currentIndex,
        setCurrentIndex: setCurrentIndex,
      }}
    >
        <Form {...mainForm}>
          <form onSubmit={onSubmit} className="min-h-screen grid grid-cols-2 h-full">
            <Tabs
              className="relative mt-8"
              value={tab}
              onValueChange={(v) => setTab(v)}
            >
              <TabsList className=" grid grid-cols-11 w-full h-fit">
                <div className="col-span-3"></div>
                <TabTrigger value="transport" >
                  <img width={'26px'} src="form/transport.svg" />
                </TabTrigger>
                <TabTrigger value="energie" >
                <img width={'26px'} src="form/energie.svg" />
                </TabTrigger>
                <TabTrigger value="food" >
                <img width={'26px'} src="form/food.svg" />
                </TabTrigger>
                <TabTrigger value="trash">
                <img width={'26px'} src="form/waste.svg" />
                </TabTrigger>
                <TabTrigger value="vacation" >
                <img width={'26px'} src="form/vacation.svg" />
                </TabTrigger>
                <div  className="col-span-3"></div>
              </TabsList>
              <TabContent
                mainForm={mainForm}
                onSubmit={onSubmit}
                setOnSubmit={setOnSubmit}
                initQuestions={transportQuestions}
                setNextTab={setNextTab}
                value="transport"
              />
              <TabContent
                mainForm={mainForm}
                onSubmit={onSubmit}
                setOnSubmit={setOnSubmit}
                initQuestions={energieQuestions}
                setNextTab={setNextTab}
                value="energie"
              />
              <TabsContent value="food"></TabsContent>
              <TabsContent value="trash"></TabsContent>
              <TabsContent value="vacation"></TabsContent>
              {/* <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    className="absolute top-0 w-16 right-0 ml-auto mb-auto"
                  >
                    <MessageCircleQuestion />
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <QuestionList
                    mainForm={mainForm}
                    setTab={setTab}
                    setIndex={setCurrentIndex}
                    list={{
                      transport: transportQuestions[0],
                      energie: energieQuestions[0],
                    }}
                  />
                </DialogContent>
              </Dialog> */}
            </Tabs>
            <div className="bg-primary  pb-40">
              <div className="relative h-full">
              <img className="top-0 bottom-0 left-0 ml-16 absolute m-auto scale-150" src="form/digital-art-with-planet-earth 1.png" />
              </div>
            </div>
          </form>
        </Form>
    </FormContext.Provider>
  );
}

export default Page;
