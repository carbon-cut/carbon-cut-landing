"use client"
import React, { useCallback, useState } from "react";
import Image from "next/image";
const svg1 = "home/features/4";
const svg2 = "home/features/5";
const svg3 = "home/features/6";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardContent: Props[] = [
  {
    icon: svg1,
    title: "Calculateur d'empreinte carbone",
    description:
      "Estimation fiable basée sur vos habitudes.",
  },
  {
    icon: svg2,
    title: "onseils personnalisés",
    description:
      "Conseils pratiques pour réduire vos émissions.",
  },
  {
    icon: svg3,
    title: "Tableau de bord carbone",
    description:
      "Visualisation claire avec graphiques et rapports.",
  },
  {
    icon: svg1,
    title: "Comparateur d'émissions",
    description:
      "Comparez votre empreinte à des moyennes locales et mondiales.",
  },
  {
    icon: svg2,
    title: "Plan de réduction carbone",
    description:
      "Étapes concrètes pour adopter un mode de vie durable.",
  },
  {
    icon: svg3,
    title: "Analyse pour entreprises",
    description:
      "Outil pour évaluer et réduire les émissions des entreprises.",
  },
];

function Features() {
  return (
    <div className="grid grid-cols-3 gap-8 mt-6">
      {cardContent.map((e) => (
        <CardComponent key={e.title} {...e} />
      ))}
    </div>
  );
}

export default Features;

type Props = {
  icon: string;
  title: string;
  description: string;
};
const CardComponent: React.FC<Props> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-[300px] py-5 rounded-3xl ${isHovered ? "bg-linear" : ""}`}
    >
      <CardHeader>
        <Image
          className="self-center mb-8"
          height={69}
          width={69}
          src={`${isHovered ? svg1+'light.png' : props.icon +'.png'}`}
          alt={props.title}
        />
        <CardTitle className={`text-center self-center text-primary ${isHovered ? "text-primary-foreground" : ""}`}>
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={`text-muted-foreground text-center ${isHovered ? "text-primary-foreground" : ""}`}>
          {props.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
