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
    title: "Data Visualization",
    description:
      "The ability to present complex data in a visually understandable way, such as through charts.",
  },
  {
    icon: svg2,
    title: "Integration",
    description:
      "Seamless integration with other software and tools that a business uses, creating a unified system",
  },
  {
    icon: svg3,
    title: "Customization",
    description:
      "Allowing users to tailor the dashboard to their specific needs and preferences.",
  },
  {
    icon: svg1,
    title: "Reporting",
    description:
      "Generating detailed reports that provide insights into the business's performance.",
  },
  {
    icon: svg2,
    title: "User Access Control",
    description:
      "Managing who can access and interact with the dashboard, ensuring data security.",
  },
  {
    icon: svg3,
    title: "Collaboration Tools",
    description:
      "Features that facilitate teamwork and communication among team members.",
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
      className={`w-[300px] py-5 rounded-3xl ${isHovered ? "bg-card-primary" : ""}`}
    >
      <CardHeader>
        <Image
          className="self-center mb-8"
          height={69}
          width={69}
          src={`${isHovered ? svg1+'light.png' : props.icon +'.png'}`}
          alt={props.title}
        />
        <CardTitle className={`text-center self-center ${isHovered ? "text-primary-foreground" : ""}`}>
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={`text-center ${isHovered ? "text-card-primary-foreground" : ""}`}>
          {props.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
