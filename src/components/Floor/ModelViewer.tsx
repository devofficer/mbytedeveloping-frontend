import { useGLTF } from '@react-three/drei';
import React from 'react';

type ModelViewerProps = {
  model: Model;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ model }) => {
  const { scene } = useGLTF(model.url);

  return (
    <mesh>
      <primitive object={scene} />
    </mesh>
  );
};

export default ModelViewer;
