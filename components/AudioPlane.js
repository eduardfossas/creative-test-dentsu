import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";

const PlaneShader = shaderMaterial(
  { uTime: 0.0 },
  resolveLygia`
      #define PI 3.14159265359
      varying vec2 vUv;
      uniform float uTime;
  
      vec3 fromSpherical(float radius, float phi, float theta){
        float sinPhiRadius = sin( phi ) * radius;
  
        float x = sinPhiRadius * sin( theta );
        float y = cos( phi ) * radius;
        float z = sinPhiRadius * cos( theta );
  
        return vec3(x, y, z);
      }
      
      vec3 opTwist( vec3 p )
      {
          float  c = cos(2.0*p.y+2.0);
          float  s = sin(2.0*p.y+2.0);
          mat2   m = mat2(c,-s,s,c);
          return vec3(m*p.xz,p.y);
      }
  
  
      void main() {
        float phi = (1. - uv.y) * PI;
        float theta = uv.x * PI * 0.9 + PI;
        float r = 0.99;
        vec3 transform = mix(position, fromSpherical(r, phi , theta + uTime), 1.);
        vec3 twist = opTwist(transform);
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(twist, 1.0);
        gl_PointSize = 20.0;
      }
    `,
  resolveLygia`
      varying vec3 vNormal;
  
      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.01 / distanceToCenter - 0.01 * 2.;
        gl_FragColor = vec4(vec3(1., 0., 0.), strength);
      }
    `
);

extend({ PlaneShader });

const AudioPlane = ({ number }) => {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    meshRef.current.material.uniforms.uTime.value = clock.elapsedTime * number;

    meshRef.current.rotation.x = -clock.elapsedTime * number;
    meshRef.current.rotation.y = -clock.elapsedTime * number;
  });

  return (
    <points ref={meshRef}>
      <planeBufferGeometry args={[5, 5, 20, 50]} />
      <planeShader
        key={PlaneShader.key}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export { AudioPlane };
