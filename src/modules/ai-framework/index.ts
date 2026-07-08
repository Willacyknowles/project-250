import type { PlatformModule } from "@/types/platform";

export const aiFrameworkModule = {
  id: "ai-framework",
  name: "AI Framework",
  layer: "intelligence",
  purpose:
    "Coordinate specialized AI agents with clear authority boundaries and explainable outputs.",
  responsibilities: [
    "Agent roles",
    "Recommendation boundaries",
    "Evidence traceability",
    "Uncertainty preservation",
    "Human review",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
