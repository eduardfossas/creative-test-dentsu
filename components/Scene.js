import { useRef } from "react";
import * as THREE from "three";

import { Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { AudioSphere } from "components/AudioSphere";
import { AudioPlane } from "components/AudioPlane";

const Scene = () => {
  const sceneRef = useRef();

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.position.x = THREE.MathUtils.lerp(
        sceneRef.current.position.x,
        state.mouse.x * 0.05,
        0.1
      );
      sceneRef.current.position.y = THREE.MathUtils.lerp(
        sceneRef.current.position.y,
        state.mouse.y * 0.05,
        0.1
      );
    }
  });

  return (
    <group ref={sceneRef}>
      <AudioSphere />
      <AudioPlane color={"#EA001C"} waveHeight={-0.55} />
      <AudioPlane color={"orange"} waveHeight={1} />
      <Grid
        cellColor={"red"}
        sectionColor={"#EA001C"}
        cellThickness={0}
        infiniteGrid={true}
        position={[0, -2, 0]}
        fadeStrength={10}
      />
    </group>
  );
};

export { Scene };
