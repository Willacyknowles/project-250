import { CaseFileBadge } from "@/components/case-files/case-file-badge";

type EmptyStateProps = {
  description: string;
  title: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-warning/40 bg-warning/5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-warning">
            Research Pending
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <CaseFileBadge tone="warning">Source Review Needed</CaseFileBadge>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-body">{description}</p>
    </div>
  );
}
