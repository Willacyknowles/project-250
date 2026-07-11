import type { Route } from "next";
import { knowlesCollection } from "@/collections";
import { MuseumButton } from "@/components/museum/museum-button";
import { exhibitionCopy } from "@/config/exhibition-copy";
import { siteConfig } from "@/config/site";

const operatingStandards = [
  "Evidence before assumption",
  "The object remains the authority",
  "Uncertainty is preserved",
  "Interpretation follows sources",
] as const;

const researchMethods = [
  [
    "Observed Artifact",
    "The investigation begins with the book itself: paper, binding, inscriptions, marks, and printed evidence.",
  ],
  [
    "Documentary Evidence",
    "Catalogues, registers, bibliographies, and source materials are reviewed before conclusions are presented.",
  ],
  [
    "Scholarly Interpretation",
    "Working conclusions are kept separate from the evidence that may support or challenge them.",
  ],
  [
    "Open Research Question",
    "Unresolved details remain visible so visitors can follow the inquiry as it develops.",
  ],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-accent">
              {exhibitionCopy.collectionName}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Rare Bibles, Examined Through Evidence
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-body">
              A private collection explored through provenance, material
              evidence, and historical inquiry. Each case invites visitors to
              follow the questions that survive in the object itself.
            </p>
            <div className="mt-6">
              <MuseumButton href={"/case-files" as Route}>
                Enter The Knowles Collection
              </MuseumButton>
            </div>
          </div>

          <aside className="rounded-lg border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase text-muted">
              Flagship Collection
            </p>
            <p className="mt-2 text-xl font-semibold text-foreground">
              {knowlesCollection.publicName}
            </p>
            <dl className="mt-5 grid gap-3 text-sm">
              <div>
                <dt className="font-medium text-muted">Owner</dt>
                <dd className="text-body">{knowlesCollection.owner}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Institutional Context</dt>
                <dd className="text-body">
                  {siteConfig.platformName} is the research environment
                  maintained by {siteConfig.company}.
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-evidence">
              Research Method
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Evidence Before Interpretation
            </h2>
          </div>
          <p className="text-sm text-muted">A guided rare-book inquiry</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {researchMethods.map(([title, copy]) => (
            <article
              className="rounded-lg border border-border bg-surface p-5 shadow-sm"
              key={title}
            >
              <p className="text-xs font-semibold uppercase text-muted">
                Exhibition Method
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-body">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground">
            Research Standard
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-body sm:grid-cols-2 lg:grid-cols-4">
            {operatingStandards.map((standard) => (
              <li className="rounded-lg border border-border p-4" key={standard}>
                {standard}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
