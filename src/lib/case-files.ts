import { caseFiles } from "@/data/case-files";

export function getCaseFiles() {
  return caseFiles;
}

export function getCaseFilesByCollection(collectionId: string) {
  return caseFiles.filter((caseFile) => caseFile.collectionId === collectionId);
}

export function getCaseFileBySlug(slug: string) {
  return caseFiles.find((caseFile) => caseFile.slug === slug);
}

export function getCaseFileById(id: string) {
  return caseFiles.find((caseFile) => caseFile.id === id);
}
