import type {
  CaseFileStatus,
  ClaimStatus,
  ConfidenceLevel,
  EvidenceType,
} from "@/types/case-file";

const confidenceLabels: Record<ConfidenceLevel, string> = {
  unknown: "Unknown",
  speculative: "Speculative",
  plausible: "Plausible",
  supported: "Supported",
  "highly-supported": "Highly Supported",
  verified: "Verified",
  disproven: "Disproven",
};

const statusLabels: Record<CaseFileStatus | ClaimStatus, string> = {
  archived: "Archived",
  draft: "Draft",
  disproven: "Disproven",
  open: "Open",
  plausible: "Plausible",
  published: "Published",
  speculative: "Speculative",
  supported: "Supported",
  "under-review": "Under Review",
  verified: "Verified",
};

const evidenceTypeLabels: Record<EvidenceType, string> = {
  document: "Document",
  "digital-image": "Digital Image",
  "expert-opinion": "Expert Opinion",
  letter: "Letter",
  map: "Map",
  ocr: "OCR",
  photograph: "Photograph",
  "published-source": "Published Source",
  receipt: "Receipt",
  register: "Register",
};

export function formatConfidence(confidence: ConfidenceLevel) {
  return confidenceLabels[confidence];
}

export function formatStatus(status: CaseFileStatus | ClaimStatus) {
  return statusLabels[status];
}

export function formatEvidenceType(type: EvidenceType) {
  return evidenceTypeLabels[type];
}
