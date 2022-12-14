import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const Floor = () => {
  const texture = useLoader(
    THREE.TextureLoader,
    'assets/textures/floor/floor.png',
  );
  const normals = useLoader(
    THREE.TextureLoader,
    'assets/textures/floor/floor_bump.png',
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry />
      <meshStandardMaterial
        attach="material"
        color="white"
        metalness={0.2}
        map={texture}
        normalMap={normals}
      />
    </mesh>
  );
};

export default Floor;
