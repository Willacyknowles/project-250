import type { PlatformModule } from "@/types/platform";

export const caseFileEngineModule = {
  id: "case-file-engine",
  name: "Case File Engine",
  layer: "investigation",
  purpose:
    "Represent every investigation with a standardized, reproducible structure.",
  responsibilities: [
    "Questions",
    "Artifacts",
    "Evidence",
    "Claims",
    "Confidence",
    "Sources",
    "Open questions",
    "Revision history",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
