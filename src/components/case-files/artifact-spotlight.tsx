import type { Route } from "next";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { MuseumButton } from "@/components/museum/museum-button";
import { MuseumLabel } from "@/components/museum/museum-label";
import { exhibitionCopy } from "@/config/exhibition-copy";
import { formatEvidenceStatus } from "@/lib/visitor-labels";
import type { ResearchStatus } from "@/types/case-file";

type ArtifactDetail = {
  label: string;
  value: string;
};

type ArtifactSpotlightProps = {
  accessionNumber: string;
  artifactLabel: string;
  caption?: string;
  collection: string;
  description: string;
  details: readonly ArtifactDetail[];
  linkHref?: Route;
  linkLabel?: string;
  status: ResearchStatus;
  title: string;
};

export function ArtifactSpotlight({
  accessionNumber,
  artifactLabel,
  caption,
  collection,
  description,
  details,
  linkHref,
  linkLabel = "Open Document Viewer",
  status,
  title,
}: ArtifactSpotlightProps) {
  return (
    <article className="museum-paper-unfold relative text-foreground">
      <div className="absolute -inset-x-10 -top-16 h-48 bg-brass/25 blur-3xl" aria-hidden="true" />
      <div className="exhibition-vitrine overflow-hidden rounded-sm p-5 sm:p-6">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-black/20 p-5">
          <div className="absolute inset-x-10 top-0 h-36 bg-cream/45 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-16 top-0 h-full w-32 rotate-12 bg-white/20 blur-sm" aria-hidden="true" />
          <div className="artifact-silhouette relative flex h-full flex-col items-center justify-end overflow-hidden rounded-sm p-6 text-center">
            <div className="relative z-10 mb-4 rounded-sm border border-brass/40 bg-black/35 p-5 text-cream backdrop-blur-sm">
              <MuseumLabel tone="brass">{exhibitionCopy.artifact.imagePendingTitle}</MuseumLabel>
              <h2 className="mt-4 max-w-sm font-serif text-3xl leading-tight text-cream sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-6 text-cream/74">
                {caption ?? exhibitionCopy.artifact.imagePendingCopy}
              </p>
              <div className="mt-5 flex justify-center">
                <CaseFileBadge tone="warning">{formatEvidenceStatus(status)}</CaseFileBadge>
              </div>
            </div>
          </div>
        </div>

        <div className="museum-brass-plate relative mx-auto -mt-1 w-[88%] rounded-sm px-4 py-3 text-center">
          <p className="text-[0.64rem] font-bold uppercase">Museum Inventory No.</p>
          <p className="mt-1 font-serif text-lg leading-tight">{accessionNumber}</p>
        </div>
      </div>

      <div className="museum-paper relative mt-5 rounded-sm p-5 sm:p-6">
        <div className="grid gap-5 border-b border-border pb-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <MuseumLabel>{artifactLabel}</MuseumLabel>
              <p className="mt-2 font-serif text-2xl text-foreground">{title}</p>
            </div>
            {linkHref ? (
              <MuseumButton className="px-4 py-2 text-xs" href={linkHref}>
                {linkLabel}
              </MuseumButton>
            ) : null}
          </div>
          <p className="text-sm leading-7 text-body">{description}</p>
        </div>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <MuseumLabel>Collection</MuseumLabel>
            <dd className="mt-1 text-body">{collection}</dd>
          </div>
          <div>
            <MuseumLabel>Accession</MuseumLabel>
            <dd className="mt-1 text-body">{accessionNumber}</dd>
          </div>
          {details.map((item) => (
            <div key={item.label}>
              <MuseumLabel>{item.label}</MuseumLabel>
              <dd className="mt-1 text-body">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
