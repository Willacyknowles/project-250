import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveImagePanel } from "@/components/archive/archive-image-panel";
import { ArchiveMediaMetadata } from "@/components/archive/archive-media-metadata";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { exhibitionCopy } from "@/config/exhibition-copy";
import { getPrimaryArchiveMediaForEvidence } from "@/lib/archive-media";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatEvidenceType } from "@/lib/case-file-labels";
import {
  getEvidenceItemForCaseFile,
  getEvidenceItemsByCaseFileId,
} from "@/lib/evidence";
import { formatEvidenceArtifactType } from "@/lib/evidence-labels";
import {
  formatEvidenceStatus,
  formatInterpretationStatus,
  formatVisitorConfidence,
} from "@/lib/visitor-labels";

type EvidenceArchivePageProps = {
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
}: EvidenceArchivePageProps): Promise<Metadata> {
  const { evidenceId, slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Document Viewer Not Found",
    };
  }

  const evidence = getEvidenceItemForCaseFile(caseFile.id, evidenceId);

  if (!evidence) {
    return {
      title: "Document Viewer Not Found",
    };
  }

  return {
    title: `${evidence.title} Document Viewer`,
    description: exhibitionCopy.documentViewer.emptyCopy,
  };
}

export default async function EvidenceArchivePage({
  params,
}: EvidenceArchivePageProps) {
  const { evidenceId, slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const evidence = getEvidenceItemForCaseFile(caseFile.id, evidenceId);

  if (!evidence) {
    notFound();
  }

  const media = getPrimaryArchiveMediaForEvidence(evidence.id);

  if (!media) {
    notFound();
  }

  return (
    <main className="museum-reading-room min-h-screen pb-36 text-foreground">
      <header className="museum-spotlight text-cream">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-brass">
            <Link href={`/case-files/${caseFile.slug}` as Route}>Opening Gallery</Link>
            <Link href={`/case-files/${caseFile.slug}/evidence` as Route}>
              Evidence Room
            </Link>
            <Link
              href={
                `/case-files/${caseFile.slug}/evidence/${evidence.id}` as Route
              }
            >
              Evidence Object
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone="warning">{formatEvidenceStatus(media.status)}</CaseFileBadge>
            <CaseFileBadge tone="neutral">
              {formatVisitorConfidence(media.confidence)}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">{exhibitionCopy.documentViewer.title}</CaseFileBadge>
          </div>
          <p className="mt-8 museum-label-text text-brass">
            {exhibitionCopy.documentViewer.title}
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            {evidence.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-cream/78">
            {exhibitionCopy.documentViewer.emptyCopy}
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/evidence`, label: "Evidence Room", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}/evidence/${evidence.id}`, label: "Evidence Object", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_22rem] lg:px-8">
        <div className="space-y-8">
          <ArchiveImagePanel media={media} eyebrow={exhibitionCopy.documentViewer.title} />
          <ArchiveMediaMetadata media={media} />

          <section className="museum-drawer rounded-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                  Evidence Context
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                  {evidence.title}
                </h2>
              </div>
              <CaseFileBadge tone="warning">{formatEvidenceStatus(evidence.status)}</CaseFileBadge>
            </div>
            <p className="mt-4 text-sm leading-6 text-body">
              {evidence.description}
            </p>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <dl className="grid gap-3 museum-drawer rounded-sm p-5">
            <MetadataRow label="Media ID" value={media.id} />
            <MetadataRow label="Evidence ID" value={evidence.id} />
            <MetadataRow
              label="Artifact Type"
              value={formatEvidenceArtifactType(evidence.artifactType)}
            />
            <MetadataRow
              label="Evidence Type"
              value={formatEvidenceType(evidence.evidenceType)}
            />
            <MetadataRow label="Media Status" value={formatEvidenceStatus(media.status)} />
            <MetadataRow
              label="Media Confidence"
              value={formatVisitorConfidence(media.confidence)}
            />
            <MetadataRow label="Image Status" value={formatEvidenceStatus(media.placeholderState)} />
          </dl>

          <section className="museum-drawer rounded-sm p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Related Working Conclusions
            </p>
            {evidence.relatedClaimIds.length > 0 ? (
              <div className="mt-4 grid gap-3">
                {evidence.relatedClaimIds.map((claim) => (
                  <div
                    className="rounded-sm border border-border bg-cream p-4"
                    key={claim.id}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {claim.label}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {formatInterpretationStatus(claim.status)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-sm border border-dashed border-warning/40 bg-warning/5 p-4">
                <CaseFileBadge tone="warning">{formatEvidenceStatus(evidence.status)}</CaseFileBadge>
                <p className="mt-3 text-sm leading-6 text-body">
                  No working conclusions are linked to this object yet.
                </p>
              </div>
            )}
          </section>

          <section className="museum-drawer rounded-sm p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
              Source References
            </p>
            <div className="mt-4 grid gap-3">
              {evidence.sourceReferences.map((source) => (
                <div
                  className="rounded-sm border border-border bg-cream p-4"
                  key={source.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">
                      {source.label}
                    </p>
                    <CaseFileBadge tone="warning">{formatInterpretationStatus(source.status)}</CaseFileBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-body">
                    {source.citation}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
