import type { Route } from "next";
import { ArtifactSpotlight } from "@/components/case-files/artifact-spotlight";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { siteConfig } from "@/config/site";
import { formatConfidence } from "@/lib/case-file-labels";
import type { CaseFile } from "@/types/case-file";

type CaseFileOverviewProps = {
  caseFile: CaseFile;
};

export function CaseFileOverview({ caseFile }: CaseFileOverviewProps) {
  const archiveHref =
    `/case-files/${caseFile.slug}/evidence/title-page/archive` as Route;

  return (
    <header className="bg-walnut text-cream">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[1fr_29rem] lg:items-center lg:px-8 lg:py-16">
        <div className="museum-fade-in">
          <p className="text-sm font-semibold uppercase text-brass">
            {siteConfig.publicProduct}
          </p>
          <p className="mt-4 font-serif text-xl text-cream/80">
            Museum Dossier No. {caseFile.caseNumber.padStart(3, "0")}
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-none text-cream sm:text-6xl lg:text-7xl">
            {caseFile.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-cream/78">
            {caseFile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <CaseFileBadge tone="warning">
              Research Status: {caseFile.confidenceAssessment.status}
            </CaseFileBadge>
            <CaseFileBadge tone="trust">
              Confidence: {formatConfidence(caseFile.confidence)}
            </CaseFileBadge>
          </div>

          <dl className="mt-10 grid max-w-3xl gap-5 border-y border-brass/35 py-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold uppercase text-cream/55">
                Lead Investigator
              </dt>
              <dd className="mt-2 text-cream">{caseFile.leadInvestigator}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-cream/55">
                Dossier Version
              </dt>
              <dd className="mt-2 text-cream">{caseFile.version}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-cream/55">
                Platform
              </dt>
              <dd className="mt-2 text-cream">{siteConfig.platformName}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-cream/55">
                Public Product
              </dt>
              <dd className="mt-2 text-cream">{siteConfig.publicProduct}</dd>
            </div>
          </dl>
        </div>

        <ArtifactSpotlight
          artifactLabel="Primary Artifact"
          caption="Requires Research. No verified artifact image has been attached to the public dossier."
          linkHref={archiveHref}
          linkLabel="Open Digital Archive"
          metadata={[
            {
              label: "Collection",
              value: siteConfig.publicProduct,
            },
            {
              label: "Status",
              value: caseFile.confidenceAssessment.status,
            },
          ]}
          status={caseFile.confidenceAssessment.status}
          title={caseFile.title}
        />
      </div>
    </header>
  );
}
