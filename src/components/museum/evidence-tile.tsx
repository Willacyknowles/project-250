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
        <div className="relative aspect-[4/3] border-b border-border bg-parchment p-5">
          <div className="absolute left-5 top-5 z-10 rounded-sm border border-brass/45 bg-cream/92 px-3 py-1 text-[0.64rem] font-bold uppercase text-evidence shadow-sm">
            {archiveNumber}
          </div>
          <div className="absolute right-5 top-5 z-10 size-5 rounded-full border border-brass bg-cream shadow-sm" aria-hidden="true" />
          <div className="relative flex h-full items-center justify-center overflow-hidden border border-dashed border-border bg-cream/72 p-5 text-center shadow-[inset_0_0_60px_rgb(36_23_16_/_0.08)]">
            <div className="absolute -right-10 top-0 h-full w-20 rotate-12 bg-white/28 blur-sm" aria-hidden="true" />
            <div className="relative">
              <MuseumLabel tone="brass">Archive Thumbnail</MuseumLabel>
              <p className="mt-4 font-serif text-2xl text-foreground">{title}</p>
              <p className="mt-3 text-sm leading-6 text-body">{mediaLabel}</p>
            </div>
          </div>
          <span className="museum-brass-plate absolute bottom-5 left-5 rounded-sm px-3 py-1 text-[0.64rem] font-bold uppercase">
            Zoom Placeholder
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