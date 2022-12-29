import { useContext, useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";

import { vertex, fragment } from "./Shaders";
import { AudioContext } from "contexts/AudioContext";

const AudioPlane = ({ color, waveHeight }) => {
  const waveMaterial = useRef();
  const { analyser, dataArray } = useContext(AudioContext);

  const PlaneShader = shaderMaterial(
    {
      uTime: 0,
      uDataArr: 10000,
      uColor: new THREE.Color("hotpink"),
      uPixelRatio: Math.round(Math.min(window.devicePixelRatio, 2)),
      uWaveHeight: 1,
    },
    resolveLygia(vertex),
    resolveLygia(fragment)
  );

  extend({ PlaneShader });

  useFrame(({ clock }) => {
    waveMaterial.current.uTime = clock.getElapsedTime() / 1.2;

    if (!analyser?.current) return;

    analyser?.current?.getByteFrequencyData(dataArray.current);

    if (!dataArray.current) return;

    waveMaterial.current.uDataArr = dataArray.current.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
  });

  return (
    <points rotation={[0, 0, Math.PI / 2]}>
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

export { AudioPlane };
