export type CollectivityMetadataScopeKind = "tab" | "block" | "row";

export type CollectivityMetadataSourceType =
  | "invoice"
  | "report"
  | "excel"
  | "manual"
  | "estimate"
  | "";

export type CollectivityMetadataQualityStatus =
  | "missing"
  | "provided"
  | "estimated"
  | "verified"
  | "";

export type CollectivityMetadataConfidence = "low" | "medium" | "high" | "";

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

export type CollectivityMetadataDraft = {
  organization: string;
  documentName: string;
  contactPerson: string;
  collectionDate: string;
  sourceType: CollectivityMetadataSourceType;
  status: CollectivityMetadataQualityStatus;
  confidence: CollectivityMetadataConfidence;
  comment: string;
};

export type CollectivityMetadataValue = Partial<CollectivityMetadataDraft>;

export type CollectivityMetadataFieldOption = {
  value: string;
  label: string;
};

export type CollectivityMetadataDrawerLabels = {
  description: string;
  provenanceTitle: string;
  qualityTitle: string;
  trendTitle: string;
  trendDescription: string;
  trendPrompt: string;
  addLabel: string;
  editLabel: string;
  clearLabel: string;
  cancelLabel: string;
  saveLabel: string;
  emptyLabel: string;
};

export type CollectivityMetadataScopeSummaryProps = {
  value: CollectivityMetadataValue | null;
  addLabel: string;
  editLabel: string;
  emptyLabel: string;
  className?: string;
};
