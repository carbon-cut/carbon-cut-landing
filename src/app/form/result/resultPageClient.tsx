"use client";

import { useState, useEffect } from "react";
import ResultCard from "./resultCard";
import Recommendations from "./recommendations";
import Footer from "./footer";
import { TabValues } from "@/lib/formTabs/types";
import dynamic from "next/dynamic";

const Categorisation = dynamic(() => import("./categorisation"), { ssr: false });

export default function ResultPageClient() {
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const targetValue = 5.2; // tons of CO2 per year
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCarbonFootprint(targetValue * progress);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        setIsAnimating(false);
      }
    };

    animateCounter();
  }, []);

  const breakdownData: {
    name: TabValues;
    value: number;
    tons: number;
    color: string;
  }[] = [
    {
      name: "transport",
      value: 35,
      tons: 1.82,
      color: "#FF6034",
    },
    {
      name: "energie",
      value: 28,
      tons: 1.46,
      color: "#00A261",
    },
    {
      name: "food",
      value: 18,
      tons: 0.94,
      color: "#FFB84D",
    },
    {
      name: "waste",
      value: 12,
      tons: 0.62,
      color: "#4ECDC4",
    },
    {
      name: "vacation",
      value: 7,
      tons: 0.36,
      color: "#A78BFA",
    },
  ];

  const averageFootprint = 4.8; // Global average

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Main Result Card */}
        <ResultCard
          carbonFootprint={carbonFootprint}
          averageFootprint={averageFootprint}
        />

        <Categorisation data={breakdownData} isAnimating={isAnimating} />

        {/* Recommendations Section */}
        <Recommendations />

        {/* Action Buttons */}
        <Footer />
      </div>
    </div>
  );
}
