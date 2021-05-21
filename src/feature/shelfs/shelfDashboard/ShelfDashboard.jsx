import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ShelfDashboardTitle from './ShelfDashboardTitle';
import ShelfDashboardNotice from './ShelfDashboardNotice';
import ShelfList from './ShelfList';
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

export default function ShelfDashboard() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [shelfs, setshelfs] = useState(sampleData);

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
