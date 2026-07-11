import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { exhibitionCopy } from "@/config/exhibition-copy";
import { formatEvidenceStatus } from "@/lib/visitor-labels";
import type { ResearchStatus } from "@/types/case-file";

type ArchivePlaceholderProps = {
  altText: string;
  caption: string;
  status: ResearchStatus;
  size?: "compact" | "standard";
};

const sizeClasses = {
  compact: "min-h-[13rem] p-5",
  standard: "min-h-[18rem] p-8",
} as const;

export function ArchivePlaceholder({
  altText,
  caption,
  size = "standard",
  status,
}: ArchivePlaceholderProps) {
  return (
    <div
      aria-label={altText}
      className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-background text-center ${sizeClasses[size]}`}
      role="img"
    >
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {exhibitionCopy.documentViewer.title}
        </p>
        <p className="mt-4 text-xl font-semibold text-foreground">
          {exhibitionCopy.documentViewer.emptyTitle}
        </p>
        <p className="mt-3 text-sm leading-6 text-body">{caption}</p>
        <div className="mt-5 flex justify-center">
          <CaseFileBadge tone="warning">{formatEvidenceStatus(status)}</CaseFileBadge>
        </div>
      </div>
    </div>
  );
}
