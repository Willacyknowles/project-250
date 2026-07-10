import type {
  SourceIndependenceLevel,
  SourceLibraryRecord,
  SourceRelationReference,
  SourceType,
} from "@/types/source";

const caseFile001Id = "case-file-001";
const requiresResearch = "Requires Research" as const;
const unknown = "unknown" as const;
const unknownIndependence = "unknown" satisfies SourceIndependenceLevel;

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
} satisfies Record<string, SourceRelationReference>;

const claimReferences = {
  bindingAssessment: {
    id: "binding-assessment",
    label: "Binding Assessment",
    status: requiresResearch,
  },
  dateOfPublication: {
    id: "date-of-publication",
    label: "Date of Publication",
    status: requiresResearch,
  },
  editionIdentification: {
    id: "edition-identification",
    label: "Edition Identification",
    status: requiresResearch,
  },
  genealogicalRelevance: {
    id: "genealogical-relevance",
    label: "Genealogical Relevance",
    status: requiresResearch,
  },
  marginaliaAnnotations: {
    id: "marginalia-annotations",
    label: "Marginalia / Annotations",
    status: requiresResearch,
  },
  physicalCompleteness: {
    id: "physical-completeness",
    label: "Physical Completeness",
    status: requiresResearch,
  },
  printerImprint: {
    id: "printer-imprint",
    label: "Printer / Imprint",
    status: requiresResearch,
  },
  provenanceChain: {
    id: "provenance-chain",
    label: "Provenance Chain",
    status: requiresResearch,
  },
  sidgwickInscription: {
    id: "sidgwick-inscription",
    label: "Sidgwick Inscription",
    status: requiresResearch,
  },
} satisfies Record<string, SourceRelationReference>;

const timelineReferences = {
  discovery: {
    id: "discovery",
    label: "Discovery",
    status: requiresResearch,
  },
  inscription: {
    id: "inscription",
    label: "Inscription",
    status: requiresResearch,
  },
  modernInvestigation: {
    id: "modern-investigation",
    label: "Modern Investigation",
    status: requiresResearch,
  },
  ownership: {
    id: "ownership",
    label: "Ownership",
    status: requiresResearch,
  },
  printing: {
    id: "printing",
    label: "Printing",
    status: requiresResearch,
  },
  publication: {
    id: "publication",
    label: "Publication",
    status: requiresResearch,
  },
} satisfies Record<string, SourceRelationReference>;

function revision(id: string) {
  return [
    {
      id: `${id}-rev-001`,
      version: "0.1.0",
      dateLabel: "2026-07-09",
      investigator: "Codex",
      summary:
        "Created placeholder source record for Source Library foundation. No historical conclusion was added.",
    },
  ] as const;
}

function sourceRecord({
  id,
  relatedClaims = [],
  relatedEvidence = [],
  relatedTimelineEvents = [],
  sourceType,
  title,
}: {
  id: string;
  relatedClaims?: readonly SourceRelationReference[];
  relatedEvidence?: readonly SourceRelationReference[];
  relatedTimelineEvents?: readonly SourceRelationReference[];
  sourceType: SourceType;
  title: string;
}): SourceLibraryRecord {
  return {
    id,
    caseFileId: caseFile001Id,
    title,
    sourceType,
    citationPlaceholder: "Requires Research",
    repositoryArchive: "Requires Research",
    status: requiresResearch,
    confidence: unknown,
    independenceLevel: unknownIndependence,
    relatedEvidence,
    relatedClaims,
    relatedTimelineEvents,
    notes:
      "Requires Research. This source has not been located, reviewed, cited, or connected to any historical conclusion.",
    revisionHistory: revision(id),
  };
}

export const sourceLibraryRecords: readonly SourceLibraryRecord[] = [
  sourceRecord({
    id: "herbert-bible-bibliography",
    title: "Herbert / Bible Bibliography",
    sourceType: "bibliography",
    relatedEvidence: [
      evidenceReferences.titlePage,
      evidenceReferences.barkerImprint,
      evidenceReferences.printersDevice,
      evidenceReferences.colophon,
    ],
    relatedClaims: [
      claimReferences.editionIdentification,
      claimReferences.printerImprint,
    ],
    relatedTimelineEvents: [
      timelineReferences.printing,
      timelineReferences.publication,
    ],
  }),
  sourceRecord({
    id: "estc-record",
    title: "ESTC Record",
    sourceType: "catalog-record",
    relatedEvidence: [
      evidenceReferences.titlePage,
      evidenceReferences.barkerImprint,
    ],
    relatedClaims: [
      claimReferences.editionIdentification,
      claimReferences.printerImprint,
      claimReferences.dateOfPublication,
    ],
    relatedTimelineEvents: [
      timelineReferences.printing,
      timelineReferences.publication,
    ],
  }),
  sourceRecord({
    id: "title-page-observation",
    title: "Title Page Observation",
    sourceType: "artifact-observation",
    relatedEvidence: [evidenceReferences.titlePage],
    relatedClaims: [
      claimReferences.editionIdentification,
      claimReferences.dateOfPublication,
      claimReferences.physicalCompleteness,
    ],
    relatedTimelineEvents: [
      timelineReferences.printing,
      timelineReferences.publication,
    ],
  }),
  sourceRecord({
    id: "inscription-observation",
    title: "Inscription Observation",
    sourceType: "artifact-observation",
    relatedEvidence: [evidenceReferences.sidgwickInscription],
    relatedClaims: [claimReferences.sidgwickInscription],
    relatedTimelineEvents: [timelineReferences.inscription],
  }),
  sourceRecord({
    id: "family-genealogy-research-source",
    title: "Family / Genealogy Research Source",
    sourceType: "research-source",
    relatedEvidence: [evidenceReferences.genealogies],
    relatedClaims: [
      claimReferences.provenanceChain,
      claimReferences.genealogicalRelevance,
    ],
    relatedTimelineEvents: [timelineReferences.ownership],
  }),
  sourceRecord({
    id: "acquisition-purchase-memory",
    title: "Acquisition / Purchase Memory",
    sourceType: "memory",
    relatedEvidence: [],
    relatedClaims: [claimReferences.provenanceChain],
    relatedTimelineEvents: [
      timelineReferences.ownership,
      timelineReferences.discovery,
    ],
  }),
  sourceRecord({
    id: "appraiser-review-placeholder",
    title: "Appraiser Review Placeholder",
    sourceType: "expert-review",
    relatedEvidence: [evidenceReferences.titlePage, evidenceReferences.binding],
    relatedClaims: [
      claimReferences.physicalCompleteness,
      claimReferences.bindingAssessment,
      claimReferences.marginaliaAnnotations,
    ],
    relatedTimelineEvents: [timelineReferences.modernInvestigation],
  }),
];
