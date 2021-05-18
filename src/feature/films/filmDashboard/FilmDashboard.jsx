import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Stars } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(0),
  },
  stars: {
    height: '40px',
    width: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
}));

export default function FilmDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <Paper className={classes.paper}>
          <div className={classes.container}>
            <Stars style={{ gridColumnStart: 1 }} className={classes.stars} />
            <Typography
              variant='h3'
              style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
              className={classes.title}
            >
              The 10 Best Squeezed Films of All Time
            </Typography>
            <Typography
              variant='body1'
              style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
            >
              オール・タイム・ベスト１０映画を共有しよう
            </Typography>
          </div>
        </Paper>
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <Paper className={classes.paper}>xs=4</Paper>
      </div>
    </div>
  );
}
