"use client";

import * as React from "react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import Typography from "./typography";

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
  srLabel = "Field information",
  className,
  contentClassName,
  side = "top",
  align = "center",
}: FieldHelpProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            role="img"
            tabIndex={0}
            className={cn(
              "inline-flex rounded-full text-section-vacation/70 outline-none hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
              className
            )}
            aria-label={srLabel}
          >
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
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
            {title ? (
              <Typography variant="label" size="sm" className="text-background">
                {title}
              </Typography>
            ) : null}
            <Typography
              variant="caption"
              size="sm"
              className={cn(title ? "text-background/85" : "text-background")}
            >
              {content}
            </Typography>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type FieldRequiredProps = {
  content?: React.ReactNode;
  title?: React.ReactNode;
  srLabel?: string;
  className?: string;
  contentClassName?: string;
  side?: TooltipContentProps["side"];
  align?: TooltipContentProps["align"];
};

export function FieldRequired({
  content,
  title,
  srLabel = "Required field",
  className,
  contentClassName,
  side = "top",
  align = "center",
}: FieldRequiredProps) {
  const marker = (
    <Typography
      asChild
      variant="label"
      size="xl"
      className={cn(
        "inline-flex items-center justify-center leading-none text-destructive",
        content ? "cursor-help" : "",
        className
      )}
    >
      <span aria-hidden="true">*</span>
    </Typography>
  );

  if (!content) {
    return (
      <span aria-label={srLabel} role="img">
        {marker}
      </span>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            role="img"
            tabIndex={0}
            className="inline-flex rounded-full outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
            aria-label={srLabel}
          >
            {marker}
          </span>
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
            {title ? (
              <Typography variant="label" size="sm" className="text-background">
                {title}
              </Typography>
            ) : null}
            <Typography
              variant="caption"
              size="sm"
              className={cn(title ? "text-background/85" : "text-background")}
            >
              {content}
            </Typography>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
