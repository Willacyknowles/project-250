import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
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
      <div className="rounded-lg border border-dashed border-warning/40 bg-warning/5 p-4">
        <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
        <p className="mt-3 text-sm leading-6 text-body">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <Link
          className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background p-4 text-sm transition hover:border-evidence"
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
            <CaseFileBadge tone="warning">Claims Engine Foundation</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {claims.length} Placeholder Claims
            </CaseFileBadge>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Claims Engine
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {caseFile.title} Claims
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
            A claim register for historical assertions. Every claim remains
            Requires Research until evidence, sources, and timeline context are
            reviewed together.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-2">
          {claims.map((claim) => {
            const relatedEvidence = claim.relatedEvidenceIds.map(evidenceReference);
            const relatedSources = claim.relatedSourceIds.map(sourceReference);
            const relatedTimelineEvents = claim.relatedTimelineEventIds.map(timelineReference);

            return (
              <article
                className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8"
                key={claim.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                      {formatClaimType(claim.claimType)}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">
                      {claim.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <CaseFileBadge tone={statusTone[claim.status]}>
                      {claim.status}
                    </CaseFileBadge>
                    <CaseFileBadge tone="trust">
                      {formatConfidence(claim.confidence)}
                    </CaseFileBadge>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-body">
                  {claim.statement}
                </p>

                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Linked Evidence
                    </p>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Linked Sources
                    </p>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Timeline Events
                    </p>
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

                <section className="mt-6 rounded-lg border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Open Questions
                  </p>
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
                  <p className="text-sm leading-6 text-body">{claim.notes}</p>
                  <Link
                    className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
                    href={`/case-files/${caseFile.slug}/claims/${claim.id}` as Route}
                  >
                    Open Claim Record
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
