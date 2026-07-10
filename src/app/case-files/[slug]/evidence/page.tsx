import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { EvidenceTile } from "@/components/museum/evidence-tile";
import { CuratorNote } from "@/components/museum/curator-note";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { GallerySurface } from "@/components/museum/gallery-surface";
import { MuseumLabel } from "@/components/museum/museum-label";
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
            <CaseFileBadge tone="warning">Evidence Vault Foundation</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {evidenceItems.length} Records
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              {archiveMediaCount} Archive Media Placeholders
            </CaseFileBadge>
          </div>
          <MuseumLabel tone="brass">Museum Evidence Wall</MuseumLabel>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            Evidence Vault
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/78">
            Placeholder evidence and archive media records for {caseFile.title}.
            Each item remains marked Requires Research until artifact images,
            source references, and human review verify the record.
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/claims`, label: "Claims", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}`, label: "Case File", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <GallerySurface eyebrow="Evidence Categories" title="Artifact Records Awaiting Review">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm border border-border bg-cream p-4">
              <MuseumLabel>Records</MuseumLabel>
              <p className="mt-2 font-serif text-3xl text-foreground">
                {evidenceItems.length}
              </p>
            </div>
            <div className="rounded-sm border border-border bg-cream p-4">
              <MuseumLabel>Archive Media</MuseumLabel>
              <p className="mt-2 font-serif text-3xl text-foreground">
                {archiveMediaCount}
              </p>
            </div>
            <div className="rounded-sm border border-border bg-cream p-4">
              <MuseumLabel>Status</MuseumLabel>
              <p className="mt-2 font-serif text-2xl text-foreground">
                Requires Research
              </p>
            </div>
            <div className="rounded-sm border border-border bg-cream p-4">
              <MuseumLabel>Zoom</MuseumLabel>
              <p className="mt-2 font-serif text-2xl text-foreground">
                Placeholder
              </p>
            </div>
          </div>
        </GallerySurface>

        <div className="mt-8 max-w-4xl">
          <CuratorNote label="Archive Drawer Protocol">
            <p>
              Each drawer is a presentation surface for a placeholder evidence record. No object is treated as verified until reviewed sources and artifact documentation support it.
            </p>
          </CuratorNote>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {evidenceItems.map((item, index) => {
            const archiveMedia = getArchiveMediaByEvidenceId(item.id);
            const primaryMedia = archiveMedia[0];
            const mediaLabel = primaryMedia
              ? `${formatArchiveMediaType(primaryMedia.mediaType)} media placeholder`
              : "Requires Research. Archive media pending.";

            return (
              <EvidenceTile
                archiveNumber={`Drawer ${String(index + 1).padStart(2, "0")}`}
                artifactType={formatEvidenceArtifactType(item.artifactType)}
                caption={`${item.description} Evidence type: ${formatEvidenceType(item.evidenceType)}. Source references: ${item.sourceReferences.length}.`}
                confidence={formatConfidence(item.confidence)}
                href={`/case-files/${caseFile.slug}/evidence/${item.id}` as Route}
                key={item.id}
                mediaLabel={mediaLabel}
                status={item.status}
                title={item.title}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
