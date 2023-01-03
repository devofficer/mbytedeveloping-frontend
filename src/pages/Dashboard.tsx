import React from 'react';
import AppCanvas from '../components/AppCanvas';
import Floor from '../components/Floor/Floor';
import Loader from '../components/Loader';

function Dashboard() {
  return (
    <AppCanvas>
      <React.Suspense fallback={<Loader />}>
        <Floor width={16} height={16} />
      </React.Suspense>
    </AppCanvas>
  );
}

export default Dashboard;
