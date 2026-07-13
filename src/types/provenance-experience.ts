export type ProvenanceConfidence =
  | "confirmed"
  | "supported"
  | "possible"
  | "contextual"
  | "unresolved";

export type ProvenanceEvidenceKind =
  | "direct-observation"
  | "documented-fact"
  | "supported-inference"
  | "contextual-association"
  | "unresolved-question";

export type ProvenanceNodeCategory =
  | "printing"
  | "material-evidence"
  | "binding"
  | "inscription"
  | "ownership-record"
  | "family-record"
  | "map"
  | "genealogy"
  | "documentary-source"
  | "acquisition"
  | "research-revision"
  | "open-question";

export type ProvenanceExperienceImage = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export type ProvenanceExperienceNode = {
  id: string;
  objectId: string;
  dateLabel: string;
  startYear?: number;
  endYear?: number;
  category: ProvenanceNodeCategory;
  title: string;
  evidenceKind: ProvenanceEvidenceKind;
  observation: string;
  question: string;
  interpretation: string;
  sourceSummary: string;
  confidence: ProvenanceConfidence;
  confidenceRationale: string;
  image?: ProvenanceExperienceImage;
  evidenceIds: readonly string[];
  sourceIds: readonly string[];
  caseFileHref?: string;
  developmentOnly?: boolean;
};

export type ProvenanceExperience = {
  id: string;
  slug: string;
  objectId: string;
  collectionLabel: string;
  objectTitle: string;
  title: string;
  subtitle: string;
  thematicLine: string;
  statusLabel: string;
  statusDescription: string;
  entryImage?: ProvenanceExperienceImage;
  exitHref: string;
  caseFileHref?: string;
  sourceHref?: string;
  unresolvedHref?: string;
  developmentOnly: boolean;
  orientation: {
    desktop: string;
    mobile: string;
  };
  nodes: readonly ProvenanceExperienceNode[];
};
