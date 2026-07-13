"use client";

import type { ProvenanceExperience } from "@/types/provenance-experience";

type OrientationOverlayProps = {
  experience: ProvenanceExperience;
  onClose: () => void;
  open: boolean;
};

export function OrientationOverlay({
  experience,
  onClose,
  open,
}: OrientationOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <section
      aria-labelledby="provenance-orientation-title"
      aria-modal="true"
      className="provenance-orientation"
      role="dialog"
    >
      <div>
        <p>Orientation</p>
        <h2 id="provenance-orientation-title">Follow the evidence through time.</h2>
        <span className="provenance-orientation__desktop">
          {experience.orientation.desktop}
        </span>
        <span className="provenance-orientation__mobile">
          {experience.orientation.mobile}
        </span>
        <button autoFocus onClick={onClose} type="button">
          Begin
        </button>
      </div>
    </section>
  );
}
