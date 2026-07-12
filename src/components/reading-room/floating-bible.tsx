"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";
import type { Group } from "three";

type FloatingBibleProps = {
  isOpening: boolean;
  isInteracting: boolean;
  reducedMotion: boolean;
};

export function FloatingBible({
  isOpening,
  isInteracting,
  reducedMotion,
}: FloatingBibleProps) {
  const bookRef = useRef<Group>(null);
  const coverRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    const book = bookRef.current;
    const cover = coverRef.current;

    if (!book || !cover) {
      return;
    }

    const time = clock.getElapsedTime();
    const canMove = !reducedMotion;
    const idleRotation =
      canMove && !isInteracting ? Math.sin(time * 0.18) * 0.075 : 0;
    const idleFloat =
      canMove && !isInteracting ? Math.sin(time * 0.42) * 0.025 : 0;
    const targetY = isOpening ? -0.5 : -0.22 + idleRotation;
    const targetX = isOpening ? 0.02 : 0.08;
    const targetZ = isOpening ? 0.03 : -0.02;
    const targetCoverY = isOpening ? -0.42 : 0;

    book.rotation.x = MathUtils.damp(book.rotation.x, targetX, 2.4, delta);
    book.rotation.y = MathUtils.damp(book.rotation.y, targetY, 2.1, delta);
    book.rotation.z = MathUtils.damp(book.rotation.z, targetZ, 2.2, delta);
    book.position.y = MathUtils.damp(book.position.y, idleFloat, 1.8, delta);
    book.position.z = MathUtils.damp(book.position.z, isOpening ? 0.2 : 0, 1.9, delta);
    cover.rotation.y = MathUtils.damp(cover.rotation.y, targetCoverY, 2.6, delta);
  });

  return (
    <group ref={bookRef} rotation={[0.08, -0.22, -0.02]}>
      <mesh castShadow receiveShadow position={[0.05, 0, -0.16]}>
        <boxGeometry args={[2.42, 3.24, 0.26]} />
        <meshStandardMaterial color="#efe2c4" roughness={0.82} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.02, -1.66, -0.03]}>
        <boxGeometry args={[2.5, 0.08, 0.32]} />
        <meshStandardMaterial color="#d8c8aa" roughness={0.88} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.02, 1.66, -0.03]}>
        <boxGeometry args={[2.5, 0.08, 0.32]} />
        <meshStandardMaterial color="#d8c8aa" roughness={0.88} />
      </mesh>

      <mesh castShadow receiveShadow position={[-1.32, 0, 0.02]}>
        <boxGeometry args={[0.24, 3.52, 0.52]} />
        <meshStandardMaterial color="#2f1b12" roughness={0.74} metalness={0.02} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.02, 0, -0.29]}>
        <boxGeometry args={[2.62, 3.52, 0.11]} />
        <meshStandardMaterial color="#3a2115" roughness={0.78} />
      </mesh>

      <group ref={coverRef} position={[-1.27, 0, 0.18]}>
        <mesh castShadow receiveShadow position={[1.29, 0, 0]}>
          <boxGeometry args={[2.58, 3.54, 0.12]} />
          <meshStandardMaterial color="#4a2c1c" roughness={0.76} />
        </mesh>
      </group>
    </group>
  );
}
