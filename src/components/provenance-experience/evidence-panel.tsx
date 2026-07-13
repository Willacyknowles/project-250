"use client";

import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import type {
  ProvenanceExperience,
  ProvenanceExperienceNode,
} from "@/types/provenance-experience";
import { trackProvenanceEvent } from "@/lib/provenance-analytics";

type EvidencePanelProps = {
  experience: ProvenanceExperience;
  node: ProvenanceExperienceNode | null;
  onClose: () => void;
};

export function EvidencePanel({ experience, node, onClose }: EvidencePanelProps) {
  if (!node) {
    return null;
  }

  return (
    <aside
      aria-labelledby="provenance-panel-title"
      aria-modal="true"
      className="provenance-evidence-panel"
      role="dialog"
    >
      <div className="provenance-evidence-panel__surface">
        <button aria-label="Close evidence view" onClick={onClose} type="button">
          Close
        </button>
        <p>{node.dateLabel}</p>
        <h2 id="provenance-panel-title">{node.title}</h2>
        <div className="provenance-evidence-panel__image">
          {node.image ? (
            <Image
              alt={node.image.alt}
              fill
              sizes="(max-width: 900px) 84vw, 30vw"
              src={node.image.src}
            />
          ) : (
            <span>Evidence image pending review</span>
          )}
        </div>
        <dl>
          <div>
            <dt>Direct Observation</dt>
            <dd>{node.observation}</dd>
          </div>
          <div>
            <dt>Question</dt>
            <dd>{node.question}</dd>
          </div>
          <div>
            <dt>Interpretation</dt>
            <dd>{node.interpretation}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{node.sourceSummary}</dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>{node.confidenceRationale}</dd>
          </div>
        </dl>
        <div className="provenance-evidence-panel__actions">
          {experience.caseFileHref ? (
            <Link
              href={experience.caseFileHref as Route}
              onClick={() =>
                trackProvenanceEvent("case_file_opened", {
                  experienceId: experience.id,
                  nodeId: node.id,
                })
              }
            >
              Open the Case File
            </Link>
          ) : null}
          <Link href={experience.exitHref as Route}>Return to the Collection</Link>
        </div>
      </div>
    </aside>
  );
}
