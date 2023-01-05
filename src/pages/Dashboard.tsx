import React, { useCallback, useState, useEffect, useContext } from 'react';
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilePicker from '../components/FilePicker';
import ModelContext from '../contexts/modelContext';
import {
  createModel,
  deleteModel,
  getModels,
  updateModel,
} from '../services/modelService';
import LoadingContext from '../contexts/loadingContext';

const ControlPanel: React.FC = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [modelName, setModelName] = useState<string>('sample model');
  const { activeModel, models, setModels, setActiveModel } =
    useContext(ModelContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (async () => {
      const { data: models } = await getModels();
      setModels(models);

      if (models.length) {
        setActiveModel(models[0].id);
      }
    })();
  }, []);

  const handleFiles = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const handleModelName = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setModelName(e.target.value);
    },
    [],
  );

  const handleUpload = useCallback(async () => {
    if (!files.length) {
      return;
    }
    setLoading(true);
    setUploadOpen(false);
    const { data: model } = await createModel({
      name: modelName,
      file: files[0],
    });
    setModels([...models, model]);
    setActiveModel(model.id);
    setLoading(false);
  }, [modelName, files, models]);

  const handleEditOpen = useCallback(() => {
    const model = models.find((m) => m.id === activeModel);
    if (model) {
      setModelName(model.name);
      setEditOpen(true);
    }
  }, [models, activeModel]);

  const handleEdit = useCallback(async () => {
    setLoading(true);
    setEditOpen(false);
    const payload = { name: modelName };
    await updateModel(activeModel, payload);
    setModels(
      models.map((m) => (m.id === activeModel ? { ...m, ...payload } : m)),
    );
    setLoading(false);
  }, [models, activeModel, modelName]);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    setDeleteOpen(false);
    await deleteModel(activeModel);
    const updatedModels = models.filter((m) => m.id !== activeModel);
    setModels(updatedModels);
    if (updatedModels.length) {
      setActiveModel(updatedModels[0].id);
    } else {
      setActiveModel('');
    }
    setLoading(false);
  }, [models, activeModel]);

  return (
    <>
      <Dialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        maxWidth="xs"
      >
        <DialogTitle>Upload Model</DialogTitle>
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
          <Button onClick={() => setUploadOpen(false)}>Cancel</Button>
          <Button onClick={handleUpload} autoFocus variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs">
        <DialogTitle>Edit Model</DialogTitle>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit} autoFocus variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Model Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this model permently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            autoFocus
            color="error"
            variant="contained"
          >
            Delete
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
            mr: 2,
          }}
          onClick={() => setUploadOpen(true)}
        >
          <FileUploadIcon fontSize="large" />
        </Button>
        <Button
          disabled={!activeModel}
          variant="contained"
          color="success"
          sx={{
            borderRadius: '50%',
            padding: 2,
            width: '64px',
            height: '64px',
            mr: 2,
          }}
          onClick={handleEditOpen}
        >
          <EditIcon fontSize="large" />
        </Button>
        <Button
          disabled={!activeModel}
          variant="contained"
          color="error"
          sx={{
            borderRadius: '50%',
            padding: 2,
            width: '64px',
            height: '64px',
          }}
          onClick={() => setDeleteOpen(true)}
        >
          <DeleteIcon fontSize="large" />
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
