import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { CaseFileOverview } from "@/components/case-files/case-file-overview";
import { CaseFileSection } from "@/components/case-files/case-file-section";
import { ArchivalCard } from "@/components/museum/archival-card";
import { CuratorNote } from "@/components/museum/curator-note";
import { FloatingGalleryNavigation } from "@/components/museum/floating-gallery-navigation";
import { GallerySurface } from "@/components/museum/gallery-surface";
import { MuseumButton } from "@/components/museum/museum-button";
import { MuseumDossierNavigation } from "@/components/museum/museum-dossier-navigation";
import { MuseumLabel } from "@/components/museum/museum-label";
import { SectionDivider } from "@/components/museum/section-divider";
import { siteConfig } from "@/config/site";
import { getArchiveMediaByEvidenceId } from "@/lib/archive-media";
import { getCaseFileBySlug, getCaseFiles } from "@/lib/case-files";
import { formatConfidence } from "@/lib/case-file-labels";
import { formatClaimType } from "@/lib/claim-labels";
import { getClaimRecordsByCaseFileId } from "@/lib/claims";
import { getEvidenceItemsByCaseFileId } from "@/lib/evidence";
import { formatSourceType } from "@/lib/source-labels";
import { getSourceRecordsByCaseFileId } from "@/lib/sources";
import { getTimelineEventsByCaseFileId } from "@/lib/timeline";
import type {
  CaseFile,
  DossierField,
  ResearchStatus,
} from "@/types/case-file";

type CaseFilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type MuseumActionLinkProps = {
  children: React.ReactNode;
  href: Route;
};

const statusTone: Record<ResearchStatus, "neutral" | "trust" | "warning"> = {
  Documented: "trust",
  "In Review": "neutral",
  "Requires Research": "warning",
};

function countFieldsByStatus(caseFile: CaseFile, status: ResearchStatus) {
  return [
    ...caseFile.overview.fields,
    ...caseFile.provenance.fields,
    ...caseFile.physicalDescription.fields,
  ].filter((field) => field.status === status).length;
}

function MuseumActionLink({ children, href }: MuseumActionLinkProps) {
  return <MuseumButton href={href}>{children}</MuseumButton>;
}

function DossierFieldGrid({ fields }: { fields: readonly DossierField[] }) {
  return (
    <dl className="grid gap-6 md:grid-cols-2">
      {fields.map((field) => (
        <div
          className="rounded-sm border-l-2 border-l-brass bg-ivory/70 p-6"
          key={field.label}
        >
          <dt className="flex flex-wrap items-start justify-between gap-3">
            <span className="font-serif text-2xl leading-tight text-foreground">
              {field.label}
            </span>
            <CaseFileBadge tone={statusTone[field.status]}>
              {field.status}
            </CaseFileBadge>
          </dt>
          <dd className="mt-4 text-sm leading-7 text-body">{field.value}</dd>
          {field.note ? (
            <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-muted">
              {field.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

function DossierProgressPanel({
  archiveMediaCount,
  caseFile,
  claimCount,
  evidenceCount,
  sourceCount,
  timelineEventCount,
}: {
  archiveMediaCount: number;
  caseFile: CaseFile;
  claimCount: number;
  evidenceCount: number;
  sourceCount: number;
  timelineEventCount: number;
}) {
  const items = [
    ["Evidence", evidenceCount, "Artifact records awaiting review."],
    ["Claims", claimCount, "Assertion containers awaiting support."],
    ["Sources", sourceCount, "Citation records awaiting verification."],
    ["Timeline", timelineEventCount, "Chronology placeholders awaiting evidence."],
    ["Archive", archiveMediaCount, "Digital media placeholders awaiting scans."],
  ] as const;

  return (
    <GallerySurface eyebrow="Investigation Summary" title="Dossier Progress">
      <div className="flex flex-wrap gap-2">
        <CaseFileBadge tone="warning">
          {caseFile.confidenceAssessment.status}
        </CaseFileBadge>
        <CaseFileBadge tone="neutral">
          Confidence: {formatConfidence(caseFile.confidence)}
        </CaseFileBadge>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map(([label, value, description]) => (
          <article className="rounded-sm border border-border bg-cream p-5" key={label}>
            <MuseumLabel>{label}</MuseumLabel>
            <p className="mt-3 font-serif text-4xl text-foreground">{value}</p>
            <p className="mt-3 text-sm leading-6 text-body">{description}</p>
          </article>
        ))}
      </div>
    </GallerySurface>
  );
}

function EvidenceHierarchy({
  caseFile,
  claimCount,
  evidenceCount,
  sourceCount,
}: {
  caseFile: CaseFile;
  claimCount: number;
  evidenceCount: number;
  sourceCount: number;
}) {
  const documentedFacts = countFieldsByStatus(caseFile, "Documented");
  const unknowns = countFieldsByStatus(caseFile, "Requires Research");
  const ledgers = [
    ["Facts", documentedFacts, "Documented items currently describe the platform record, not historical provenance conclusions.", "trust"],
    ["Claims", claimCount, "No historical claims are published until each statement is tied to evidence.", "warning"],
    ["Evidence", evidenceCount, "Evidence records are available as vault placeholders until source material is reviewed.", "evidence"],
    ["Sources", sourceCount, "Source citations must be entered before the dossier can support conclusions.", "neutral"],
    ["Unknowns", unknowns, "Unknowns are preserved as research targets instead of being smoothed over.", "warning"],
  ] as const;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {ledgers.map(([label, value, description, tone]) => (
        <article className="rounded-sm border border-border bg-ivory/70 p-5" key={label}>
          <div className="flex items-start justify-between gap-3">
            <MuseumLabel>{label}</MuseumLabel>
            <CaseFileBadge tone={tone}>{value}</CaseFileBadge>
          </div>
          <p className="mt-4 text-sm leading-7 text-body">{description}</p>
        </article>
      ))}
    </div>
  );
}

function CrossModuleNavigation({ caseFile }: { caseFile: CaseFile }) {
  return (
    <GallerySurface eyebrow="Exhibition Rooms" title="Continue the Investigation">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MuseumActionLink href={`/case-files/${caseFile.slug}/evidence` as Route}>
          Evidence Vault
        </MuseumActionLink>
        <MuseumActionLink href={`/case-files/${caseFile.slug}/claims` as Route}>
          Claims
        </MuseumActionLink>
        <MuseumActionLink href={`/case-files/${caseFile.slug}/timeline` as Route}>
          Timeline
        </MuseumActionLink>
        <MuseumActionLink href={`/case-files/${caseFile.slug}/sources` as Route}>
          Source Library
        </MuseumActionLink>
        <MuseumActionLink
          href={`/case-files/${caseFile.slug}/evidence/title-page/archive` as Route}
        >
          Digital Archive
        </MuseumActionLink>
      </div>
    </GallerySurface>
  );
}

export function generateStaticParams() {
  return getCaseFiles().map((caseFile) => ({
    slug: caseFile.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseFilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    return {
      title: "Case File Not Found",
    };
  }

  return {
    title: caseFile.title,
    description: caseFile.summary,
    openGraph: {
      title: `${caseFile.title} | ${siteConfig.publicProduct}`,
      description: caseFile.summary,
      type: "article",
    },
  };
}

export default async function CaseFilePage({ params }: CaseFilePageProps) {
  const { slug } = await params;
  const caseFile = getCaseFileBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  const claimRecords = getClaimRecordsByCaseFileId(caseFile.id);
  const evidenceItems = getEvidenceItemsByCaseFileId(caseFile.id);
  const sourceRecords = getSourceRecordsByCaseFileId(caseFile.id);
  const timelineEvents = getTimelineEventsByCaseFileId(caseFile.id);
  const archiveMediaCount = evidenceItems.reduce(
    (count, item) => count + getArchiveMediaByEvidenceId(item.id).length,
    0,
  );
  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#provenance", label: "Provenance" },
    { href: "#physical-description", label: "Physical Description" },
    { href: "#evidence", label: "Evidence Vault" },
    { href: "#archive", label: "Archive" },
    { href: "#claims", label: "Claims" },
    { href: "#timeline", label: "Timeline" },
    { href: "#sources", label: "Source Library" },
    { href: "#open-questions", label: "Open Questions" },
    { href: "#confidence-assessment", label: "Confidence" },
    { href: "#revision-history", label: "Revision History" },
    {
      href: `/case-files/${caseFile.slug}/evidence/title-page/archive`,
      label: "Enter Archive",
      route: true,
    },
  ] as const;

  return (
    <main className="museum-reading-room min-h-screen pb-36 text-foreground">
      <CaseFileOverview caseFile={caseFile} />
      <FloatingGalleryNavigation
        next={{ href: "#evidence", label: "Evidence Vault" }}
        previous={{ href: "#overview", label: "Opening Gallery" }}
        returnItem={{ href: "/case-files", label: "Collection Index", route: true }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[18rem_1fr] lg:px-8 lg:py-20">
        <MuseumDossierNavigation items={navItems} />

        <div>
          <CaseFileSection eyebrow="Overview" id="overview" title="Overview">
            <div className="space-y-10">
              <p className="max-w-4xl font-serif text-2xl leading-10 text-foreground">
                {caseFile.overview.summary}
              </p>
              <DossierProgressPanel
                archiveMediaCount={archiveMediaCount}
                caseFile={caseFile}
                claimCount={claimRecords.length}
                evidenceCount={evidenceItems.length}
                sourceCount={sourceRecords.length}
                timelineEventCount={timelineEvents.length}
              />
              <CrossModuleNavigation caseFile={caseFile} />
              <CuratorNote label="Reading Room Note">
                <p>
                  The dossier is arranged as a sequence of galleries. Each room preserves uncertainty where the record is not yet reviewed.
                </p>
              </CuratorNote>
              <EvidenceHierarchy
                caseFile={caseFile}
                claimCount={claimRecords.length}
                evidenceCount={evidenceItems.length}
                sourceCount={sourceRecords.length}
              />
              <ArchivalCard eyebrow="Research Question" title="Primary Question">
                <p className="max-w-3xl text-base leading-8 text-body">
                  {caseFile.primaryQuestion}
                </p>
              </ArchivalCard>
              <DossierFieldGrid fields={caseFile.overview.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Provenance" id="provenance" title="Provenance">
            <div className="space-y-8">
              <p className="max-w-4xl text-base leading-8 text-body">
                {caseFile.provenance.summary}
              </p>
              <DossierFieldGrid fields={caseFile.provenance.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Physical Description"
            id="physical-description"
            title="Physical Description"
          >
            <div className="space-y-8">
              <p className="max-w-4xl text-base leading-8 text-body">
                {caseFile.physicalDescription.summary}
              </p>
              <DossierFieldGrid fields={caseFile.physicalDescription.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Evidence" id="evidence" title="Evidence Vault">
            <div className="space-y-8">
              <GallerySurface eyebrow="Evidence Wall" title={`${evidenceItems.length} Artifact-Level Records`}>
                <div className="flex flex-wrap gap-5">
                  <MuseumActionLink href={`/case-files/${caseFile.slug}/evidence` as Route}>
                    Enter Evidence Vault
                  </MuseumActionLink>
                  <MuseumActionLink
                    href={`/case-files/${caseFile.slug}/evidence/title-page/archive` as Route}
                  >
                    View Digital Archive
                  </MuseumActionLink>
                </div>
              </GallerySurface>
              <div className="grid gap-5 md:grid-cols-3">
                {evidenceItems.slice(0, 3).map((item) => (
                  <ArchivalCard
                    actions={<CaseFileBadge tone="warning">{item.status}</CaseFileBadge>}
                    eyebrow="Evidence Object"
                    key={item.id}
                    title={item.title}
                  >
                    <p className="text-sm leading-7 text-body">{item.description}</p>
                  </ArchivalCard>
                ))}
              </div>
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Archive" id="archive" title="Digital Archive">
            <GallerySurface eyebrow="Media Room" title={`${archiveMediaCount} Archive Media Placeholders`}>
              <p className="max-w-3xl text-sm leading-7 text-body">
                The archive room preserves image placeholders until verified scans, photographs, or documents are attached to evidence records.
              </p>
              <div className="mt-6">
                <MuseumActionLink
                  href={`/case-files/${caseFile.slug}/evidence/title-page/archive` as Route}
                >
                  Enter Digital Archive
                </MuseumActionLink>
              </div>
            </GallerySurface>
          </CaseFileSection>

          <CaseFileSection eyebrow="Claims" id="claims" title="Claims">
            <div className="space-y-8">
              <GallerySurface eyebrow="Assertion Room" title={`${claimRecords.length} Placeholder Claims`}>
                <MuseumActionLink href={`/case-files/${caseFile.slug}/claims` as Route}>
                  Enter Claims Engine
                </MuseumActionLink>
              </GallerySurface>
              <div className="grid gap-5 md:grid-cols-3">
                {claimRecords.slice(0, 3).map((claim) => (
                  <ArchivalCard
                    actions={<CaseFileBadge tone="warning">{claim.status}</CaseFileBadge>}
                    eyebrow={formatClaimType(claim.claimType)}
                    key={claim.id}
                    title={claim.title}
                  >
                    <p className="text-sm leading-7 text-body">{claim.statement}</p>
                  </ArchivalCard>
                ))}
              </div>
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Timeline" id="timeline" title="Timeline">
            <div className="space-y-8">
              <GallerySurface eyebrow="Chronology Room" title={`${timelineEvents.length} Timeline Placeholders`}>
                <MuseumActionLink href={`/case-files/${caseFile.slug}/timeline` as Route}>
                  Enter Timeline
                </MuseumActionLink>
              </GallerySurface>
              <ol className="grid gap-5 md:grid-cols-3">
                {timelineEvents.slice(0, 3).map((event) => (
                  <li key={event.id}>
                    <ArchivalCard
                      actions={<CaseFileBadge tone="warning">{event.status}</CaseFileBadge>}
                      eyebrow={event.dateLabel}
                      title={event.title}
                    >
                      <p className="text-sm leading-7 text-body">{event.description}</p>
                    </ArchivalCard>
                  </li>
                ))}
              </ol>
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Sources" id="sources" title="Source Library">
            <div className="space-y-8">
              <GallerySurface eyebrow="Catalogue Room" title={`${sourceRecords.length} Placeholder Sources`}>
                <MuseumActionLink href={`/case-files/${caseFile.slug}/sources` as Route}>
                  Enter Source Library
                </MuseumActionLink>
              </GallerySurface>
              <div className="grid gap-5 md:grid-cols-3">
                {sourceRecords.slice(0, 3).map((source) => (
                  <ArchivalCard
                    actions={<CaseFileBadge tone="warning">{source.status}</CaseFileBadge>}
                    eyebrow={formatSourceType(source.sourceType)}
                    key={source.id}
                    title={source.title}
                  >
                    <p className="text-sm leading-7 text-body">{source.notes}</p>
                  </ArchivalCard>
                ))}
              </div>
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Notes"
            id="open-questions"
            title="Open Questions"
          >
            <div className="grid gap-5">
              {caseFile.researchQuestions.map((question) => (
                <ArchivalCard eyebrow={question.status} key={question.id} title={question.question}>
                  <p className="text-sm leading-7 text-body">
                    Requires Research. This question remains open until reviewed evidence and sources answer it.
                  </p>
                </ArchivalCard>
              ))}
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Confidence"
            id="confidence-assessment"
            title="Confidence Assessment"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <CaseFileBadge tone="neutral">
                  Confidence: {formatConfidence(caseFile.confidenceAssessment.level)}
                </CaseFileBadge>
                <CaseFileBadge tone={statusTone[caseFile.confidenceAssessment.status]}>
                  {caseFile.confidenceAssessment.status}
                </CaseFileBadge>
              </div>
              <p className="max-w-4xl text-sm leading-7 text-body">
                {caseFile.confidenceAssessment.rationale}
              </p>
              <SectionDivider label="Requirements" />
              <ul className="grid gap-3 text-sm text-body">
                {caseFile.confidenceAssessment.requirements.map((requirement) => (
                  <li className="flex gap-3" key={requirement}>
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-evidence" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Revision History"
            id="revision-history"
            title="Revision History"
          >
            <div className="grid gap-5">
              {caseFile.revisions.map((revision) => (
                <ArchivalCard
                  eyebrow={revision.dateLabel}
                  key={revision.id}
                  title={`Version ${revision.version}`}
                >
                  <p className="text-sm text-muted">Investigator: {revision.investigator}</p>
                  <p className="mt-3 text-sm leading-7 text-body">{revision.summary}</p>
                </ArchivalCard>
              ))}
            </div>
          </CaseFileSection>
        </div>
      </div>
    </main>
  );
}
