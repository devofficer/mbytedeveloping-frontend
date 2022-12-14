import React from 'react';
import AppCanvas from '../components/AppCanvas';

function Dashboard() {
  return (
    <AppCanvas>
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </AppCanvas>
  );
}

export default Dashboard;
