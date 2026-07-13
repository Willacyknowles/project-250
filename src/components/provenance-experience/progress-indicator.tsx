"use client";

import type { ProvenanceExperienceNode } from "@/types/provenance-experience";

type ProgressIndicatorProps = {
  activeIndex: number;
  nodes: readonly ProvenanceExperienceNode[];
  onSelect: (index: number) => void;
};

export function ProgressIndicator({
  activeIndex,
  nodes,
  onSelect,
}: ProgressIndicatorProps) {
  const activeNode = nodes[activeIndex];

  return (
    <aside className="provenance-progress" aria-label="Chronology progress">
      <span>{activeNode?.dateLabel}</span>
      <ol>
        {nodes.map((node, index) => (
          <li key={node.id}>
            <button
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={`Move to ${node.title}`}
              onClick={() => onSelect(index)}
              type="button"
            >
              <span />
            </button>
          </li>
        ))}
      </ol>
      <small>
        {activeIndex + 1} / {nodes.length}
      </small>
    </aside>
  );
}
