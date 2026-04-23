"use client";

import { CollectivityInput } from "../../_components/fields";

export default function InventoryTableInput({ defaultValue }: { defaultValue: string }) {
  return (
    <CollectivityInput
      className="h-9 min-w-[40px] rounded-lg border-border/15 bg-muted/50  px-3 text-sm shadow-none md:min-w-[40px]"
      defaultValue={defaultValue}
    />
  );
}
