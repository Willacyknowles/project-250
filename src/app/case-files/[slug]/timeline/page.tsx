import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { CuratorNote } from "@/components/museum/curator-note";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { GallerySurface } from "@/components/museum/gallery-surface";
import { MuseumLabel } from "@/components/museum/museum-label";
import { TimelineMarker } from "@/components/museum/timeline-marker";
import { exhibitionCopy } from "@/config/exhibition-copy";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { getTimelineEventsByCaseFileId } from "@/lib/timeline";
import { formatTimelineDatePrecision } from "@/lib/timeline-labels";
import {
  formatEvidenceStatus,
  formatInterpretationStatus,
  formatTimelineStatus,
  formatVisitorConfidence,
} from "@/lib/visitor-labels";
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
  formatStatusLabel,
  items,
  linkBase,
}: {
  emptyLabel: string;
  formatStatusLabel: (status: ResearchStatus) => string;
  items: readonly TimelineReference[];
  linkBase?: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-warning/40 bg-warning/5 p-4">
        <CaseFileBadge tone="warning">Source Review Needed</CaseFileBadge>
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
              {formatStatusLabel(item.status)}
            </CaseFileBadge>
          </>
        );

        if (linkBase) {
          return (
            <Link
              className="flex items-start justify-between gap-3 rounded-sm border border-border bg-cream p-4 text-sm transition hover:border-brass"
              href={`${linkBase}/${item.id}` as Route}
              key={item.id}
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            className="flex items-start justify-between gap-3 rounded-sm border border-border bg-cream p-4 text-sm"
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
      title: "Chronology Not Found",
    };
  }

  return {
    title: `${caseFile.title} Chronology`,
    description: exhibitionCopy.chronology.intro,
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
  const sourceLinkBase = `/case-files/${caseFile.slug}/sources`;

  return (
    <main className="museum-reading-room min-h-screen pb-36 text-foreground">
      <header className="museum-spotlight text-cream">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <Link
            className="text-sm font-semibold text-brass"
            href={`/case-files/${caseFile.slug}` as Route}
          >
            Back to Opening Gallery
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone="warning">{exhibitionCopy.activeInvestigation}</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {timelineEvents.length} Chronology Entries
            </CaseFileBadge>
          </div>
          <MuseumLabel tone="brass">Museum Chronology</MuseumLabel>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            A History in Progress
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/78">
            {exhibitionCopy.chronology.intro}
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/sources`, label: "Research Library", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}/claims`, label: "Working Conclusions", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <section className="museum-exhibition-wall mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <GallerySurface eyebrow="Chronology Room" title={exhibitionCopy.chronology.progressTitle}>
          <p className="max-w-3xl text-sm leading-7 text-body">
            Dates remain open until evidence and sources can support them. The
            chronology preserves the order of questions without turning them
            into conclusions.
          </p>
        </GallerySurface>

        <div className="mt-8 max-w-4xl">
          <CuratorNote label="Chronology Wall Note">
            <p>
              Printing, publication, ownership, inscription, discovery, and
              modern investigation are shown as research categories while the
              documentary trail is assembled.
            </p>
          </CuratorNote>
        </div>

        <ol className="relative mt-12 space-y-12 border-l border-brass/55 pl-7 lg:pl-12">
          {timelineEvents.map((event) => (
            <li className="relative scroll-mt-8" id={event.id} key={event.id}>
              <span className="absolute -left-[2.25rem] top-10 size-6 rounded-full border border-brass bg-cream shadow-sm ring-8 ring-parchment lg:-left-[3.25rem]" />
              <TimelineMarker
                dateLabel={event.dateLabel}
                status={event.status}
                title={event.title}
              >
                <div className="flex flex-wrap gap-2">
                  <CaseFileBadge tone="neutral">
                    {formatVisitorConfidence(event.confidence)}
                  </CaseFileBadge>
                  <CaseFileBadge tone="warning">
                    {formatTimelineStatus(event.status)}
                  </CaseFileBadge>
                  <CaseFileBadge tone="neutral">
                    {formatTimelineDatePrecision(event.datePrecision)}
                  </CaseFileBadge>
                </div>
                <p className="mt-5 max-w-4xl text-sm leading-7 text-cream/72">
                  {event.description}
                </p>
                <div className="mt-7 grid gap-6 xl:grid-cols-2">
                  <section>
                    <MuseumLabel>Linked Evidence</MuseumLabel>
                    <div className="mt-3">
                      <ReferenceList
                        emptyLabel="No evidence is linked to this chronology entry yet."
                        formatStatusLabel={formatEvidenceStatus}
                        items={event.relatedEvidence}
                        linkBase={evidenceLinkBase}
                      />
                    </div>
                  </section>
                  <section>
                    <MuseumLabel>Linked Working Conclusions</MuseumLabel>
                    <div className="mt-3">
                      <ReferenceList
                        emptyLabel="No working conclusions are linked to this chronology entry yet."
                        formatStatusLabel={formatInterpretationStatus}
                        items={event.relatedClaims}
                      />
                    </div>
                  </section>
                </div>
                <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1fr]">
                  <section>
                    <MuseumLabel>Related Sources</MuseumLabel>
                    <div className="mt-3">
                      <ReferenceList
                        emptyLabel="No source targets are linked to this chronology entry yet."
                        formatStatusLabel={formatInterpretationStatus}
                        items={event.relatedSources}
                        linkBase={sourceLinkBase}
                      />
                    </div>
                  </section>
                  <section className="rounded-sm border border-border bg-cream p-4">
                    <MuseumLabel>Curator Notes</MuseumLabel>
                    <p className="mt-3 text-sm leading-7 text-body">
                      {event.notes}
                    </p>
                  </section>
                </div>
              </TimelineMarker>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

