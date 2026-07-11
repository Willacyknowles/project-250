import { exhibitionCopy } from "@/config/exhibition-copy";
import { formatConfidence } from "@/lib/case-file-labels";
import type {
  ClaimStatus,
  ConfidenceLevel,
  ResearchStatus,
} from "@/types/case-file";

export function formatVisitorConfidence(confidence: ConfidenceLevel) {
  return confidence === "unknown"
    ? exhibitionCopy.confidenceUnknown
    : formatConfidence(confidence);
}

export function formatDossierStatus(status: ResearchStatus) {
  if (status === "Documented") {
    return "Confirmed";
  }

  if (status === "In Review") {
    return "Supported";
  }

  return exhibitionCopy.activeInvestigation;
}

export function formatEvidenceStatus(status: ResearchStatus) {
  if (status === "Documented") {
    return "Confirmed";
  }

  if (status === "In Review") {
    return "Supported";
  }

  return exhibitionCopy.evidencePending;
}

export function formatInterpretationStatus(status: ResearchStatus | ClaimStatus) {
  if (status === "Documented" || status === "verified") {
    return "Confirmed";
  }

  if (status === "In Review" || status === "supported") {
    return "Supported";
  }

  if (status === "plausible") {
    return "Possible";
  }

  if (status === "disproven") {
    return "Disputed";
  }

  return exhibitionCopy.sourceReviewNeeded;
}

export function formatTimelineStatus(status: ResearchStatus) {
  if (status === "Documented") {
    return "Confirmed";
  }

  if (status === "In Review") {
    return "Possible";
  }

  return "Unresolved";
}

export function formatResearchValue(value?: string | null) {
  if (!value || value === "Requires Research") {
    return exhibitionCopy.unknownValue;
  }

  return value;
}

export function formatCitationValue(value?: string | null) {
  if (!value || value === "Requires Research") {
    return exhibitionCopy.citationUnderReview;
  }

  return value;
}

export function formatRevisionInvestigator(investigator: string) {
  return investigator === "Codex" ? exhibitionCopy.researchTeam : investigator;
}
