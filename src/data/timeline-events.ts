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

function placeholderEvent({
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
    dateLabel: "Requires Research",
    datePrecision: "unknown",
    description,
    status: requiresResearch,
    confidence: unknown,
    relatedEvidence,
    relatedClaims: [],
    relatedSources,
    notes:
      "Requires Research. No date, source, claim, or historical conclusion has been verified for this timeline event.",
  };
}

export const investigationTimelineEvents: readonly InvestigationTimelineEvent[] = [
  placeholderEvent({
    id: "printing",
    title: "Printing",
    description:
      "Requires Research. Placeholder for a future printing-related event after bibliographic evidence is verified.",
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
  placeholderEvent({
    id: "publication",
    title: "Publication",
    description:
      "Requires Research. Placeholder for a future publication context event after source review.",
    relatedEvidence: [
      evidenceReferences.titlePage,
      evidenceReferences.genealogies,
      evidenceReferences.maps,
    ],
    relatedSources: [sourceReview("herbert-bible-bibliography", "Herbert / Bible Bibliography"),
      sourceReview("estc-record", "ESTC Record")],
  }),
  placeholderEvent({
    id: "ownership",
    title: "Ownership",
    description:
      "Requires Research. Placeholder for future ownership or custody events once provenance sources are verified.",
    relatedEvidence: [
      evidenceReferences.binding,
      evidenceReferences.marginalNotes,
    ],
    relatedSources: [sourceReview("family-genealogy-research-source", "Family / Genealogy Research Source"),
      sourceReview("acquisition-purchase-memory", "Acquisition / Purchase Memory")],
  }),
  placeholderEvent({
    id: "inscription",
    title: "Inscription",
    description:
      "Requires Research. Placeholder for a future inscription event if inscription evidence is verified and dated.",
    relatedEvidence: [evidenceReferences.sidgwickInscription],
    relatedSources: [sourceReview("inscription-observation", "Inscription Observation")],
  }),
  placeholderEvent({
    id: "discovery",
    title: "Discovery",
    description:
      "Requires Research. Placeholder for future discovery or intake documentation once records are reviewed.",
    relatedSources: [sourceReview("acquisition-purchase-memory", "Acquisition / Purchase Memory")],
  }),
  placeholderEvent({
    id: "modern-investigation",
    title: "Modern Investigation",
    description:
      "Requires Research. Placeholder for future modern investigation milestones once formal notes are entered.",
    relatedSources: [
      sourceReview("appraiser-review-placeholder", "Appraiser Review Placeholder"),
    ],
  }),
];

