import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";

const AudioSphereTwo = ({ number }) => {
  const PlaneShader = shaderMaterial(
    { uTime: 0.0 },
    resolveLygia(`
        #define PI 3.14159265359
        #include "lygia/generative/pnoise.glsl"
        varying vec2 vUv;
        uniform float uTime;
    
        vec3 fromSpherical(float radius, float phi, float theta){
          float sinPhiRadius = sin( phi ) * radius;
    
          float x = sinPhiRadius * sin( theta );
          float y = cos( phi ) * radius;
          float z = sinPhiRadius * cos( theta );
    
          return vec3(x, y, z);
        }
        
        void main() {
          vec3 pos = vec3(position);
          float noise = pnoise(vec2(position.x, position.y * 3.), vec2(0.0, 0.0));
          float phi = (1. - uv.y) * PI;
          float theta =  uv.x * PI + PI + 1.;
          float r = 1.;
        
          vec3 transform = mix(pos, fromSpherical(r, phi, theta), vec3(1., 1., 0.5));
          transform.x *= noise;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(transform, 1.0);
          gl_PointSize = 10.0;
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

  extend({ PlaneShader });

  const meshRef = useRef(null);

  return (
    <points ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
      <planeGeometry args={[1, 1, 15, 70]} />
      <planeShader
        key={PlaneShader.key}
        transparent={true}
        depthWrite={false}
      />
    </points>
  );
};

export { AudioSphereTwo };
