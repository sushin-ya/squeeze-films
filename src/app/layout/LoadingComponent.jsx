import React from 'react';
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1500',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));

export default function LoadingComponent({ content = 'Loading...' }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <CircularProgress color='inherit' />
      <Typography>{content}</Typography>
    </Grid>
  );
}
