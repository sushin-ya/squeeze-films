import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ShelfDetailedTitle from './ShelfDetailedTitle';
import ShelfDetailedNotice from './ShelfDetailedNotice';
import ShelfDetailedList from './ShelfDetailedList';
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

export default function ShelfDetailedPage() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [shelfs, setShelfs] = useState(sampleData);

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ShelfDetailedTitle
          photoURL={shelfs[0].photoURL}
          username={shelfs[0].username}
        />
        <ShelfDetailedNotice button={classes.button} />
        <ShelfDetailedList shelf={shelfs[0]} />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
