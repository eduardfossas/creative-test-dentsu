import { useMemo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { vertex, fragment } from "components/AudioPlane/Shaders";
import { AudioSphere } from "components/AudioSphere";
import { AudioSphereTwo } from "components/AudioSphereTwo";
import { resolveLygia } from "resolve-lygia";

const AudioPlaneTwo = ({ color, waveHeight }) => {
  const meshRef = useRef(null);
  let PlaneShader;
  let audioContext, audioElement, dataArray, analyser, source;
  const waveMaterial = useRef();
  const isReady = useRef(false);
  let texture;

  const setupAudioContext = async () => {
    audioContext = new window.AudioContext();
    audioElement = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    source = audioContext.createMediaStreamSource(audioElement);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 1024;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  };

  const play = async () => {
    if (!isReady.current) {
      setupAudioContext();
    }
    isReady.current = true;
  };

  PlaneShader = shaderMaterial(
    {
      uTime: 0,
      uDataArr: 10000,
      uColor: new THREE.Color("hotpink"),
      uPixelRatio: Math.min(1, 2),
      uWaveHeight: 1,
    },
    resolveLygia(vertex),
    resolveLygia(fragment)
  );

  extend({ PlaneShader });

  useFrame(({ clock, delta }) => {
    waveMaterial.current.uTime = clock.getElapsedTime() / 1.2;

    if (!isReady.current && !analyser && !dataArray) return;

    analyser?.getByteFrequencyData(dataArray);

    if (!dataArray) return;

    // note: update uniforms
    waveMaterial.current.uDataArr = dataArray.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
  });

  return (
    <points ref={meshRef} rotation={[0, 0, Math.PI / 2]} onClick={() => play()}>
      <planeGeometry args={[1, 1, 15, 70]} />
      <planeShader
        ref={waveMaterial}
        key={PlaneShader.key}
        transparent={true}
        depthWrite={false}
        uColor={color}
        uWaveHeight={waveHeight}
      />
    </points>
  );
};

const Home = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 55, near: 0.1, far: 1000, position: [0, 0, 4] }}
    >
      {/* <AudioSphereTwo /> */}
      <AudioSphere />
      <AudioPlaneTwo color={"red"} waveHeight={-0.55} />
      <AudioPlaneTwo color={"orange"} waveHeight={1} />

      <OrbitControls />
    </Canvas>
  );
};

export default Home;
