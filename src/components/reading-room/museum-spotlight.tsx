"use client";

export function MuseumSpotlight() {
  return (
    <>
      <color attach="background" args={["#070604"]} />
      <ambientLight color="#5d4930" intensity={0.22} />
      <spotLight
        castShadow
        color="#fff0c8"
        decay={1.25}
        distance={12}
        intensity={4.7}
        penumbra={0.84}
        position={[-2.6, 5.8, 3.4]}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        color="#d8ad63"
        intensity={0.9}
        position={[3.8, 2.4, 3.8]}
      />
      <pointLight color="#8d6324" intensity={0.5} position={[0, -1.8, 2.6]} />
    </>
  );
}
