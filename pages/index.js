import { Canvas } from "@react-three/fiber";

const Home = () => {
  return (
    <Canvas>
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial />
      </mesh>
    </Canvas>
  );
};

export default Home;
