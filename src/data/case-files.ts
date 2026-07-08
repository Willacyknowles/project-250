import type { CaseFile } from "@/types/case-file";

export const caseFiles: readonly CaseFile[] = [
  {
    id: "case-file-001",
    caseNumber: "001",
    slug: "1610-geneva-bible",
    collectionId: "knowles-collection",
    title: "The 1610 Geneva Bible",
    status: "draft",
    version: "0.1.0",
    leadInvestigator: "Will Knowles",
    summary:
      "This Case File is reserved for the first public investigation prototype. Evidence, claims, confidence changes, and provenance narrative require human-reviewed source entry before publication.",
    primaryQuestion:
      "What evidence can establish this artifact's provenance and ownership history?",
    confidence: "unknown",
    artifact: {
      type: "Book",
      title: "The 1610 Geneva Bible",
      dateLabel: "1610",
    },
    evidence: [],
    claims: [],
    timeline: [],
    researchQuestions: [
      {
        id: "rq-001",
        question:
          "Which primary sources should be entered first to support a reproducible provenance investigation?",
        status: "open",
      },
    ],
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
    ],
  },
];
