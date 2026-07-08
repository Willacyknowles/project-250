import type { PlatformModule } from "@/types/platform";

export const publicExperienceModule = {
  id: "public-experience",
  name: "Public Experience",
  layer: "experience",
  purpose:
    "Provide a replaceable client for public investigation access without owning business logic.",
  responsibilities: [
    "Public routes",
    "Accessible UI",
    "Server components first",
    "API consumption",
    "Minimal client JavaScript",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
