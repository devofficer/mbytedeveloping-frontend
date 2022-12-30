import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DROP_COUNT = 1000;

const RainDropEffect = () => {
  const matRef = useRef<THREE.LineBasicMaterial | null>(null);
  const { begins, ends } = useMemo(() => {
    const begins = [];
    const ends = [];

    for (let i = 0; i < DROP_COUNT; i++) {
      const x = THREE.MathUtils.randFloatSpread(35);
      const y = THREE.MathUtils.randFloat(-5, 10);
      const z = THREE.MathUtils.randFloatSpread(35);
      const len = THREE.MathUtils.randFloat(0.25, 0.5);
      begins.push(x, y, z, x, y, z);
      ends.push(0, len, 1, len);
    }

    return {
      begins: new Float32Array(begins),
      ends: new Float32Array(ends),
    };
  }, []);

  useFrame(({ clock }) => {
    if (!matRef.current) {
      return;
    }
  });

  const handleShader = (shader: THREE.Shader) => {
    shader.uniforms.time.value += 0.01;
    shader.vertexShader = `
      uniform float time;
      uniform sampler2D noiseTex;
      attribute vec2 ends;
      varying float vEnds;
      varying float vH;

      ${shader.vertexShader}
    `.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
        
      vec3 pos = position;
      
      vec2 nUv = (vec2(pos.x, -pos.z) - vec2(-25.)) / 50.;
      float h = texture2D(noiseTex, nUv).g;
      h = (h - 0.5) * 4.;
      
      pos.y = -mod(10. - (pos.y - time * 5.), 15.) + 10.;
      h = pos.y - h;
      pos.y += ends.x * ends.y;
      transformed = pos;
      vEnds = ends.x;
      vH = smoothstep(3., 0., h);
      `,
    );
    shader.fragmentShader = `
      uniform float time;
      uniform float globalBloom;
      varying float vEnds;
      varying float vH;
      ${shader.fragmentShader}
    `.replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
      float op = 1. - vEnds;
      op = pow(op, 3.);
      float h = (pow(vH, 3.) * 0.5 + 0.5);
      vec3 col = diffuse * h; // lighter close to the surface
      col *= 1. + smoothstep(0.99, 1., h); // sparkle at the surface
      vec4 diffuseColor = vec4( col, op );
      `,
    );
  };

  return (
    <mesh>
      <lineSegments>
        <bufferGeometry attach="geometry">
          <bufferAttribute name="position" array={begins} itemSize={3} />
          <bufferAttribute name="ends" array={ends} itemSize={2} />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          onBeforeCompile={handleShader}
          ref={matRef}
        />
      </lineSegments>
    </mesh>
  );
};

export default RainDropEffect;
