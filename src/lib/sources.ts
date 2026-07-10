import { sourceLibraryRecords } from "@/data/sources";

export function getSourceRecords() {
  return sourceLibraryRecords;
}

export function getSourceRecordsByCaseFileId(caseFileId: string) {
  return sourceLibraryRecords.filter((source) => source.caseFileId === caseFileId);
}

export function getSourceRecordById(sourceId: string) {
  return sourceLibraryRecords.find((source) => source.id === sourceId);
}

export function getSourceRecordForCaseFile(caseFileId: string, sourceId: string) {
  return sourceLibraryRecords.find(
    (source) => source.caseFileId === caseFileId && source.id === sourceId,
  );
}

export function getSourceRecordsByEvidenceId(evidenceId: string) {
  return sourceLibraryRecords.filter((source) =>
    source.relatedEvidence.some((evidence) => evidence.id === evidenceId),
  );
}

export function getSourceRecordsByTimelineEventId(eventId: string) {
  return sourceLibraryRecords.filter((source) =>
    source.relatedTimelineEvents.some((event) => event.id === eventId),
  );
}
