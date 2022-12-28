import { useMemo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { AudioSphere } from "components/AudioSphere";
import { AudioPlane } from "components/AudioPlane";
import { Intro } from "components/Intro";
import { Header } from "components/Header";

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <>
      <Header isStarted={isStarted} />
      <Intro setIsStarted={setIsStarted} />
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 55, near: 0.1, far: 1000, position: [0, 0, 4] }}
      >
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
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Home;
