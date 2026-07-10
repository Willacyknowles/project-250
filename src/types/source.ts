import type { ConfidenceLevel, ResearchStatus } from "@/types/case-file";

export type SourceType =
  | "bibliography"
  | "catalog-record"
  | "artifact-observation"
  | "research-source"
  | "memory"
  | "expert-review"
  | "placeholder";

export type SourceIndependenceLevel =
  | "unknown"
  | "primary"
  | "secondary"
  | "tertiary"
  | "dependent"
  | "internal";

export type SourceRelationReference = {
  id: string;
  label: string;
  status: ResearchStatus;
};

export type SourceRevision = {
  id: string;
  version: string;
  dateLabel: string;
  investigator: string;
  summary: string;
};

export type SourceLibraryRecord = {
  id: string;
  caseFileId: string;
  title: string;
  sourceType: SourceType;
  citationPlaceholder: string;
  repositoryArchive: string;
  status: ResearchStatus;
  confidence: ConfidenceLevel;
  independenceLevel: SourceIndependenceLevel;
  relatedEvidence: readonly SourceRelationReference[];
  relatedClaims: readonly SourceRelationReference[];
  relatedTimelineEvents: readonly SourceRelationReference[];
  notes: string;
  revisionHistory: readonly SourceRevision[];
};
