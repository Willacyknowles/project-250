"use client";

type OpenBibleTransitionProps = {
  active: boolean;
  reducedMotion: boolean;
};

export function OpenBibleTransition({
  active,
  reducedMotion,
}: OpenBibleTransitionProps) {
  return (
    <div
      aria-hidden={!active}
      className="reading-room-transition"
      data-active={active}
      data-reduced-motion={reducedMotion}
    >
      <div className="reading-room-transition__light" />
      <p>Entering the exhibition</p>
    </div>
  );
}
