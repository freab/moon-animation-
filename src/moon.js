import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Moon({ offset = 0, ...props }) {
  const mesh = useRef();
  const light = useRef();
  const { nodes, materials } = useGLTF("/moon-transformed.glb");

  useFrame((state, delta) => {
    const rotationX = Math.PI / 2 + offset / 2;
    const rotationY = 3;
    const rotationZ = Math.PI + offset;

    mesh.current.rotation.set(rotationX, rotationY, rotationZ);

    const center = new THREE.Vector3(0, 0, 0); // Set the center point of the orbit
    const time = state.clock.elapsedTime;
    const lightDistance = 1000;
    const lightSpeed = 0.1;
    light.current.position.x =
      (center.x + lightDistance) * Math.sin(time * -lightSpeed);
    light.current.position.z =
      (center.z + lightDistance) * Math.cos(time * lightSpeed);
  });

  const moonPhaseScale = 0.04; // Scale of the moon mesh
  const moonPhaseIntensity = 1.75; // Intensity of the moon light

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={mesh}
        geometry={nodes["Sphere001_Material_#39_0"].geometry}
        material={materials.Material_39}
        material-normalScale={1.5}
        scale={moonPhaseScale}
      />
      <group ref={light}>
        <spotLight
          position={[0, 60, 70]}
          intensity={moonPhaseIntensity}
          angle={0.15}
          penumbra={1}
        />
      </group>
    </group>
  );
}
