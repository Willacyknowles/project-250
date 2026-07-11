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
      "A four-century-old English Bible, a Victorian inscription, and a trail of names, places, and unanswered questions.",
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
        "This investigation begins with the object itself: its printed text, physical construction, handwritten marks, and surviving documentary trail.",
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
          note: "To be checked against the artifact, title page, catalogue references, and source notes.",
        },
        {
          label: "Collection",
          value: "The Knowles Collection",
          status: documented,
        },
        {
          label: "Collection Status",
          value: "Active Investigation",
          status: requiresResearch,
          note: "Evidence, sources, interpretations, and confidence review remain in progress.",
        },
      ],
    },
    provenance: {
      status: requiresResearch,
      summary:
        "The ownership history of the volume has not yet been reconstructed. Each name, transfer, and custody statement must be tied to evidence before it is presented as part of the chain.",
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
        "The material description awaits direct examination, photography, measurements, collation, and condition notes.",
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
          note: "The 1610 date must be checked against artifact evidence and reviewed bibliographic sources.",
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
        "Confidence remains unknown while the evidence, sources, interpretations, and chronology are under review.",
      requirements: [
        "Record primary-source evidence.",
        "Document the physical description from artifact review.",
        "Link every interpretation to supporting evidence and counter-evidence where applicable.",
        "Add provenance events only after source review.",
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
        investigator: "The Knowles Collection",
        summary:
          "Initial case structure established for the public research record.",
      },
      {
        id: "rev-002-dossier",
        version: "0.2.0",
        dateLabel: "2026-07-07",
        investigator: "The Knowles Collection",
        summary:
          "Evidence categories defined and unresolved historical content kept under review.",
      },
    ],
  },
];
