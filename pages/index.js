import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene } from "components/Scene";
import { Intro } from "components/Intro";
import { Header } from "components/Header";

const CanvasContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      <Header isStarted={isStarted} />
      <AnimatePresence>
        {!isStarted && <Intro setIsStarted={setIsStarted} />}
      </AnimatePresence>
      <CanvasContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.65 } }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 55, near: 0.1, far: 1000, position: [0, 0, 4] }}
        >
          <Scene />
        </Canvas>
      </CanvasContainer>
    </>
  );
};

export default Home;
