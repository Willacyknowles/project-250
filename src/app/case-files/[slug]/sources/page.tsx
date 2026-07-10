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
import { getSourceRecordsByCaseFileId } from "@/lib/sources";
import type { ResearchStatus } from "@/types/case-file";
import type { SourceRelationReference } from "@/types/source";

type SourceLibraryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusTone: Record<ResearchStatus, "neutral" | "trust" | "warning"> = {
  Documented: "trust",
  "In Review": "neutral",
  "Requires Research": "warning",
};

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
      <div className="rounded-lg border border-dashed border-warning/40 bg-warning/5 p-4">
        <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
        <p className="mt-3 text-sm leading-6 text-body">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
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
  return getCaseFiles().map((caseFile) => ({
    slug: caseFile.slug,
  }));
}

export async function generateMetadata({
  params,
}: SourceLibraryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Source Library Not Found",
    };
  }

  return {
    title: `${caseFile.title} Source Library`,
    description:
      "Source Library foundation for reviewed citations and source records.",
  };
}

export default async function SourceLibraryPage({
  params,
}: SourceLibraryPageProps) {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const sourceRecords = getSourceRecordsByCaseFileId(caseFile.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
          <Link
            className="text-sm font-semibold text-accent"
            href={`/case-files/${caseFile.slug}` as Route}
          >
            Back to Case File
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone="warning">Source Library Foundation</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {sourceRecords.length} Placeholder Sources
            </CaseFileBadge>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Source Library
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {caseFile.title} Sources
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
            A controlled source library for future reviewed citations. Every
            source record remains marked Requires Research until the source is
            located, cited, reviewed, and connected to verified evidence.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-2">
          {sourceRecords.map((source) => (
            <article
              className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8"
              key={source.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                    {formatSourceType(source.sourceType)}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">
                    {source.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <CaseFileBadge tone={statusTone[source.status]}>
                    {source.status}
                  </CaseFileBadge>
                  <CaseFileBadge tone="trust">
                    {formatConfidence(source.confidence)}
                  </CaseFileBadge>
                </div>
              </div>

              <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Independence
                  </dt>
                  <dd className="mt-2 font-medium text-foreground">
                    {formatSourceIndependenceLevel(source.independenceLevel)}
                  </dd>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Repository / Archive
                  </dt>
                  <dd className="mt-2 font-medium text-foreground">
                    {source.repositoryArchive}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Citation Placeholder
                </p>
                <p className="mt-3 text-sm leading-6 text-body">
                  {source.citationPlaceholder}
                </p>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Related Evidence
                  </p>
                  <div className="mt-3">
                    <RelationLinks
                      emptyLabel="No evidence is linked to this source record yet."
                      getHref={(item) =>
                        `/case-files/${caseFile.slug}/evidence/${item.id}` as Route
                      }
                      items={source.relatedEvidence.slice(0, 3)}
                    />
                  </div>
                </section>

                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Related Timeline
                  </p>
                  <div className="mt-3">
                    <RelationLinks
                      emptyLabel="No timeline event is linked to this source record yet."
                      getHref={(item) =>
                        `/case-files/${caseFile.slug}/timeline#${item.id}` as Route
                      }
                      items={source.relatedTimelineEvents.slice(0, 3)}
                    />
                  </div>
                </section>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                <p className="text-sm leading-6 text-body">{source.notes}</p>
                <Link
                  className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
                  href={`/case-files/${caseFile.slug}/sources/${source.id}` as Route}
                >
                  Open Source Record
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
