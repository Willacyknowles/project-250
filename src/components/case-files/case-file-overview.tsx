import type { Route } from "next";
import { ArtifactSpotlight } from "@/components/case-files/artifact-spotlight";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { AccessionCard } from "@/components/museum/accession-card";
import { CollectionBadge } from "@/components/museum/collection-badge";
import { CuratorNote } from "@/components/museum/curator-note";
import { MuseumLabel } from "@/components/museum/museum-label";
import { MuseumSeal } from "@/components/museum/museum-seal";
import { siteConfig } from "@/config/site";
import { formatConfidence } from "@/lib/case-file-labels";
import type { CaseFile } from "@/types/case-file";

type CaseFileOverviewProps = {
  caseFile: CaseFile;
};

function fieldValue(caseFile: CaseFile, label: string) {
  const fields = [
    ...caseFile.overview.fields,
    ...caseFile.provenance.fields,
    ...caseFile.physicalDescription.fields,
  ];

  return fields.find((field) => field.label === label)?.value ?? "Requires Research";
}

export function CaseFileOverview({ caseFile }: CaseFileOverviewProps) {
  const archiveHref =
    `/case-files/${caseFile.slug}/evidence/title-page/archive` as Route;
  const accessionNumber = "Requires Research";
  const collectionLocation = "Requires Research";
  const exhibitRooms = 11;

  return (
    <header className="museum-spotlight overflow-hidden text-cream">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-12 px-6 py-10 lg:grid-cols-[1fr_31rem] lg:items-center lg:px-8 lg:py-16">
        <div className="museum-fade-in">
          <div className="flex flex-wrap items-center gap-5">
            <MuseumSeal
              caseNumber={caseFile.caseNumber.padStart(3, "0")}
              collection={siteConfig.publicProduct}
              platform={siteConfig.platformName}
              status={caseFile.confidenceAssessment.status}
            />
            <div className="max-w-xl">
              <CollectionBadge>{siteConfig.publicProduct}</CollectionBadge>
              <p className="mt-4 font-serif text-2xl leading-tight text-cream/86">
                Grand Museum Entrance
              </p>
              <p className="mt-3 text-sm leading-7 text-cream/68">
                Visitors enter a research exhibition where each label separates observed records, claims, evidence, sources, and unknowns.
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-5xl">
            <MuseumLabel tone="brass">Museum Dossier No. {caseFile.caseNumber.padStart(3, "0")}</MuseumLabel>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-none text-cream sm:text-6xl lg:text-7xl">
              {caseFile.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-cream/78">
              {caseFile.summary}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <CaseFileBadge tone="warning">
              Exhibit Status: {caseFile.confidenceAssessment.status}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              Confidence: {formatConfidence(caseFile.confidence)}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              Accession: {accessionNumber}
            </CaseFileBadge>
          </div>

          <div className="mt-9 grid max-w-5xl gap-5 xl:grid-cols-[1fr_18rem]">
            <CuratorNote label="Curator Introduction">
              <p>
                This gallery opens the investigation without resolving it. The object is presented as a rare-book case file whose evidence, sources, and claims remain under formal review.
              </p>
            </CuratorNote>
            <div className="rounded-sm border border-cream/20 bg-cream/10 p-5 backdrop-blur-sm">
              <MuseumLabel tone="brass">Visitor Guidance</MuseumLabel>
              <dl className="mt-4 grid gap-4 text-sm text-cream/82">
                <div>
                  <dt className="font-semibold uppercase text-cream/55">Reading Time</dt>
                  <dd className="mt-1">Approx. 12 minutes</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase text-cream/55">Exhibition Path</dt>
                  <dd className="mt-1">{exhibitRooms} rooms and records</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase text-cream/55">Collection Location</dt>
                  <dd className="mt-1">{collectionLocation}</dd>
                </div>
              </dl>
            </div>
          </div>

          <dl className="mt-8 grid max-w-5xl gap-4 border-y border-brass/32 py-6 text-sm sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <dt className="font-semibold uppercase text-cream/55">Lead Investigator</dt>
              <dd className="mt-2 text-cream">{caseFile.leadInvestigator}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-cream/55">Dossier Version</dt>
              <dd className="mt-2 text-cream">{caseFile.version}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-cream/55">Museum Accession</dt>
              <dd className="mt-2 text-cream">{accessionNumber}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-cream/55">Platform</dt>
              <dd className="mt-2 text-cream">{siteConfig.platformName}</dd>
            </div>
          </dl>

          <div className="mt-8 max-w-5xl">
            <AccessionCard
              accessionNumber={accessionNumber}
              collection={siteConfig.publicProduct}
              status={caseFile.confidenceAssessment.status}
            />
          </div>
        </div>

        <ArtifactSpotlight
          accessionNumber={accessionNumber}
          artifactLabel="Primary Artifact Pedestal"
          caption="Requires Research. No verified artifact image has been attached to the public dossier."
          collection={siteConfig.publicProduct}
          description="A museum object record prepared for future visual documentation, bibliographic review, and provenance investigation."
          details={[
            {
              label: "Dimensions",
              value: fieldValue(caseFile, "Dimensions"),
            },
            {
              label: "Binding",
              value: fieldValue(caseFile, "Binding"),
            },
            {
              label: "Printer",
              value: "Requires Research",
            },
            {
              label: "Date",
              value: fieldValue(caseFile, "Date Evidence"),
            },
            {
              label: "Investigation Status",
              value: caseFile.confidenceAssessment.status,
            },
          ]}
          linkHref={archiveHref}
          linkLabel="Enter Digital Archive"
          status={caseFile.confidenceAssessment.status}
          title={caseFile.title}
        />
      </div>
    </header>
  );
}