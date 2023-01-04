import React, { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DRAWER_WIDTH } from '../utils/constants';
import ModelContext from '../contexts/modelContext';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

type DrawerProps = {
  open: boolean;
  onDrawerClose: () => void;
};

const Drawer: React.FC<DrawerProps> = ({ open, onDrawerClose }) => {
  const theme = useTheme();
  const { models, activeModel, setActiveModel } = useContext(ModelContext);

  const handleSelectModel = (modelId: string) => {
    setActiveModel(modelId);
  };

  return (
    <MuiDrawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {models.map(({ id, name }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              onClick={() => handleSelectModel(id)}
              selected={id === activeModel}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <ViewInArIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
