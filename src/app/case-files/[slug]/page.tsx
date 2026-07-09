import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileOverview } from "@/components/case-files/case-file-overview";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { CaseFileSection } from "@/components/case-files/case-file-section";
import { EmptyState } from "@/components/case-files/empty-state";
import { siteConfig } from "@/config/site";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { getEvidenceItemsByCaseFileId } from "@/lib/evidence";
import { getTimelineEventsByCaseFileId } from "@/lib/timeline";
import {
  formatConfidence,
  formatStatus,
} from "@/lib/case-file-labels";
import type {
  CaseFile,
  DossierField,
  ResearchStatus,
} from "@/types/case-file";

type CaseFilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const sectionNavigation = [
  { id: "overview", label: "Overview" },
  { id: "provenance", label: "Provenance" },
  { id: "physical-description", label: "Physical Description" },
  { id: "evidence", label: "Evidence" },
  { id: "claims", label: "Claims" },
  { id: "timeline", label: "Timeline" },
  { id: "sources", label: "Sources" },
  { id: "open-questions", label: "Open Questions" },
  { id: "confidence-assessment", label: "Confidence Assessment" },
  { id: "revision-history", label: "Revision History" },
] as const;

const statusTone: Record<ResearchStatus, "neutral" | "trust" | "warning"> = {
  Documented: "trust",
  "In Review": "neutral",
  "Requires Research": "warning",
};

function countFieldsByStatus(caseFile: CaseFile, status: ResearchStatus) {
  return [
    ...caseFile.overview.fields,
    ...caseFile.provenance.fields,
    ...caseFile.physicalDescription.fields,
  ].filter((field) => field.status === status).length;
}

function DossierNavigation() {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <nav
        aria-label="Case File sections"
        className="rounded-lg border border-border bg-surface p-4 shadow-sm"
      >
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Dossier Index
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-1 lg:overflow-visible lg:pb-0">
          {sectionNavigation.map((item) => (
            <a
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-body transition hover:bg-background hover:text-foreground lg:whitespace-normal"
              href={`#${item.id}`}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function DossierFieldGrid({ fields }: { fields: readonly DossierField[] }) {
  return (
    <dl className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <div
          className="rounded-lg border border-border bg-background p-5"
          key={field.label}
        >
          <dt className="flex flex-wrap items-start justify-between gap-3">
            <span className="font-semibold text-foreground">{field.label}</span>
            <CaseFileBadge tone={statusTone[field.status]}>
              {field.status}
            </CaseFileBadge>
          </dt>
          <dd className="mt-3 text-sm leading-6 text-body">{field.value}</dd>
          {field.note ? (
            <p className="mt-3 border-t border-border pt-3 text-xs leading-5 text-muted">
              {field.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

function LedgerCard({
  label,
  value,
  description,
  tone = "neutral",
}: {
  description: string;
  label: string;
  tone?: "neutral" | "evidence" | "trust" | "warning";
  value: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {label}
        </p>
        <CaseFileBadge tone={tone}>{value}</CaseFileBadge>
      </div>
      <p className="mt-4 text-sm leading-6 text-body">{description}</p>
    </article>
  );
}

function EvidenceHierarchy({
  caseFile,
  evidenceCount,
}: {
  caseFile: CaseFile;
  evidenceCount: number;
}) {
  const documentedFacts = countFieldsByStatus(caseFile, "Documented");
  const unknowns = countFieldsByStatus(caseFile, "Requires Research");

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <LedgerCard
        description="Documented items currently describe the platform record, not historical provenance conclusions."
        label="Facts"
        tone="trust"
        value={`${documentedFacts}`}
      />
      <LedgerCard
        description="No historical claims are published until each statement is tied to evidence."
        label="Claims"
        tone="warning"
        value={`${caseFile.claims.length}`}
      />
      <LedgerCard
        description="Evidence records are available as vault placeholders until source material is reviewed."
        label="Evidence"
        tone="evidence"
        value={`${evidenceCount}`}
      />
      <LedgerCard
        description="Source citations must be entered before the dossier can support conclusions."
        label="Sources"
        tone="neutral"
        value={`${caseFile.sources.length}`}
      />
      <LedgerCard
        description="Unknowns are preserved as research targets instead of being smoothed over."
        label="Unknowns"
        tone="warning"
        value={`${unknowns}`}
      />
    </div>
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

  const evidenceItems = getEvidenceItemsByCaseFileId(caseFile.id);
  const timelineEvents = getTimelineEventsByCaseFileId(caseFile.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CaseFileOverview caseFile={caseFile} />

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[17rem_1fr] lg:px-8 lg:py-12">
        <DossierNavigation />

        <div className="space-y-8">
          <CaseFileSection eyebrow="Overview" id="overview" title="Overview">
            <div className="space-y-6">
              <p className="max-w-4xl text-lg leading-8 text-body">
                {caseFile.overview.summary}
              </p>
              <EvidenceHierarchy caseFile={caseFile} evidenceCount={evidenceItems.length} />
              <div className="rounded-lg border border-border bg-background p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Primary Question
                </p>
                <p className="mt-3 max-w-3xl text-base leading-7 text-foreground">
                  {caseFile.primaryQuestion}
                </p>
              </div>
              <DossierFieldGrid fields={caseFile.overview.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Provenance"
            id="provenance"
            title="Provenance"
          >
            <div className="space-y-5">
              <p className="max-w-4xl text-base leading-7 text-body">
                {caseFile.provenance.summary}
              </p>
              <DossierFieldGrid fields={caseFile.provenance.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Physical Description"
            id="physical-description"
            title="Physical Description"
          >
            <div className="space-y-5">
              <p className="max-w-4xl text-base leading-7 text-body">
                {caseFile.physicalDescription.summary}
              </p>
              <DossierFieldGrid fields={caseFile.physicalDescription.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Evidence" id="evidence" title="Evidence">
            <div className="space-y-5">
              <div className="rounded-lg border border-border bg-background p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Evidence Vault
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">
                      {evidenceItems.length} placeholder evidence records
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-body">
                      The vault contains artifact-level evidence placeholders for review. Every record remains marked Requires Research until images, source references, and human verification are added.
                    </p>
                  </div>
                  <Link
                    className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
                    href={`/case-files/${caseFile.slug}/evidence` as Route}
                  >
                    Open Evidence Vault
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {evidenceItems.slice(0, 3).map((item) => (
                  <article
                    className="rounded-lg border border-border bg-background p-5"
                    key={item.id}
                  >
                    <CaseFileBadge tone="warning">{item.status}</CaseFileBadge>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-body">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Claims" id="claims" title="Claims">
            {caseFile.claims.length > 0 ? (
              <div className="grid gap-4">
                {caseFile.claims.map((claim) => (
                  <article
                    className="rounded-lg border border-border bg-background p-5"
                    key={claim.id}
                  >
                    <div className="flex flex-wrap gap-2 text-sm">
                      <CaseFileBadge tone="warning">
                        {formatStatus(claim.status)}
                      </CaseFileBadge>
                      <CaseFileBadge tone="trust">
                        {formatConfidence(claim.confidence)}
                      </CaseFileBadge>
                    </div>
                    <p className="mt-3 text-body">{claim.statement}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No historical claims are published. Each future claim must link to supporting evidence and preserve counter-evidence where applicable."
                title="No claims published"
              />
            )}
          </CaseFileSection>

          <CaseFileSection eyebrow="Timeline" id="timeline" title="Timeline">
            <div className="space-y-5">
              <div className="rounded-lg border border-border bg-background p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Investigation Timeline
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">
                      {timelineEvents.length} placeholder timeline events
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-body">
                      Timeline entries are structured for future dated evidence, but every event remains marked Requires Research until sources and claims are reviewed.
                    </p>
                  </div>
                  <Link
                    className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
                    href={`/case-files/${caseFile.slug}/timeline` as Route}
                  >
                    Open Timeline
                  </Link>
                </div>
              </div>
              <ol className="grid gap-4 md:grid-cols-3">
                {timelineEvents.slice(0, 3).map((event) => (
                  <li
                    className="rounded-lg border border-border bg-background p-5"
                    key={event.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-evidence">
                        {event.dateLabel}
                      </p>
                      <CaseFileBadge tone="warning">{event.status}</CaseFileBadge>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-body">
                      {event.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </CaseFileSection>
          <CaseFileSection eyebrow="Sources" id="sources" title="Sources">
            {caseFile.sources.length > 0 ? (
              <div className="grid gap-4">
                {caseFile.sources.map((source) => (
                  <article
                    className="rounded-lg border border-border bg-background p-5"
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
                description="No source citations have been entered. Published dossier content must remain limited until sources are reviewed and cited."
                title="No source citations published"
              />
            )}
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Open Questions"
            id="open-questions"
            title="Open Questions"
          >
            <div className="grid gap-3">
              {caseFile.researchQuestions.map((question) => (
                <article
                  className="rounded-lg border border-border bg-background p-5"
                  key={question.id}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {question.status}
                  </p>
                  <p className="mt-2 text-body">{question.question}</p>
                </article>
              ))}
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Confidence"
            id="confidence-assessment"
            title="Confidence Assessment"
          >
            <article className="rounded-lg border border-border bg-background p-5">
              <div className="flex flex-wrap gap-2">
                <CaseFileBadge tone="trust">
                  Confidence: {formatConfidence(caseFile.confidenceAssessment.level)}
                </CaseFileBadge>
                <CaseFileBadge
                  tone={statusTone[caseFile.confidenceAssessment.status]}
                >
                  {caseFile.confidenceAssessment.status}
                </CaseFileBadge>
              </div>
              <p className="mt-4 max-w-4xl text-sm leading-6 text-body">
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

          <CaseFileSection
            eyebrow="Versioning"
            id="revision-history"
            title="Revision History"
          >
            <div className="grid gap-3">
              {caseFile.revisions.map((revision) => (
                <article
                  className="rounded-lg border border-border bg-background p-5"
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
        </div>
      </div>
    </main>
  );
}

