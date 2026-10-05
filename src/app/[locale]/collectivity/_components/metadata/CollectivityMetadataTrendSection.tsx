"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type CollectivityTrendDirection = "increase" | "decrease" | "stable";
export type CollectivityTrendRecentDirection = CollectivityTrendDirection | "not_available";
export type CollectivityTrendAnomalyStatus =
  | "normal"
  | "possibly_exceptional"
  | "confirmed_exceptional"
  | "unknown";
export type CollectivityTrendMethod =
  | "historical_activity_trend"
  | "recent_activity_trend"
  | "constant_value_stagnation"
  | "expert_assumption";
export type CollectivityTrendReviewDecision = "confirm" | "deny" | "expert_review" | "ai_review";

export type CollectivityTrendAssessment = {
  historicalTrend: CollectivityTrendDirection;
  recentTrend: CollectivityTrendRecentDirection;
  anomalyStatus: CollectivityTrendAnomalyStatus;
  selectedMethod: CollectivityTrendMethod;
  reasonCode?: string;
  expertNote?: string;
};

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

function formatTrendLabel(value: string) {
  return (
    trendDirectionLabels[value] ?? trendAnomalyLabels[value] ?? trendMethodLabels[value] ?? value
  );
}

export default function CollectivityMetadataTrendSection({
  trendAssessment,
  trendDecision,
  onTrendDecisionChange,
}: {
  trendAssessment: CollectivityTrendAssessment;
  trendDecision: CollectivityTrendReviewDecision | null;
  onTrendDecisionChange?: (value: CollectivityTrendReviewDecision | null) => void;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-foreground">BaU / tendance</h4>
        <p className="text-xs text-secondary">
          Le système détecte la tendance et propose une méthode de projection.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
          <p className="text-xs uppercase tracking-wide text-secondary">Tendance historique</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatTrendLabel(trendAssessment.historicalTrend)}
          </p>
        </div>
        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
          <p className="text-xs uppercase tracking-wide text-secondary">Tendance récente</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatTrendLabel(trendAssessment.recentTrend)}
          </p>
        </div>
        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
          <p className="text-xs uppercase tracking-wide text-secondary">État du signal</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatTrendLabel(trendAssessment.anomalyStatus)}
          </p>
        </div>
        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
          <p className="text-xs uppercase tracking-wide text-secondary">Méthode sélectionnée</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatTrendLabel(trendAssessment.selectedMethod)}
          </p>
        </div>
      </div>

      {trendAssessment.reasonCode ? (
        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
          <p className="text-xs uppercase tracking-wide text-secondary">Code raison</p>
          <p className="mt-1 text-sm font-medium text-foreground">{trendAssessment.reasonCode}</p>
        </div>
      ) : null}

      {trendAssessment.expertNote ? (
        <div className="rounded-2xl border border-border/10 bg-surface-warm/45 px-3 py-3">
          <p className="text-xs uppercase tracking-wide text-secondary">Note</p>
          <p className="mt-1 text-sm font-medium text-foreground">{trendAssessment.expertNote}</p>
        </div>
      ) : null}

      {trendAssessment.anomalyStatus === "possibly_exceptional" ? (
        <div className="space-y-3 rounded-2xl border border-border/10 bg-surface-warm/30 px-3 py-3">
          <p className="text-sm font-medium text-foreground">
            La situation est potentiellement exceptionnelle. Choisissez la suite.
          </p>
          <RadioGroup
            value={trendDecision ?? ""}
            onValueChange={(nextValue) =>
              onTrendDecisionChange?.(nextValue as CollectivityTrendReviewDecision)
            }
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
  );
}
