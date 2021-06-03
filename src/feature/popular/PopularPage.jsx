import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularFilm } from '../../app/tmdb/tmdbReducer';
import PopularPageTitle from './PopularPageTitle';
import PopularFilmList from './PopularFilmList';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
}));

export default function PopularPage() {
  const classes = useStyles();
  const { popularFilms } = useSelector((state) => state.tmdb);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularFilm(!!popularFilms.length));
  }, [dispatch, popularFilms]);

  return (
    <div className={classes.container}>
      <PopularPageTitle />
      <PopularFilmList shelf={popularFilms} />
    </div>
  );
}
