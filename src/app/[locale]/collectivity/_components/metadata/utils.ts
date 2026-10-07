import type {
  CollectivityMetadataQualityValue,
  CollectivityMetadataSourceValue,
  CollectivityMetadataValue,
} from "./types";

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

const EMPTY_METADATA_VALUE: CollectivityMetadataValue = {
  source: {},
  quality: {},
};

function cloneCollectivityMetadataValue(value?: CollectivityMetadataValue | null) {
  if (!value) {
    return null;
  }

  return structuredClone(value);
}

function summarizeCollectivitySection(
  section?: CollectivityMetadataSourceValue | CollectivityMetadataQualityValue | null
) {
  if (!section) {
    return null;
  }

  const summaryParts = [
    "organization" in section ? section.organization : "",
    "documentName" in section ? section.documentName : "",
    "sourceType" in section && section.sourceType
      ? (sourceTypeLabels[section.sourceType] ?? section.sourceType)
      : "",
    "status" in section && section.status
      ? (qualityStatusLabels[section.status] ?? section.status)
      : "",
    "confidence" in section && section.confidence
      ? (confidenceLabels[section.confidence] ?? section.confidence)
      : "",
    "documents" in section && section.documents?.length
      ? `${section.documents.length} fichier${section.documents.length > 1 ? "s" : ""}`
      : "",
  ].filter((part): part is string => Boolean(part && part.trim()));

  return summaryParts.length ? summaryParts.join(" · ") : null;
}

function summarizeCollectivityMetadata(value: CollectivityMetadataValue | null | undefined) {
  if (!value) {
    return null;
  }

  const summaryParts = [
    summarizeCollectivitySection(value.source),
    summarizeCollectivitySection(value.quality),
  ].filter((part): part is string => Boolean(part && part.trim()));

  if (summaryParts.length) {
    return summaryParts.join(" · ");
  }

  if (value.quality?.comment?.trim()) {
    return "Commentaire renseigné";
  }

  return null;
}

export { EMPTY_METADATA_VALUE, cloneCollectivityMetadataValue, summarizeCollectivityMetadata };
