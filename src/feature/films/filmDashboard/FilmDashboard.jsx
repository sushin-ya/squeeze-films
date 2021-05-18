import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import FilmDashboardTitle from './FilmDashboardTitle';
import FilmDashboardNotice from './FilmDashboardNotice';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
}));

export default function FilmDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <FilmDashboardTitle paper={classes.paper} />
        <FilmDashboardNotice />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <Paper className={classes.paper}>xs=4</Paper>
      </div>
    </div>
  );
}
