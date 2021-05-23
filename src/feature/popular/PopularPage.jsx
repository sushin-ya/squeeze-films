import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PopularPageTitle from './PopularPageTitle';
import PopularFilmList from './PopularFilmList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularFilm } from './popularFIlmReducer';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
}));

export default function PopularPage() {
  const classes = useStyles();
  const { popularFilms } = useSelector((state) => state.popular);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularFilm());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <PopularPageTitle />
      <PopularFilmList shelf={popularFilms} />
    </div>
  );
}
