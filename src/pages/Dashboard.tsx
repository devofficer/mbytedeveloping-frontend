import React from 'react';
import AppCanvas from '../components/AppCanvas';
import Floor from '../components/Floor';
import Loader from '../components/Loader';

function Dashboard() {
  return (
    <AppCanvas>
      <React.Suspense fallback={<Loader />}>
        <Floor />
      </React.Suspense>
    </AppCanvas>
  );
}

export default Dashboard;
