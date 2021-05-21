import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import SidePopularFilms from '../../side/SidePopularFilms';
import ShelfFormInputField from './ShelfFormInputField';
import ShelfFormFragAndDrop from './ShelfFormFragAndDrop';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
}));

export default function ShelfForm() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <Box mr={1}>
          <ShelfFormInputField />
          <ShelfFormFragAndDrop />
        </Box>
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
