import type { EvidenceArtifactType } from "@/types/evidence";

const artifactTypeLabels: Record<EvidenceArtifactType, string> = {
  annotation: "Annotation",
  "artifact-component": "Artifact Component",
  binding: "Binding",
  colophon: "Colophon",
  "genealogical-record": "Genealogical Record",
  imprint: "Imprint",
  inscription: "Inscription",
  map: "Map",
  "printer-device": "Printer's Device",
};

export function formatEvidenceArtifactType(type: EvidenceArtifactType) {
  return artifactTypeLabels[type];
}