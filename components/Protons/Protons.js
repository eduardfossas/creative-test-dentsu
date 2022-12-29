import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { vertexSphere, fragment } from "components/Protons/Shaders";
import { extend } from "@react-three/fiber";

extend({ MeshLineGeometry, MeshLineMaterial });

const Protons = () => {
  const ref = useRef();
  const rightLine = useRef();
  const leftLine = useRef();
  const radius = 1.2;
  const points = useMemo(() => {
    let arr = [];

    for (let j = 0; j < Math.PI; j += 2 / Math.PI / 100) {
      arr.push(Math.cos(j) * radius, Math.sin(j) * radius, 0);
    }

    return arr;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.z += delta * 2;
    ref.current.rotation.x += delta / 4;
    rightLine.current.rotation.x -= delta * 2.5;

    leftLine.current.rotation.z += delta * 3;
    leftLine.current.rotation.x -= delta / 2;
  });

  const SphereShader = shaderMaterial(
    {
      uPixelRatio: Math.round(Math.min(window.devicePixelRatio, 2)),
    },
    vertexSphere,
    fragment
  );

  extend({ SphereShader });

  return (
    <>
      <group ref={rightLine}>
        <mesh position={[0, 0, -radius]}>
          <planeGeometry args={[0.4, 0.4, 1, 1]} />
          <sphereShader
            key={SphereShader.key}
            transparent={true}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <meshLineGeometry points={points} />
          <meshLineMaterial
            transparent
            lineWidth={0.02}
            color={"#EA001C"}
            opacity={0.3}
            depthWrite={false}
            dashArray={Math.PI / 2}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={ref} rotation={[0, Math.PI / 3.5, 0]}>
        <mesh position={[-radius, 0, 0]}>
          <planeGeometry args={[0.4, 0.4, 1, 1]} />
          <sphereShader
            key={SphereShader.key}
            transparent={true}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <meshLineGeometry points={points} />
          <meshLineMaterial
            transparent
            lineWidth={0.02}
            color={"#EA001C"}
            opacity={0.3}
            depthWrite={false}
            dashArray={Math.PI / 2}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={leftLine} rotation={[0, 4, 0]}>
        <mesh position={[-radius, 0, 0]}>
          <planeGeometry args={[0.4, 0.4, 1, 1]} />
          <sphereShader
            key={SphereShader.key}
            transparent={true}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <meshLineGeometry points={points} />
          <meshLineMaterial
            transparent
            lineWidth={0.02}
            color={"#EA001C"}
            opacity={0.3}
            depthWrite={false}
            dashArray={Math.PI / 2}
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  );
};

export { Protons };
