import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';

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
  const [editMode, setEditMode] = useState(false);

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
                  {[1, 2, 3, 4].map((input, index) => (
                    <Grid item xs={2} sm={3} key={index}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.media}
                          image='/assets/user.png'
                          title='user image'
                        />
                        <CardActions>
                          <Grid
                            container
                            direction='row'
                            justify='space-evenly'
                            alignItems='center'
                          >
                            <IconButton className={classes.success}>
                              <CheckBoxIcon />
                            </IconButton>
                            <IconButton className={classes.delete}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </div>
        </Box>
      )}
    </div>
  );
}
