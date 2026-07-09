import type {
  ClaimStatus,
  ConfidenceLevel,
  EvidenceType,
  ResearchStatus,
} from "@/types/case-file";

export type EvidenceArtifactType =
  | "artifact-component"
  | "inscription"
  | "imprint"
  | "binding"
  | "annotation"
  | "printer-device"
  | "genealogical-record"
  | "map"
  | "colophon";

export type EvidenceImagePlaceholder = {
  label: string;
  status: ResearchStatus;
  description: string;
};

export type EvidenceSourceReference = {
  id: string;
  label: string;
  citation: string;
  status: ResearchStatus;
};

export type EvidenceRevision = {
  id: string;
  version: string;
  dateLabel: string;
  investigator: string;
  summary: string;
};

export type RelatedClaimReference = {
  id: string;
  label: string;
  status: ClaimStatus;
};

export type EvidenceItem = {
  id: string;
  title: string;
  description: string;
  artifactType: EvidenceArtifactType;
  evidenceType: EvidenceType;
  status: ResearchStatus;
  confidence: ConfidenceLevel;
  relatedCaseFileId: string;
  relatedClaimIds: readonly RelatedClaimReference[];
  sourceReferences: readonly EvidenceSourceReference[];
  imagePlaceholder: EvidenceImagePlaceholder;
  revisionHistory: readonly EvidenceRevision[];
};