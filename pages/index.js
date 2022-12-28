import { useMemo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AudioSphere } from "components/AudioSphere";
import { AudioPlane } from "components/AudioPlane";
import { StartButton } from "components/StartButton";

const Home = () => {
  return (
    <>
      <StartButton />
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 55, near: 0.1, far: 1000, position: [0, 0, 4] }}
      >
        <AudioSphere />
        <AudioPlane color={"red"} waveHeight={-0.55} />
        <AudioPlane color={"orange"} waveHeight={1} />

        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Home;
