import type { TimelineDatePrecision } from "@/types/timeline";

const timelineDatePrecisionLabels: Record<TimelineDatePrecision, string> = {
  approximate: "Approximate Date",
  exact: "Exact Date",
  unknown: "Date Requires Research",
};

export function formatTimelineDatePrecision(precision: TimelineDatePrecision) {
  return timelineDatePrecisionLabels[precision];
}
