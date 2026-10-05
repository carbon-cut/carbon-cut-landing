"use client";

import { FeatherCopy } from "@subframe/core";

import { Button } from "@/components/ui/button";

export function QuoteCopyButton({ value, label }: { value: string; label: string }) {
  return (
    <Button
      type="button"
      variant="neutral-tertiary"
      size="small"
      className="h-6 w-6 px-0"
      aria-label={label}
      icon={<FeatherCopy />}
      onClick={() => void navigator.clipboard.writeText(value)}
    />
  );
}
