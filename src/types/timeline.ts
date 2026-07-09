import type { ConfidenceLevel, ResearchStatus } from "@/types/case-file";

export type TimelineDatePrecision = "exact" | "approximate" | "unknown";

export type TimelineReference = {
  id: string;
  label: string;
  status: ResearchStatus;
};

export type InvestigationTimelineEvent = {
  id: string;
  caseFileId: string;
  title: string;
  date?: string;
  dateLabel: string;
  datePrecision: TimelineDatePrecision;
  description: string;
  status: ResearchStatus;
  confidence: ConfidenceLevel;
  relatedEvidence: readonly TimelineReference[];
  relatedClaims: readonly TimelineReference[];
  relatedSources: readonly TimelineReference[];
  notes: string;
};
