import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import type { TName } from "@/components/ui/forms";
import { metadata as collectivityMetadataSchema } from "@/app/collectivity/_inventaire/InventorySchema/_shared";

export type CollectivityMetadataValue = z.infer<typeof collectivityMetadataSchema>;

export type CollectivityMetadataSourceValue = NonNullable<CollectivityMetadataValue["source"]>;

export type CollectivityMetadataQualityValue = NonNullable<CollectivityMetadataValue["quality"]>;

export type CollectivityMetadataControlProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
};

export type CollectivityMetadataDrawerLabels = {
  description: string;
  provenanceTitle: string;
  qualityTitle: string;
  addLabel: string;
  editLabel: string;
  clearLabel: string;
  cancelLabel: string;
  saveLabel: string;
  emptyLabel: string;
};
