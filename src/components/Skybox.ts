import React from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const Skybox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    'assets/textures/skybox/TropicalSunnyDay_px.jpg',
    'assets/textures/skybox/TropicalSunnyDay_nx.jpg',
    'assets/textures/skybox/TropicalSunnyDay_py.jpg',
    'assets/textures/skybox/TropicalSunnyDay_ny.jpg',
    'assets/textures/skybox/TropicalSunnyDay_pz.jpg',
    'assets/textures/skybox/TropicalSunnyDay_nz.jpg',
  ]);
  scene.background = texture;

  return null;
};

export default Skybox;
