"use client";

import Link from "next/link";
import type { Route } from "next";
import { trackProvenanceEvent } from "@/lib/provenance-analytics";

type ExperienceControlsProps = {
  exitHref: string;
  onHelp: () => void;
  onSoundToggle: () => void;
  soundEnabled: boolean;
};

export function ExperienceControls({
  exitHref,
  onHelp,
  onSoundToggle,
  soundEnabled,
}: ExperienceControlsProps) {
  return (
    <nav className="provenance-controls" aria-label="Experience controls">
      <Link
        href={exitHref as Route}
        onClick={() => trackProvenanceEvent("experience_exited")}
      >
        Exit
      </Link>
      <button onClick={onHelp} type="button">
        Help
      </button>
      <button aria-pressed={soundEnabled} onClick={onSoundToggle} type="button">
        {soundEnabled ? "Sound On" : "Sound Off"}
      </button>
    </nav>
  );
}
