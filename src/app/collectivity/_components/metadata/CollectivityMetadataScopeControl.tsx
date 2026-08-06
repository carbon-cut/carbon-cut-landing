"use client";

import { useState } from "react";

import type { FieldValues } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import CollectivityMetadataDrawer from "./CollectivityMetadataDrawer";
import { summarizeCollectivityMetadata } from "./utils";
import type {
  CollectivityMetadataControlProps,
  CollectivityMetadataDrawerLabels,
  CollectivityMetadataValue,
} from "./types";

const defaultDrawerLabels: CollectivityMetadataDrawerLabels = {
  description: "Renseignez uniquement ce qui est utile pour cette portée.",
  provenanceTitle: "Provenance",
  qualityTitle: "Qualité",
  addLabel: "Ajouter",
  editLabel: "Modifier",
  clearLabel: "Effacer les métadonnées",
  cancelLabel: "Annuler",
  saveLabel: "Enregistrer",
  emptyLabel: "Aucune métadonnée",
};

type Props<TFieldValues extends FieldValues> = CollectivityMetadataControlProps<TFieldValues> & {
  drawerTitle: string;
  drawerDescription?: string;
  labels?: Partial<CollectivityMetadataDrawerLabels>;
  className?: string;
};

export default function CollectivityMetadataScopeControl<TFieldValues extends FieldValues>({
  drawerTitle,
  drawerDescription,
  form,
  name,
  className,
  labels,
}: Props<TFieldValues>) {
  const [open, setOpen] = useState(false);
  const value = useWatch({ control: form.control, name }) as CollectivityMetadataValue | undefined;
  const summaryText = summarizeCollectivityMetadata(value);
  const hasValue = Boolean(summaryText);
  const drawerLabels = {
    ...defaultDrawerLabels,
    ...labels,
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 text-sm text-secondary">
          {hasValue ? (
            <span className="font-medium text-foreground">{summaryText}</span>
          ) : (
            <span>{drawerLabels.emptyLabel}</span>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 rounded-full px-3 text-xs shadow-none"
          onClick={() => setOpen(true)}
        >
          {hasValue ? drawerLabels.editLabel : drawerLabels.addLabel}
        </Button>
      </div>

      <CollectivityMetadataDrawer
        open={open}
        onOpenChange={setOpen}
        title={drawerTitle}
        description={drawerDescription ?? drawerLabels.description}
        form={form}
        name={name}
        labels={drawerLabels}
      />
    </div>
  );
}

export { defaultDrawerLabels };
