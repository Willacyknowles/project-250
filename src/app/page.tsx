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
    <main className="exhibition-home min-h-screen text-cream">
      <section className="exhibition-hero border-b border-brass/25">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="museum-fade-in">
            <p className="text-sm font-semibold uppercase text-brass">
              {exhibitionCopy.collectionName}
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.92] text-cream sm:text-7xl lg:text-8xl">
              Rare Bibles, Examined Through Evidence
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/76">
              A private collection explored through provenance, material
              evidence, and historical inquiry. Each case invites visitors to
              follow the questions that survive in the object itself.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MuseumButton href={"/case-files" as Route}>
                Enter the Exhibition
              </MuseumButton>
              <MuseumButton href={"/case-files/1610-geneva-bible/evidence" as Route} variant="secondary">
                View the Evidence
              </MuseumButton>
            </div>
          </div>

          <aside className="exhibition-vitrine museum-paper-unfold rounded-sm p-5 sm:p-7">
            <div className="artifact-silhouette min-h-[30rem] rounded-sm p-6">
              <div className="relative z-10 mt-auto max-w-sm rounded-sm border border-brass/40 bg-black/42 p-5 text-cream backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase text-brass">
                  Opening Object
                </p>
                <p className="mt-3 font-serif text-3xl leading-tight">
                  The 1610 Geneva Bible
                </p>
                <p className="mt-4 text-sm leading-6 text-cream/72">
                  A volume approached through inscriptions, printed evidence,
                  provenance questions, and the discipline of not knowing too
                  soon.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-brass">
              Research Method
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Evidence Before Interpretation
            </h2>
          </div>
          <p className="text-sm text-cream/58">A guided rare-book inquiry</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {researchMethods.map(([title, copy]) => (
            <article
              className="museum-gallery-surface rounded-sm p-7"
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

      <section className="border-t border-brass/25 bg-black/28">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-brass">
                {knowlesCollection.publicName}
              </p>
              <h2 className="mt-3 font-serif text-4xl text-cream">
                A Collection Entered Through Questions
              </h2>
              <p className="mt-5 text-sm leading-7 text-cream/68">
                {siteConfig.platformName} remains invisible infrastructure here:
                the visitor meets the object, the evidence, and the unresolved
                trail.
              </p>
            </div>
          <ul className="grid gap-3 text-sm text-cream/76 sm:grid-cols-2">
            {operatingStandards.map((standard) => (
              <li className="rounded-sm border border-brass/24 bg-cream/7 p-5" key={standard}>
                {standard}
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
