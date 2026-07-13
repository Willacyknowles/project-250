import type { ProvenanceExperience } from "@/types/provenance-experience";

const objectId = "1630-king-james-bible";

export const bible1630ProvenanceExperience = {
  id: "prototype-1630-king-james-bible",
  slug: "1630-king-james-bible",
  objectId,
  collectionLabel: "THE KNOWLES COLLECTION",
  objectTitle: "1630 King James Bible",
  title: "396 Years of the King James Bible",
  subtitle: "History as Inheritance",
  thematicLine: "Follow the surviving evidence through time.",
  statusLabel: "Development Prototype",
  statusDescription:
    "The repository does not yet contain a public 1630 object record, evidence set, source set, or artifact photography. This prototype validates the interaction model without publishing historical claims.",
  exitHref: "/",
  developmentOnly: true,
  orientation: {
    desktop:
      "Scroll to move through time. Select an evidence marker to examine it. Use arrow keys to move, Enter to open, Escape to close, H for help, and M for sound.",
    mobile:
      "Swipe upward to follow the evidence through time. Tap an evidence marker to examine it. Sound is optional and the experience remains complete without it.",
  },
  nodes: [
    {
      id: "object-record-needed",
      objectId,
      dateLabel: "Object record pending",
      category: "open-question",
      title: "Object Record Needed",
      evidenceKind: "unresolved-question",
      observation:
        "No public case-file record for the 1630 King James Bible exists in the repository.",
      question:
        "What verified object record should establish identity, date evidence, format, condition, and research scope?",
      interpretation:
        "The prototype can test movement and evidence presentation, but historical interpretation must wait for a reviewed record.",
      sourceSummary: "No source record is currently attached to this object.",
      confidence: "unresolved",
      confidenceRationale:
        "The repository contains only a future collection pathway, not reviewed object evidence.",
      evidenceIds: [],
      sourceIds: [],
      developmentOnly: true,
    },
    {
      id: "artifact-photography-needed",
      objectId,
      dateLabel: "Photography required",
      category: "material-evidence",
      title: "Artifact Photography Required",
      evidenceKind: "direct-observation",
      observation:
        "No 1630 artifact photographs are available in public assets.",
      question:
        "Which views are required before visitors can examine the binding, page edges, inscriptions, or material details?",
      interpretation:
        "A high-quality 2.5D object encounter should use real photography only after the object has been documented.",
      sourceSummary: "Image source and capture details are missing.",
      confidence: "unresolved",
      confidenceRationale:
        "The experience cannot represent the object visually until real artifact photography is supplied.",
      evidenceIds: [],
      sourceIds: [],
      developmentOnly: true,
    },
    {
      id: "evidence-model-ready",
      objectId,
      dateLabel: "Evidence model ready",
      category: "research-revision",
      title: "Evidence Model Ready",
      evidenceKind: "contextual-association",
      observation:
        "Project 250 already separates evidence, claims, sources, timeline events, and confidence states for the 1610 case file.",
      question:
        "How should the 1630 object inherit this structure once its evidence is reviewed?",
      interpretation:
        "The same experience engine can connect future 1630 nodes to evidence IDs, source IDs, confidence rationale, and case-file links.",
      sourceSummary: "Architecture and existing 1610 records provide the structural model.",
      confidence: "contextual",
      confidenceRationale:
        "This is a platform architecture observation, not a historical claim about the 1630 object.",
      evidenceIds: [],
      sourceIds: [],
      developmentOnly: true,
    },
    {
      id: "case-file-pending",
      objectId,
      dateLabel: "Case file pending",
      category: "documentary-source",
      title: "Case File Pending",
      evidenceKind: "unresolved-question",
      observation:
        "There is no public route for a 1630 King James Bible case file.",
      question:
        "Which evidence categories, sources, claims, and open questions should be created before publication?",
      interpretation:
        "The immersive route should remain separate from historical publication until the case file exists.",
      sourceSummary: "No 1630 case-file source library is present.",
      confidence: "unresolved",
      confidenceRationale:
        "No repository source can yet support a public 1630 chronology.",
      evidenceIds: [],
      sourceIds: [],
      developmentOnly: true,
    },
    {
      id: "investigation-continues",
      objectId,
      dateLabel: "Investigation continues",
      category: "open-question",
      title: "The Investigation Continues",
      evidenceKind: "unresolved-question",
      observation:
        "A rare book does not arrive with a complete history.",
      question:
        "What survives, what can be verified, and what must remain unknown?",
      interpretation:
        "The finished experience should end with stewardship, not certainty.",
      sourceSummary: "Future evidence and sources will determine the public narrative.",
      confidence: "unresolved",
      confidenceRationale:
        "The prototype intentionally preserves uncertainty until reviewed records exist.",
      evidenceIds: [],
      sourceIds: [],
      developmentOnly: true,
    },
  ],
} as const satisfies ProvenanceExperience;
