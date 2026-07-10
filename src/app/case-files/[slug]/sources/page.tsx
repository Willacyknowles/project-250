import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { ArchivalCard } from "@/components/museum/archival-card";
import { CuratorNote } from "@/components/museum/curator-note";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { GallerySurface } from "@/components/museum/gallery-surface";
import { MuseumButton } from "@/components/museum/museum-button";
import { MuseumLabel } from "@/components/museum/museum-label";
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
      <div className="rounded-sm border border-dashed border-warning/40 bg-warning/5 p-4">
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
              className="flex items-start justify-between gap-3 rounded-sm border border-border bg-cream p-4 text-sm transition hover:border-brass"
              href={getHref(item)}
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
    <main className="museum-reading-room min-h-screen pb-36 text-foreground">
      <header className="museum-spotlight text-cream">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <Link
            className="text-sm font-semibold text-brass"
            href={`/case-files/${caseFile.slug}` as Route}
          >
            Back to Case File
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone="warning">Source Library Foundation</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {sourceRecords.length} Placeholder Sources
            </CaseFileBadge>
          </div>
          <MuseumLabel tone="brass">Archival Catalogue</MuseumLabel>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            {caseFile.title} Sources
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/78">
            A controlled source library for future reviewed citations. Every
            source record remains marked Requires Research until the source is
            located, cited, reviewed, and connected to verified evidence.
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/timeline`, label: "Timeline", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}/claims`, label: "Claims", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <GallerySurface eyebrow="Catalogue Index" title="Repository Records Awaiting Verification">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-sm border border-border bg-cream p-4">
              <MuseumLabel>Records</MuseumLabel>
              <p className="mt-2 font-serif text-3xl text-foreground">
                {sourceRecords.length}
              </p>
            </div>
            <div className="rounded-sm border border-border bg-cream p-4">
              <MuseumLabel>Shelf Marks</MuseumLabel>
              <p className="mt-2 font-serif text-2xl text-foreground">
                Requires Research
              </p>
            </div>
            <div className="rounded-sm border border-border bg-cream p-4">
              <MuseumLabel>Verification</MuseumLabel>
              <p className="mt-2 font-serif text-2xl text-foreground">
                Pending Review
              </p>
            </div>
          </div>
        </GallerySurface>

        <div className="mt-8 max-w-4xl">
          <CuratorNote label="Catalogue Room Note">
            <p>
              Source records are catalogued as research containers. They remain placeholders until citations, repositories, and independent review can be verified.
            </p>
          </CuratorNote>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          {sourceRecords.map((source) => (
            <ArchivalCard
              actions={
                <>
                  <CaseFileBadge tone={statusTone[source.status]}>
                    {source.status}
                  </CaseFileBadge>
                  <CaseFileBadge tone="neutral">
                    {formatConfidence(source.confidence)}
                  </CaseFileBadge>
                </>
              }
              eyebrow={formatSourceType(source.sourceType)}
              key={source.id}
              title={source.title}
            >
              <dl className="grid gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-sm border border-border bg-cream p-4">
                  <MuseumLabel>Repository</MuseumLabel>
                  <dd className="mt-2 text-foreground">{source.repositoryArchive}</dd>
                </div>
                <div className="rounded-sm border border-border bg-cream p-4">
                  <MuseumLabel>Shelf Mark</MuseumLabel>
                  <dd className="mt-2 text-foreground">Requires Research</dd>
                </div>
                <div className="rounded-sm border border-border bg-cream p-4">
                  <MuseumLabel>Independence</MuseumLabel>
                  <dd className="mt-2 text-foreground">
                    {formatSourceIndependenceLevel(source.independenceLevel)}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 rounded-sm border border-border bg-cream p-5">
                <MuseumLabel>Citation</MuseumLabel>
                <p className="mt-3 font-serif text-xl leading-8 text-foreground">
                  {source.citationPlaceholder}
                </p>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <section>
                  <MuseumLabel>Connections to Evidence</MuseumLabel>
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
                  <MuseumLabel>Connections to Timeline</MuseumLabel>
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
                <p className="max-w-2xl text-sm leading-7 text-body">{source.notes}</p>
                <MuseumButton
                  className="px-4 py-2 text-xs"
                  href={`/case-files/${caseFile.slug}/sources/${source.id}` as Route}
                >
                  Open Source Record
                </MuseumButton>
              </div>
            </ArchivalCard>
          ))}
        </div>
      </section>
    </main>
  );
}
