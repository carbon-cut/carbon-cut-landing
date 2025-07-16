import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "@/components/ui/typography";

type AccordionItem = {
  value: string;
  title: string;
  content: string;
};

const items: AccordionItem[] = [
  {
    value: "item-1",
    title: "Comment fonctionne le calcul de l'empreinte carbone sur ce site ?",
    content:
      "Le calcul de votre empreinte carbone se base sur vos réponses à un formulaire simple qui couvre plusieurs aspects de votre quotidien : vos modes de transport, votre consommation d'énergie, vos habitudes alimentaires, votre gestion des déchets et vos voyages, notamment vos vacances. Ces informations sont ensuite analysées pour estimer vos émissions de CO₂ et vous fournir un aperçu clair de votre impact environnemental.",
  },
  {
    value: "item-2",
    title: "Puis-je calculer l'empreinte carbone de mon entreprise ?",
    content:
      "Oui, notre site propose également des outils adaptés pour calculer l'empreinte carbone des entreprises. En répondant à des questions spécifiques sur la consommation énergétique, les déplacements professionnels, la gestion des déchets, les achats et la production, vous obtiendrez une estimation des émissions de CO₂ générées par vos activités. Cela vous permettra d’identifier des leviers d’action pour réduire votre impact environnemental.",
  },
  {
    value: "item-3",
    title: "Est-ce que l'outil est gratuit ?",
    content:
      "Oui, notre outil propose une période d'essai gratuite pour vous permettre de tester ses fonctionnalités. Après la période d'essai, un abonnement de 10 euros par an pour le plan de base est requis pour continuer à utiliser l'outil et accéder à toutes ses fonctionnalités.",
  },
  {
    value: "item-4",
    title: "Comment puis-je réduire mon empreinte carbone ?",
    content:
      "Notre solution vous fournit des recommandations personnalisées basées sur vos réponses, afin de vous aider à réduire votre empreinte carbone. De plus, nous offrons des options de compensation des émissions de CO₂, vous permettant ainsi de compenser votre impact environnemental en soutenant des projets durables et écologiques.",
  },
  {
    value: "item-5",
    title: "Est-ce que mes données sont sécurisées ?",
    content:
      "Oui, la sécurité de vos données est une priorité pour nous. Nous utilisons des protocoles de sécurité avancés pour protéger vos informations personnelles et garantir leur confidentialité. Vos données sont stockées de manière sécurisée et ne sont utilisées que dans le cadre de l'estimation de votre empreinte carbone et des recommandations qui en découlent.",
  },
];

function FAQs() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-primary-foreground bg-inherit"
    >
      {items.map((e) => (
        <AccordionItem className="md:py-8 py-1" key={e.value} value={e.value}>
          <AccordionTrigger>
          <Typography variant={"subtitle"} className="md:text-3xl text-lg">
            {e.title}
            </Typography>
          </AccordionTrigger>
          <AccordionContent className="font-medium px-3 text text-primary/70">
            {e.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQs;
