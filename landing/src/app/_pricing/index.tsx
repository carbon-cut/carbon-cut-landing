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
import React, { Fragment } from "react";

const Prices: Props[] = [
  {
    title: "Basic",
    description: "Small businesses and startups looking to gain data insights.",
    features: ["Data Visualization", "Real-Time Analytics", "Customization"],
    price: 10,
    color: 'bg-chart-1',
  },
  {
    title: "Gold",
    description: "Growing businesses that need comprehensive data management and teamwork features",
    features: ["All Basic Plan Features", "Integrations", "Advanced Reporting"],
    price: 20,
    color: 'bg-chart-2',
  },
  {
    title: "Premium",
    description: "Larger enterprises requiring advanced data solutions and personalized support.",
    features: ["All Pro Plan Features", "Full Access to API", "Dedicated Support"],
    price: 30,
    color: 'bg-chart-3',
  },
];

function Pricing() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Prices.map((price) => (
        <CardComponent key={price.title} {...price} />
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
};

const CardComponent: React.FC<Props> = (props) => {
  return (
    <Card className="rounded-3xl w-[320px] py-5 justify-between">
        <div>
      <CardHeader>
        <CardTitle className="text-center">
          <h1 className="mb-4 text-4xl">{props.title}</h1>
          <div className="flex items-start justify-center pr-5">
            <span className="text-2xl align-text-top mt-1">€</span>
            <span className="text-8xl align-text-top leading-none">
              {props.price}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="grid grid-cols-5 gap-2 ">
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
        <Button size="lg" className={`z-30 mx-auto rounded-full ${props.color} hover:bg-chart-1/90`}>Learn More<ArrowRight /></Button>
      </CardFooter>
    </Card>
  );
};
