import type { EvidenceItem } from "@/types/evidence";

const caseFile001Id = "case-file-001";
const requiresResearch = "Requires Research" as const;
const unknown = "unknown" as const;

function researchPlaceholder(label: string) {
  return {
    label,
    status: requiresResearch,
    description:
      "Requires Research. Image evidence has not been uploaded or verified for this record.",
  } as const;
}

function sourcePlaceholder(id: string) {
  return [
    {
      id: `${id}-source-review`,
      label: "Source Review Pending",
      citation: "Requires Research",
      status: requiresResearch,
    },
  ] as const;
}

function revision(id: string) {
  return [
    {
      id: `${id}-rev-001`,
      version: "0.1.0",
      dateLabel: "2026-07-08",
      investigator: "Codex",
      summary:
        "Created placeholder evidence record for Evidence Vault foundation. No historical conclusion was added.",
    },
  ] as const;
}

export const evidenceItems: readonly EvidenceItem[] = [
  {
    id: "title-page",
    title: "Title Page",
    description:
      "Requires Research. Reserve record for title page documentation, transcription, image review, and bibliographic verification.",
    artifactType: "artifact-component",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("title-page"),
    imagePlaceholder: researchPlaceholder("Title Page Image"),
    revisionHistory: revision("title-page"),
  },
  {
    id: "sidgwick-inscription",
    title: "Sidgwick Inscription",
    description:
      "Requires Research. Reserve record for inscription imagery, transcription, attribution review, and provenance relevance assessment.",
    artifactType: "inscription",
    evidenceType: "photograph",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("sidgwick-inscription"),
    imagePlaceholder: researchPlaceholder("Inscription Image"),
    revisionHistory: revision("sidgwick-inscription"),
  },
  {
    id: "barker-imprint",
    title: "Barker Imprint",
    description:
      "Requires Research. Reserve record for imprint documentation, source comparison, and bibliographic verification.",
    artifactType: "imprint",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("barker-imprint"),
    imagePlaceholder: researchPlaceholder("Imprint Image"),
    revisionHistory: revision("barker-imprint"),
  },
  {
    id: "binding",
    title: "Binding",
    description:
      "Requires Research. Reserve record for binding photographs, material description, condition notes, and dating assessment.",
    artifactType: "binding",
    evidenceType: "photograph",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("binding"),
    imagePlaceholder: researchPlaceholder("Binding Image"),
    revisionHistory: revision("binding"),
  },
  {
    id: "marginal-notes",
    title: "Marginal Notes",
    description:
      "Requires Research. Reserve record for marginalia images, transcription, hand comparison, and interpretive review.",
    artifactType: "annotation",
    evidenceType: "photograph",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("marginal-notes"),
    imagePlaceholder: researchPlaceholder("Marginal Notes Image"),
    revisionHistory: revision("marginal-notes"),
  },
  {
    id: "printers-device",
    title: "Printer's Device",
    description:
      "Requires Research. Reserve record for printer's device imagery, comparison, and bibliographic source review.",
    artifactType: "printer-device",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("printers-device"),
    imagePlaceholder: researchPlaceholder("Printer's Device Image"),
    revisionHistory: revision("printers-device"),
  },
  {
    id: "genealogies",
    title: "Genealogies",
    description:
      "Requires Research. Reserve record for genealogical content review, completeness check, and image documentation.",
    artifactType: "genealogical-record",
    evidenceType: "document",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("genealogies"),
    imagePlaceholder: researchPlaceholder("Genealogies Image"),
    revisionHistory: revision("genealogies"),
  },
  {
    id: "maps",
    title: "Maps",
    description:
      "Requires Research. Reserve record for map presence, condition, completeness, and source comparison.",
    artifactType: "map",
    evidenceType: "map",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("maps"),
    imagePlaceholder: researchPlaceholder("Maps Image"),
    revisionHistory: revision("maps"),
  },
  {
    id: "colophon",
    title: "Colophon",
    description:
      "Requires Research. Reserve record for colophon imagery, transcription, and bibliographic verification.",
    artifactType: "colophon",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("colophon"),
    imagePlaceholder: researchPlaceholder("Colophon Image"),
    revisionHistory: revision("colophon"),
  },
];