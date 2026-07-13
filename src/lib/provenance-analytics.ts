export type ProvenanceAnalyticsEvent =
  | "provenance_experience_viewed"
  | "begin_examination_clicked"
  | "orientation_completed"
  | "evidence_node_viewed"
  | "evidence_panel_opened"
  | "source_opened"
  | "case_file_opened"
  | "timeline_completed"
  | "audio_enabled"
  | "audio_muted"
  | "reduced_motion_used"
  | "experience_exited";

export function trackProvenanceEvent(
  eventName: ProvenanceAnalyticsEvent,
  detail: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("project250:analytics", {
      detail: {
        eventName,
        ...detail,
      },
    }),
  );
}
