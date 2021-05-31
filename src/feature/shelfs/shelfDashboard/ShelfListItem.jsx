import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import FilmImages from './FilmImages';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function ShelfListItem({ shelf, button }) {
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Paper>
        <div className={classes.root}>
          <Box p={2}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <Box mr={1}>
                    <Avatar
                      alt='avatar'
                      src={shelf.photoURL}
                      className={classes.avatar}
                    />
                  </Box>
                  <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    component={Link}
                    to={`/profile/${shelf.uid}`}
                    className={classes.profile}
                  >
                    {shelf.displayName}
                  </Typography>
                </Box>
              </Grid>
              <FilmImages films={shelf.films} />
              <Grid item xs={12}>
                <Box display='flex' justifyContent='flex-end'>
                  <Button
                    variant='contained'
                    className={button}
                    component={Link}
                    to={`/shelfs/${shelf.id}`}
                  >
                    Check Films
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Paper>
    </Box>
  );
}
