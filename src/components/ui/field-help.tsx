"use client";

import * as React from "react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

type FieldHelpProps = {
  content: React.ReactNode;
  title?: React.ReactNode;
  srLabel?: string;
  className?: string;
  contentClassName?: string;
  side?: TooltipContentProps["side"];
  align?: TooltipContentProps["align"];
};

export function FieldHelp({
  content,
  title,
  srLabel = "Informations sur ce champ",
  className,
  contentClassName,
  side = "top",
  align = "center",
}: FieldHelpProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "h-5 w-5 rounded-full text-section-vacation/70 hover:bg-transparent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
              className
            )}
            aria-label={srLabel}
          >
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={2}
          showArrow={false}
          className={cn(
            "max-w-64 rounded-2xl px-3 py-2 text-sm leading-6 shadow-lg",
            contentClassName
          )}
        >
          <div className="space-y-1">
            {title ? <div className="font-medium text-background">{title}</div> : null}
            <div className={cn(title ? "text-background/85" : "text-background")}>{content}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
