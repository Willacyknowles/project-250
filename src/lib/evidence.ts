import { evidenceItems } from "@/data/evidence";

export function getEvidenceItems() {
  return evidenceItems;
}

export function getEvidenceItemsByCaseFileId(caseFileId: string) {
  return evidenceItems.filter((item) => item.relatedCaseFileId === caseFileId);
}

export function getEvidenceItemById(evidenceId: string) {
  return evidenceItems.find((item) => item.id === evidenceId);
}

export function getEvidenceItemForCaseFile(caseFileId: string, evidenceId: string) {
  return evidenceItems.find(
    (item) => item.relatedCaseFileId === caseFileId && item.id === evidenceId,
  );
}