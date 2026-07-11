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
import { exhibitionCopy } from "@/config/exhibition-copy";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatClaimType } from "@/lib/claim-labels";
import { getClaimRecordsByCaseFileId } from "@/lib/claims";
import { getEvidenceItemById } from "@/lib/evidence";
import { getSourceRecordById } from "@/lib/sources";
import { getTimelineEventById } from "@/lib/timeline";
import {
  formatEvidenceStatus,
  formatInterpretationStatus,
  formatTimelineStatus,
  formatVisitorConfidence,
} from "@/lib/visitor-labels";
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
  formatStatusLabel,
  getHref,
  items,
}: {
  emptyLabel: string;
  formatStatusLabel: (status: ResearchStatus) => string;
  getHref: (item: RelationReference) => Route;
  items: readonly RelationReference[];
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
    <div className="grid gap-3">
      {items.map((item) => (
        <Link
          className="flex items-start justify-between gap-3 rounded-sm border border-border bg-cream p-4 text-sm transition hover:border-brass"
          href={getHref(item)}
          key={item.id}
        >
          <span className="font-semibold text-foreground">{item.label}</span>
          <CaseFileBadge tone={statusTone[item.status]}>
            {formatStatusLabel(item.status)}
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
      title: "Working Conclusions Not Found",
    };
  }

  return {
    title: `${caseFile.title} Working Conclusions`,
    description: exhibitionCopy.workingConclusions.intro,
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
            Back to Opening Gallery
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone="warning">{exhibitionCopy.sourceReviewNeeded}</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {claims.length} Working Interpretations
            </CaseFileBadge>
          </div>
          <MuseumLabel tone="brass">Working Conclusions</MuseumLabel>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            Questions Under Interpretation
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/78">
            {exhibitionCopy.workingConclusions.intro}
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/timeline`, label: "Chronology", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}/evidence`, label: "Evidence Room", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <GallerySurface eyebrow="Working Conclusions" title="Interpretations Under Review">
          <p className="max-w-3xl text-sm leading-7 text-body">
            These entries separate a possible interpretation from the evidence
            that may support it. Confidence remains unknown until sources and
            object evidence are reviewed together.
          </p>
        </GallerySurface>

        <div className="mt-8 max-w-4xl">
          <CuratorNote label="Working Conclusions Note">
            <p>
              The exhibition does not ask visitors to accept a conclusion before
              the evidence is visible. Each interpretation is held open until
              the record can bear its weight.
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
                      {formatInterpretationStatus(claim.status)}
                    </CaseFileBadge>
                    <CaseFileBadge tone="neutral">
                      {formatVisitorConfidence(claim.confidence)}
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
                        emptyLabel="No evidence is linked to this interpretation yet."
                        formatStatusLabel={formatEvidenceStatus}
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
                        emptyLabel="No source is linked to this interpretation yet."
                        formatStatusLabel={formatInterpretationStatus}
                        getHref={(item) =>
                          `/case-files/${caseFile.slug}/sources/${item.id}` as Route
                        }
                        items={relatedSources}
                      />
                    </div>
                  </section>
                  <section>
                    <MuseumLabel>Chronology</MuseumLabel>
                    <div className="mt-3">
                      <RelationLinks
                        emptyLabel="No chronology entry is linked to this interpretation yet."
                        formatStatusLabel={formatTimelineStatus}
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
                  <MuseumButton
                    className="px-4 py-2 text-xs"
                    href={`/case-files/${caseFile.slug}/claims/${claim.id}` as Route}
                  >
                    Open Working Conclusion
                  </MuseumButton>
                </div>
              </ArchivalCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
