import type { PlatformModule } from "@/types/platform";

export const evidenceEngineModule = {
  id: "evidence-engine",
  name: "Evidence Engine",
  layer: "investigation",
  purpose:
    "Store, protect, and connect evidence without treating images or documents as decoration.",
  responsibilities: [
    "Images",
    "Documents",
    "Metadata",
    "Annotations",
    "OCR",
    "Source references",
    "Chain of custody",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
