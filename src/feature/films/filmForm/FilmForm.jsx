import React from 'react';
import { makeStyles } from '@material-ui/core';
import SidePopularFilms from '../../side/SidePopularFilms';
import FilmFormInputField from './FilmFormInputField';
import FilmFormDragAndDrop from './FilmFormFragAndDrop';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
}));

export default function FilmForm() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <FilmFormInputField />
        <FilmFormDragAndDrop />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
