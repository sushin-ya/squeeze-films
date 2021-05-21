import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  signup: {
    color: '#FFFFFF',
    background: '#33291A',
  },
}));

export default function SignedOutMenu({ setAuthenticated }) {
  const classes = useStyles();

  return (
    <>
      <Box mr={1}>
        <Button
          onClick={() => setAuthenticated(true)}
          variant='outlined'
          component={Link}
          to='/login'
        >
          Login
        </Button>
      </Box>
      <Button
        variant='outlined'
        className={classes.signup}
        component={Link}
        to='/signup'
      >
        Sign up
      </Button>
    </>
  );
}
