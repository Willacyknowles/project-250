"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { homepageContent } from "@/config/homepage-content";
import { readingRoomImages } from "@/config/reading-room-assets";
import { OpenBibleTransition } from "@/components/reading-room/open-bible-transition";
import { useReducedMotion } from "@/components/reading-room/use-reduced-motion";
import {
  ArtifactCaption,
  CollectionCard,
  MetadataList,
  MuseumAction,
  ResearchFeature,
  SectionHeader,
} from "./homepage-primitives";
import { MuseumNavigation } from "./museum-navigation";

const caseFileRoute = "/case-files/1610-geneva-bible" as Route;

export function KnowlesHomepage() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const transitionTimerRef = useRef<number | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const openBible = useCallback(() => {
    if (isOpening) {
      return;
    }

    setIsOpening(true);
    transitionTimerRef.current = window.setTimeout(
      () => {
        router.push(caseFileRoute);
      },
      reducedMotion ? 120 : 1350,
    );
  }, [isOpening, reducedMotion, router]);

  return (
    <main className="museum-home" data-opening={isOpening}>
      <MuseumNavigation />

      <section className="home-hero" id="opening" aria-labelledby="home-hero-title">
        <div className="home-hero__light" aria-hidden="true" />
        <div className="home-hero__artifact">
          <figure className="home-primary-object">
            <div className="home-primary-object__image">
              <Image
                alt={readingRoomImages.primary.alt}
                fill
                priority
                sizes="(max-width: 720px) 92vw, (max-width: 1180px) 56vw, 45vw"
                src={readingRoomImages.primary.src}
              />
            </div>
            <ArtifactCaption label="Object under examination">
              The 1610 Geneva Bible, photographed as a closed volume for the
              public reading-room entrance.
            </ArtifactCaption>
          </figure>
          <div className="home-image-rail" aria-label="Artifact details">
            {readingRoomImages.supporting.map((image) => (
              <figure key={image.src}>
                <Image alt={image.alt} fill sizes="(max-width: 720px) 30vw, 9rem" src={image.src} />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="home-hero__copy">
          <p>{homepageContent.hero.eyebrow}</p>
          <h1 id="home-hero-title">{homepageContent.hero.title}</h1>
          <strong>{homepageContent.hero.statement}</strong>
          <span>{homepageContent.hero.intro}</span>
          <div className="home-hero__actions">
            <button className="home-open-button" onClick={openBible} type="button">
              <span>{homepageContent.hero.primaryAction}</span>
              <span aria-hidden="true">-&gt;</span>
            </button>
            <MuseumAction href="#collection" variant="secondary">
              {homepageContent.hero.secondaryAction}
            </MuseumAction>
          </div>
          <MetadataList items={homepageContent.heroMetadata} />
          <div className="home-mobile-image-rail" aria-label="Artifact details">
            {readingRoomImages.supporting.map((image) => (
              <figure key={image.src}>
                <Image alt={image.alt} fill sizes="30vw" src={image.src} />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="home-exhibition" id="exhibitions" aria-labelledby="current-exhibition">
        <div className="home-exhibition__image">
          <Image
            alt={homepageContent.exhibition.image.alt}
            fill
            sizes="(max-width: 900px) 92vw, 44vw"
            src={homepageContent.exhibition.image.src}
          />
        </div>
        <div className="home-exhibition__content">
          <p>{homepageContent.exhibition.label}</p>
          <h2 id="current-exhibition">{homepageContent.exhibition.title}</h2>
          <span>{homepageContent.exhibition.copy}</span>
          <MetadataList items={homepageContent.exhibition.metadata} variant="light" />
          <div className="home-exhibition__actions">
            <MuseumAction href={caseFileRoute}>Enter the Exhibition</MuseumAction>
            <MuseumAction href={caseFileRoute} variant="quiet">
              View the Case File
            </MuseumAction>
          </div>
        </div>
      </section>

      <section className="home-section home-collection" id="collection">
        <SectionHeader
          copy="A growing set of object records, case files, and research pathways for rare English Bibles and related material."
          eyebrow="Explore the Collection"
          title="Object records, not product tiles."
        />
        <div className="home-collection-grid">
          {homepageContent.collection.map((item) => (
            <CollectionCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="home-section home-research" id="research">
        <SectionHeader
          copy="The collection is presented as an active research institution: observation first, interpretation second, confidence last."
          eyebrow="Featured Research"
          title="The evidence is the story."
        />
        <div className="home-research-grid">
          {homepageContent.research.map((feature) => (
            <ResearchFeature key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="home-evidence" aria-labelledby="evidence-story">
        <div>
          <p>Look Closer</p>
          <h2 id="evidence-story">
            Every inscription, map, ownership mark, binding detail, and page is
            evidence.
          </h2>
        </div>
        <ol className="home-evidence-steps">
          {homepageContent.evidenceJourney.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-access-journal" id="access">
        <article className="home-access-panel">
          <p>Digital Access</p>
          <h2>Explore the collection online.</h2>
          <span>
            The public experience is digital at this stage. Object records, case
            files, research exhibitions, and source review can be expanded
            without inventing public hours, ticketing, or access claims.
          </span>
          <div className="home-access-panel__meta">
            <span>Private research collection</span>
            <span>No public hours currently published</span>
            <span>Institutional access policy under review</span>
          </div>
          <MuseumAction href="/case-files" variant="secondary">
            View Case Files
          </MuseumAction>
        </article>

        <article className="home-journal-panel" id="journal">
          <p>From the Reading Room</p>
          <h2>Research notes without the noise.</h2>
          <span>
            Future updates will share discoveries, case-file revisions, and
            notes from the evidence review process.
          </span>
          <form aria-label="Reading Room updates" className="home-journal-form">
            <label htmlFor="reading-room-email">Email address</label>
            <div>
              <input
                autoComplete="email"
                disabled
                id="reading-room-email"
                name="email"
                placeholder="Subscription access pending"
                type="email"
              />
              <button disabled type="button">
                Join the Reading Room
              </button>
            </div>
          </form>
        </article>
      </section>

      <footer className="home-footer">
        <div>
          <p>The Knowles Collection</p>
          <span>
            A private collection of rare early English Bibles examined through
            evidence-based historical research.
          </span>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="#collection">Collection</Link>
          <Link href="#exhibitions">Exhibitions</Link>
          <Link href="#research">Research</Link>
          <Link href="/case-files">Case Files</Link>
          <Link href="#access">Access</Link>
        </nav>
        <div>
          <span>Accessibility: keyboard, contrast, and reduced-motion support.</span>
          <span>Privacy and inquiry channels will be published with institutional policy.</span>
          <small>© The Knowles Collection. Research framework powered by Project 250.</small>
        </div>
      </footer>

      <OpenBibleTransition active={isOpening} reducedMotion={reducedMotion} />
    </main>
  );
}
