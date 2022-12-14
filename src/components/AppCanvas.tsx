import React from 'react';
import { styled } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
        <directionalLight position={[10, 10, 10]} />
        {children}
      </Canvas>
    </CanvasContainer>
  );
};

export default AppCanvas;
