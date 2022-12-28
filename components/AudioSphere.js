import { useRef } from "react";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";
import { extend, useFrame } from "@react-three/fiber";

const AudioSphere = () => {
  const meshRef = useRef(null);

  const CustomShader = shaderMaterial(
    {
      uTime: 0.0,
      uColor: new THREE.Color("#EA001C"),
      uPixelRatio: Math.min(1, window.devicePixelRatio),
    },
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
    uniform vec3 uColor;
    void main() {
  
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.01 / distanceToCenter - 0.01 * 2.;
        gl_FragColor = vec4(vec3(uColor), strength);
    }
  `)
  );

  extend({ CustomShader });

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

export { AudioSphere };
