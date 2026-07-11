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
      className={`exhibition-object-wall flex items-center justify-center rounded-sm text-center ${sizeClasses[size]}`}
      role="img"
    >
      <div className="max-w-xl text-cream">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">
          {exhibitionCopy.documentViewer.title}
        </p>
        <p className="mt-4 font-serif text-3xl text-cream">
          {exhibitionCopy.documentViewer.emptyTitle}
        </p>
        <p className="mt-3 text-sm leading-6 text-cream/72">{caption}</p>
        <div className="mt-5 flex justify-center">
          <CaseFileBadge tone="warning">{formatEvidenceStatus(status)}</CaseFileBadge>
        </div>
      </div>
    </div>
  );
}
