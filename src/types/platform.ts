export type PlatformLayer =
  | "investigation"
  | "knowledge"
  | "intelligence"
  | "experience"
  | "operations";

export type PlatformModuleStatus = "foundation";

export type PlatformModule = {
  id: string;
  name: string;
  layer: PlatformLayer;
  purpose: string;
  responsibilities: readonly string[];
  collectionSpecific: boolean;
  status: PlatformModuleStatus;
};

export type CollectionConfig = {
  id: string;
  name: string;
  owner: string;
  publicName: string;
  role: "flagship" | "tenant";
};
