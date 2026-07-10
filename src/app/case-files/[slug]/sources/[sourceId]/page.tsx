import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatConfidence } from "@/lib/case-file-labels";
import {
  formatSourceIndependenceLevel,
  formatSourceType,
} from "@/lib/source-labels";
import {
  getSourceRecordForCaseFile,
  getSourceRecordsByCaseFileId,
} from "@/lib/sources";
import type { ResearchStatus } from "@/types/case-file";
import type { SourceRelationReference } from "@/types/source";

type SourceDetailPageProps = {
  params: Promise<{
    slug: string;
    sourceId: string;
  }>;
};

const statusTone: Record<ResearchStatus, "neutral" | "trust" | "warning"> = {
  Documented: "trust",
  "In Review": "neutral",
  "Requires Research": "warning",
};

function MetadataRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function RelationLinks({
  emptyLabel,
  getHref,
  items,
}: {
  emptyLabel: string;
  getHref?: (item: SourceRelationReference) => Route;
  items: readonly SourceRelationReference[];
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-warning/40 bg-warning/5 p-5">
        <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
        <p className="mt-4 text-sm leading-6 text-body">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const content = (
          <>
            <span className="font-semibold text-foreground">{item.label}</span>
            <CaseFileBadge tone={statusTone[item.status]}>
              {item.status}
            </CaseFileBadge>
          </>
        );

        if (getHref) {
          return (
            <Link
              className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background p-4 text-sm transition hover:border-evidence"
              href={getHref(item)}
              key={item.id}
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background p-4 text-sm"
            key={item.id}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

export function generateStaticParams() {
  return getCaseFiles().flatMap((caseFile) =>
    getSourceRecordsByCaseFileId(caseFile.id).map((source) => ({
      slug: caseFile.slug,
      sourceId: source.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: SourceDetailPageProps): Promise<Metadata> {
  const { slug, sourceId } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Source Not Found",
    };
  }

  const source = getSourceRecordForCaseFile(caseFile.id, sourceId);

  if (!source) {
    return {
      title: "Source Not Found",
    };
  }

  return {
    title: `${source.title} Source Record`,
    description: source.notes,
  };
}

export default async function SourceDetailPage({
  params,
}: SourceDetailPageProps) {
  const { slug, sourceId } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const source = getSourceRecordForCaseFile(caseFile.id, sourceId);

  if (!source) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-accent">
            <Link href={`/case-files/${caseFile.slug}` as Route}>Case File</Link>
            <Link href={`/case-files/${caseFile.slug}/sources` as Route}>
              Source Library
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone={statusTone[source.status]}>
              {source.status}
            </CaseFileBadge>
            <CaseFileBadge tone="trust">
              Confidence: {formatConfidence(source.confidence)}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              {formatSourceIndependenceLevel(source.independenceLevel)}
            </CaseFileBadge>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Source Record
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {source.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
            {source.notes}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_22rem] lg:px-8">
        <div className="space-y-8">
          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                  Citation Control
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                  Citation Placeholder
                </h2>
              </div>
              <CaseFileBadge tone={statusTone[source.status]}>
                {source.status}
              </CaseFileBadge>
            </div>
            <div className="mt-5 rounded-lg border border-dashed border-warning/40 bg-warning/5 p-5">
              <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
              <p className="mt-4 text-sm leading-6 text-body">
                {source.citationPlaceholder}
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Related Evidence
            </p>
            <div className="mt-5">
              <RelationLinks
                emptyLabel="No evidence is linked to this source record yet."
                getHref={(item) =>
                  `/case-files/${caseFile.slug}/evidence/${item.id}` as Route
                }
                items={source.relatedEvidence}
              />
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Related Timeline Events
            </p>
            <div className="mt-5">
              <RelationLinks
                emptyLabel="No timeline events are linked to this source record yet."
                getHref={(item) =>
                  `/case-files/${caseFile.slug}/timeline#${item.id}` as Route
                }
                items={source.relatedTimelineEvents}
              />
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Related Claims
            </p>
            <div className="mt-5">
              <RelationLinks
                emptyLabel="No claims are linked. Claims must wait for evidence and source review."
                items={source.relatedClaims}
              />
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Revision History
            </p>
            <div className="mt-5 grid gap-3">
              {source.revisionHistory.map((revision) => (
                <article
                  className="rounded-lg border border-border bg-background p-4"
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
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <dl className="grid gap-3 rounded-lg border border-border bg-surface p-5 shadow-sm">
            <MetadataRow label="Source ID" value={source.id} />
            <MetadataRow label="Source Type" value={formatSourceType(source.sourceType)} />
            <MetadataRow label="Status" value={source.status} />
            <MetadataRow
              label="Confidence"
              value={formatConfidence(source.confidence)}
            />
            <MetadataRow
              label="Independence"
              value={formatSourceIndependenceLevel(source.independenceLevel)}
            />
            <MetadataRow
              label="Repository / Archive"
              value={source.repositoryArchive}
            />
            <MetadataRow
              label="Related Evidence"
              value={source.relatedEvidence.length}
            />
            <MetadataRow
              label="Related Claims"
              value={source.relatedClaims.length}
            />
            <MetadataRow
              label="Timeline Events"
              value={source.relatedTimelineEvents.length}
            />
          </dl>
        </aside>
      </div>
    </main>
  );
}
