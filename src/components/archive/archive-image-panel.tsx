import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { ArchivePlaceholder } from "@/components/archive/archive-placeholder";
import { formatConfidence } from "@/lib/case-file-labels";
import { formatArchiveMediaType } from "@/lib/evidence-labels";
import type { ArchiveMedia } from "@/types/evidence";

type ArchiveImagePanelProps = {
  media: ArchiveMedia;
  eyebrow?: string;
};

export function ArchiveImagePanel({
  media,
  eyebrow = "Archive Media",
}: ArchiveImagePanelProps) {
  return (
    <figure className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            {media.title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <CaseFileBadge tone="warning">{media.status}</CaseFileBadge>
          <CaseFileBadge tone="trust">
            {formatConfidence(media.confidence)}
          </CaseFileBadge>
        </div>
      </div>

      <div className="mt-5">
        <ArchivePlaceholder
          altText={media.altText}
          caption={media.caption}
          status={media.placeholderState}
        />
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-body">
        <span>{media.caption}</span>
        <span className="font-semibold text-evidence">
          {formatArchiveMediaType(media.mediaType)}
        </span>
      </figcaption>
    </figure>
  );
}
