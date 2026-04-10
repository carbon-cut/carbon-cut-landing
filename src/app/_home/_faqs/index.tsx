import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { useScopedServerI18n } from "@/locales/server";

function FAQs() {
  const t = useScopedServerI18n("(pages).helpCurrent");
  const faqItems = t("faq.items") as { question: string; answer: string }[];

  return (
    <Accordion type="single" collapsible className="w-full text-foreground">
      {faqItems.map((e) => (
        <AccordionItem className="md:py-3 py-1" key={e.question} value={e.question}>
          <AccordionTrigger>
            <Typography variant={"subtitle"} className=" text-base">
              {e.question}
            </Typography>
          </AccordionTrigger>
          <AccordionContent className="font-medium px-3 pb-2 text text-foreground/70">
            {e.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQs;
