import React from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../modals/modalReducer';
import { useEffect } from 'react/cjs/react.development';
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

export default function UnauthComponent() {
  const { error } = useSelector((state) => state.async);
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log('UnauthModal');
  useEffect(() => {
    dispatch(openModal({ modalType: 'UnauthModal' }));
  }, [dispatch]);

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.grid}
    >
      <Box mt={3}>
        <Typography variant='h5' className={classes.h1}>
          {error?.message || 'Oops !'}
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
