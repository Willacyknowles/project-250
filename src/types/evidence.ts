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

export type ArchiveMediaType = "image" | "scan" | "document" | "placeholder";

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

export type ArchiveMedia = {
  id: string;
  title: string;
  mediaType: ArchiveMediaType;
  caption: string;
  status: ResearchStatus;
  confidence: ConfidenceLevel;
  altText: string;
  placeholderState: ResearchStatus;
  photographerCreator?: string;
  dateCaptured?: string;
  notes?: string;
  relatedEvidenceId: string;
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
  archiveMediaIds: readonly string[];
  revisionHistory: readonly EvidenceRevision[];
};
