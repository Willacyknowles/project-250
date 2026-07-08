import type { PlatformModule } from "@/types/platform";

export const investigationEngineModule = {
  id: "investigation-engine",
  name: "Investigation Engine",
  layer: "investigation",
  purpose:
    "Coordinate investigation workflow while keeping historical judgment with the lead investigator.",
  responsibilities: [
    "Case management",
    "Research workflow",
    "Evidence lifecycle",
    "Confidence tracking",
    "Version history",
    "Lead generation",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
