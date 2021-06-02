import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import SidePopularFilmsList from './SidePopularFilmsList';
import { ThumbUp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularFilm } from '../../app/tmdb/tmdbReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: '#FFFFFF',
    background: '#33291A',
    padding: theme.spacing(1),
  },
  icon: {
    fill: theme.palette.text.secondary,
  },
}));

export default function SidePopularFilms() {
  const classes = useStyles();
  const { tmdbFilms } = useSelector((state) => state.tmdb);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularFilm(!!tmdbFilms.length));
  }, [dispatch, tmdbFilms]);
  return (
    <Paper>
      <div className={classes.root}>
        <Box p={2}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Box display='flex' flexDirection='row' alignItems='center'>
                <Box mr={1}>
                  <ThumbUp className={classes.icon} />
                </Box>
                <Typography variant='subtitle1' color='textSecondary'>
                  Popular Films
                </Typography>
              </Box>
            </Grid>
            <SidePopularFilmsList films={tmdbFilms.slice(0, 5)} />
            <Grid item xs={12}>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  variant='contained'
                  className={classes.button}
                  component={Link}
                  to={`/popular`}
                >
                  Check Films
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Paper>
  );
}
