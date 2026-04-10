import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "@/components/ui/typography";
import { ChevronRight } from "lucide-react";

type FaqEntry = {
  title: string;
  description: string;
};

function FAQs({faqItems}: {faqItems: FaqEntry[]}) {

  return (
    <Accordion type="single" collapsible className="w-full text-foreground">
      {faqItems.map((e,) => (
        <AccordionItem className=" py-1 border-0" key={e.title} value={e.title}>
          <AccordionTrigger 
          className={`flex w-full items-center justify-between rounded-xl 
            border border-border/10 bg-background px-3 py-2 text-left text-sm text-foreground
            transition-colors hover:bg-surface-warm [&[data-state=open]>svg]:rotate-90`}
          icon="custom"
          customIcon={<ChevronRight className="h-4 w-4 text-secondary shrink-0 transition-transform duration-200" aria-hidden="true" />}
          >
            <Typography variant={"subtitle"} size={'sm'} className="">
              {e.title}
            </Typography>
          </AccordionTrigger>
          <AccordionContent className="font-medium px-3 pb-2 text text-foreground/70">
            {e.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQs;
