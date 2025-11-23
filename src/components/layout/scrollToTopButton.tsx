"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import { useScopedI18n } from "@/locales/client";
import { Button } from "../ui/button";

const SCROLL_TRIGGER = 750;
const BUTTON_SIZE = 64; // Tailwind h-16/w-16 in px
const RING_THICKNESS = 2;
const RING_RADIUS = BUTTON_SIZE / 2 + RING_THICKNESS / 2;
const RING_SIZE = BUTTON_SIZE + RING_THICKNESS * 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const t = useScopedI18n("components.layout.scrollToTop");

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const ratio =
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;

      setProgress(ratio);
      setIsVisible(window.scrollY > SCROLL_TRIGGER);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed bottom-6 right-4 z-50 transition-all duration-1000 ease-out md:bottom-10 md:right-10 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          aria-hidden
        >
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            stroke="rgba(17,117,81,0.12)"
            strokeWidth={RING_THICKNESS}
            fill="none"
          />
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            stroke="hsl(var(--section-transport))"
            strokeWidth={RING_THICKNESS}
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
            fill="none"
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </svg>

        <Button
          aria-label={t("ariaLabel")}
          onClick={handleClick}
          size="lg"
          className="block h-16 w-16 rounded-full bg-transparent p-0 text-primary-foreground shadow-[0_10px_30px_rgba(18,92,60,0.35)] hover:shadow-[0_16px_40px_rgba(18,92,60,0.35)] [&_svg]:h-7 [&_svg]:w-7"
        >
          <ChevronUp className="stroke-section-transport mx-auto" />
          <span className="sr-only">{t("label")}</span>
        </Button>
      </div>
    </div>
  );
}

export default ScrollToTopButton;
