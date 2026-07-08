import type { PlatformModule } from "@/types/platform";

export const searchEngineModule = {
  id: "search-engine",
  name: "Search Engine",
  layer: "knowledge",
  purpose:
    "Prepare for full-text, semantic, timeline, relationship, and evidence discovery.",
  responsibilities: [
    "Full-text search",
    "Semantic search",
    "Timeline search",
    "Relationship search",
    "Evidence search",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
