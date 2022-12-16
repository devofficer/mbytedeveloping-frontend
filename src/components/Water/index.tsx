import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import rainVertexShader from './shaders/rainVertexShader';
import rippleFragmentShader from './shaders/rippleFragmentShader';

type WaterProps = {
  width: number;
  height: number;
};

const Water: React.FC<WaterProps> = ({ width, height }) => {
  const mesh = useRef<THREE.Mesh | null>(null);
  const { scene } = useThree();

  const uniforms = useMemo(
    () => ({
      uEyePosition: {
        value: new THREE.Vector3(0, 0, 0),
      },
      uTime: {
        value: 0,
      },
      uEnvironmentTexture: {
        value: scene.background,
      },
    }),
    [scene],
  );

  useFrame(({ camera }) => {
    if (!mesh.current) {
      return;
    }
    const uniforms = (mesh.current.material as THREE.ShaderMaterial).uniforms;
    uniforms.uEyePosition.value = camera.position;
    uniforms.uTime.value += 0.003;
  });

  return (
    <group>
      <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[width, height, 1024, 1024]} />
        <shaderMaterial
          vertexShader={rainVertexShader}
          fragmentShader={rippleFragmentShader}
          uniforms={uniforms}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

export default Water;
