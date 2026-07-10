import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { ArchivalCard } from "@/components/museum/archival-card";
import { CuratorNote } from "@/components/museum/curator-note";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { GallerySurface } from "@/components/museum/gallery-surface";
import { MuseumLabel } from "@/components/museum/museum-label";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatConfidence } from "@/lib/case-file-labels";
import { formatClaimType } from "@/lib/claim-labels";
import { getClaimRecordsByCaseFileId } from "@/lib/claims";
import { getEvidenceItemById } from "@/lib/evidence";
import { getSourceRecordById } from "@/lib/sources";
import { getTimelineEventById } from "@/lib/timeline";
import type { ResearchStatus } from "@/types/case-file";

type ClaimsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type RelationReference = {
  id: string;
  label: string;
  status: ResearchStatus;
};

const requiresResearch = "Requires Research" as const;

const statusTone: Record<ResearchStatus, "neutral" | "trust" | "warning"> = {
  Documented: "trust",
  "In Review": "neutral",
  "Requires Research": "warning",
};

function evidenceReference(id: string): RelationReference {
  const evidence = getEvidenceItemById(id);

  return {
    id,
    label: evidence?.title ?? id,
    status: evidence?.status ?? requiresResearch,
  };
}

function sourceReference(id: string): RelationReference {
  const source = getSourceRecordById(id);

  return {
    id,
    label: source?.title ?? id,
    status: source?.status ?? requiresResearch,
  };
}

function timelineReference(id: string): RelationReference {
  const event = getTimelineEventById(id);

  return {
    id,
    label: event?.title ?? id,
    status: event?.status ?? requiresResearch,
  };
}

function RelationLinks({
  emptyLabel,
  getHref,
  items,
}: {
  emptyLabel: string;
  getHref: (item: RelationReference) => Route;
  items: readonly RelationReference[];
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
      {items.map((item) => (
        <Link
          className="flex items-start justify-between gap-3 rounded-sm border border-border bg-cream p-4 text-sm transition hover:border-brass"
          href={getHref(item)}
          key={item.id}
        >
          <span className="font-semibold text-foreground">{item.label}</span>
          <CaseFileBadge tone={statusTone[item.status]}>
            {item.status}
          </CaseFileBadge>
        </Link>
      ))}
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
}: ClaimsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Claims Not Found",
    };
  }

  return {
    title: `${caseFile.title} Claims`,
    description:
      "Claims Engine foundation for tracking historical assertions separately from evidence and sources.",
  };
}

export default async function ClaimsPage({ params }: ClaimsPageProps) {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const claims = getClaimRecordsByCaseFileId(caseFile.id);

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
            <CaseFileBadge tone="warning">Claims Engine Foundation</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {claims.length} Placeholder Claims
            </CaseFileBadge>
          </div>
          <MuseumLabel tone="brass">Assertion Catalogue</MuseumLabel>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            {caseFile.title} Claims
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/78">
            A claim register for historical assertions. Every claim remains
            Requires Research until evidence, sources, and timeline context are
            reviewed together.
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/timeline`, label: "Timeline", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}/evidence`, label: "Evidence Vault", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <GallerySurface eyebrow="Claim Register" title="Assertion Containers Awaiting Evidence">
          <p className="max-w-3xl text-sm leading-7 text-body">
            These records separate possible assertions from proof. They are not conclusions, and confidence remains unknown until reviewed records support them.
          </p>
        </GallerySurface>

        <div className="mt-8 max-w-4xl">
          <CuratorNote label="Assertion Room Note">
            <p>
              Claims are displayed separately from evidence so the exhibition never confuses a research target with a verified historical conclusion.
            </p>
          </CuratorNote>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          {claims.map((claim) => {
            const relatedEvidence = claim.relatedEvidenceIds.map(evidenceReference);
            const relatedSources = claim.relatedSourceIds.map(sourceReference);
            const relatedTimelineEvents = claim.relatedTimelineEventIds.map(timelineReference);

            return (
              <ArchivalCard
                actions={
                  <>
                    <CaseFileBadge tone={statusTone[claim.status]}>
                      {claim.status}
                    </CaseFileBadge>
                    <CaseFileBadge tone="neutral">
                      {formatConfidence(claim.confidence)}
                    </CaseFileBadge>
                  </>
                }
                eyebrow={formatClaimType(claim.claimType)}
                key={claim.id}
                title={claim.title}
              >
                <p className="text-sm leading-7 text-body">{claim.statement}</p>
                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  <section>
                    <MuseumLabel>Evidence</MuseumLabel>
                    <div className="mt-3">
                      <RelationLinks
                        emptyLabel="No evidence is linked to this claim yet."
                        getHref={(item) =>
                          `/case-files/${caseFile.slug}/evidence/${item.id}` as Route
                        }
                        items={relatedEvidence}
                      />
                    </div>
                  </section>
                  <section>
                    <MuseumLabel>Sources</MuseumLabel>
                    <div className="mt-3">
                      <RelationLinks
                        emptyLabel="No source is linked to this claim yet."
                        getHref={(item) =>
                          `/case-files/${caseFile.slug}/sources/${item.id}` as Route
                        }
                        items={relatedSources}
                      />
                    </div>
                  </section>
                  <section>
                    <MuseumLabel>Timeline</MuseumLabel>
                    <div className="mt-3">
                      <RelationLinks
                        emptyLabel="No timeline event is linked to this claim yet."
                        getHref={(item) =>
                          `/case-files/${caseFile.slug}/timeline#${item.id}` as Route
                        }
                        items={relatedTimelineEvents}
                      />
                    </div>
                  </section>
                </div>
                <section className="mt-6 rounded-sm border border-border bg-cream p-4">
                  <MuseumLabel>Open Questions</MuseumLabel>
                  <ul className="mt-3 grid gap-3 text-sm leading-6 text-body">
                    {claim.openQuestions.map((question) => (
                      <li className="flex gap-3" key={question.id}>
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
                        <span>{question.question}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                  <p className="max-w-2xl text-sm leading-7 text-body">{claim.notes}</p>
                  <Link
                    className="museum-action-link text-sm"
                    href={`/case-files/${caseFile.slug}/claims/${claim.id}` as Route}
                  >
                    Open Claim Record
                  </Link>
                </div>
              </ArchivalCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
