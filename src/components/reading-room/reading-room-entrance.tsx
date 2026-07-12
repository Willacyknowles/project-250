"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArtifactPhotoStage } from "./artifact-photo-stage";
import { OpenBibleTransition } from "./open-bible-transition";
import { useReducedMotion } from "./use-reduced-motion";

const caseFileRoute = "/case-files/1610-geneva-bible" as Route;

export function ReadingRoomEntrance() {
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
      reducedMotion ? 120 : 1450,
    );
  }, [isOpening, reducedMotion, router]);

  return (
    <main className="reading-room-entrance" data-opening={isOpening}>
      <section className="reading-room-hero" aria-labelledby="reading-room-title">
        <div className="reading-room-ambient" aria-hidden="true" />
        <div className="reading-room-copy">
          <p className="reading-room-eyebrow">THE KNOWLES COLLECTION</p>
          <h1 id="reading-room-title" className="reading-room-title">
            <span>Four centuries.</span>
            <span>One surviving volume.</span>
          </h1>
          <p className="reading-room-introduction">
            Open the Bible and follow the evidence preserved in its pages,
            inscriptions, and surviving history.
          </p>
          <div className="reading-room-actions" aria-label="Exhibition entry">
            <button
              className="reading-room-primary-cta"
              onClick={openBible}
              type="button"
            >
              <span>Open the Bible</span>
              <span aria-hidden="true">-&gt;</span>
            </button>
            <Link className="reading-room-secondary-cta" href={caseFileRoute}>
              Enter the Exhibition
            </Link>
          </div>
        </div>

        <div className="reading-room-stage" aria-label="Artifact presentation">
          <ArtifactPhotoStage isOpening={isOpening} />
          <div className="reading-room-object-label">
            <p>THE 1610 GENEVA BIBLE</p>
            <span>Active Investigation</span>
          </div>
        </div>

        <aside className="reading-room-visit-panel" aria-label="Visitor guidance">
          <p>Private rare-books reading room</p>
          <span>Approach the object, then follow the evidence.</span>
        </aside>
      </section>

      <footer className="reading-room-footer">
        <span>The Knowles Collection</span>
        <span>Research framework powered by Project 250.</span>
      </footer>

      <OpenBibleTransition active={isOpening} reducedMotion={reducedMotion} />
    </main>
  );
}
