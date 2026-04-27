import type { CollectivityMetadataDraft, CollectivityMetadataValue } from "./types";

const sourceTypeLabels: Record<string, string> = {
  invoice: "Facture",
  report: "Rapport",
  excel: "Excel",
  manual: "Saisie manuelle",
  estimate: "Estimation",
};

const qualityStatusLabels: Record<string, string> = {
  missing: "Manquante",
  provided: "Fournie",
  estimated: "Estimée",
  verified: "Vérifiée",
};

const confidenceLabels: Record<string, string> = {
  low: "Faible",
  medium: "Moyenne",
  high: "Élevée",
};

const EMPTY_METADATA_DRAFT: CollectivityMetadataDraft = {
  organization: "",
  documentName: "",
  contactPerson: "",
  collectionDate: "",
  sourceType: "",
  status: "",
  confidence: "",
  comment: "",
};

function createCollectivityMetadataDraft(value?: CollectivityMetadataValue | null) {
  return {
    ...EMPTY_METADATA_DRAFT,
    ...(value ?? {}),
  };
}

function normalizeCollectivityMetadataDraft(draft: CollectivityMetadataDraft): CollectivityMetadataValue | null {
  const entries = Object.entries(draft).filter(([, value]) => String(value).trim() !== "");

  if (!entries.length) {
    return null;
  }

  return Object.fromEntries(entries) as CollectivityMetadataValue;
}

function summarizeCollectivityMetadata(value: CollectivityMetadataValue | null) {
  if (!value) {
    return null;
  }

  const summaryParts = [
    value.organization,
    value.documentName,
    value.sourceType ? sourceTypeLabels[value.sourceType] ?? value.sourceType : "",
    value.status ? qualityStatusLabels[value.status] ?? value.status : "",
    value.confidence ? confidenceLabels[value.confidence] ?? value.confidence : "",
  ].filter((part): part is string => Boolean(part && part.trim()));

  if (summaryParts.length) {
    return summaryParts.join(" · ");
  }

  if (value.comment?.trim()) {
    return "Commentaire renseigné";
  }

  return null;
}

export {
  EMPTY_METADATA_DRAFT,
  createCollectivityMetadataDraft,
  normalizeCollectivityMetadataDraft,
  summarizeCollectivityMetadata,
};
