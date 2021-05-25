import React from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      // justify='center'
      alignItems='center'
      className={classes.grid}
    >
      <Box mt={3}>
        <Typography variant='h5' className={classes.h1}>
          {error?.message || 'Oops - we have error'}
        </Typography>
      </Box>
      <Box mt={4}>
        <Button
          variant='contained'
          className={classes.button}
          component={Link}
          to='/shelfs'
        >
          <Box p={2}>
            <Typography variant='body1'>return to shelfs page</Typography>
          </Box>
        </Button>
      </Box>
    </Grid>
  );
}
