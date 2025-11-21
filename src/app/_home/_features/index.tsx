//"use server"
import React from "react";
import Image from "next/image";
const calculator = "home/features/icon_1";
const recomendation = "home/features/icon_2";
const dashboard = "home/features/icon_3";
const scale = "home/features/icon_4";
const plan = "home/features/icon_5";
const analysis = "home/features/icon_6";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useScopedI18n } from "@/locales/client";

const cardContent: Props[] = [
  {
    icon: calculator,
    altKey: "cards.0.alt",
    titleKey: "cards.0.title",
    descriptionKey: "cards.0.description",
  },
  {
    icon: recomendation,
    altKey: "cards.1.alt",
    titleKey: "cards.1.title",
    descriptionKey: "cards.1.description",
  },
  {
    icon: dashboard,
    altKey: "cards.2.alt",
    titleKey: "cards.2.title",
    descriptionKey: "cards.2.description",
  },
  {
    icon: scale,
    altKey: "cards.3.alt",
    titleKey: "cards.3.title",
    descriptionKey: "cards.3.description",
  },
  {
    icon: plan,
    altKey: "cards.4.alt",
    titleKey: "cards.4.title",
    descriptionKey: "cards.4.description",
  },
  {
    icon: analysis,
    altKey: "cards.5.alt",
    titleKey: "cards.5.title",
    descriptionKey: "cards.5.description",
  },
];

function Features() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-8 mt-6">
      {cardContent.map((e) => (
        <CardComponent key={e.titleKey} {...e} />
      ))}
    </div>
  );
}

export default Features;

type Props = {
  icon: string;
  altKey: string;
  titleKey: string;
  descriptionKey: string;
};
const CardComponent: React.FC<Props> = (props) => {
  const t = useScopedI18n("home.features");

  //const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  //const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <Card
      //onMouseEnter={handleMouseEnter}
      //onMouseLeave={handleMouseLeave}
      className="md:w-[300px] py-5 rounded-3xl"
    >
      <CardHeader className="grid grid-rows-2 md:h-36 h-32">
        <Image
          className=" mx-auto mb-0 md:scale-100 scale-[60%]"
          height={69}
          width={69}
          src={`${ props.icon +'.png'}`}
          alt={t(props.altKey)}
        />
        <CardTitle className={`text-center mt-6 text-primary`}>
          {t(props.titleKey)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={`text-muted-foreground text-center`}>
          {t(props.descriptionKey)}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
