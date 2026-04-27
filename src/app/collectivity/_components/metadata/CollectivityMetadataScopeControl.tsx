"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import CollectivityMetadataDrawer from "./CollectivityMetadataDrawer";
import { summarizeCollectivityMetadata } from "./utils";
import type {
  CollectivityMetadataDrawerLabels,
  CollectivityMetadataScopeSummaryProps,
  CollectivityMetadataValue,
  CollectivityTrendAssessment,
  CollectivityTrendReviewDecision,
} from "./types";

const defaultDrawerLabels: CollectivityMetadataDrawerLabels = {
  description: "Renseignez uniquement ce qui est utile pour cette portée.",
  provenanceTitle: "Provenance",
  qualityTitle: "Qualité",
  trendTitle: "BaU / tendance",
  trendDescription: "Le système détecte la tendance et propose une méthode de projection.",
  trendPrompt: "La situation est potentiellement exceptionnelle. Choisissez la suite.",
  addLabel: "Ajouter",
  editLabel: "Modifier",
  clearLabel: "Effacer les métadonnées",
  cancelLabel: "Annuler",
  saveLabel: "Enregistrer",
  emptyLabel: "Aucune métadonnée",
};

type Props = CollectivityMetadataScopeSummaryProps & {
  drawerTitle: string;
  drawerDescription?: string;
  labels?: Partial<CollectivityMetadataDrawerLabels>;
  trendAssessment?: CollectivityTrendAssessment | null;
  trendDecision?: CollectivityTrendReviewDecision | null;
  onTrendDecisionChange?: (value: CollectivityTrendReviewDecision | null) => void;
  onSave: (value: CollectivityMetadataValue | null) => void;
  onClear: () => void;
};

export default function CollectivityMetadataScopeControl({
  drawerTitle,
  drawerDescription,
  value,
  onSave,
  onClear,
  addLabel,
  editLabel,
  emptyLabel,
  className,
  labels,
  trendAssessment,
  trendDecision,
  onTrendDecisionChange,
}: Props) {
  const [open, setOpen] = useState(false);
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
            <span>{emptyLabel}</span>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 rounded-full px-3 text-xs shadow-none"
          onClick={() => setOpen(true)}
        >
          {hasValue ? editLabel : addLabel}
        </Button>
      </div>

      <CollectivityMetadataDrawer
        open={open}
        onOpenChange={setOpen}
        title={drawerTitle}
        description={drawerDescription ?? drawerLabels.description}
        value={value}
        trendAssessment={trendAssessment}
        trendDecision={trendDecision}
        onTrendDecisionChange={onTrendDecisionChange}
        labels={drawerLabels}
        onSave={(nextValue) => {
          onSave(nextValue);
          setOpen(false);
        }}
        onClear={() => {
          onClear();
          setOpen(false);
        }}
      />
    </div>
  );
}

export { defaultDrawerLabels };
