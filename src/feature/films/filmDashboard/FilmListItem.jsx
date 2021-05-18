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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function FilmListItem({ films, button }) {
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
                      alt='Frank'
                      src={films.photoURL}
                      className={classes.avatar}
                    />
                  </Box>
                  <Typography variant='subtitle1' color='textPrimary'>
                    {films.name}
                  </Typography>
                </Box>
              </Grid>
              <FilmImages films={films.films} />
              <Grid item xs={12}>
                <Box display='flex' justifyContent='flex-end'>
                  <Button variant='contained' className={button}>
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
