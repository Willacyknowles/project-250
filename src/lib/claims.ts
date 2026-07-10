import { claimEngineRecords } from "@/data/claims";

export function getClaimRecords() {
  return claimEngineRecords;
}

export function getClaimRecordsByCaseFileId(caseFileId: string) {
  return claimEngineRecords.filter((claim) => claim.caseFileId === caseFileId);
}

export function getClaimRecordById(claimId: string) {
  return claimEngineRecords.find((claim) => claim.id === claimId);
}

export function getClaimRecordForCaseFile(caseFileId: string, claimId: string) {
  return claimEngineRecords.find(
    (claim) => claim.caseFileId === caseFileId && claim.id === claimId,
  );
}

export function getClaimRecordsByEvidenceId(evidenceId: string) {
  return claimEngineRecords.filter((claim) =>
    claim.relatedEvidenceIds.includes(evidenceId),
  );
}

export function getClaimRecordsBySourceId(sourceId: string) {
  return claimEngineRecords.filter((claim) =>
    claim.relatedSourceIds.includes(sourceId),
  );
}

export function getClaimRecordsByTimelineEventId(eventId: string) {
  return claimEngineRecords.filter((claim) =>
    claim.relatedTimelineEventIds.includes(eventId),
  );
}
