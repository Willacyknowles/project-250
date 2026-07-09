import { archiveMediaItems } from "@/data/archive-media";

export function getArchiveMediaItems() {
  return archiveMediaItems;
}

export function getArchiveMediaItemById(mediaId: string) {
  return archiveMediaItems.find((item) => item.id === mediaId);
}

export function getArchiveMediaByEvidenceId(evidenceId: string) {
  return archiveMediaItems.filter((item) => item.relatedEvidenceId === evidenceId);
}

export function getPrimaryArchiveMediaForEvidence(evidenceId: string) {
  return archiveMediaItems.find((item) => item.relatedEvidenceId === evidenceId);
}
