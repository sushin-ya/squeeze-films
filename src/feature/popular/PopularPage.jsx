import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PopularPageTitle from './PopularPageTitle';
import PopularFilmList from './PopularFilmList';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
}));

export default function PopularPage() {
  const classes = useStyles();
  const shelf = useSelector((state) => state.shelf.shelfs['1']);

  return (
    <div className={classes.container}>
      <PopularPageTitle />
      <PopularFilmList shelf={shelf} />
    </div>
  );
}
