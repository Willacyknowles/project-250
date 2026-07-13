"use client";

import type { MutableRefObject } from "react";
import type { ProvenanceExperience } from "@/types/provenance-experience";
import { EvidenceNode } from "./evidence-node";

type TimelinePathProps = {
  activeNodeId: string;
  experience: ProvenanceExperience;
  nodeRefs: MutableRefObject<Record<string, HTMLElement | null>>;
  onOpenNode: (node: ProvenanceExperience["nodes"][number]) => void;
};

export function TimelinePath({
  activeNodeId,
  experience,
  nodeRefs,
  onOpenNode,
}: TimelinePathProps) {
  return (
    <section
      aria-label="Chronological evidence path"
      className="provenance-timeline-path"
    >
      <div className="provenance-timeline-path__line" aria-hidden="true" />
      {experience.nodes.map((node) => (
        <section
          className="provenance-node-section"
          id={node.id}
          key={node.id}
          ref={(element) => {
            nodeRefs.current[node.id] = element;
          }}
        >
          <EvidenceNode
            active={activeNodeId === node.id}
            node={node}
            onOpen={onOpenNode}
          />
        </section>
      ))}
    </section>
  );
}
