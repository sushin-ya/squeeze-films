import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
      <CircularProgress color='textPrimary' />
      <Typography color='textPrimary'>{content}</Typography>
    </Grid>
  );
}
