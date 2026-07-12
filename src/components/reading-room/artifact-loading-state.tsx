"use client";

export function ArtifactLoadingState() {
  return (
    <div className="reading-room-loading" aria-live="polite">
      <span className="reading-room-loading__mark" aria-hidden="true" />
      <span>The reading room is opening.</span>
    </div>
  );
}
