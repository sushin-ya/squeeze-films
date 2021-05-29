import React, { useCallback } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  dropzoneStyles: {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    textAlign: 'center',
  },
  dropzoneActive: {
    border: 'dashed 3px green',
  },
}));

export default function PhotoWidgetDropzone({ setFiles }) {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={
        isDragActive
          ? `${classes.dropzoneStyles} ${classes.dropzoneActive}`
          : classes.dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Box m={4}>
        <CloudUploadIcon style={{ fontSize: 50 }} />
        <Typography>Drop image here</Typography>
      </Box>
    </div>
  );
}
