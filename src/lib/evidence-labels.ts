import type { ArchiveMediaType, EvidenceArtifactType } from "@/types/evidence";

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

const archiveMediaTypeLabels: Record<ArchiveMediaType, string> = {
  document: "Document",
  image: "Image",
  placeholder: "Placeholder",
  scan: "Scan",
};

export function formatEvidenceArtifactType(type: EvidenceArtifactType) {
  return artifactTypeLabels[type];
}

export function formatArchiveMediaType(type: ArchiveMediaType) {
  return archiveMediaTypeLabels[type];
}
