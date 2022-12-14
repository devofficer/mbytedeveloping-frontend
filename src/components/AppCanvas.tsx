import React from 'react';
import { styled } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Skybox from './Skybox';

const CanvasContainer = styled('div')({
  width: '100%',
  height: '100%',
  '&>div>div>canvas': {
    width: '100% !important',
    height: '100% !important',
  },
});

const AppCanvas: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <CanvasContainer>
      <Canvas>
        <Skybox />
        <OrbitControls />
        <PerspectiveCamera
          makeDefault
          position={[0, 3, 3]}
          fov={60}
          zoom={0.6}
        />
        <directionalLight position={[10, 10, 10]} />
        <perspectiveCamera />
        {children}
      </Canvas>
    </CanvasContainer>
  );
};

export default AppCanvas;
