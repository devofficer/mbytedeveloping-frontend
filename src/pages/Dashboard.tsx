import React from 'react';
import AppCanvas from '../components/AppCanvas';
import Floor from '../components/Floor';
import Loader from '../components/Loader';

function Dashboard() {
  return (
    <AppCanvas>
      <React.Suspense fallback={<Loader />}>
        <Floor width={64} height={64} />
      </React.Suspense>
    </AppCanvas>
  );
}

export default Dashboard;
