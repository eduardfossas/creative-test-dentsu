import { useMemo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { vertex } from "components/AudioPlane/Shaders";
import { resolveLygia } from "resolve-lygia";

const CustomShader = shaderMaterial(
  { uTime: 0.0, uPixelRatio: Math.min(1, 2) },
  resolveLygia(`
  varying vec3 vNormal; 
  uniform float uTime;
  uniform float uPixelRatio;
  void main() {
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position,1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 50.0 * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
    vNormal = normal;
  }
`),
  resolveLygia(`
  varying vec3 vNormal;
  void main() {

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float strength = 0.01 / distanceToCenter - 0.01 * 2.;
      gl_FragColor = vec4(vec3(1., 0., 0.), strength);
  }
`)
);

extend({ CustomShader });

const AudioSphere = () => {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    meshRef.current.material.uniforms.uTime.value = clock.elapsedTime / 1000;

    meshRef.current.rotation.x = clock.elapsedTime;
    meshRef.current.rotation.y = clock.elapsedTime;
  });
  return (
    <points ref={meshRef}>
      <icosahedronGeometry args={[1, 30]} />
      <customShader
        key={CustomShader.key}
        transparent={true}
        depthWrite={false}
      />
    </points>
  );
};

const AudioPlaneTwo = ({ number }) => {
  const meshRef = useRef(null);
  let PlaneShader;
  let audioContext, audioElement, dataArray, analyser, source;
  const waveMaterial = useRef();
  const isReady = useRef(false);
  let texture;

  const getAverageFrequency = (analyser, arrData) => {
    let value = 0;
    const data = analyser.getByteFrequencyData(arrData);

    for (let i = 0; i < data.length; i++) {
      value += data[i];
    }

    return value / data.length;
  };

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
      uDataArr: 0,
    },
    vertex,
    resolveLygia`
      varying vec3 vNormal;
      uniform float uDataArr;
      varying vec2 vUv;

      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0., 1.0);
      }
    `
  );

  extend({ PlaneShader });

  useFrame(({ clock, delta }) => {
    waveMaterial.current.uTime = clock.getElapsedTime();

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
    <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]} onClick={() => play()}>
      <planeGeometry args={[1, 1, 20, 100]} />
      <planeShader ref={waveMaterial} key={PlaneShader.key} wireframe={true} />
    </mesh>
  );
};

const Home = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 55, near: 0.1, far: 1000, position: [0, 0, 4] }}
    >
      <AudioSphere />
      <AudioPlaneTwo />
      <OrbitControls />
    </Canvas>
  );
};

export default Home;
