"use client";

import type { ProvenanceExperienceNode } from "@/types/provenance-experience";

type EvidenceNodeProps = {
  active: boolean;
  node: ProvenanceExperienceNode;
  onOpen: (node: ProvenanceExperienceNode) => void;
};

const confidenceLabels: Record<ProvenanceExperienceNode["confidence"], string> = {
  confirmed: "Confirmed",
  supported: "Supported",
  possible: "Possible",
  contextual: "Contextual",
  unresolved: "Unresolved",
};

const evidenceKindLabels: Record<ProvenanceExperienceNode["evidenceKind"], string> = {
  "direct-observation": "Direct Observation",
  "documented-fact": "Documented Fact",
  "supported-inference": "Supported Inference",
  "contextual-association": "Contextual Association",
  "unresolved-question": "Unresolved Question",
};

export function EvidenceNode({ active, node, onOpen }: EvidenceNodeProps) {
  return (
    <article className="provenance-node" data-active={active}>
      <div className="provenance-node__marker" aria-hidden="true" />
      <div className="provenance-node__content">
        <p>{node.dateLabel}</p>
        <h2>{node.title}</h2>
        <div className="provenance-node__labels">
          <span>{evidenceKindLabels[node.evidenceKind]}</span>
          <span>{confidenceLabels[node.confidence]}</span>
          {node.developmentOnly ? <span>Internal Review</span> : null}
        </div>
        <p>{node.observation}</p>
        <button onClick={() => onOpen(node)} type="button">
          Examine Evidence
        </button>
      </div>
    </article>
  );
}
