import { readingRoomImages } from "@/config/reading-room-assets";

export const homepageContent = {
  navigation: [
    { href: "#collection", label: "Collection" },
    { href: "#exhibitions", label: "Exhibitions" },
    { href: "#research", label: "Research" },
    { href: "/case-files", label: "Case Files" },
    { href: "#journal", label: "Journal" },
    { href: "#access", label: "Visit" },
  ],
  mobileNavigation: [
    { href: "#opening", label: "Explore" },
    { href: "#collection", label: "Collection" },
    { href: "#research", label: "Research" },
    { href: "#access", label: "Visit" },
  ],
  hero: {
    eyebrow: "THE KNOWLES COLLECTION",
    title: "1610 Geneva Bible",
    statement: "Four centuries of survival.",
    intro:
      "A rare early English Bible is examined through its binding, page edges, inscriptions, and surviving documentary trail.",
    primaryAction: "Open the Bible",
    secondaryAction: "Explore the Collection",
  },
  heroMetadata: [
    ["Case File", "001"],
    ["Collection", "Private collection"],
    ["Status", "Active Investigation"],
    ["Confidence", "Unknown"],
  ],
  exhibition: {
    label: "Current Exhibition",
    title: "The 1610 Geneva Bible",
    copy:
      "The first public case file follows a single surviving volume through direct observation, source review, and open questions. Its identity, provenance, material description, and confidence level remain under active review.",
    image: readingRoomImages.supporting[0],
    metadata: [
      ["Date", "1610"],
      ["Printer", "Source review needed"],
      ["Format", "Physical description under review"],
      ["Collection", "The Knowles Collection"],
      ["Research status", "Active Investigation"],
      ["Case file", "Available"],
    ],
  },
  collection: [
    {
      actionLabel: "Open Case File",
      category: "Case File 001",
      description:
        "The opening investigation of The Knowles Collection, presented through evidence, source review, and unresolved questions.",
      href: "/case-files/1610-geneva-bible",
      image: readingRoomImages.primary,
      meta: "1610",
      status: "Active Investigation",
      title: "1610 Geneva Bible",
    },
    {
      actionLabel: "View Prototype",
      category: "Future Object Record",
      description:
        "A development pathway for testing provenance exploration before the 1630 object record, evidence, and photography are ready for public review.",
      href: "/provenance/1630-king-james-bible",
      image: null,
      meta: "1630",
      status: "Cataloguing in progress",
      title: "1630 King James Bible",
    },
    {
      actionLabel: "Catalogue Pending",
      category: "Collection Pathway",
      description:
        "Family Bible material will be separated into object records as documentation and source review are prepared.",
      image: null,
      meta: "Era under review",
      status: "Cataloguing in progress",
      title: "Family Bibles",
    },
    {
      actionLabel: "Research Pathway",
      category: "Collection Pathway",
      description:
        "A future research area for intelligence-related material, held back until collection scope and evidence are ready.",
      image: null,
      meta: "Scope under review",
      status: "Research path under review",
      title: "Intelligence Collection",
    },
  ],
  research: [
    {
      eyebrow: "Provenance",
      image: readingRoomImages.supporting[0],
      title: "Sidgwick provenance investigation",
      body:
        "Names and inscriptions are treated as questions first. Each possible connection must be tested against source records before it becomes part of the public chain.",
    },
    {
      eyebrow: "Bibliography",
      image: readingRoomImages.primary,
      title: "Printer and edition review",
      body:
        "The 1610 date and edition identity remain tied to source review. The case file keeps bibliographic interpretation separate from observed artifact evidence.",
    },
    {
      eyebrow: "Material Evidence",
      image: readingRoomImages.supporting[1],
      title: "Binding and physical description",
      body:
        "Wear, boards, spine, clasps, and page edges are examined as material evidence while dimensions and condition notes remain under review.",
    },
  ],
  evidenceJourney: [
    {
      label: "Observation",
      text: "Begin with what can be seen on the object itself.",
    },
    {
      label: "Question",
      text: "Separate the visible clue from the historical claim it may suggest.",
    },
    {
      label: "Evidence",
      text: "Connect the observation to an artifact record, image, or documentary trace.",
    },
    {
      label: "Source",
      text: "Review catalogues, records, inscriptions, and reference works.",
    },
    {
      label: "Confidence",
      text: "State what is known, what is supported, and what remains unresolved.",
    },
  ],
} as const;
