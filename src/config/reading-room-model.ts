export const readingRoomModelConfig = {
  artifactId: "1610-geneva-bible",
  productionModelPath:
    "/models/the-knowles-collection/1610-geneva-bible/1610-geneva-bible.glb",
  productionTexturePath:
    "/models/the-knowles-collection/1610-geneva-bible/textures/",
  temporaryModel: {
    id: "neutral-closed-book-geometry",
    label: "Neutral closed-book study geometry",
    purpose:
      "Presentation and motion testing only. Replace with the reviewed 1610 Geneva Bible GLB when artifact imaging is complete.",
    usesNeutralGeometry: true,
  },
} as const;
