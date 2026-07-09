import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { formatConfidence } from "@/lib/case-file-labels";
import { formatArchiveMediaType } from "@/lib/evidence-labels";
import type { ArchiveMedia } from "@/types/evidence";

type ArchiveMediaMetadataProps = {
  media: ArchiveMedia;
};

function MetadataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function ArchiveMediaMetadata({ media }: ArchiveMediaMetadataProps) {
  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
            Media Metadata
          </p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">
            Archive Control Record
          </h2>
        </div>
        <CaseFileBadge tone="warning">{media.placeholderState}</CaseFileBadge>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <MetadataRow label="Media ID" value={media.id} />
        <MetadataRow label="Media Type" value={formatArchiveMediaType(media.mediaType)} />
        <MetadataRow label="Status" value={media.status} />
        <MetadataRow label="Confidence" value={formatConfidence(media.confidence)} />
        <MetadataRow label="Placeholder State" value={media.placeholderState} />
        <MetadataRow label="Related Evidence ID" value={media.relatedEvidenceId} />
        <MetadataRow
          label="Photographer / Creator"
          value={media.photographerCreator ?? "Requires Research"}
        />
        <MetadataRow
          label="Date Captured"
          value={media.dateCaptured ?? "Requires Research"}
        />
      </dl>

      <div className="mt-5 rounded-lg border border-border bg-background p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Notes
        </p>
        <p className="mt-3 text-sm leading-6 text-body">
          {media.notes ?? "Requires Research"}
        </p>
      </div>
    </section>
  );
}
