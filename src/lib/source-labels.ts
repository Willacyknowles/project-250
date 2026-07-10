import type { SourceIndependenceLevel, SourceType } from "@/types/source";

const sourceTypeLabels: Record<SourceType, string> = {
  "artifact-observation": "Artifact Observation",
  bibliography: "Bibliography",
  "catalog-record": "Catalog Record",
  "expert-review": "Expert Review",
  memory: "Memory",
  placeholder: "Placeholder",
  "research-source": "Research Source",
};

const sourceIndependenceLabels: Record<SourceIndependenceLevel, string> = {
  dependent: "Dependent",
  internal: "Internal",
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  unknown: "Unknown Independence",
};

export function formatSourceType(sourceType: SourceType) {
  return sourceTypeLabels[sourceType];
}

export function formatSourceIndependenceLevel(
  independenceLevel: SourceIndependenceLevel,
) {
  return sourceIndependenceLabels[independenceLevel];
}
