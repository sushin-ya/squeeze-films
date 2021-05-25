import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import ShelfDashboardTitle from './ShelfDashboardTitle';
import ShelfDashboardNotice from './ShelfDashboardNotice';
import ShelfList from './ShelfList';
import SidePopularFilms from '../../side/SidePopularFilms';
import { useSelector } from 'react-redux';
import {
  dataFromSnapshot,
  getShelfsFromFirestore,
} from '../../../app/firestore/firestoreService';

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

export default function ShelfDashboard() {
  const classes = useStyles();
  const { shelfs } = useSelector((state) => state.shelf);

  useEffect(() => {
    const unsubscribe = getShelfsFromFirestore({
      next: (snapshot) =>
        console.log(
          snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
        ),
      error: (error) => console.log(error),
    });

    return unsubscribe;
  }, []);

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ShelfDashboardTitle />
        <ShelfDashboardNotice button={classes.button} />
        <ShelfList shelfs={shelfs} button={classes.button} />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
