import { investigationTimelineEvents } from "@/data/timeline-events";

export function getTimelineEvents() {
  return investigationTimelineEvents;
}

export function getTimelineEventsByCaseFileId(caseFileId: string) {
  return investigationTimelineEvents.filter(
    (event) => event.caseFileId === caseFileId,
  );
}

export function getTimelineEventById(eventId: string) {
  return investigationTimelineEvents.find((event) => event.id === eventId);
}
