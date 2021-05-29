import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from '../../../app/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../profileAction';
import { toast } from 'react-toastify';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
    alignItems: 'center',
  },
  person: {
    height: '50px',
    width: '50px',
    fill: theme.palette.text.secondary,
  },
  title: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
  card: {
    maxWidth: 140,
  },
  media: {
    height: 150,
  },
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

export default function PhotosTab({ value, index, profile }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { photos } = useSelector((state) => state.profile);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box p={2}>
          <div className={classes.container}>
            <PersonIcon
              style={{ gridColumnStart: 1 }}
              className={classes.person}
            />
            <Typography
              variant='h5'
              style={{ gridColumnStart: 2, gridColumnEnd: 11 }}
              color='textSecondary'
            >
              Photos
            </Typography>
            <Button
              variant='outlined'
              onClick={() => setEditMode(!editMode)}
              style={{ gridColumnStart: 11, gridColumnEnd: 13 }}
            >
              {editMode ? 'Cancel' : 'Add Photo'}
            </Button>
            {editMode ? (
              <Box style={{ gridColumnStart: 1, gridColumnEnd: 13 }}>
                <PhotoUploadWidget setEditMode={setEditMode} />
              </Box>
            ) : (
              <Box style={{ gridColumnStart: 1, gridColumnEnd: 13 }}>
                <Grid
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                  spacing={1}
                >
                  {updating.isUpdating || deleting.isDeleting ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {photos.map((photo) => (
                        <Grid item xs={2} sm={3} key={photo.id}>
                          <Card className={classes.card}>
                            <CardMedia
                              className={classes.media}
                              image={photo.url}
                              title={photo.id}
                            />
                            <CardActions>
                              <Grid
                                container
                                direction='row'
                                justify='space-evenly'
                                alignItems='center'
                              >
                                <IconButton
                                  className={classes.success}
                                  onClick={(e) =>
                                    handleSetMainPhoto(photo, e.target.name)
                                  }
                                  disabled={photo.url === profile.photoURL}
                                >
                                  <CheckBoxIcon />
                                </IconButton>
                                <IconButton
                                  className={classes.delete}
                                  onClick={(e) =>
                                    handleDeletePhoto(photo, e.target.name)
                                  }
                                  disabled={photo.url === profile.photoURL}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
              </Box>
            )}
          </div>
        </Box>
      )}
    </div>
  );
}
