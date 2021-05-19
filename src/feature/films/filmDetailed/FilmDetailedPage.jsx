import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import FilmDetailedPageTitle from './FilmDetailedTitle';
import FilmDetailedPageNotice from './FilmDetailedNotice';
import FilmDetailedList from './FilmDetailedList';
import SidePopularFilms from '../../side/SidePopularFilms';
import { sampleData } from '../../../app/api/sampleData';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
  button: {
    color: '#FFFFFF',
    background: '#33291A',
    padding: theme.spacing(1),
  },
}));

export default function FilmDetailedPage() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [filmList, setFilmList] = useState(sampleData);

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <FilmDetailedPageTitle
          photoURL={filmList[0].photoURL}
          username={filmList[0].username}
        />
        <FilmDetailedPageNotice button={classes.button} />
        <FilmDetailedList films={filmList[0]} />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
