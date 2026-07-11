import type { Metadata, Route } from "next";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { MuseumButton } from "@/components/museum/museum-button";
import { siteConfig } from "@/config/site";
import { getCaseFiles } from "@/lib/case-files";
import {
  formatDossierStatus,
  formatVisitorConfidence,
} from "@/lib/visitor-labels";

export const metadata: Metadata = {
  title: "The Knowles Collection",
  description:
    "A private rare-book collection explored through evidence, provenance, and historical inquiry.",
};

export default function CaseFilesPage() {
  const caseFiles = getCaseFiles();

  return (
    <main className="museum-reading-room min-h-screen pb-28 text-cream">
      <section className="museum-spotlight border-b border-brass/25">
        <div className="mx-auto grid min-h-[82svh] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
          <p className="text-sm font-semibold uppercase text-brass">
            {siteConfig.publicProduct}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.95] text-cream sm:text-7xl">
            Opening Gallery
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/76">
            Enter The Knowles Collection through the objects themselves. Each
            case follows the evidence, records the unanswered questions, and
            keeps interpretation separate from proof.
          </p>
          </div>
          <div className="exhibition-object-wall rounded-sm p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="artifact-silhouette min-h-72 rounded-sm" aria-hidden="true" />
              <div className="rounded-sm border border-brass/30 bg-black/35 p-6 text-cream backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase text-brass">
                  First Case
                </p>
                <p className="mt-3 font-serif text-3xl leading-tight">
                  The 1610 Geneva Bible
                </p>
                <p className="mt-4 text-sm leading-7 text-cream/70">
                  A rare-book inquiry begins with the marks the volume still
                  carries and the questions those marks refuse to settle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8">
          {caseFiles.map((caseFile) => (
            <article
              className="museum-gallery-surface museum-hover-lift rounded-sm p-7 sm:p-10"
              key={caseFile.id}
            >
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
                <div className="artifact-silhouette min-h-80 rounded-sm" aria-hidden="true" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    <CaseFileBadge tone="evidence">
                      Case File {caseFile.caseNumber}
                    </CaseFileBadge>
                    <CaseFileBadge tone="warning">
                      {formatDossierStatus(caseFile.confidenceAssessment.status)}
                    </CaseFileBadge>
                    <CaseFileBadge tone="trust">
                      {formatVisitorConfidence(caseFile.confidence)}
                    </CaseFileBadge>
                  </div>
                  <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                    {caseFile.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-body">
                    {caseFile.summary}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <MuseumButton href={`/case-files/${caseFile.slug}` as Route}>
                      Begin the Investigation
                    </MuseumButton>
                    <MuseumButton
                      href={`/case-files/${caseFile.slug}/evidence` as Route}
                      variant="secondary"
                    >
                      View the Evidence
                    </MuseumButton>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}


