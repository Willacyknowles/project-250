import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { CuratorNote } from "@/components/museum/curator-note";
import { EvidenceTile } from "@/components/museum/evidence-tile";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { GallerySurface } from "@/components/museum/gallery-surface";
import { MuseumLabel } from "@/components/museum/museum-label";
import { exhibitionCopy } from "@/config/exhibition-copy";
import { getArchiveMediaByEvidenceId } from "@/lib/archive-media";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatEvidenceType } from "@/lib/case-file-labels";
import { getEvidenceItemsByCaseFileId } from "@/lib/evidence";
import {
  formatArchiveMediaType,
  formatEvidenceArtifactType,
} from "@/lib/evidence-labels";
import {
  formatEvidenceStatus,
  formatVisitorConfidence,
} from "@/lib/visitor-labels";

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
      title: "Evidence Room Not Found",
    };
  }

  return {
    title: `${caseFile.title} Evidence Room`,
    description: exhibitionCopy.evidenceRoom.intro,
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
            Back to Opening Gallery
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <CaseFileBadge tone="evidence">
              Case File {caseFile.caseNumber.padStart(3, "0")}
            </CaseFileBadge>
            <CaseFileBadge tone="warning">{exhibitionCopy.evidencePending}</CaseFileBadge>
            <CaseFileBadge tone="trust">
              {evidenceItems.length} Object Entries
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              {archiveMediaCount} Images in Preparation
            </CaseFileBadge>
          </div>
          <MuseumLabel tone="brass">Museum Evidence Wall</MuseumLabel>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-6xl">
            Evidence Room
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/78">
            {exhibitionCopy.evidenceRoom.intro} Each drawer gathers a clue for
            review without treating it as a finished conclusion.
          </p>
        </div>
      </header>
      <FloatingGalleryNavigation
        next={{ href: `/case-files/${caseFile.slug}/claims`, label: "Working Conclusions", route: true }}
        previous={{ href: `/case-files/${caseFile.slug}`, label: "Opening Gallery", route: true }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <GallerySurface eyebrow="Evidence Categories" title="Archival Drawers">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-cream p-5">
              <MuseumLabel>Object Entries</MuseumLabel>
              <p className="mt-2 font-serif text-3xl text-foreground">
                {evidenceItems.length}
              </p>
            </div>
            <div className="bg-cream p-5">
              <MuseumLabel>Image Documentation</MuseumLabel>
              <p className="mt-2 font-serif text-3xl text-foreground">
                {archiveMediaCount}
              </p>
            </div>
            <div className="bg-cream p-5">
              <MuseumLabel>Collection Status</MuseumLabel>
              <p className="mt-2 font-serif text-2xl text-foreground">
                {exhibitionCopy.activeInvestigation}
              </p>
            </div>
            <div className="bg-cream p-5">
              <MuseumLabel>Viewer</MuseumLabel>
              <p className="mt-2 font-serif text-2xl text-foreground">
                Image Pending Review
              </p>
            </div>
          </div>
        </GallerySurface>

        <div className="mt-8 max-w-4xl">
          <CuratorNote label="Evidence Room Note">
            <p>
              Each object is examined as evidence only after its image, source
              reference, and relationship to the wider case can be reviewed.
            </p>
          </CuratorNote>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {evidenceItems.map((item, index) => {
            const archiveMedia = getArchiveMediaByEvidenceId(item.id);
            const primaryMedia = archiveMedia[0];
            const mediaLabel = primaryMedia
              ? `${formatArchiveMediaType(primaryMedia.mediaType)} documentation`
              : "Image documentation pending";

            return (
              <EvidenceTile
                archiveNumber={`Drawer ${String(index + 1).padStart(2, "0")}`}
                artifactType={formatEvidenceArtifactType(item.artifactType)}
                caption={`${item.description} Evidence type: ${formatEvidenceType(item.evidenceType)}. Source references: ${item.sourceReferences.length}.`}
                confidence={formatVisitorConfidence(item.confidence)}
                href={`/case-files/${caseFile.slug}/evidence/${item.id}` as Route}
                key={item.id}
                mediaLabel={mediaLabel}
                status={formatEvidenceStatus(item.status)}
                title={item.title}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
