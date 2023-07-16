import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, TiltShift2 } from "@react-three/postprocessing";

import { Moon } from "./moon";

export function App({}) {
  const [day, set] = useState("FRI");

  return (
    <>
      <Canvas gl={{ antialias: false }}>
        <color attach="background" args={["#101015"]} />
        <PerspectiveCamera makeDefault position={[0, -0.5, 5]} fov={50} />
        <Moon />
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur luminanceThreshold={0.5} />
          <TiltShift2 blur={0.35} />
        </EffectComposer>
      </Canvas>
    </>
  );
}
