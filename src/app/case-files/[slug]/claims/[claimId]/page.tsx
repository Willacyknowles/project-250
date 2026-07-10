import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatConfidence } from "@/lib/case-file-labels";
import { formatClaimType } from "@/lib/claim-labels";
import {
  getClaimRecordForCaseFile,
  getClaimRecordsByCaseFileId,
} from "@/lib/claims";
import { getEvidenceItemById } from "@/lib/evidence";
import { getSourceRecordById } from "@/lib/sources";
import { getTimelineEventById } from "@/lib/timeline";
import type { ResearchStatus } from "@/types/case-file";

type ClaimDetailPageProps = {
  params: Promise<{
    claimId: string;
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

function MetadataRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-border bg-cream p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

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
      <div className="rounded-sm border border-dashed border-warning/40 bg-warning/5 p-5">
        <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
        <p className="mt-4 text-sm leading-6 text-body">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
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
  return getCaseFiles().flatMap((caseFile) =>
    getClaimRecordsByCaseFileId(caseFile.id).map((claim) => ({
      claimId: claim.id,
      slug: caseFile.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ClaimDetailPageProps): Promise<Metadata> {
  const { claimId, slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Claim Not Found",
    };
  }

  const claim = getClaimRecordForCaseFile(caseFile.id, claimId);

  if (!claim) {
    return {
      title: "Claim Not Found",
    };
  }

  return {
    title: `${claim.title} Claim Record`,
    description: claim.statement,
  };
}

export default async function ClaimDetailPage({
  params,
}: ClaimDetailPageProps) {
  const { claimId, slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const claim = getClaimRecordForCaseFile(caseFile.id, claimId);

  if (!claim) {
    notFound();
  }

  const relatedEvidence = claim.relatedEvidenceIds.map(evidenceReference);
  const relatedSources = claim.relatedSourceIds.map(sourceReference);
  const relatedTimelineEvents = claim.relatedTimelineEventIds.map(timelineReference);

  return (
    <main className="museum-reading-room min-h-screen pb-36 text-foreground">
      <header className="museum-spotlight text-cream">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-brass">
            <Link href={`/case-files/${caseFile.slug}` as Route}>Case File</Link>
            <Link href={`/case-files/${caseFile.slug}/claims` as Route}>
              Claims Engine
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone={statusTone[claim.status]}>
              {claim.status}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              Confidence: {formatConfidence(claim.confidence)}
            </CaseFileBadge>
          </div>
          <p className="mt-8 museum-label-text text-brass">
            Claim Record
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            {claim.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-cream/78">
            {claim.statement}
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/timeline`, label: "Timeline", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}/claims`, label: "Claims", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_22rem] lg:px-8">
        <div className="space-y-8">
          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                  Claim Statement
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                  Assertion Control
                </h2>
              </div>
              <CaseFileBadge tone={statusTone[claim.status]}>
                {claim.status}
              </CaseFileBadge>
            </div>
            <p className="mt-5 text-sm leading-6 text-body">{claim.statement}</p>
            <div className="mt-5 rounded-sm border border-dashed border-warning/40 bg-warning/5 p-5">
              <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
              <p className="mt-4 text-sm leading-6 text-body">{claim.notes}</p>
            </div>
          </section>

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Linked Evidence
            </p>
            <div className="mt-5">
              <RelationLinks
                emptyLabel="No evidence is linked to this claim yet."
                getHref={(item) =>
                  `/case-files/${caseFile.slug}/evidence/${item.id}` as Route
                }
                items={relatedEvidence}
              />
            </div>
          </section>

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Linked Sources
            </p>
            <div className="mt-5">
              <RelationLinks
                emptyLabel="No sources are linked to this claim yet."
                getHref={(item) =>
                  `/case-files/${caseFile.slug}/sources/${item.id}` as Route
                }
                items={relatedSources}
              />
            </div>
          </section>

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Linked Timeline Events
            </p>
            <div className="mt-5">
              <RelationLinks
                emptyLabel="No timeline events are linked to this claim yet."
                getHref={(item) =>
                  `/case-files/${caseFile.slug}/timeline#${item.id}` as Route
                }
                items={relatedTimelineEvents}
              />
            </div>
          </section>

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Open Questions
            </p>
            <div className="mt-5 grid gap-3">
              {claim.openQuestions.map((question) => (
                <article
                  className="rounded-sm border border-border bg-cream p-4"
                  key={question.id}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {question.status}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-body">
                    {question.question}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Revision History
            </p>
            <div className="mt-5 grid gap-3">
              {claim.revisionHistory.map((revision) => (
                <article
                  className="rounded-sm border border-border bg-cream p-4"
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
          <dl className="grid gap-3 museum-drawer rounded-sm p-5">
            <MetadataRow label="Claim ID" value={claim.id} />
            <MetadataRow label="Claim Type" value={formatClaimType(claim.claimType)} />
            <MetadataRow label="Status" value={claim.status} />
            <MetadataRow
              label="Confidence"
              value={formatConfidence(claim.confidence)}
            />
            <MetadataRow
              label="Linked Evidence"
              value={claim.relatedEvidenceIds.length}
            />
            <MetadataRow
              label="Linked Sources"
              value={claim.relatedSourceIds.length}
            />
            <MetadataRow
              label="Timeline Events"
              value={claim.relatedTimelineEventIds.length}
            />
            <MetadataRow
              label="Open Questions"
              value={claim.openQuestions.length}
            />
          </dl>
        </aside>
      </div>
    </main>
  );
}
