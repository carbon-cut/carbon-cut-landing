"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabContent, TabTrigger } from "./_tab";
import initEnergieQuestions from "../_forms/basic/energie";
import initTransportQuestions from "../_forms/basic/transport";
import React, { useCallback, useState } from "react";
import { Form } from "@/components/ui/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import FormContext from "./layout/_formContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Car, Zap, UtensilsCrossed, Trash2, Plane, ChevronLeft, ChevronRight } from "lucide-react";

type TabValue = "transport" | "energie" | "food" | "waste" | "vacation";

function Page() {

const {tab, setTab} = React.useContext(FormContext)

  const [resultOpen, setResultOpen] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [result, setResult] = useState<unknown>(null);

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
    setResultOpen(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/basic`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formResponse),
      }
    ).then((r) => r.json());
    console.log(res);
    setResult(res);
  };

  const handleError = (...args: unknown[]) => {
    console.log(...args);
  };

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
          //TODO
          return "transport";
        default:
          return "transport";
      }
    });
  }, []);
  return (
    <>
      <Form {...mainForm}>
        <form
          onSubmit={mainForm.handleSubmit(handleSubmit, handleError)}
          className="min-h-screen h-full w-full"
        >
          <Tabs
            className="relative mt-8 pt-32"
            value={tab}
            //@ts-expect-error because Tabs cannot access to possible values
            onValueChange={(v) => setTab(v)}
          >
            <div className="flex justify-center mb-8">
            
            <TabsList className="flex space-x-2 bg-white rounded-full p-2 shadow-lg h-fit">
              
              <TabTrigger value="transport">
                <Car className="w-4 h-4" />
              </TabTrigger>
              <TabTrigger value="energie">
                <Zap className="w-4 h-4" />
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
            <TabsContent value="waste"></TabsContent>
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
          
        </form>
      </Form>
      <Dialog open={resultOpen} onOpenChange={setResultOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your result</DialogTitle>
          </DialogHeader>
          <div>
            {result != null ? (
              <>{JSON.stringify(result)}</>
            ) : (
              <>no Result yet</>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Page;
