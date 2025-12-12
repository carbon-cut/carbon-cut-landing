"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Check, InfoIcon } from "lucide-react";
import React, { Fragment, useEffect, useRef, useState } from "react";

const Prices: Props[] = [
  {
    title: "Basic",
    description: "Small businesses and startups looking to gain data insights.",
    features: ["Data Visualization", "Real-Time Analytics", "Customization"],
    price: 10,
    color: "bg-chart-1",
  },
  {
    title: "Gold",
    description: "Growing businesses that need comprehensive data management and teamwork features",
    features: ["All Basic Plan Features", "Integrations", "Advanced Reporting"],
    price: 20,
    color: "bg-chart-2",
  },
  {
    title: "Premium",
    description: "Larger enterprises requiring advanced data solutions and personalized support.",
    features: ["All Pro Plan Features", "Full Access to API", "Dedicated Support"],
    price: 30,
    color: "bg-chart-3",
  },
];

function Pricing() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Prices.map((price, index) => (
        <CardComponent key={price.title} {...price} delay={index * 200} />
      ))}
    </div>
  );
}

export default Pricing;

type Props = {
  title: string;
  description: string;
  features: string[];
  price: number;
  color: string;
  delay?: number;
};

const CardComponent: React.FC<Props> = (props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);

  // Trigger animation when the card reaches ~70% visibility.
  // Reset when it exits past the top (0vh) so it can play again on next entry.
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.55 && canAnimate) {
            setIsActive(true);
            setCanAnimate(false);
          }
          // If the card is above the top of the viewport, restore pre-animation state.
          if (entry.intersectionRatio === 0 && entry.boundingClientRect.top > 0) {
            setIsActive(false);
            setCanAnimate(true);
          }
        });
      },
      { threshold: [0, 0.55, 1] }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [canAnimate]);

  return (
    <Card
      ref={cardRef}
      className={`rounded-3xl w-[320px] py-5 justify-between transition-all duration-700 ease-out translate-y-8 opacity-0 ${
        isActive ? "translate-y-0 opacity-100" : "transition-none"
      }`}
      style={{
        transitionDelay: `${props.delay ?? 0}ms`,
      }}
    >
      <div>
        <CardHeader>
          <CardTitle className="text-center text-primary">
            <h1 className="mb-4 text-4xl">{props.title}</h1>
            <div className="flex items-start justify-center ">
              <span className="text-2xl align-text-top mt-1">€</span>
              <span className="text-8xl align-text-top leading-none">{props.price}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="grid grid-cols-5 gap-2 text-secondary">
            {props.features.map((feature) => (
              <Fragment key={feature}>
                <Check className="ml-auto" />
                <p className="ml-4 col-span-4 text-lg">{feature}</p>
              </Fragment>
            ))}
            <InfoIcon className="ml-auto mt-4" />
            <p className="ml-4 col-span-4 text-lg mt-4">{props.description}</p>
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter>
        <Button size="lg" className={`z-30 mx-auto bg-linear-2`}>
          Learn More
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
