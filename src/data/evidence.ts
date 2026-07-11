import type { EvidenceItem } from "@/types/evidence";

const caseFile001Id = "case-file-001";
const requiresResearch = "Requires Research" as const;
const unknown = "unknown" as const;

function researchPlaceholder(label: string) {
  return {
    label,
    status: requiresResearch,
    description:
      "Image documentation is being prepared for this object record.",
  } as const;
}

function sourcePlaceholder(id: string) {
  return [
    {
      id: `${id}-source-review`,
      label: "Source Review Needed",
      citation: "Citation under review",
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
      investigator: "The Knowles Collection",
      summary:
        "Evidence category defined for future examination and source review.",
    },
  ] as const;
}

export const evidenceItems: readonly EvidenceItem[] = [
  {
    id: "title-page",
    title: "Title Page",
    description:
      "To be examined for title-page evidence, transcription, image review, and bibliographic comparison.",
    artifactType: "artifact-component",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("title-page"),
    imagePlaceholder: researchPlaceholder("Title Page Image"),
    archiveMediaIds: ["title-page-archive-placeholder"],
    revisionHistory: revision("title-page"),
  },
  {
    id: "sidgwick-inscription",
    title: "Sidgwick Inscription",
    description:
      "To be examined through inscription imagery, transcription, attribution review, and provenance assessment.",
    artifactType: "inscription",
    evidenceType: "photograph",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("sidgwick-inscription"),
    imagePlaceholder: researchPlaceholder("Inscription Image"),
    archiveMediaIds: ["sidgwick-inscription-archive-placeholder"],
    revisionHistory: revision("sidgwick-inscription"),
  },
  {
    id: "barker-imprint",
    title: "Barker Imprint",
    description:
      "To be examined for imprint evidence, source comparison, and bibliographic verification.",
    artifactType: "imprint",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("barker-imprint"),
    imagePlaceholder: researchPlaceholder("Imprint Image"),
    archiveMediaIds: ["barker-imprint-archive-placeholder"],
    revisionHistory: revision("barker-imprint"),
  },
  {
    id: "binding",
    title: "Binding",
    description:
      "To be examined through binding photography, material description, condition notes, and dating assessment.",
    artifactType: "binding",
    evidenceType: "photograph",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("binding"),
    imagePlaceholder: researchPlaceholder("Binding Image"),
    archiveMediaIds: ["binding-archive-placeholder"],
    revisionHistory: revision("binding"),
  },
  {
    id: "marginal-notes",
    title: "Marginal Notes",
    description:
      "To be examined through marginalia imagery, transcription, hand comparison, and interpretive review.",
    artifactType: "annotation",
    evidenceType: "photograph",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("marginal-notes"),
    imagePlaceholder: researchPlaceholder("Marginal Notes Image"),
    archiveMediaIds: ["marginal-notes-archive-placeholder"],
    revisionHistory: revision("marginal-notes"),
  },
  {
    id: "printers-device",
    title: "Printer's Device",
    description:
      "To be examined through printer's device imagery, comparison, and bibliographic source review.",
    artifactType: "printer-device",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("printers-device"),
    imagePlaceholder: researchPlaceholder("Printer's Device Image"),
    archiveMediaIds: ["printers-device-archive-placeholder"],
    revisionHistory: revision("printers-device"),
  },
  {
    id: "genealogies",
    title: "Genealogies",
    description:
      "To be examined for genealogical content, completeness, and image documentation.",
    artifactType: "genealogical-record",
    evidenceType: "document",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("genealogies"),
    imagePlaceholder: researchPlaceholder("Genealogies Image"),
    archiveMediaIds: ["genealogies-archive-placeholder"],
    revisionHistory: revision("genealogies"),
  },
  {
    id: "maps",
    title: "Maps",
    description:
      "To be examined for map presence, condition, completeness, and source comparison.",
    artifactType: "map",
    evidenceType: "map",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("maps"),
    imagePlaceholder: researchPlaceholder("Maps Image"),
    archiveMediaIds: ["maps-archive-placeholder"],
    revisionHistory: revision("maps"),
  },
  {
    id: "colophon",
    title: "Colophon",
    description:
      "To be examined through colophon imagery, transcription, and bibliographic verification.",
    artifactType: "colophon",
    evidenceType: "digital-image",
    status: requiresResearch,
    confidence: unknown,
    relatedCaseFileId: caseFile001Id,
    relatedClaimIds: [],
    sourceReferences: sourcePlaceholder("colophon"),
    imagePlaceholder: researchPlaceholder("Colophon Image"),
    archiveMediaIds: ["colophon-archive-placeholder"],
    revisionHistory: revision("colophon"),
  },
];
