"use client";

import type { MutableRefObject } from "react";
import type { ProvenanceExperience } from "@/types/provenance-experience";
import { EvidenceNode } from "./evidence-node";

type ReducedMotionExperienceProps = {
  experience: ProvenanceExperience;
  nodeRefs: MutableRefObject<Record<string, HTMLElement | null>>;
  onOpenNode: (node: ProvenanceExperience["nodes"][number]) => void;
};

export function ReducedMotionExperience({
  experience,
  nodeRefs,
  onOpenNode,
}: ReducedMotionExperienceProps) {
  return (
    <section className="provenance-reduced-motion" aria-label="Reduced-motion chronology">
      <header>
        <p>Reduced Motion</p>
        <h2>The chronology remains complete.</h2>
        <span>
          Motion is minimized, but every evidence point, source state, confidence
          state, and unresolved question remains available.
        </span>
      </header>
      {experience.nodes.map((node) => (
        <section
          id={node.id}
          key={node.id}
          ref={(element) => {
            nodeRefs.current[node.id] = element;
          }}
        >
          <EvidenceNode active node={node} onOpen={onOpenNode} />
        </section>
      ))}
    </section>
  );
}
