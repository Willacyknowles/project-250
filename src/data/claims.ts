import type { ClaimEngineRecord, ClaimType } from "@/types/claim";

const caseFile001Id = "case-file-001";
const requiresResearch = "Requires Research" as const;
const unknown = "unknown" as const;

function revision(id: string) {
  return [
    {
      id: `${id}-rev-001`,
      version: "0.1.0",
      dateLabel: "2026-07-09",
      investigator: "Codex",
      summary:
        "Created placeholder claim record for Claims Engine foundation. No historical conclusion was added.",
    },
  ] as const;
}

function openQuestion(id: string, question: string) {
  return {
    id,
    question,
    status: "open",
  } as const;
}

function claimRecord({
  claimType,
  id,
  openQuestions,
  relatedEvidenceIds = [],
  relatedSourceIds = [],
  relatedTimelineEventIds = [],
  title,
}: {
  claimType: ClaimType;
  id: string;
  openQuestions: readonly ReturnType<typeof openQuestion>[];
  relatedEvidenceIds?: readonly string[];
  relatedSourceIds?: readonly string[];
  relatedTimelineEventIds?: readonly string[];
  title: string;
}): ClaimEngineRecord {
  return {
    id,
    caseFileId: caseFile001Id,
    title,
    claimType,
    statement: `Requires Research. ${title} has not been verified as a historical conclusion.`,
    status: requiresResearch,
    confidence: unknown,
    relatedEvidenceIds,
    relatedSourceIds,
    relatedTimelineEventIds,
    notes:
      "Requires Research. This claim is a placeholder assertion container and must not be treated as supported until evidence, sources, and human review are complete.",
    openQuestions,
    revisionHistory: revision(id),
  };
}

export const claimEngineRecords: readonly ClaimEngineRecord[] = [
  claimRecord({
    id: "edition-identification",
    title: "Edition Identification",
    claimType: "edition-identification",
    relatedEvidenceIds: [
      "title-page",
      "barker-imprint",
      "printers-device",
      "colophon",
    ],
    relatedSourceIds: [
      "herbert-bible-bibliography",
      "estc-record",
      "title-page-observation",
    ],
    relatedTimelineEventIds: ["printing", "publication"],
    openQuestions: [
      openQuestion(
        "edition-identification-question-001",
        "Which reviewed bibliographic sources support the edition identification?",
      ),
    ],
  }),
  claimRecord({
    id: "printer-imprint",
    title: "Printer / Imprint",
    claimType: "printer-imprint",
    relatedEvidenceIds: ["title-page", "barker-imprint", "printers-device"],
    relatedSourceIds: [
      "herbert-bible-bibliography",
      "estc-record",
      "title-page-observation",
    ],
    relatedTimelineEventIds: ["printing"],
    openQuestions: [
      openQuestion(
        "printer-imprint-question-001",
        "What reviewed evidence verifies the printer or imprint statement?",
      ),
    ],
  }),
  claimRecord({
    id: "date-of-publication",
    title: "Date of Publication",
    claimType: "publication-date",
    relatedEvidenceIds: ["title-page", "barker-imprint", "colophon"],
    relatedSourceIds: ["estc-record", "title-page-observation"],
    relatedTimelineEventIds: ["printing", "publication"],
    openQuestions: [
      openQuestion(
        "date-of-publication-question-001",
        "Which artifact evidence or reviewed source establishes the publication date?",
      ),
    ],
  }),
  claimRecord({
    id: "sidgwick-inscription",
    title: "Sidgwick Inscription",
    claimType: "inscription",
    relatedEvidenceIds: ["sidgwick-inscription"],
    relatedSourceIds: ["inscription-observation"],
    relatedTimelineEventIds: ["inscription"],
    openQuestions: [
      openQuestion(
        "sidgwick-inscription-question-001",
        "What transcription, image review, and dating evidence is required for this inscription?",
      ),
    ],
  }),
  claimRecord({
    id: "provenance-chain",
    title: "Provenance Chain",
    claimType: "provenance-chain",
    relatedEvidenceIds: ["binding", "marginal-notes", "sidgwick-inscription"],
    relatedSourceIds: [
      "family-genealogy-research-source",
      "acquisition-purchase-memory",
    ],
    relatedTimelineEventIds: ["ownership", "discovery"],
    openQuestions: [
      openQuestion(
        "provenance-chain-question-001",
        "Can each ownership or custody step be tied to a reviewed source?",
      ),
    ],
  }),
  claimRecord({
    id: "physical-completeness",
    title: "Physical Completeness",
    claimType: "physical-completeness",
    relatedEvidenceIds: ["title-page", "genealogies", "maps", "colophon"],
    relatedSourceIds: ["title-page-observation", "appraiser-review-placeholder"],
    relatedTimelineEventIds: ["publication", "modern-investigation"],
    openQuestions: [
      openQuestion(
        "physical-completeness-question-001",
        "What reviewed collation or artifact examination is required to assess completeness?",
      ),
    ],
  }),
  claimRecord({
    id: "binding-assessment",
    title: "Binding Assessment",
    claimType: "binding-assessment",
    relatedEvidenceIds: ["binding"],
    relatedSourceIds: ["appraiser-review-placeholder"],
    relatedTimelineEventIds: ["ownership", "modern-investigation"],
    openQuestions: [
      openQuestion(
        "binding-assessment-question-001",
        "What reviewed physical examination is required to describe the binding?",
      ),
    ],
  }),
  claimRecord({
    id: "marginalia-annotations",
    title: "Marginalia / Annotations",
    claimType: "marginalia-annotations",
    relatedEvidenceIds: ["marginal-notes"],
    relatedSourceIds: ["appraiser-review-placeholder"],
    relatedTimelineEventIds: ["ownership", "modern-investigation"],
    openQuestions: [
      openQuestion(
        "marginalia-annotations-question-001",
        "What image review and transcription work is required for marginal notes?",
      ),
    ],
  }),
  claimRecord({
    id: "genealogical-relevance",
    title: "Genealogical Relevance",
    claimType: "genealogical-relevance",
    relatedEvidenceIds: ["genealogies"],
    relatedSourceIds: ["family-genealogy-research-source"],
    relatedTimelineEventIds: ["publication", "ownership"],
    openQuestions: [
      openQuestion(
        "genealogical-relevance-question-001",
        "What reviewed source work is required before genealogical relevance can be stated?",
      ),
    ],
  }),
];
