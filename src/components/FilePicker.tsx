import React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/system';
import { useDropzone } from 'react-dropzone';

const Dropzone = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: 14,
  border: 'dashed 2px #01a1c3',
  color: '#01a1c3',
  padding: '24px 50px',
  height: 180,
});

const DndArea = styled('div')({
  textAlign: 'center',
  color: '#43434a',
  fontSize: 18,
  '&>span': {
    color: '#01a1c3',
  },
});

type FilePickerProps = {
  onChange: (acceptedFiles: File[]) => void;
  files: File[];
};

const FilePicker: React.FC<FilePickerProps> = ({ files, onChange }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onChange,
  });

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      <FileUploadIcon />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <DndArea>
          Drag and drop here <br />
          or <br />
          <span>browse</span>
        </DndArea>
      )}
    </Dropzone>
  );
};

export default FilePicker;
