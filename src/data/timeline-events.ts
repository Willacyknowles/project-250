import type { InvestigationTimelineEvent, TimelineReference } from "@/types/timeline";

const caseFile001Id = "case-file-001";
const requiresResearch = "Requires Research" as const;
const unknown = "unknown" as const;

const evidenceReferences = {
  barkerImprint: {
    id: "barker-imprint",
    label: "Barker Imprint",
    status: requiresResearch,
  },
  binding: {
    id: "binding",
    label: "Binding",
    status: requiresResearch,
  },
  colophon: {
    id: "colophon",
    label: "Colophon",
    status: requiresResearch,
  },
  genealogies: {
    id: "genealogies",
    label: "Genealogies",
    status: requiresResearch,
  },
  marginalNotes: {
    id: "marginal-notes",
    label: "Marginal Notes",
    status: requiresResearch,
  },
  maps: {
    id: "maps",
    label: "Maps",
    status: requiresResearch,
  },
  printersDevice: {
    id: "printers-device",
    label: "Printer's Device",
    status: requiresResearch,
  },
  sidgwickInscription: {
    id: "sidgwick-inscription",
    label: "Sidgwick Inscription",
    status: requiresResearch,
  },
  titlePage: {
    id: "title-page",
    label: "Title Page",
    status: requiresResearch,
  },
} satisfies Record<string, TimelineReference>;

function sourceReview(id: string, label: string): TimelineReference {
  return {
    id,
    label,
    status: requiresResearch,
  };
}

function timelineEvent({
  description,
  id,
  relatedEvidence = [],
  relatedSources = [],
  title,
}: {
  description: string;
  id: string;
  relatedEvidence?: readonly TimelineReference[];
  relatedSources?: readonly TimelineReference[];
  title: string;
}): InvestigationTimelineEvent {
  return {
    id,
    caseFileId: caseFile001Id,
    title,
    dateLabel: "Date under review",
    datePrecision: "unknown",
    description,
    status: requiresResearch,
    confidence: unknown,
    relatedEvidence,
    relatedClaims: [],
    relatedSources,
    notes:
      "Date, source, claim, and historical context remain under review.",
  };
}

export const investigationTimelineEvents: readonly InvestigationTimelineEvent[] = [
  timelineEvent({
    id: "printing",
    title: "Printing",
    description:
      "The printing of the volume will be placed here only after bibliographic evidence has been reviewed.",
    relatedEvidence: [
      evidenceReferences.titlePage,
      evidenceReferences.barkerImprint,
      evidenceReferences.printersDevice,
      evidenceReferences.colophon,
    ],
    relatedSources: [sourceReview("herbert-bible-bibliography", "Herbert / Bible Bibliography"),
      sourceReview("estc-record", "ESTC Record"),
      sourceReview("title-page-observation", "Title Page Observation")],
  }),
  timelineEvent({
    id: "publication",
    title: "Publication",
    description:
      "Publication context will be added only after the title page, bibliographic sources, and related evidence have been reviewed.",
    relatedEvidence: [
      evidenceReferences.titlePage,
      evidenceReferences.genealogies,
      evidenceReferences.maps,
    ],
    relatedSources: [sourceReview("herbert-bible-bibliography", "Herbert / Bible Bibliography"),
      sourceReview("estc-record", "ESTC Record")],
  }),
  timelineEvent({
    id: "ownership",
    title: "Ownership",
    description:
      "Ownership or custody events will be arranged here when provenance sources can support them.",
    relatedEvidence: [
      evidenceReferences.binding,
      evidenceReferences.marginalNotes,
    ],
    relatedSources: [sourceReview("family-genealogy-research-source", "Family / Genealogy Research Source"),
      sourceReview("acquisition-purchase-memory", "Acquisition / Purchase Memory")],
  }),
  timelineEvent({
    id: "inscription",
    title: "Inscription",
    description:
      "The inscription will be placed in the chronology only after image review, transcription, and dating evidence are assessed.",
    relatedEvidence: [evidenceReferences.sidgwickInscription],
    relatedSources: [sourceReview("inscription-observation", "Inscription Observation")],
  }),
  timelineEvent({
    id: "discovery",
    title: "Discovery",
    description:
      "Discovery and acquisition context will be added when surviving records can be reviewed.",
    relatedSources: [sourceReview("acquisition-purchase-memory", "Acquisition / Purchase Memory")],
  }),
  timelineEvent({
    id: "modern-investigation",
    title: "Modern Investigation",
    description:
      "Modern research milestones will be recorded as formal notes and reviewed sources are added.",
    relatedSources: [
      sourceReview("appraiser-review-placeholder", "Appraiser Review"),
    ],
  }),
];
