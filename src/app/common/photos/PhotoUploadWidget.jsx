import React, { useState } from 'react';
import {
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import cuid from 'cuid';
import { uploadToFirebaseStorage } from '../../firestore/firebaseService';
import { getFileExtention } from '../utility';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { toast } from 'react-toastify';
import { updateUserProfilePhoto } from '../../firestore/firestoreService';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  success: {
    '& svg': {
      fill: '#398585',
      '&:hover': {
        fill: '#265858',
      },
    },
  },
  delete: {
    '& svg': {
      fill: '#F44336',
      '&:hover': {
        fill: '#C6382E',
      },
    },
  },
}));

export default function PhotoUploadWidget({ setEditMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  function handleUploadImage() {
    const filename = cuid() + '.' + getFileExtention(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              handlCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });
      }
    );
  }

  function handlCancelCrop() {
    setFiles([]);
    setImage(null);
  }

  return (
    <Grid
      container
      direction={!matches ? 'row' : 'column'}
      justify={!matches ? 'flex-start' : 'center'}
      alignItems={!matches ? 'center' : 'flex-start'}
      spacing={1}
    >
      <Grid item md={4} sm={12}>
        <Typography variant='subtitle1' color='secondary'>
          Step 1 - Add Photo
        </Typography>
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid>
      <Grid item md={4} sm={12}>
        <Typography variant='subtitle1' color='secondary'>
          Step 2 - Resize
        </Typography>
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={files[0].preview}
          />
        )}
      </Grid>
      <Grid item md={4} sm={12}>
        <Typography variant='subtitle1' color='secondary'>
          Step 3 - Preview &amp; upload
        </Typography>
        {files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Grid
              container
              direction='row'
              justify='space-evenly'
              alignItems='center'
            >
              <IconButton
                className={classes.success}
                onClick={handleUploadImage}
              >
                <CheckBoxIcon />
              </IconButton>
              <IconButton className={classes.delete} onClick={handlCancelCrop}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}
