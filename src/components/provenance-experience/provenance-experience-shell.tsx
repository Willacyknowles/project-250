"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ProvenanceExperience,
  ProvenanceExperienceNode,
} from "@/types/provenance-experience";
import { trackProvenanceEvent } from "@/lib/provenance-analytics";
import { useReducedMotion } from "@/components/reading-room/use-reduced-motion";
import { ArtifactStage } from "./artifact-stage";
import { EvidencePanel } from "./evidence-panel";
import { ExperienceControls } from "./experience-controls";
import { OrientationOverlay } from "./orientation-overlay";
import { ProgressIndicator } from "./progress-indicator";
import { ReducedMotionExperience } from "./reduced-motion-experience";
import { TimelinePath } from "./timeline-path";

type ProvenanceExperienceShellProps = {
  experience: ProvenanceExperience;
};

export function ProvenanceExperienceShell({
  experience,
}: ProvenanceExperienceShellProps) {
  const reducedMotion = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [orientationOpen, setOrientationOpen] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState(experience.nodes[0]?.id ?? "");
  const [selectedNode, setSelectedNode] = useState<ProvenanceExperienceNode | null>(
    null,
  );
  const [soundEnabled, setSoundEnabled] = useState(false);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});

  const activeIndex = useMemo(() => {
    const index = experience.nodes.findIndex((node) => node.id === activeNodeId);
    return index >= 0 ? index : 0;
  }, [activeNodeId, experience.nodes]);

  const activeNode = experience.nodes[activeIndex] ?? experience.nodes[0];

  useEffect(() => {
    trackProvenanceEvent("provenance_experience_viewed", {
      experienceId: experience.id,
      developmentOnly: experience.developmentOnly,
    });

    if (reducedMotion) {
      trackProvenanceEvent("reduced_motion_used", {
        experienceId: experience.id,
      });
    }
  }, [experience.developmentOnly, experience.id, reducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveNodeId(visibleEntry.target.id);
          trackProvenanceEvent("evidence_node_viewed", {
            experienceId: experience.id,
            nodeId: visibleEntry.target.id,
          });
        }
      },
      {
        root: null,
        threshold: [0.42, 0.62],
      },
    );

    Object.values(nodeRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [experience.id, started]);

  const moveToNode = useCallback(
    (index: number) => {
      const nextNode = experience.nodes[index];

      if (!nextNode) {
        return;
      }

      setActiveNodeId(nextNode.id);
      nodeRefs.current[nextNode.id]?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });

      if (index === experience.nodes.length - 1) {
        trackProvenanceEvent("timeline_completed", {
          experienceId: experience.id,
        });
      }
    },
    [experience.id, experience.nodes, reducedMotion],
  );

  const openNode = useCallback(
    (node: ProvenanceExperienceNode) => {
      setSelectedNode(node);
      trackProvenanceEvent("evidence_panel_opened", {
        experienceId: experience.id,
        nodeId: node.id,
      });
    },
    [experience.id],
  );

  const beginExperience = useCallback(() => {
    setStarted(true);
    trackProvenanceEvent("begin_examination_clicked", {
      experienceId: experience.id,
    });

    const orientationSeen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(`provenance-orientation:${experience.id}`);

    if (!orientationSeen) {
      setOrientationOpen(true);
    }

    window.setTimeout(() => moveToNode(0), 80);
  }, [experience.id, moveToNode]);

  const closeOrientation = useCallback(() => {
    setOrientationOpen(false);
    window.sessionStorage.setItem(`provenance-orientation:${experience.id}`, "true");
    trackProvenanceEvent("orientation_completed", {
      experienceId: experience.id,
    });
  }, [experience.id]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      const next = !current;
      trackProvenanceEvent(next ? "audio_enabled" : "audio_muted", {
        experienceId: experience.id,
      });
      return next;
    });
  }, [experience.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedNode(null);
        setOrientationOpen(false);
        return;
      }

      if (event.key.toLowerCase() === "h") {
        setOrientationOpen(true);
        return;
      }

      if (event.key.toLowerCase() === "m") {
        toggleSound();
        return;
      }

      if (event.key === "Enter" && activeNode) {
        openNode(activeNode);
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        moveToNode(Math.min(activeIndex + 1, experience.nodes.length - 1));
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        moveToNode(Math.max(activeIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeIndex,
    activeNode,
    experience.nodes.length,
    moveToNode,
    openNode,
    toggleSound,
  ]);

  return (
    <main className="provenance-experience" data-started={started}>
      <section className="provenance-entry" aria-labelledby="provenance-title">
        <ArtifactStage experience={experience} />
        <div className="provenance-entry__copy">
          <p>{experience.collectionLabel}</p>
          <h1 id="provenance-title">{experience.title}</h1>
          <strong>{experience.subtitle}</strong>
          <span>{experience.thematicLine}</span>
          <div className="provenance-entry__status">
            <span>{experience.statusLabel}</span>
            <p>{experience.statusDescription}</p>
          </div>
          <div className="provenance-entry__actions">
            <button onClick={beginExperience} type="button">
              Begin the Examination
            </button>
            <button onClick={() => moveToNode(0)} type="button">
              Skip Introduction
            </button>
          </div>
        </div>
      </section>

      <ExperienceControls
        exitHref={experience.exitHref}
        onHelp={() => setOrientationOpen(true)}
        onSoundToggle={toggleSound}
        soundEnabled={soundEnabled}
      />
      <ProgressIndicator
        activeIndex={activeIndex}
        nodes={experience.nodes}
        onSelect={moveToNode}
      />

      {reducedMotion ? (
        <ReducedMotionExperience
          experience={experience}
          nodeRefs={nodeRefs}
          onOpenNode={openNode}
        />
      ) : (
        <TimelinePath
          activeNodeId={activeNodeId}
          experience={experience}
          nodeRefs={nodeRefs}
          onOpenNode={openNode}
        />
      )}

      <OrientationOverlay
        experience={experience}
        onClose={closeOrientation}
        open={orientationOpen}
      />
      <EvidencePanel
        experience={experience}
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </main>
  );
}
