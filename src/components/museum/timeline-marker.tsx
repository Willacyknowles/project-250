import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { MuseumLabel } from "@/components/museum/museum-label";
import { formatTimelineStatus } from "@/lib/visitor-labels";
import type { ResearchStatus } from "@/types/case-file";

type TimelineMarkerProps = {
  children: React.ReactNode;
  dateLabel: string;
  status: ResearchStatus;
  title: string;
};

export function TimelineMarker({ children, dateLabel, status, title }: TimelineMarkerProps) {
  return (
    <article className="museum-paper museum-reveal overflow-hidden rounded-sm border-l-4 border-l-brass p-6 sm:p-8 lg:p-10">
      <div className="grid gap-6 lg:grid-cols-[11rem_1fr_auto] lg:items-start">
        <div className="museum-brass-plate rounded-sm px-4 py-3 text-center">
          <p className="text-[0.64rem] font-bold uppercase">Chronology</p>
          <p className="mt-2 font-serif text-3xl leading-none">{dateLabel}</p>
        </div>
        <div>
          <MuseumLabel tone="brass">Exhibition Wall Marker</MuseumLabel>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
        <CaseFileBadge tone="warning">{formatTimelineStatus(status)}</CaseFileBadge>
      </div>
      <div className="mt-8 border-t border-border pt-7">{children}</div>
    </article>
  );
}
