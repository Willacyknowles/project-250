import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchivePlaceholder } from "@/components/archive/archive-placeholder";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { getArchiveMediaByEvidenceId } from "@/lib/archive-media";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import {
  formatConfidence,
  formatEvidenceType,
} from "@/lib/case-file-labels";
import { getEvidenceItemsByCaseFileId } from "@/lib/evidence";
import {
  formatArchiveMediaType,
  formatEvidenceArtifactType,
} from "@/lib/evidence-labels";

type EvidenceVaultPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getCaseFiles().map((caseFile) => ({
    slug: caseFile.slug,
  }));
}

export async function generateMetadata({
  params,
}: EvidenceVaultPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Evidence Vault Not Found",
    };
  }

  return {
    title: `${caseFile.title} Evidence Vault`,
    description:
      "Evidence Vault foundation for the 1610 Geneva Bible Case File.",
  };
}

export default async function EvidenceVaultPage({
  params,
}: EvidenceVaultPageProps) {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const evidenceItems = getEvidenceItemsByCaseFileId(caseFile.id);
  const archiveMediaCount = evidenceItems.reduce(
    (count, item) => count + getArchiveMediaByEvidenceId(item.id).length,
    0,
  );

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
            <CaseFileBadge tone="warning">Evidence Vault Foundation</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {evidenceItems.length} Records
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              {archiveMediaCount} Archive Media Placeholders
            </CaseFileBadge>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Evidence Vault
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
            Placeholder evidence and archive media records for {caseFile.title}.
            Each item remains marked Requires Research until artifact images,
            source references, and human review verify the record.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {evidenceItems.map((item) => {
            const archiveMedia = getArchiveMediaByEvidenceId(item.id);
            const primaryMedia = archiveMedia[0];

            return (
              <Link
                className="group rounded-lg border border-border bg-surface p-5 shadow-sm transition hover:border-evidence"
                href={
                  `/case-files/${caseFile.slug}/evidence/${item.id}` as Route
                }
                key={item.id}
              >
                <div className="flex flex-wrap gap-2">
                  <CaseFileBadge tone="warning">{item.status}</CaseFileBadge>
                  <CaseFileBadge tone="trust">
                    {formatConfidence(item.confidence)}
                  </CaseFileBadge>
                  <CaseFileBadge tone="neutral">
                    Media {archiveMedia.length > 0 ? "Exists" : "Pending"}
                  </CaseFileBadge>
                </div>

                <div className="mt-5">
                  {primaryMedia ? (
                    <ArchivePlaceholder
                      altText={primaryMedia.altText}
                      caption={primaryMedia.caption}
                      size="compact"
                      status={primaryMedia.placeholderState}
                    />
                  ) : (
                    <div className="rounded-lg border border-dashed border-warning/40 bg-warning/5 p-5">
                      <CaseFileBadge tone="warning">
                        Requires Research
                      </CaseFileBadge>
                      <p className="mt-4 text-sm leading-6 text-body">
                        Archive media record has not been created for this
                        evidence item.
                      </p>
                    </div>
                  )}
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
                  {formatEvidenceArtifactType(item.artifactType)}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-foreground group-hover:text-accent">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-body">
                  {item.description}
                </p>
                <dl className="mt-5 grid gap-3 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Evidence Type</dt>
                    <dd className="font-medium text-foreground">
                      {formatEvidenceType(item.evidenceType)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Media Type</dt>
                    <dd className="font-medium text-foreground">
                      {primaryMedia
                        ? formatArchiveMediaType(primaryMedia.mediaType)
                        : "Requires Research"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Sources</dt>
                    <dd className="font-medium text-foreground">
                      {item.sourceReferences.length}
                    </dd>
                  </div>
                </dl>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
