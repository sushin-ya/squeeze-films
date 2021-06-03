import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { openModal } from '../modals/modalReducer';

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.async);

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
