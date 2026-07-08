import type { CaseFile, ResearchStatus } from "@/types/case-file";

const documented = "Documented" satisfies ResearchStatus;
const requiresResearch = "Requires Research" satisfies ResearchStatus;

export const caseFiles: readonly CaseFile[] = [
  {
    id: "case-file-001",
    caseNumber: "001",
    slug: "1610-geneva-bible",
    collectionId: "knowles-collection",
    title: "The 1610 Geneva Bible",
    status: "draft",
    version: "0.2.0",
    leadInvestigator: "Will Knowles",
    summary:
      "Requires Research. This dossier establishes the production Case File structure for the 1610 Geneva Bible without publishing unverified provenance, physical description, evidence, claims, or sources.",
    primaryQuestion:
      "What evidence can establish this artifact's provenance, physical characteristics, and ownership history?",
    confidence: "unknown",
    artifact: {
      type: "Requires Research",
      title: "The 1610 Geneva Bible",
      dateLabel: "1610",
    },
    overview: {
      status: requiresResearch,
      summary:
        "Requires Research. The public dossier is ready for evidence intake, but historical conclusions are intentionally withheld until primary sources and artifact documentation are reviewed.",
      fields: [
        {
          label: "Case Number",
          value: "001",
          status: documented,
        },
        {
          label: "Working Title",
          value: "The 1610 Geneva Bible",
          status: requiresResearch,
          note: "Validate against artifact images, title page, cataloging notes, and source records.",
        },
        {
          label: "Collection",
          value: "The Knowles Collection",
          status: documented,
        },
        {
          label: "Publication Readiness",
          value: "Not ready for historical publication",
          status: requiresResearch,
          note: "Evidence, sources, claims, and confidence review must be completed first.",
        },
      ],
    },
    provenance: {
      status: requiresResearch,
      summary:
        "Requires Research. No provenance chain is published for this Case File until each ownership or custody statement is tied to evidence.",
      fields: [
        {
          label: "Earliest Documented Owner",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Known Ownership Chain",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Acquisition Path",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Contradictory Evidence",
          value: "Requires Research",
          status: requiresResearch,
        },
      ],
    },
    physicalDescription: {
      status: requiresResearch,
      summary:
        "Requires Research. Physical description should come from direct examination, images, measurements, and condition notes.",
      fields: [
        {
          label: "Artifact Type",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Date Evidence",
          value: "Requires Research",
          status: requiresResearch,
          note: "The 1610 date label must be confirmed from artifact evidence or source documentation.",
        },
        {
          label: "Binding",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Dimensions",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Completeness",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Inscriptions and Marks",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Condition",
          value: "Requires Research",
          status: requiresResearch,
        },
        {
          label: "Image Set",
          value: "Requires Research",
          status: requiresResearch,
        },
      ],
    },
    evidence: [],
    claims: [],
    timeline: [],
    sources: [],
    researchQuestions: [
      {
        id: "rq-001-primary-sources",
        question:
          "Which primary sources establish the artifact's identity, date, and provenance?",
        status: "open",
      },
      {
        id: "rq-002-physical-review",
        question:
          "What direct physical description should be recorded from examination or images?",
        status: "open",
      },
      {
        id: "rq-003-provenance-chain",
        question:
          "Can each ownership or custody step be tied to a specific source?",
        status: "open",
      },
      {
        id: "rq-004-conflicts",
        question:
          "Are there conflicting dates, descriptions, inscriptions, or ownership claims that must be preserved?",
        status: "open",
      },
    ],
    confidenceAssessment: {
      level: "unknown",
      status: requiresResearch,
      rationale:
        "Requires Research. Confidence remains unknown because no evidence, sources, claims, or timeline events have been entered for public review.",
      requirements: [
        "Add primary-source evidence records.",
        "Document physical description from artifact review.",
        "Link every claim to supporting evidence and counter-evidence where applicable.",
        "Record provenance timeline events only after source review.",
        "Complete human confidence review before publication.",
      ],
    },
    contributors: [
      {
        id: "will-knowles",
        name: "Will Knowles",
        role: "Lead Investigator",
      },
    ],
    revisions: [
      {
        id: "rev-001-foundation",
        version: "0.1.0",
        dateLabel: "2026-07-06",
        investigator: "Codex",
        summary:
          "Created the public Case File prototype structure without adding historical evidence or conclusions.",
      },
      {
        id: "rev-002-dossier",
        version: "0.2.0",
        dateLabel: "2026-07-07",
        investigator: "Codex",
        summary:
          "Replaced placeholder content with a structured dossier and marked unverified historical content as Requires Research.",
      },
    ],
  },
];
