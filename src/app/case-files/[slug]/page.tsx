import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFileOverview } from "@/components/case-files/case-file-overview";
import { CaseFileSection } from "@/components/case-files/case-file-section";
import { EmptyState } from "@/components/case-files/empty-state";
import { siteConfig } from "@/config/site";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import {
  formatConfidence,
  formatEvidenceType,
  formatStatus,
} from "@/lib/case-file-labels";

type CaseFilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getCaseFiles().map((caseFile) => ({
    slug: caseFile.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseFilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Case File Not Found",
    };
  }

  return {
    title: caseFile.title,
    description: caseFile.summary,
    openGraph: {
      title: `${caseFile.title} | ${siteConfig.publicProduct}`,
      description: caseFile.summary,
      type: "article",
    },
  };
}

export default async function CaseFilePage({ params }: CaseFilePageProps) {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CaseFileOverview caseFile={caseFile} />

      <CaseFileSection eyebrow="Question" title="Primary Investigation">
        <p className="max-w-3xl text-lg leading-8 text-body">
          {caseFile.primaryQuestion}
        </p>
      </CaseFileSection>

      <CaseFileSection eyebrow="Evidence" title="Evidence Record">
        {caseFile.evidence.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {caseFile.evidence.map((evidence) => (
              <article
                className="rounded-lg border border-border bg-surface p-5"
                key={evidence.id}
              >
                <p className="text-xs font-semibold uppercase text-muted">
                  {formatEvidenceType(evidence.type)}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {evidence.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-body">
                  {evidence.description}
                </p>
                <p className="mt-4 text-sm font-medium text-muted">
                  Confidence: {formatConfidence(evidence.confidence)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            description="No evidence has been entered for this public prototype yet. The Case File will remain at unknown confidence until sources are reviewed and attached."
            title="Evidence pending"
          />
        )}
      </CaseFileSection>

      <CaseFileSection eyebrow="Claims" title="Claims and Confidence">
        {caseFile.claims.length > 0 ? (
          <div className="grid gap-4">
            {caseFile.claims.map((claim) => (
              <article
                className="rounded-lg border border-border bg-surface p-5"
                key={claim.id}
              >
                <div className="flex flex-wrap gap-2 text-sm">
                  <span>{formatStatus(claim.status)}</span>
                  <span>{formatConfidence(claim.confidence)}</span>
                </div>
                <p className="mt-3 text-body">{claim.statement}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            description="No historical claims are published from this prototype. Claims must link to supporting evidence and preserve counter-evidence before they appear here."
            title="Claims pending"
          />
        )}
      </CaseFileSection>

      <CaseFileSection eyebrow="Timeline" title="Living Timeline">
        {caseFile.timeline.length > 0 ? (
          <ol className="grid gap-4">
            {caseFile.timeline.map((event) => (
              <li
                className="rounded-lg border border-border bg-surface p-5"
                key={event.id}
              >
                <p className="text-sm font-semibold text-evidence">
                  {event.dateLabel}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-body">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState
            description="Timeline events will be generated from dated evidence, research milestones, and human-reviewed relationships."
            title="Timeline pending"
          />
        )}
      </CaseFileSection>

      <CaseFileSection eyebrow="Research" title="Open Questions">
        <div className="grid gap-3">
          {caseFile.researchQuestions.map((question) => (
            <article
              className="rounded-lg border border-border bg-surface p-5"
              key={question.id}
            >
              <p className="text-xs font-semibold uppercase text-muted">
                {question.status}
              </p>
              <p className="mt-2 text-body">{question.question}</p>
            </article>
          ))}
        </div>
      </CaseFileSection>

      <CaseFileSection eyebrow="Versioning" title="Revision History">
        <div className="grid gap-3">
          {caseFile.revisions.map((revision) => (
            <article
              className="rounded-lg border border-border bg-surface p-5"
              key={revision.id}
            >
              <div className="flex flex-wrap justify-between gap-3">
                <p className="font-semibold text-foreground">
                  Version {revision.version}
                </p>
                <p className="text-sm text-muted">{revision.dateLabel}</p>
              </div>
              <p className="mt-2 text-sm text-muted">
                Investigator: {revision.investigator}
              </p>
              <p className="mt-3 text-sm leading-6 text-body">
                {revision.summary}
              </p>
            </article>
          ))}
        </div>
      </CaseFileSection>
    </main>
  );
}
