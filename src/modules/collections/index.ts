import type { PlatformModule } from "@/types/platform";

export const collectionsModule = {
  id: "collections",
  name: "Collections",
  layer: "operations",
  purpose:
    "Separate platform capabilities from collection-specific configuration and branding.",
  responsibilities: [
    "Collection registry",
    "Flagship implementation",
    "Future tenants",
    "Brand boundaries",
    "Reusable platform defaults",
  ],
  collectionSpecific: false,
  status: "foundation",
} as const satisfies PlatformModule;
