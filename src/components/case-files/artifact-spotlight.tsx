import type { Route } from "next";
import Link from "next/link";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { MuseumLabel } from "@/components/museum/museum-label";
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
  linkLabel = "Open Archive",
  status,
  title,
}: ArtifactSpotlightProps) {
  return (
    <article className="museum-paper-unfold relative text-foreground">
      <div className="absolute -inset-x-8 -top-10 h-36 bg-brass/20 blur-3xl" aria-hidden="true" />
      <div className="museum-pedestal overflow-hidden rounded-sm border border-brass/35 p-4 sm:p-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-parchment p-4 shadow-[inset_0_0_90px_rgb(36_23_16_/_0.12)]">
          <div className="absolute inset-x-8 top-0 h-28 bg-cream/45 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-12 top-0 h-full w-28 rotate-12 bg-white/24 blur-sm" aria-hidden="true" />
          <div className="relative flex h-full flex-col items-center justify-center border border-dashed border-border bg-surface/78 p-6 text-center">
            <MuseumLabel tone="brass">Artifact Image Placeholder</MuseumLabel>
            <h2 className="mt-5 max-w-sm font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-body">
              {caption ?? "Requires Research. Image documentation has not been verified."}
            </p>
            <div className="mt-6">
              <CaseFileBadge tone="warning">{status}</CaseFileBadge>
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
              <Link className="museum-action-link text-sm" href={linkHref}>
                {linkLabel}
              </Link>
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