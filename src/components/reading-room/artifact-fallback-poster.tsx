"use client";

type ArtifactFallbackPosterProps = {
  reason?: "loading" | "webgl-unavailable";
};

export function ArtifactFallbackPoster({
  reason = "loading",
}: ArtifactFallbackPosterProps) {
  const caption =
    reason === "webgl-unavailable"
      ? "A still reading-room view is shown because the interactive object display is unavailable."
      : "A still reading-room view is shown while the object display prepares.";

  return (
    <div
      className="reading-room-fallback"
      role="img"
      aria-label="A neutral closed-book silhouette resting under a warm museum spotlight."
    >
      <div className="reading-room-fallback__beam" aria-hidden="true" />
      <div className="reading-room-fallback__book" aria-hidden="true">
        <div className="reading-room-fallback__spine" />
        <div className="reading-room-fallback__pages" />
      </div>
      <p className="reading-room-fallback__caption">{caption}</p>
    </div>
  );
}
