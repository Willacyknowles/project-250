import type { Route } from "next";
import Link from "next/link";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { MuseumLabel } from "@/components/museum/museum-label";

type EvidenceTileProps = {
  archiveNumber: string;
  artifactType: string;
  caption: string;
  confidence: string;
  href: Route;
  mediaLabel: string;
  status: string;
  title: string;
};

export function EvidenceTile({
  archiveNumber,
  artifactType,
  caption,
  confidence,
  href,
  mediaLabel,
  status,
  title,
}: EvidenceTileProps) {
  return (
    <Link className="group block h-full" href={href}>
      <article className="museum-drawer museum-hover-lift flex h-full flex-col overflow-hidden rounded-sm">
        <div className="relative aspect-[4/3] border-b border-border bg-walnut p-5">
          <div className="absolute left-5 top-5 z-10 rounded-sm border border-brass/45 bg-cream/92 px-3 py-1 text-[0.64rem] font-bold uppercase text-evidence shadow-sm">
            {archiveNumber}
          </div>
          <div className="absolute right-5 top-5 z-10 size-5 rounded-full border border-brass bg-cream shadow-sm" aria-hidden="true" />
          <div className="exhibition-object-wall relative flex h-full items-center justify-center overflow-hidden p-5 text-center">
            <div className="absolute inset-x-10 top-0 h-24 bg-cream/25 blur-2xl" aria-hidden="true" />
            <div className="absolute -right-10 top-0 h-full w-20 rotate-12 bg-white/18 blur-sm" aria-hidden="true" />
            <div className="relative text-cream">
              <MuseumLabel tone="brass">Archive Thumbnail</MuseumLabel>
              <p className="mt-4 font-serif text-2xl text-cream">{title}</p>
              <p className="mt-3 text-sm leading-6 text-cream/72">{mediaLabel}</p>
            </div>
          </div>
          <span className="museum-brass-plate absolute bottom-5 left-5 rounded-sm px-3 py-1 text-[0.64rem] font-bold uppercase">
            Image Pending Review
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2">
            <CaseFileBadge tone="warning">{status}</CaseFileBadge>
            <CaseFileBadge tone="neutral">{confidence}</CaseFileBadge>
          </div>
          <div className="mt-5">
            <MuseumLabel tone="brass">{artifactType}</MuseumLabel>
            <p className="mt-3 font-serif text-2xl leading-tight text-foreground transition group-hover:text-evidence">
              {title}
            </p>
          </div>
          <p className="mt-4 text-sm leading-7 text-body">{caption}</p>
        </div>
      </article>
    </Link>
  );
}
