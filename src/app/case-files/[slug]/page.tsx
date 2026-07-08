import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFileOverview } from "@/components/case-files/case-file-overview";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { CaseFileSection } from "@/components/case-files/case-file-section";
import { EmptyState } from "@/components/case-files/empty-state";
import { siteConfig } from "@/config/site";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import {
  formatConfidence,
  formatEvidenceType,
  formatStatus,
} from "@/lib/case-file-labels";
import type { DossierField, ResearchStatus } from "@/types/case-file";

type CaseFilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusTone: Record<ResearchStatus, "neutral" | "trust" | "warning"> = {
  Documented: "trust",
  "In Review": "neutral",
  "Requires Research": "warning",
};

function DossierFieldGrid({ fields }: { fields: readonly DossierField[] }) {
  return (
    <dl className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <div className="rounded-lg border border-border bg-surface p-5" key={field.label}>
          <dt className="flex flex-wrap items-start justify-between gap-3">
            <span className="font-semibold text-foreground">{field.label}</span>
            <CaseFileBadge tone={statusTone[field.status]}>{field.status}</CaseFileBadge>
          </dt>
          <dd className="mt-3 text-sm leading-6 text-body">{field.value}</dd>
          {field.note ? (
            <p className="mt-3 text-xs leading-5 text-muted">{field.note}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

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

      <CaseFileSection eyebrow="Overview" title="Overview">
        <div className="space-y-5">
          <p className="max-w-3xl text-lg leading-8 text-body">
            {caseFile.overview.summary}
          </p>
          <DossierFieldGrid fields={caseFile.overview.fields} />
        </div>
      </CaseFileSection>

      <CaseFileSection eyebrow="Provenance" title="Provenance">
        <div className="space-y-5">
          <p className="max-w-3xl text-lg leading-8 text-body">
            {caseFile.provenance.summary}
          </p>
          <DossierFieldGrid fields={caseFile.provenance.fields} />
        </div>
      </CaseFileSection>

      <CaseFileSection eyebrow="Physical Description" title="Physical Description">
        <div className="space-y-5">
          <p className="max-w-3xl text-lg leading-8 text-body">
            {caseFile.physicalDescription.summary}
          </p>
          <DossierFieldGrid fields={caseFile.physicalDescription.fields} />
        </div>
      </CaseFileSection>

      <CaseFileSection eyebrow="Evidence" title="Evidence">
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
            description="Requires Research. Evidence records must be entered from primary sources, artifact images, documents, or reviewed source material before claims appear in this dossier."
            title="Requires Research"
          />
        )}
      </CaseFileSection>

      <CaseFileSection eyebrow="Claims" title="Claims">
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
            description="Requires Research. No historical claims are published. Each future claim must link to supporting evidence and preserve counter-evidence where applicable."
            title="Requires Research"
          />
        )}
      </CaseFileSection>

      <CaseFileSection eyebrow="Timeline" title="Timeline">
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
            description="Requires Research. Timeline events must be generated from dated evidence, reviewed sources, and documented investigation milestones."
            title="Requires Research"
          />
        )}
      </CaseFileSection>

      <CaseFileSection eyebrow="Sources" title="Sources">
        {caseFile.sources.length > 0 ? (
          <div className="grid gap-4">
            {caseFile.sources.map((source) => (
              <article
                className="rounded-lg border border-border bg-surface p-5"
                key={source.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {source.title}
                  </h3>
                  <CaseFileBadge tone={statusTone[source.status]}>
                    {source.status}
                  </CaseFileBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-body">
                  {source.citation}
                </p>
                <p className="mt-3 text-xs leading-5 text-muted">
                  {source.notes}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            description="Requires Research. No source citations have been entered. Published dossier content must remain limited until sources are reviewed and cited."
            title="Requires Research"
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

      <CaseFileSection eyebrow="Confidence" title="Confidence Assessment">
        <article className="rounded-lg border border-border bg-surface p-5">
          <div className="flex flex-wrap gap-2">
            <CaseFileBadge tone="trust">
              {formatConfidence(caseFile.confidenceAssessment.level)}
            </CaseFileBadge>
            <CaseFileBadge tone={statusTone[caseFile.confidenceAssessment.status]}>
              {caseFile.confidenceAssessment.status}
            </CaseFileBadge>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-body">
            {caseFile.confidenceAssessment.rationale}
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-body">
            {caseFile.confidenceAssessment.requirements.map((requirement) => (
              <li className="flex gap-2" key={requirement}>
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-evidence" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </article>
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
