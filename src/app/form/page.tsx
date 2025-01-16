"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import {TabContent, TabTrigger, } from "./_tab";
import initEnergieQuestions from "../_forms/basic/energie";
import initTransportQuestions from "../_forms/basic/transport";
import React, {
  useCallback,
  useState,
} from "react";
import { Form } from "@/components/ui/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import FormContext from "./_formContext";
import { DialogTitle } from "@radix-ui/react-dialog";

function Page() {
  const [tab, setTab] = useState("transport");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultOpen, setResultOpen] = useState<boolean>(false)
  const [submit, setSubmit] = useState<boolean>(false)
const [result, setResult] = useState<unknown>(null)

  const transportQuestions = useState(initTransportQuestions);
  const energieQuestions = useState(initEnergieQuestions);

  const mainForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (formResponse, e) => {
    e?.preventDefault()
    setResultOpen(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/basic`, {method:'POST', headers:{'Content-Type': 'application/json'} ,body:JSON.stringify(formResponse)}).then(r=>r.json())
    console.log(res)
    setResult(res)
  }

  const handleError = (...args: unknown[]) => {
    console.log(...args)
  }

  const setNextTab = useCallback(() => {
    setTab((prev) => {
      switch (prev) {
        case "transport":
          return "energie";
        case "energie":
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
          <form onSubmit={mainForm.handleSubmit(handleSubmit, handleError)} className="min-h-screen grid grid-cols-2 h-full">
            <Tabs
              className="relative mt-8 pt-32"
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
                <TabTrigger disabled value="food" >
                <img width={'26px'} src="form/food.svg" />
                </TabTrigger>
                <TabTrigger disabled value="trash">
                <img width={'26px'} src="form/waste.svg" />
                </TabTrigger>
                <TabTrigger disabled value="vacation" >
                <img width={'26px'} src="form/vacation.svg" />
                </TabTrigger>
                <div  className="col-span-3"></div>
              </TabsList>
              <TabContent
                mainForm={mainForm}
                submit={submit}
                setSubmit={setSubmit}
                initQuestions={transportQuestions}
                setNextTab={setNextTab}
                value="transport"
              />
              <TabContent
                mainForm={mainForm}
                submit={submit}
                setSubmit={setSubmit}
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
            <div className="bg-primary pt-32  pb-40">
              <div className="relative h-full">
              <img className="top-0 bottom-0 left-0 ml-16 absolute m-auto scale-150" src="form/digital-art-with-planet-earth 1.png" />
              </div>
            </div>
          </form>
        </Form>
        <Dialog open={resultOpen} onOpenChange={setResultOpen}>
          
          <DialogContent>
            <DialogHeader>
          <DialogTitle>Your result</DialogTitle>
          </DialogHeader>
          <div>
            {
              result != null ? <>{JSON.stringify(result)}</> :<>no Result yet</>
            }
            </div>
          </DialogContent>
        </Dialog>
    </FormContext.Provider>
  );
}

export default Page;
