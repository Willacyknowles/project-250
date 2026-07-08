import type { CaseFile } from "@/types/case-file";
import { formatConfidence, formatStatus } from "@/lib/case-file-labels";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";

type CaseFileOverviewProps = {
  caseFile: CaseFile;
};

export function CaseFileOverview({ caseFile }: CaseFileOverviewProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <CaseFileBadge tone="evidence">
            Case File {caseFile.caseNumber}
          </CaseFileBadge>
          <CaseFileBadge tone="warning">
            {formatStatus(caseFile.status)}
          </CaseFileBadge>
          <CaseFileBadge tone="trust">
            Confidence: {formatConfidence(caseFile.confidence)}
          </CaseFileBadge>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold text-foreground sm:text-5xl">
          {caseFile.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
          {caseFile.summary}
        </p>

        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <dt className="font-semibold text-muted">Artifact Type</dt>
            <dd className="mt-1 text-body">{caseFile.artifact.type}</dd>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <dt className="font-semibold text-muted">Date Label</dt>
            <dd className="mt-1 text-body">{caseFile.artifact.dateLabel}</dd>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <dt className="font-semibold text-muted">Lead Investigator</dt>
            <dd className="mt-1 text-body">{caseFile.leadInvestigator}</dd>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <dt className="font-semibold text-muted">Version</dt>
            <dd className="mt-1 text-body">{caseFile.version}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
