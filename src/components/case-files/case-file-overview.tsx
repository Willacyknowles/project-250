import type { CaseFile } from "@/types/case-file";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { siteConfig } from "@/config/site";
import { formatConfidence } from "@/lib/case-file-labels";

type CaseFileOverviewProps = {
  caseFile: CaseFile;
};

export function CaseFileOverview({ caseFile }: CaseFileOverviewProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <CaseFileBadge tone="evidence">
                Case File {caseFile.caseNumber.padStart(3, "0")}
              </CaseFileBadge>
              <CaseFileBadge tone="warning">
                Research Status: {caseFile.confidenceAssessment.status}
              </CaseFileBadge>
              <CaseFileBadge tone="trust">
                Confidence: {formatConfidence(caseFile.confidence)}
              </CaseFileBadge>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Museum Dossier Experience
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {caseFile.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-body">
              {caseFile.summary}
            </p>
          </div>

          <aside className="rounded-lg border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Publication Context
            </p>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="font-medium text-muted">Public Product</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {siteConfig.publicProduct}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Platform</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {siteConfig.platformName}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Lead Investigator</dt>
                <dd className="mt-1 text-body">{caseFile.leadInvestigator}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Dossier Version</dt>
                <dd className="mt-1 text-body">{caseFile.version}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </header>
  );
}
