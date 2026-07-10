import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFileBadge } from "@/components/case-files/case-file-badge";
import { CaseFileOverview } from "@/components/case-files/case-file-overview";
import { CaseFileSection } from "@/components/case-files/case-file-section";
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

type DossierNavigationProps = {
  caseFile: CaseFile;
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
  return (
    <Link className="museum-action-link text-sm" href={href}>
      {children}
    </Link>
  );
}

function DossierNavigation({ caseFile }: DossierNavigationProps) {
  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#provenance", label: "Provenance" },
    { href: "#physical-description", label: "Physical Description" },
    {
      href: `/case-files/${caseFile.slug}/evidence`,
      label: "Evidence Vault",
      route: true,
    },
    {
      href: `/case-files/${caseFile.slug}/claims`,
      label: "Claims",
      route: true,
    },
    {
      href: `/case-files/${caseFile.slug}/timeline`,
      label: "Timeline",
      route: true,
    },
    {
      href: `/case-files/${caseFile.slug}/sources`,
      label: "Source Library",
      route: true,
    },
    {
      href: `/case-files/${caseFile.slug}/evidence/title-page/archive`,
      label: "Archive",
      route: true,
    },
    { href: "#open-questions", label: "Open Questions" },
    { href: "#confidence-assessment", label: "Confidence Assessment" },
    { href: "#revision-history", label: "Revision History" },
  ] as const;

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <nav
        aria-label="Museum dossier navigation"
        className="museum-paper rounded-sm p-4 backdrop-blur-sm"
      >
        <p className="px-2 font-serif text-lg text-foreground">
          Dossier Index
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-1 lg:overflow-visible lg:pb-0">
          {navItems.map((item) => {
            const className =
              "whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium text-body transition hover:bg-parchment hover:text-foreground lg:whitespace-normal";

            if ("route" in item) {
              return (
                <Link className={className} href={item.href as Route} key={item.label}>
                  {item.label}
                </Link>
              );
            }

            return (
              <a className={className} href={item.href} key={item.label}>
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

function DossierFieldGrid({ fields }: { fields: readonly DossierField[] }) {
  return (
    <dl className="grid gap-5 md:grid-cols-2">
      {fields.map((field) => (
        <div
          className="museum-paper-deep rounded-sm border-l-2 border-l-brass p-5"
          key={field.label}
        >
          <dt className="flex flex-wrap items-start justify-between gap-3">
            <span className="font-serif text-xl text-foreground">
              {field.label}
            </span>
            <CaseFileBadge tone={statusTone[field.status]}>
              {field.status}
            </CaseFileBadge>
          </dt>
          <dd className="mt-4 text-sm leading-7 text-body">{field.value}</dd>
          {field.note ? (
            <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted">
              {field.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

function LedgerCard({
  label,
  value,
  description,
  tone = "neutral",
}: {
  description: string;
  label: string;
  tone?: "neutral" | "evidence" | "trust" | "warning";
  value: string;
}) {
  return (
    <article className="museum-paper-deep rounded-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase text-muted">{label}</p>
        <CaseFileBadge tone={tone}>{value}</CaseFileBadge>
      </div>
      <p className="mt-4 text-sm leading-7 text-body">{description}</p>
    </article>
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
    {
      label: "Evidence",
      value: evidenceCount,
      description: "Artifact records awaiting review.",
    },
    {
      label: "Claims",
      value: claimCount,
      description: "Assertion containers awaiting support.",
    },
    {
      label: "Sources",
      value: sourceCount,
      description: "Citation records awaiting verification.",
    },
    {
      label: "Timeline Events",
      value: timelineEventCount,
      description: "Dated event placeholders awaiting evidence.",
    },
    {
      label: "Archive Media",
      value: archiveMediaCount,
      description: "Digital archive placeholders awaiting media.",
    },
  ] as const;

  return (
    <section className="museum-paper-deep rounded-sm p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">
            Investigation Summary
          </p>
          <h3 className="mt-3 font-serif text-3xl text-foreground">
            Dossier Progress
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <CaseFileBadge tone="warning">
            {caseFile.confidenceAssessment.status}
          </CaseFileBadge>
          <CaseFileBadge tone="trust">
            {formatConfidence(caseFile.confidence)}
          </CaseFileBadge>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <article className="rounded-sm border border-border bg-surface p-4" key={item.label}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase text-muted">
                {item.label}
              </p>
              <p className="font-serif text-3xl text-foreground">{item.value}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-body">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
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

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <LedgerCard
        description="Documented items currently describe the platform record, not historical provenance conclusions."
        label="Facts"
        tone="trust"
        value={`${documentedFacts}`}
      />
      <LedgerCard
        description="No historical claims are published until each statement is tied to evidence."
        label="Claims"
        tone="warning"
        value={`${claimCount}`}
      />
      <LedgerCard
        description="Evidence records are available as vault placeholders until source material is reviewed."
        label="Evidence"
        tone="evidence"
        value={`${evidenceCount}`}
      />
      <LedgerCard
        description="Source citations must be entered before the dossier can support conclusions."
        label="Sources"
        tone="neutral"
        value={`${sourceCount}`}
      />
      <LedgerCard
        description="Unknowns are preserved as research targets instead of being smoothed over."
        label="Unknowns"
        tone="warning"
        value={`${unknowns}`}
      />
    </div>
  );
}

function CrossModuleNavigation({ caseFile }: { caseFile: CaseFile }) {
  return (
    <section className="museum-paper-deep rounded-sm p-6">
      <p className="text-xs font-semibold uppercase text-muted">
        Investigation Rooms
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
    </section>
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CaseFileOverview caseFile={caseFile} />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[18rem_1fr] lg:px-8 lg:py-16">
        <DossierNavigation caseFile={caseFile} />

        <div className="space-y-4">
          <CaseFileSection eyebrow="Overview" id="overview" title="Overview">
            <div className="space-y-8">
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
              <EvidenceHierarchy
                caseFile={caseFile}
                claimCount={claimRecords.length}
                evidenceCount={evidenceItems.length}
                sourceCount={sourceRecords.length}
              />
              <div className="museum-paper-deep rounded-sm p-5">
                <p className="text-xs font-semibold uppercase text-muted">
                  Primary Question
                </p>
                <p className="mt-3 max-w-3xl text-base leading-7 text-foreground">
                  {caseFile.primaryQuestion}
                </p>
              </div>
              <DossierFieldGrid fields={caseFile.overview.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Provenance"
            id="provenance"
            title="Provenance"
          >
            <div className="space-y-6">
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
            <div className="space-y-6">
              <p className="max-w-4xl text-base leading-8 text-body">
                {caseFile.physicalDescription.summary}
              </p>
              <DossierFieldGrid fields={caseFile.physicalDescription.fields} />
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Evidence" id="evidence" title="Evidence Vault">
            <div className="space-y-6">
              <div className="museum-paper-deep rounded-sm p-5">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">
                      Evidence Vault
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-foreground">
                      {evidenceItems.length} placeholder evidence records
                    </h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-body">
                      The vault contains artifact-level evidence placeholders for review. Every record remains marked Requires Research until images, source references, and human verification are added.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    <MuseumActionLink href={`/case-files/${caseFile.slug}/evidence` as Route}>
                      Open Evidence Vault
                    </MuseumActionLink>
                    <MuseumActionLink
                      href={`/case-files/${caseFile.slug}/evidence/title-page/archive` as Route}
                    >
                      Open Digital Archive
                    </MuseumActionLink>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {evidenceItems.slice(0, 3).map((item) => (
                  <article className="museum-paper-deep rounded-sm p-5" key={item.id}>
                    <CaseFileBadge tone="warning">{item.status}</CaseFileBadge>
                    <h3 className="mt-4 font-serif text-2xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-body">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Claims" id="claims" title="Claims">
            <div className="space-y-6">
              <div className="museum-paper-deep rounded-sm p-5">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">
                      Claims Engine
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-foreground">
                      {claimRecords.length} placeholder claim records
                    </h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-body">
                      Claims are separated from evidence, sources, and timeline events. Every claim remains marked Requires Research until reviewed records support it.
                    </p>
                  </div>
                  <MuseumActionLink href={`/case-files/${caseFile.slug}/claims` as Route}>
                    Open Claims Engine
                  </MuseumActionLink>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {claimRecords.slice(0, 3).map((claim) => (
                  <article className="museum-paper-deep rounded-sm p-5" key={claim.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-evidence">
                        {formatClaimType(claim.claimType)}
                      </p>
                      <CaseFileBadge tone="warning">{claim.status}</CaseFileBadge>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-foreground">
                      {claim.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-body">
                      {claim.statement}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Timeline" id="timeline" title="Timeline">
            <div className="space-y-6">
              <div className="museum-paper-deep rounded-sm p-5">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">
                      Investigation Timeline
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-foreground">
                      {timelineEvents.length} placeholder timeline events
                    </h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-body">
                      Timeline entries are structured for future dated evidence, but every event remains marked Requires Research until sources and claims are reviewed.
                    </p>
                  </div>
                  <MuseumActionLink href={`/case-files/${caseFile.slug}/timeline` as Route}>
                    Open Timeline
                  </MuseumActionLink>
                </div>
              </div>
              <ol className="grid gap-5 md:grid-cols-3">
                {timelineEvents.slice(0, 3).map((event) => (
                  <li className="museum-paper-deep rounded-sm p-5" key={event.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-evidence">
                        {event.dateLabel}
                      </p>
                      <CaseFileBadge tone="warning">{event.status}</CaseFileBadge>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-body">
                      {event.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </CaseFileSection>

          <CaseFileSection eyebrow="Sources" id="sources" title="Source Library">
            <div className="space-y-6">
              <div className="museum-paper-deep rounded-sm p-5">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">
                      Source Library
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-foreground">
                      {sourceRecords.length} placeholder source records
                    </h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-body">
                      Source records are ready for future citation review. Every record remains marked Requires Research until the source is located, reviewed, and linked to verified evidence.
                    </p>
                  </div>
                  <MuseumActionLink href={`/case-files/${caseFile.slug}/sources` as Route}>
                    Open Source Library
                  </MuseumActionLink>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {sourceRecords.slice(0, 3).map((source) => (
                  <article className="museum-paper-deep rounded-sm p-5" key={source.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-evidence">
                        {formatSourceType(source.sourceType)}
                      </p>
                      <CaseFileBadge tone="warning">{source.status}</CaseFileBadge>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-foreground">
                      {source.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-body">
                      {source.notes}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Open Questions"
            id="open-questions"
            title="Open Questions"
          >
            <div className="grid gap-4">
              {caseFile.researchQuestions.map((question) => (
                <article className="museum-paper-deep rounded-sm p-5" key={question.id}>
                  <p className="text-xs font-semibold uppercase text-muted">
                    {question.status}
                  </p>
                  <p className="mt-3 text-body">{question.question}</p>
                </article>
              ))}
            </div>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Confidence"
            id="confidence-assessment"
            title="Confidence Assessment"
          >
            <article className="museum-paper-deep rounded-sm p-5">
              <div className="flex flex-wrap gap-2">
                <CaseFileBadge tone="trust">
                  Confidence: {formatConfidence(caseFile.confidenceAssessment.level)}
                </CaseFileBadge>
                <CaseFileBadge
                  tone={statusTone[caseFile.confidenceAssessment.status]}
                >
                  {caseFile.confidenceAssessment.status}
                </CaseFileBadge>
              </div>
              <p className="mt-5 max-w-4xl text-sm leading-7 text-body">
                {caseFile.confidenceAssessment.rationale}
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-body">
                {caseFile.confidenceAssessment.requirements.map((requirement) => (
                  <li className="flex gap-3" key={requirement}>
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-evidence" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </article>
          </CaseFileSection>

          <CaseFileSection
            eyebrow="Versioning"
            id="revision-history"
            title="Revision History"
          >
            <div className="grid gap-4">
              {caseFile.revisions.map((revision) => (
                <article className="museum-paper-deep rounded-sm p-5" key={revision.id}>
                  <div className="flex flex-wrap justify-between gap-3">
                    <p className="font-semibold text-foreground">
                      Version {revision.version}
                    </p>
                    <p className="text-sm text-muted">{revision.dateLabel}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Investigator: {revision.investigator}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-body">
                    {revision.summary}
                  </p>
                </article>
              ))}
            </div>
          </CaseFileSection>
        </div>
      </div>
    </main>
  );
}

