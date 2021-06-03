import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from '../../../app/firestore/firestoreService';
import { listenToUserPhotos } from '../profileAction';
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
    width: 120,
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

export default function PhotosTab({ value, index, profile, isCurrentUser }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
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
              style={
                !matches
                  ? { gridColumnStart: 2, gridColumnEnd: 11 }
                  : { gridColumnStart: 2, gridColumnEnd: 9 }
              }
              color='textSecondary'
            >
              Photos
            </Typography>
            {isCurrentUser && (
              <Button
                variant='outlined'
                size='small'
                onClick={() => setEditMode(!editMode)}
                style={
                  !matches
                    ? { gridColumnStart: 11, gridColumnEnd: 13 }
                    : { gridColumnStart: 9, gridColumnEnd: 11 }
                }
              >
                {editMode ? 'Cancel' : 'Add Photo'}
              </Button>
            )}
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
                        <Grid item key={photo.id}>
                          <Card className={classes.card}>
                            <CardMedia
                              component='img'
                              alt=''
                              image={photo.url}
                              title={photo.id}
                            />
                            <CardContent>
                              <CardActions>
                                <Grid
                                  container
                                  direction='row'
                                  justify='space-evenly'
                                  alignItems='center'
                                  wrap='nowrap'
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
                            </CardContent>
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
