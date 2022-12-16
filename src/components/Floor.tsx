import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import Water from './Water';

type FloorProps = {
  width: number;
  height: number;
};

const Floor: React.FC<FloorProps> = ({ width, height }) => {
  const { scene } = useGLTF('assets/models/round_platform.glb');
  const texture = useLoader(
    THREE.TextureLoader,
    'assets/textures/floor/floor.png',
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);

  const normals = useLoader(
    THREE.TextureLoader,
    'assets/textures/floor/floor_bump.png',
  );
  normals.wrapS = THREE.RepeatWrapping;
  normals.wrapT = THREE.RepeatWrapping;
  normals.repeat.set(8, 8);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, height, 1024, 1024]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          map={texture}
          normalMap={normals}
        />
      </mesh>
      <primitive object={scene} position={[0, 0.1, 0]} />
      <Water width={64} height={64} />
    </>
  );
};

export default Floor;
