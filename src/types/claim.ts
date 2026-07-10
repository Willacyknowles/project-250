import type { ConfidenceLevel, ResearchStatus } from "@/types/case-file";

export type ClaimType =
  | "edition-identification"
  | "printer-imprint"
  | "publication-date"
  | "inscription"
  | "provenance-chain"
  | "physical-completeness"
  | "binding-assessment"
  | "marginalia-annotations"
  | "genealogical-relevance";

export type ClaimOpenQuestion = {
  id: string;
  question: string;
  status: "open" | "answered" | "deferred";
};

export type ClaimRevision = {
  id: string;
  version: string;
  dateLabel: string;
  investigator: string;
  summary: string;
};

export type ClaimEngineRecord = {
  id: string;
  caseFileId: string;
  title: string;
  claimType: ClaimType;
  statement: string;
  status: ResearchStatus;
  confidence: ConfidenceLevel;
  relatedEvidenceIds: readonly string[];
  relatedSourceIds: readonly string[];
  relatedTimelineEventIds: readonly string[];
  notes: string;
  openQuestions: readonly ClaimOpenQuestion[];
  revisionHistory: readonly ClaimRevision[];
};
