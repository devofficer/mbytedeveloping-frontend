import { useGLTF } from '@react-three/drei';
import React from 'react';

type ModelViewerProps = {
  model: Model;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ model }) => {
  const { scene } = useGLTF(model.url);

  return (
    <mesh position={[0, 0.25, 0]} scale={0.8}>
      <primitive object={scene} />
    </mesh>
  );
};

export default ModelViewer;
