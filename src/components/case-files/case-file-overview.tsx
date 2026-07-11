import type { Route } from "next";
import { ArtifactSpotlight } from "@/components/case-files/artifact-spotlight";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { AccessionCard } from "@/components/museum/accession-card";
import { CollectionBadge } from "@/components/museum/collection-badge";
import { CuratorNote } from "@/components/museum/curator-note";
import { MuseumLabel } from "@/components/museum/museum-label";
import { MuseumSeal } from "@/components/museum/museum-seal";
import { exhibitionCopy } from "@/config/exhibition-copy";
import { siteConfig } from "@/config/site";
import {
  formatDossierStatus,
  formatResearchValue,
  formatVisitorConfidence,
} from "@/lib/visitor-labels";
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

  return formatResearchValue(fields.find((field) => field.label === label)?.value);
}

export function CaseFileOverview({ caseFile }: CaseFileOverviewProps) {
  const archiveHref =
    `/case-files/${caseFile.slug}/evidence/title-page/archive` as Route;
  const accessionNumber = exhibitionCopy.accessionUnderReview;
  const collectionLocation = exhibitionCopy.collectionLocation;
  const exhibitRooms = exhibitionCopy.exhibitionRooms;
  const dossierStatus = formatDossierStatus(caseFile.confidenceAssessment.status);

  return (
    <header className="museum-spotlight overflow-hidden text-cream">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-12 px-6 py-10 lg:grid-cols-[1fr_31rem] lg:items-center lg:px-8 lg:py-16">
        <div className="museum-fade-in">
          <div className="flex flex-wrap items-center gap-5">
            <MuseumSeal
              caseNumber={caseFile.caseNumber.padStart(3, "0")}
              collection={siteConfig.publicProduct}
              platform={siteConfig.platformName}
              status={dossierStatus}
            />
            <div className="max-w-xl">
              <CollectionBadge>{exhibitionCopy.openingGallery.eyebrow}</CollectionBadge>
              <p className="mt-4 font-serif text-2xl leading-tight text-cream/86">
                Opening Gallery
              </p>
              <p className="mt-3 text-sm leading-7 text-cream/68">
                {exhibitionCopy.openingGallery.supportingCopy}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-5xl">
            <MuseumLabel tone="brass">
              Museum Dossier No. {caseFile.caseNumber.padStart(3, "0")}
            </MuseumLabel>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-none text-cream sm:text-6xl lg:text-7xl">
              {exhibitionCopy.openingGallery.heading}
            </h1>
            <div className="mt-7 max-w-3xl space-y-2 text-lg leading-8 text-cream/78">
              {exhibitionCopy.openingGallery.introLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <CaseFileBadge tone="warning">
              Exhibit Status: {dossierStatus}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              {formatVisitorConfidence(caseFile.confidence)}
            </CaseFileBadge>
            <CaseFileBadge tone="neutral">
              Accession: {accessionNumber}
            </CaseFileBadge>
          </div>

          <div className="mt-9 grid max-w-5xl gap-5 xl:grid-cols-[1fr_18rem]">
            <CuratorNote label="Curator Introduction">
              <p>{exhibitionCopy.openingGallery.curatorIntroduction}</p>
            </CuratorNote>
            <div className="rounded-sm border border-cream/20 bg-cream/10 p-5 backdrop-blur-sm">
              <MuseumLabel tone="brass">Visitor Information</MuseumLabel>
              <dl className="mt-4 grid gap-4 text-sm text-cream/82">
                <div>
                  <dt className="font-semibold uppercase text-cream/55">
                    Estimated Visit
                  </dt>
                  <dd className="mt-1">{exhibitionCopy.estimatedVisit}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase text-cream/55">
                    Exhibition Rooms
                  </dt>
                  <dd className="mt-1">{exhibitRooms}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase text-cream/55">
                    Collection Location
                  </dt>
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
              <dt className="font-semibold uppercase text-cream/55">Research Environment</dt>
              <dd className="mt-2 text-cream">{siteConfig.platformName}</dd>
            </div>
          </dl>

          <div className="mt-8 max-w-5xl">
            <AccessionCard
              accessionNumber={accessionNumber}
              collection={siteConfig.publicProduct}
              status={dossierStatus}
            />
          </div>
        </div>

        <ArtifactSpotlight
          accessionNumber={accessionNumber}
          artifactLabel="Primary Artifact"
          caption={exhibitionCopy.artifact.imagePendingCopy}
          collection={siteConfig.publicProduct}
          description={exhibitionCopy.artifact.objectRecord}
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
              value: exhibitionCopy.unknownValue,
            },
            {
              label: "Date",
              value: fieldValue(caseFile, "Date Evidence"),
            },
            {
              label: "Investigation Status",
              value: dossierStatus,
            },
          ]}
          linkHref={archiveHref}
          linkLabel="Open Document Viewer"
          status={caseFile.confidenceAssessment.status}
          title={caseFile.title}
        />
      </div>
    </header>
  );
}



