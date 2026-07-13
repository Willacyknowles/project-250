import type {
  ProvenanceExperience,
  ProvenanceExperienceImage,
} from "@/types/provenance-experience";

const objectId = "1630-king-james-bible";
const basePath = "/images/knowles-collection/1630-king-james-bible";

const image = (
  file: string,
  label: string,
  alt: string,
  width: number,
  height = 1280,
): ProvenanceExperienceImage => ({
  alt,
  height,
  label,
  src: `${basePath}/${file}`,
  width,
});

const frontBoard = image(
  "front-board.jpg",
  "Closed volume",
  "The 1630 King James Bible standing closed, showing a worn brown binding with brass decoration.",
  947,
);

const angledBoard = image(
  "front-board-angled.jpg",
  "Front board and fittings",
  "Angled view of the closed 1630 King James Bible showing the front board, worn leather, and metal fittings.",
  874,
);

const foreEdge = image(
  "fore-edge.jpg",
  "Fore edge",
  "Fore-edge view of the 1630 King James Bible showing the page block between the boards.",
  937,
);

export const bible1630ProvenanceExperience = {
  id: "prototype-1630-king-james-bible",
  slug: "1630-king-james-bible",
  objectId,
  collectionLabel: "THE KNOWLES COLLECTION",
  objectTitle: "1630 King James Bible",
  title: "396 Years of the King James Bible",
  subtitle: "History as Inheritance",
  thematicLine: "Follow the surviving evidence through time.",
  statusLabel: "Active Investigation",
  statusDescription:
    "This photographic examination begins with the surviving volume and separates visible evidence from interpretation still under review.",
  entryImage: frontBoard,
  exitHref: "/#collection",
  sourceHref: "/#research",
  unresolvedHref: "/#access",
  developmentOnly: false,
  orientation: {
    desktop:
      "Scroll to move through time. Select an evidence marker to examine it. Use arrow keys to move, Enter to open, Escape to close, H for help, and M for sound.",
    mobile:
      "Swipe upward to follow the evidence through time. Tap an evidence marker to examine it. Sound is optional and the experience remains complete without it.",
  },
  nodes: [
    {
      id: "surviving-object",
      objectId,
      dateLabel: "Object Encounter",
      category: "material-evidence",
      title: "The Surviving Object",
      evidenceKind: "direct-observation",
      observation:
        "The volume survives as a substantial closed book with worn brown leather, brass decoration, metal fittings, raised spine bands, and a visible page block.",
      question:
        "Which visible features belong to the book's original manufacture, and which belong to later binding, repair, handling, or storage?",
      interpretation:
        "The exterior offers the first evidence layer. Its wear, fittings, spine, and page edges can be examined before any ownership history is asserted.",
      sourceSummary:
        "Current evidence is limited to direct photographic observation of the object exterior.",
      confidence: "supported",
      confidenceRationale:
        "The exterior features named here are visible in supplied object photographs; their dating and sequence remain under review.",
      image: angledBoard,
      evidenceIds: [],
      sourceIds: [],
    },
    {
      id: "printed-in-london-1630",
      objectId,
      dateLabel: "1630",
      startYear: 1630,
      category: "printing",
      title: "Printed in London, 1630",
      evidenceKind: "documented-fact",
      observation:
        "The object is identified in this exhibition as a 1630 King James Bible; the imprint and bibliographic record remain the evidence to be reviewed in detail.",
      question:
        "How should the imprint be transcribed, and which bibliography or catalogue record should support the publication statement?",
      interpretation:
        "The date anchors the examination, but printer, edition, and bibliographic identity should remain tied to reviewed title-page and imprint evidence.",
      sourceSummary:
        "Imprint transcription and bibliographic source review are still being prepared for public citation.",
      confidence: "possible",
      confidenceRationale:
        "The exhibition title supplies the working date; detailed bibliographic confidence awaits review of the imprint and sources.",
      evidenceIds: [],
      sourceIds: [],
    },
    {
      id: "title-page-identity",
      objectId,
      dateLabel: "Bibliographic Identity",
      category: "documentary-source",
      title: "The Title Page as Identity",
      evidenceKind: "supported-inference",
      observation:
        "The title page is the expected primary witness for edition identity, wording, printer information, and publication date.",
      question:
        "What exactly appears on the title page, and how does it compare with reviewed bibliographic descriptions?",
      interpretation:
        "Identity should be established from transcription and source comparison rather than from the date label alone.",
      sourceSummary:
        "Title-page photography and catalogue comparison are under review before transcription is published.",
      confidence: "unresolved",
      confidenceRationale:
        "The title page has not yet been connected to a reviewed public source in this repository.",
      evidenceIds: [],
      sourceIds: [],
    },
    {
      id: "addressed-to-a-king",
      objectId,
      dateLabel: "Dedication",
      category: "documentary-source",
      title: "Addressed to a King",
      evidenceKind: "contextual-association",
      observation:
        "King James Bibles commonly include prefatory material addressed to the monarch, but this copy's dedication page must be examined directly.",
      question:
        "Which prefatory leaves survive in this volume, and what do they reveal about completeness and use?",
      interpretation:
        "The dedication can provide context for the edition, but it should not be used as provenance evidence unless this copy's page is documented.",
      sourceSummary:
        "Dedication-page photography and completeness notes are under review.",
      confidence: "contextual",
      confidenceRationale:
        "The dedication is relevant edition context; this copy's surviving prefatory leaves still need direct documentation.",
      evidenceIds: [],
      sourceIds: [],
    },
    {
      id: "later-hands-enter-the-book",
      objectId,
      dateLabel: "Later Hands",
      category: "inscription",
      title: "Later Hands Enter the Book",
      evidenceKind: "unresolved-question",
      observation:
        "Any inscriptions, family records, signatures, or marginal notes would belong to a later evidence layer distinct from printing and binding.",
      question:
        "Which later marks are present, who made them, and can any be connected to documentary sources without overstating the evidence?",
      interpretation:
        "Human marks may eventually become the strongest provenance clues, but names and relationships must be tested before they become part of the story.",
      sourceSummary:
        "Inscription and family-record photography are still under curatorial review.",
      confidence: "unresolved",
      confidenceRationale:
        "No ownership relationship or family connection is asserted until the marks and sources are reviewed together.",
      image: foreEdge,
      evidenceIds: [],
      sourceIds: [],
    },
  ],
} as const satisfies ProvenanceExperience;
