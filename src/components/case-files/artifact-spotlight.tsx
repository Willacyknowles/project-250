import type { Route } from "next";
import Link from "next/link";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import type { ResearchStatus } from "@/types/case-file";

type ArtifactSpotlightProps = {
  artifactLabel: string;
  caption?: string;
  linkHref?: Route;
  linkLabel?: string;
  metadata?: readonly {
    label: string;
    value: string;
  }[];
  status: ResearchStatus;
  title: string;
};

export function ArtifactSpotlight({
  artifactLabel,
  caption,
  linkHref,
  linkLabel = "Open Archive",
  metadata = [],
  status,
  title,
}: ArtifactSpotlightProps) {
  return (
    <article className="museum-paper museum-hover-lift overflow-hidden rounded-sm p-4 text-foreground sm:p-5">
      <div className="aspect-[4/5] rounded-sm border border-border bg-parchment p-4">
        <div className="flex h-full flex-col items-center justify-center border border-dashed border-border bg-surface/70 p-6 text-center">
          <p className="text-xs font-semibold uppercase text-muted">
            Artifact Image Placeholder
          </p>
          <h2 className="mt-5 max-w-sm font-serif text-3xl leading-tight text-foreground">
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

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">
            {artifactLabel}
          </p>
          <p className="mt-2 font-serif text-xl text-foreground">{title}</p>
        </div>
        {linkHref ? (
          <Link className="museum-action-link text-sm" href={linkHref}>
            {linkLabel}
          </Link>
        ) : null}
      </div>

      {metadata.length > 0 ? (
        <dl className="mt-5 grid gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
          {metadata.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold uppercase text-muted">
                {item.label}
              </dt>
              <dd className="mt-1 text-body">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}
