import React, { useCallback, useState } from 'react';
import AppCanvas from '../components/AppCanvas';
import Floor from '../components/Floor/Floor';
import Loader from '../components/Loader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FilePicker from '../components/FilePicker';

const ControlPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [modelName, setModelName] = useState<string>('sample model');

  const handleFiles = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleModelName = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setModelName(e.target.value);
    },
    [],
  );

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle id="alert-dialog-title">Upload Model</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Model Name"
                variant="standard"
                fullWidth
                value={modelName}
                onChange={handleModelName}
              />
            </Grid>
            <Grid item xs={12}>
              <FilePicker files={files} onChange={handleFiles} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <Box component="div" position="absolute" sx={{ bottom: 16, right: 16 }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: '50%',
            padding: 2,
            width: '64px',
            height: '64px',
          }}
          onClick={handleOpen}
        >
          <FileUploadIcon fontSize="large" />
        </Button>
      </Box>
    </>
  );
};

const Dashboard: React.FC = () => (
  <>
    <AppCanvas>
      <React.Suspense fallback={<Loader />}>
        <Floor width={16} height={16} />
      </React.Suspense>
    </AppCanvas>
    <ControlPanel />
  </>
);

export default Dashboard;
