import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

type FaqEntry = {
  value: string;
  title: string;
  content: string;
};

function FAQs() {
  const t = useScopedI18n("home.faq");
  const faqItems: FaqEntry[] = [0, 1, 2, 3, 4].map((idx) => ({
    value: `item-${idx + 1}`,
    title: t(`items.${idx}.title`),
    content: t(`items.${idx}.content`),
  }));

  return (
    <Accordion type="single" collapsible className="w-full text-primary-foreground bg-inherit">
      {faqItems.map((e) => (
        <AccordionItem className="md:py-3 py-1" key={e.value} value={e.value}>
          <AccordionTrigger>
            <Typography variant={"subtitle"} className="md:text-xl text-base">
              {e.title}
            </Typography>
          </AccordionTrigger>
          <AccordionContent className="font-medium px-3 pb-2 text text-primary/70">
            {e.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQs;
