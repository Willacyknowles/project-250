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
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <p className="text-sm font-semibold uppercase text-accent">
            {siteConfig.publicProduct}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
            Opening Gallery
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-body">
            Enter The Knowles Collection through the objects themselves. Each
            case follows the evidence, records the unanswered questions, and
            keeps interpretation separate from proof.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid gap-4">
          {caseFiles.map((caseFile) => (
            <article
              className="museum-drawer rounded-sm p-6"
              key={caseFile.id}
            >
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
              <h2 className="mt-4 text-2xl font-semibold text-foreground">
                {caseFile.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-body">
                {caseFile.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}


