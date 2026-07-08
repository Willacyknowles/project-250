import type { PlatformModule } from "@/types/platform";

export const knowledgeGraphModule = {
  id: "knowledge-graph",
  name: "Knowledge Graph",
  layer: "knowledge",
  purpose:
    "Represent relationships between artifacts, people, places, events, documents, organizations, and collections.",
  responsibilities: [
    "People",
    "Places",
    "Events",
    "Artifacts",
    "Documents",
    "Organizations",
    "Collections",
    "Relationships",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
