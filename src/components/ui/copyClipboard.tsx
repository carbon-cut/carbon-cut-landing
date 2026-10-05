"use client";

import { FeatherCheck, FeatherCopy } from "@subframe/core";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyClipboardProps = {
  value: string;
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export function CopyClipboard({
  value,
  ariaLabel,
  className,
  disabled,
  loading,
}: CopyClipboardProps) {
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current);
      }
    },
    []
  );

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current);
    }

    resetTimeout.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      type="button"
      variant="neutral-tertiary"
      size="small"
      className={cn("h-6 w-6 flex-none px-0", className)}
      icon={copied ? <FeatherCheck /> : <FeatherCopy />}
      aria-label={ariaLabel}
      disabled={disabled}
      loading={loading}
      onClick={() => void copy()}
    />
  );
}

export type { CopyClipboardProps };
