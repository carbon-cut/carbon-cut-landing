"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { CollectivitySelect, CollectivityTextarea } from "@/app/collectivity/_components/fields";
import CollectivityInput from "@/app/collectivity/_components/fields/CollectivityInput";
import { cn } from "@/lib/utils";

import {
  EMPTY_METADATA_DRAFT,
  createCollectivityMetadataDraft,
  normalizeCollectivityMetadataDraft,
} from "./utils";
import type {
  CollectivityMetadataDraft,
  CollectivityMetadataValue,
  CollectivityMetadataDrawerLabels,
  CollectivityTrendAssessment,
  CollectivityTrendReviewDecision,
} from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

const sourceTypeOptions = [
  { value: "invoice", label: "Facture" },
  { value: "report", label: "Rapport" },
  { value: "excel", label: "Excel" },
  { value: "manual", label: "Saisie manuelle" },
  { value: "estimate", label: "Estimation" },
];

const qualityStatusOptions = [
  { value: "missing", label: "Manquante" },
  { value: "provided", label: "Fournie" },
  { value: "estimated", label: "Estimée" },
  { value: "verified", label: "Vérifiée" },
];

const confidenceOptions = [
  { value: "low", label: "Faible" },
  { value: "medium", label: "Moyenne" },
  { value: "high", label: "Élevée" },
];

const trendDirectionLabels: Record<string, string> = {
  increase: "En hausse",
  decrease: "En baisse",
  stable: "Stable",
  not_available: "Non disponible",
};

const trendAnomalyLabels: Record<string, string> = {
  normal: "Normal",
  possibly_exceptional: "Possiblement exceptionnel",
  confirmed_exceptional: "Exceptionnel confirmé",
  unknown: "Inconnu",
};

const trendMethodLabels: Record<string, string> = {
  historical_activity_trend: "Tendance historique",
  recent_activity_trend: "Tendance récente",
  constant_value_stagnation: "Valeur constante / stagnation",
  expert_assumption: "Hypothèse expert",
};

const trendReviewOptions = [
  { value: "confirm" as const, label: "Confirmer l'anomalie" },
  { value: "deny" as const, label: "Ne pas confirmer" },
  { value: "expert_review" as const, label: "Envoyer à un expert/admin" },
  { value: "ai_review" as const, label: "Demander à l'IA" },
];

function MetadataField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-xs font-medium uppercase tracking-wide text-secondary">{label}</Label>
      {children}
    </div>
  );
}

function formatTrendLabel(value: string) {
  return (
    trendDirectionLabels[value] ?? trendAnomalyLabels[value] ?? trendMethodLabels[value] ?? value
  );
}

export default function CollectivityMetadataDrawer({
  open,
  onOpenChange,
  title,
  description,
  value,
  trendAssessment,
  trendDecision,
  onTrendDecisionChange,
  onSave,
  onClear,
  labels,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  value: CollectivityMetadataValue | null;
  trendAssessment?: CollectivityTrendAssessment | null;
  trendDecision?: CollectivityTrendReviewDecision | null;
  onTrendDecisionChange?: (value: CollectivityTrendReviewDecision | null) => void;
  onSave: (value: CollectivityMetadataValue | null) => void;
  onClear: () => void;
  labels: CollectivityMetadataDrawerLabels;
}) {
  const [draft, setDraft] = useState<CollectivityMetadataDraft>(EMPTY_METADATA_DRAFT);
  const [localTrendDecision, setLocalTrendDecision] = useState<
    CollectivityTrendReviewDecision | ""
  >("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setDraft(createCollectivityMetadataDraft(value));
    setLocalTrendDecision(trendDecision ?? "");
  }, [open, trendDecision, value]);

  const handleSave = () => {
    onSave(normalizeCollectivityMetadataDraft(draft));
    onOpenChange(false);
  };

  const handleClear = () => {
    setDraft(EMPTY_METADATA_DRAFT);
    onClear();
    onOpenChange(false);
  };

  const showTrendReview = trendAssessment?.anomalyStatus === "possibly_exceptional";
  const activeTrendDecision = trendDecision ?? localTrendDecision;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-0">
        <div className="mx-auto max-h-full flex w-full max-w-3xl flex-col">
          <DrawerHeader className="px-4 pb-4 pt-5">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[80vh] overflow-hidden pl-4 ">
            <ScrollArea className="h-[50vh]">
              <div className="pr-4 mx-1">
                <div className="space-y-6 ">
                  <section className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-foreground">
                        {labels.provenanceTitle}
                      </h4>
                      <p className="text-xs text-secondary">
                        Renseignez la source qui soutient ce jeu de données.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <MetadataField label="Organisation">
                        <CollectivityInput
                          value={draft.organization}
                          onChange={(event) =>
                            setDraft((current) => ({
                              ...current,
                              organization: event.target.value,
                            }))
                          }
                          placeholder="Ex. STEG"
                        />
                      </MetadataField>

                      <MetadataField label="Document">
                        <CollectivityInput
                          value={draft.documentName}
                          onChange={(event) =>
                            setDraft((current) => ({
                              ...current,
                              documentName: event.target.value,
                            }))
                          }
                          placeholder="Ex. Export électricité 2024"
                        />
                      </MetadataField>

                      <MetadataField label="Contact">
                        <CollectivityInput
                          value={draft.contactPerson}
                          onChange={(event) =>
                            setDraft((current) => ({
                              ...current,
                              contactPerson: event.target.value,
                            }))
                          }
                          placeholder="Ex. cellule énergie"
                        />
                      </MetadataField>

                      <MetadataField label="Date de collecte">
                        <CollectivityInput
                          type="date"
                          value={draft.collectionDate}
                          onChange={(event) =>
                            setDraft((current) => ({
                              ...current,
                              collectionDate: event.target.value,
                            }))
                          }
                        />
                      </MetadataField>

                      <MetadataField label="Type de source" className="md:col-span-2">
                        <CollectivitySelect
                          value={draft.sourceType}
                          onValueChange={(nextValue) =>
                            setDraft((current) => ({
                              ...current,
                              sourceType: nextValue as CollectivityMetadataDraft["sourceType"],
                            }))
                          }
                          placeholder="Choisir un type de source"
                          options={sourceTypeOptions}
                          className="w-full"
                        />
                      </MetadataField>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-foreground">{labels.qualityTitle}</h4>
                      <p className="text-xs text-secondary">
                        Indiquez le niveau de fiabilité attaché à cette collecte.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <MetadataField label="Statut">
                        <CollectivitySelect
                          value={draft.status}
                          onValueChange={(nextValue) =>
                            setDraft((current) => ({
                              ...current,
                              status: nextValue as CollectivityMetadataDraft["status"],
                            }))
                          }
                          placeholder="Choisir un statut"
                          options={qualityStatusOptions}
                          className="w-full"
                        />
                      </MetadataField>

                      <MetadataField label="Confiance">
                        <CollectivitySelect
                          value={draft.confidence}
                          onValueChange={(nextValue) =>
                            setDraft((current) => ({
                              ...current,
                              confidence: nextValue as CollectivityMetadataDraft["confidence"],
                            }))
                          }
                          placeholder="Choisir une confiance"
                          options={confidenceOptions}
                          className="w-full"
                        />
                      </MetadataField>

                      <MetadataField label="Commentaire" className="md:col-span-2">
                        <CollectivityTextarea
                          value={draft.comment}
                          onChange={(event) =>
                            setDraft((current) => ({ ...current, comment: event.target.value }))
                          }
                          placeholder="Ajouter un commentaire sur la qualité ou les limites de la source."
                        />
                      </MetadataField>
                    </div>
                  </section>

                  {trendAssessment ? (
                    <section className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-foreground">{labels.trendTitle}</h4>
                        <p className="text-xs text-secondary">{labels.trendDescription}</p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-secondary">
                            Tendance historique
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {formatTrendLabel(trendAssessment.historicalTrend)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-secondary">
                            Tendance récente
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {formatTrendLabel(trendAssessment.recentTrend)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-secondary">
                            État du signal
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {formatTrendLabel(trendAssessment.anomalyStatus)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-secondary">
                            Méthode sélectionnée
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {formatTrendLabel(trendAssessment.selectedMethod)}
                          </p>
                        </div>
                      </div>

                      {trendAssessment.reasonCode ? (
                        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-secondary">
                            Code raison
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {trendAssessment.reasonCode}
                          </p>
                        </div>
                      ) : null}

                      {trendAssessment.expertNote ? (
                        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-secondary">Note</p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {trendAssessment.expertNote}
                          </p>
                        </div>
                      ) : null}

                      {showTrendReview ? (
                        <div className="space-y-3 rounded-2xl border border-border/10 bg-surface-warm/30 px-3 py-3">
                          <p className="text-sm font-medium text-foreground">
                            {labels.trendPrompt}
                          </p>
                          <RadioGroup
                            value={activeTrendDecision}
                            onValueChange={(nextValue) => {
                              const nextDecision = nextValue as CollectivityTrendReviewDecision;
                              setLocalTrendDecision(nextDecision);
                              onTrendDecisionChange?.(nextDecision);
                            }}
                            className="grid gap-2"
                          >
                            {trendReviewOptions.map((option) => (
                              <label
                                key={option.value}
                                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/10 bg-card px-3 py-2 text-sm transition-colors hover:bg-surface-warm/40"
                              >
                                <RadioGroupItem value={option.value} />
                                <span>{option.label}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </div>
                      ) : null}
                    </section>
                  ) : null}
                </div>
                <div className="h-[1px] " />
              </div>
            </ScrollArea>
          </div>

          <DrawerFooter className="border-t border-border/10 px-4 py-4 sm:flex-row sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={handleSave}>
                {labels.saveLabel}
              </Button>
              <DrawerClose asChild>
                <Button type="button" variant="outline">
                  {labels.cancelLabel}
                </Button>
              </DrawerClose>
            </div>

            {value ? (
              <Button
                type="button"
                variant="destructive"
                onClick={handleClear}
                className="sm:ml-auto"
              >
                {labels.clearLabel}
              </Button>
            ) : null}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
