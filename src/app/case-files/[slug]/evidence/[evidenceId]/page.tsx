import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveImagePanel } from "@/components/archive/archive-image-panel";
import { ArchiveMediaMetadata } from "@/components/archive/archive-media-metadata";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { MuseumButton } from "@/components/museum/museum-button";
import {
  getArchiveMediaByEvidenceId,
  getPrimaryArchiveMediaForEvidence,
} from "@/lib/archive-media";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import {
  formatConfidence,
  formatEvidenceType,
  formatStatus,
} from "@/lib/case-file-labels";
import {
  getEvidenceItemForCaseFile,
  getEvidenceItemsByCaseFileId,
} from "@/lib/evidence";
import {
  formatArchiveMediaType,
  formatEvidenceArtifactType,
} from "@/lib/evidence-labels";

type EvidenceDetailPageProps = {
  params: Promise<{
    evidenceId: string;
    slug: string;
  }>;
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

export function generateStaticParams() {
  return getCaseFiles().flatMap((caseFile) =>
    getEvidenceItemsByCaseFileId(caseFile.id).map((item) => ({
      evidenceId: item.id,
      slug: caseFile.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: EvidenceDetailPageProps): Promise<Metadata> {
  const { evidenceId, slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Evidence Not Found",
    };
  }

  const evidence = getEvidenceItemForCaseFile(caseFile.id, evidenceId);

  if (!evidence) {
    return {
      title: "Evidence Not Found",
    };
  }

  return {
    title: `${evidence.title} Evidence Record`,
    description: evidence.description,
  };
}

export default async function EvidenceDetailPage({
  params,
}: EvidenceDetailPageProps) {
  const { evidenceId, slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const evidence = getEvidenceItemForCaseFile(caseFile.id, evidenceId);

  if (!evidence) {
    notFound();
  }

  const archiveMedia = getArchiveMediaByEvidenceId(evidence.id);
  const primaryMedia = getPrimaryArchiveMediaForEvidence(evidence.id);

  return (
    <main className="museum-reading-room min-h-screen pb-36 text-foreground">
      <header className="museum-spotlight text-cream">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-brass">
            <Link href={`/case-files/${caseFile.slug}` as Route}>Case File</Link>
            <Link href={`/case-files/${caseFile.slug}/evidence` as Route}>
              Evidence Vault
            </Link>
            {primaryMedia ? (
              <Link
                href={
                  `/case-files/${caseFile.slug}/evidence/${evidence.id}/archive` as Route
                }
              >
                Archive Viewer
              </Link>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone="warning">{evidence.status}</CaseFileBadge>
            <CaseFileBadge tone="neutral">
              Confidence: {formatConfidence(evidence.confidence)}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              {archiveMedia.length} Archive Media
            </CaseFileBadge>
          </div>
          <p className="mt-8 museum-label-text text-brass">
            Evidence Record
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            {evidence.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-cream/78">
            {evidence.description}
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/evidence/${evidence.id}/archive`, label: "Archive Viewer", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}/evidence`, label: "Evidence Vault", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_22rem] lg:px-8">
        <div className="space-y-8">
          {primaryMedia ? (
            <>
              <ArchiveImagePanel media={primaryMedia} />

              <section className="museum-drawer rounded-sm p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                      Archive Access
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">
                      Placeholder Archive Viewer
                    </h2>
                  </div>
                  <CaseFileBadge tone="warning">
                    {primaryMedia.placeholderState}
                  </CaseFileBadge>
                </div>
                <p className="mt-4 text-sm leading-6 text-body">
                  This record has an archive media control entry, but no verified
                  image, scan, or document has been attached.
                </p>
                <MuseumButton
                  className="mt-5"
                  href={`/case-files/${caseFile.slug}/evidence/${evidence.id}/archive` as Route}
                >
                  Open Archive Viewer
                </MuseumButton>
              </section>

              <ArchiveMediaMetadata media={primaryMedia} />
            </>
          ) : (
            <section className="museum-drawer rounded-sm p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                Archive Media
              </p>
              <div className="mt-5 rounded-sm border border-dashed border-warning/40 bg-warning/5 p-5">
                <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
                <p className="mt-4 text-sm leading-6 text-body">
                  No archive media record is attached to this evidence item.
                </p>
              </div>
            </section>
          )}

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Related Claims
            </p>
            {evidence.relatedClaimIds.length > 0 ? (
              <div className="mt-5 grid gap-3">
                {evidence.relatedClaimIds.map((claim) => (
                  <article
                    className="rounded-sm border border-border bg-cream p-4"
                    key={claim.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="font-semibold text-foreground">
                        {claim.label}
                      </p>
                      <CaseFileBadge tone="warning">
                        {formatStatus(claim.status)}
                      </CaseFileBadge>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-sm border border-dashed border-warning/40 bg-warning/5 p-5">
                <CaseFileBadge tone="warning">Requires Research</CaseFileBadge>
                <p className="mt-4 text-sm leading-6 text-body">
                  No related claims are attached. Claims must be created only
                  after evidence and sources are reviewed.
                </p>
              </div>
            )}
          </section>

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Source References
            </p>
            <div className="mt-5 grid gap-3">
              {evidence.sourceReferences.map((source) => (
                <article
                  className="rounded-sm border border-border bg-cream p-4"
                  key={source.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="font-semibold text-foreground">
                      {source.label}
                    </h2>
                    <CaseFileBadge tone="warning">{source.status}</CaseFileBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-body">
                    {source.citation}
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
              {evidence.revisionHistory.map((revision) => (
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
            <MetadataRow label="Evidence ID" value={evidence.id} />
            <MetadataRow
              label="Artifact Type"
              value={formatEvidenceArtifactType(evidence.artifactType)}
            />
            <MetadataRow
              label="Evidence Type"
              value={formatEvidenceType(evidence.evidenceType)}
            />
            <MetadataRow label="Status" value={evidence.status} />
            <MetadataRow
              label="Confidence"
              value={formatConfidence(evidence.confidence)}
            />
            <MetadataRow
              label="Archive Media"
              value={`${archiveMedia.length} placeholder record${archiveMedia.length === 1 ? "" : "s"}`}
            />
            <MetadataRow
              label="Primary Media Type"
              value={
                primaryMedia
                  ? formatArchiveMediaType(primaryMedia.mediaType)
                  : "Requires Research"
              }
            />
            <MetadataRow label="Related Case File" value={caseFile.title} />
            <MetadataRow
              label="Related Claims"
              value={evidence.relatedClaimIds.length}
            />
            <MetadataRow
              label="Source References"
              value={evidence.sourceReferences.length}
            />
          </dl>
        </aside>
      </div>
    </main>
  );
}
