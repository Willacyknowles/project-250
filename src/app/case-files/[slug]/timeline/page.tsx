import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatConfidence } from "@/lib/case-file-labels";
import { getTimelineEventsByCaseFileId } from "@/lib/timeline";
import { formatTimelineDatePrecision } from "@/lib/timeline-labels";
import type { ResearchStatus } from "@/types/case-file";
import type { TimelineReference } from "@/types/timeline";

type TimelinePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusTone: Record<ResearchStatus, "neutral" | "trust" | "warning"> = {
  Documented: "trust",
  "In Review": "neutral",
  "Requires Research": "warning",
};

function ReferenceList({
  emptyLabel,
  items,
  linkBase,
}: {
  emptyLabel: string;
  items: readonly TimelineReference[];
  linkBase?: string;
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

        if (linkBase) {
          return (
            <Link
              className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background p-4 text-sm transition hover:border-evidence"
              href={`${linkBase}/${item.id}` as Route}
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
}: TimelinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Timeline Not Found",
    };
  }

  return {
    title: `${caseFile.title} Timeline`,
    description:
      "Investigation Timeline foundation for the 1610 Geneva Bible Case File.",
  };
}

export default async function CaseFileTimelinePage({ params }: TimelinePageProps) {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const timelineEvents = getTimelineEventsByCaseFileId(caseFile.id);
  const evidenceLinkBase = `/case-files/${caseFile.slug}/evidence`;

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
            <CaseFileBadge tone="warning">Timeline Foundation</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {timelineEvents.length} Placeholder Events
            </CaseFileBadge>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Investigation Timeline
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {caseFile.title} Timeline
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
            A structured timeline foundation for future dated evidence. Every
            event remains marked Requires Research until reviewed sources,
            claims, and evidence support a historical entry.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <ol className="relative space-y-8 border-l border-border pl-6 lg:pl-10">
          {timelineEvents.map((event) => (
            <li className="relative" key={event.id}>
              <span className="absolute -left-[2.05rem] top-6 size-4 rounded-full border border-evidence bg-background ring-4 ring-surface lg:-left-[2.55rem]" />
              <article className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-sm font-semibold text-evidence">
                      {event.date ? (
                        <time dateTime={event.date}>{event.dateLabel}</time>
                      ) : (
                        event.dateLabel
                      )}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">
                      {event.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <CaseFileBadge tone="warning">{event.status}</CaseFileBadge>
                    <CaseFileBadge tone="trust">
                      Confidence: {formatConfidence(event.confidence)}
                    </CaseFileBadge>
                    <CaseFileBadge tone="neutral">
                      {formatTimelineDatePrecision(event.datePrecision)}
                    </CaseFileBadge>
                  </div>
                </div>

                <p className="mt-5 max-w-4xl text-sm leading-6 text-body">
                  {event.description}
                </p>

                <div className="mt-6 grid gap-5 xl:grid-cols-2">
                  <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Linked Evidence
                    </p>
                    <div className="mt-3">
                      <ReferenceList
                        emptyLabel="No evidence is linked to this timeline event yet."
                        items={event.relatedEvidence}
                        linkBase={evidenceLinkBase}
                      />
                    </div>
                  </section>

                  <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Linked Claims
                    </p>
                    <div className="mt-3">
                      <ReferenceList
                        emptyLabel="No claims are linked. Claims must wait for evidence and source review."
                        items={event.relatedClaims}
                      />
                    </div>
                  </section>
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
                  <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Related Sources
                    </p>
                    <div className="mt-3">
                      <ReferenceList
                        emptyLabel="No source targets are linked to this timeline event yet."
                        items={event.relatedSources}
                      />
                    </div>
                  </section>

                  <section className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Notes
                    </p>
                    <p className="mt-3 text-sm leading-6 text-body">
                      {event.notes}
                    </p>
                  </section>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
