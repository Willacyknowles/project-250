import type { CollectionConfig } from "@/types/platform";

export const knowlesCollection = {
  id: "knowles-collection",
  name: "knowles-collection",
  owner: "Parable Labs",
  publicName: "The Knowles Collection",
  role: "flagship",
} as const satisfies CollectionConfig;
