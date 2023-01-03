import React from 'react';
import AppBar from './AppBar';
import MainContent from './MainContent';
import Drawer from './Drawer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingContext } from '../contexts/loadingContext';
import { styled, Theme, Typography } from '@mui/material';

const MainContainer = styled('div')({
  display: 'flex',
  height: '100vh',
});

const ContentContainer = styled('div')({
  width: '100%',
  height: '100%',
});

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, setLoading, loadingMessage, setLoadingMessage }}
    >
      <MainContainer>
        <AppBar open={open} onDrawerOpen={handleDrawerOpen} />
        <Drawer open={open} onDrawerClose={handleDrawerClose} />
        <ContentContainer>
          <MainContent open={open}>{children}</MainContent>
        </ContentContainer>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ ml: 1 }}>{loadingMessage}</Typography>
        </Backdrop>
      </MainContainer>
    </LoadingContext.Provider>
  );
};

export default MainLayout;
