export type CaseFileStatus =
  | "draft"
  | "open"
  | "under-review"
  | "published"
  | "archived";

export type ConfidenceLevel =
  | "unknown"
  | "speculative"
  | "plausible"
  | "supported"
  | "highly-supported"
  | "verified"
  | "disproven";

export type EvidenceType =
  | "photograph"
  | "document"
  | "letter"
  | "map"
  | "register"
  | "receipt"
  | "ocr"
  | "digital-image"
  | "expert-opinion"
  | "published-source";

export type ClaimStatus =
  | "draft"
  | "supported"
  | "verified"
  | "plausible"
  | "speculative"
  | "disproven";

export type ArtifactProfile = {
  type: string;
  title: string;
  dateLabel: string;
  creator?: string;
  material?: string;
  language?: string;
  repository?: string;
  accessionNumber?: string;
  currentOwner?: string;
  condition?: string;
};

export type EvidenceRecord = {
  id: string;
  title: string;
  type: EvidenceType;
  source: string;
  confidence: ConfidenceLevel;
  description: string;
  supportsClaimIds: readonly string[];
  counterClaimIds: readonly string[];
};

export type ClaimRecord = {
  id: string;
  statement: string;
  status: ClaimStatus;
  confidence: ConfidenceLevel;
  supportingEvidenceIds: readonly string[];
  counterEvidenceIds: readonly string[];
};

export type TimelineEvent = {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  confidence: ConfidenceLevel;
  evidenceIds: readonly string[];
};

export type ResearchQuestion = {
  id: string;
  question: string;
  status: "open" | "answered" | "deferred";
};

export type ContributorCredit = {
  id: string;
  name: string;
  role: string;
};

export type RevisionRecord = {
  id: string;
  version: string;
  dateLabel: string;
  investigator: string;
  summary: string;
};

export type CaseFile = {
  id: string;
  caseNumber: string;
  slug: string;
  collectionId: string;
  title: string;
  status: CaseFileStatus;
  version: string;
  leadInvestigator: string;
  summary: string;
  primaryQuestion: string;
  confidence: ConfidenceLevel;
  artifact: ArtifactProfile;
  evidence: readonly EvidenceRecord[];
  claims: readonly ClaimRecord[];
  timeline: readonly TimelineEvent[];
  researchQuestions: readonly ResearchQuestion[];
  contributors: readonly ContributorCredit[];
  revisions: readonly RevisionRecord[];
};
