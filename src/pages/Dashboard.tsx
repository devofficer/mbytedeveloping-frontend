import React from 'react';
import AppCanvas from '../components/AppCanvas';
import Floor from '../components/Floor/Floor';
import Loader from '../components/Loader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function Dashboard() {
  return (
    <>
      <AppCanvas>
        <React.Suspense fallback={<Loader />}>
          <Floor width={16} height={16} />
        </React.Suspense>
      </AppCanvas>
      <Box component="div" position="absolute" sx={{ bottom: 16, right: 16 }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: '50%',
            padding: 2,
            width: '64px',
            height: '64px',
          }}
        >
          <FileUploadIcon fontSize="large" />
        </Button>
      </Box>
    </>
  );
}

export default Dashboard;
