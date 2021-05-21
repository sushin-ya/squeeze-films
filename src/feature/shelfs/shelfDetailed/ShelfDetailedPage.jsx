import React from 'react';
import { makeStyles } from '@material-ui/core';
import ShelfDetailedTitle from './ShelfDetailedTitle';
import ShelfDetailedNotice from './ShelfDetailedNotice';
import ShelfDetailedList from './ShelfDetailedList';
import SidePopularFilms from '../../side/SidePopularFilms';
import { useSelector } from 'react-redux';

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

export default function ShelfDetailedPage({ match }) {
  const classes = useStyles();
  const shelf = useSelector((state) =>
    state.shelf.shelfs.find((s) => s.uid === match.params.id)
  );

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ShelfDetailedTitle
          photoURL={shelf.photoURL}
          displayName={shelf.displayName}
        />
        <ShelfDetailedNotice button={classes.button} />
        <ShelfDetailedList shelf={shelf} />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
