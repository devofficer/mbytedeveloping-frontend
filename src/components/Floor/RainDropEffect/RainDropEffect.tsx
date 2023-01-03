import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Vector3, BufferAttribute, TextureLoader } from 'three';

type RainDropEffectProps = {
  width: number;
  height: number;
};

const RainDropEffect: React.FC<RainDropEffectProps> = ({ width, height }) => {
  const positionsRef = useRef<BufferAttribute>(null);
  const dropTexture = useLoader(TextureLoader, 'assets/textures/rain/drop.png');
  const drops = useMemo(
    () =>
      Array.from({ length: width * height * 10 }).map(() => ({
        position: new Vector3(
          Math.random() * width - width / 2,
          Math.random() * 15,
          Math.random() * height - height / 2,
        ),
        velocity: 0,
      })),
    [width, height],
  );
  const positions = useMemo(
    () =>
      new Float32Array(
        drops.reduce<Array<number>>((acc, d) => {
          return [...acc, d.position.x, d.position.y, d.position.z];
        }, []),
      ),
    [drops],
  );

  useFrame(() => {
    if (positionsRef.current) {
      drops.forEach((p) => {
        p.velocity -= 0.001 + Math.random() * 0.001;
        p.position.y += p.velocity;
        if (p.position.y < 0) {
          p.position.y = 10;
          p.velocity = 0;
        }
      });
      positionsRef.current.array = new Float32Array(
        drops.reduce<Array<number>>((acc, d) => {
          return [...acc, d.position.x, d.position.y, d.position.z];
        }, []),
      );
      positionsRef.current.needsUpdate = true;
    }
  });
  return (
    <mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={positionsRef}
            attach="attributes-position"
            array={positions}
            count={drops.length}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#aaaaaa"
          size={0.03}
          transparent={true}
          map={dropTexture}
        />
      </points>
    </mesh>
  );
};

export default RainDropEffect;
