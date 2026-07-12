"use client";

import { ContactShadows, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { ArtifactFallbackPoster } from "./artifact-fallback-poster";
import { ArtifactLoadingState } from "./artifact-loading-state";
import { FloatingBible } from "./floating-bible";
import { MuseumSpotlight } from "./museum-spotlight";

export type ArtifactStageProps = {
  isOpening: boolean;
  reducedMotion: boolean;
};

function getWebGlSupport() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function CameraRig({
  isOpening,
  reducedMotion,
}: {
  isOpening: boolean;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const restingPosition = useMemo(() => new Vector3(0, 0.42, 6.2), []);
  const openingPosition = useMemo(() => new Vector3(0, 0.36, 4.65), []);
  const target = useMemo(() => new Vector3(0, 0.05, 0), []);

  useFrame((_, delta) => {
    const nextPosition = isOpening ? openingPosition : restingPosition;
    const damping = reducedMotion ? 12 : 2.6;

    camera.position.lerp(nextPosition, 1 - Math.exp(-damping * delta));
    camera.lookAt(target);
  });

  return null;
}

export function ArtifactStage({ isOpening, reducedMotion }: ArtifactStageProps) {
  const [webGlReady, setWebGlReady] = useState<boolean | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setWebGlReady(getWebGlSupport());
  }, []);

  if (webGlReady === null) {
    return <ArtifactLoadingState />;
  }

  if (!webGlReady) {
    return <ArtifactFallbackPoster reason="webgl-unavailable" />;
  }

  return (
    <Canvas
      className="reading-room-canvas"
      dpr={[1, reducedMotion ? 1 : 1.45]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      shadows
    >
      <PerspectiveCamera makeDefault fov={36} position={[0, 0.42, 6.2]} />
      <CameraRig isOpening={isOpening} reducedMotion={reducedMotion} />
      <Suspense fallback={null}>
        <MuseumSpotlight />
        <FloatingBible
          isInteracting={isInteracting}
          isOpening={isOpening}
          reducedMotion={reducedMotion}
        />
        <ContactShadows
          blur={2.8}
          color="#080604"
          far={6}
          opacity={0.62}
          position={[0, -2.16, 0]}
          scale={5.4}
        />
        <OrbitControls
          enableDamping
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 2.65}
          onEnd={() => setIsInteracting(false)}
          onStart={() => setIsInteracting(true)}
          rotateSpeed={0.28}
        />
      </Suspense>
    </Canvas>
  );
}
