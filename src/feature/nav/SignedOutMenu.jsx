import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openModal } from '../../app/common/modals/modalReducer';

const useStyles = makeStyles((theme) => ({
  signup: {
    color: '#FFFFFF',
    background: '#33291A',
  },
}));

export default function SignedOutMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Box mr={1}>
        <Button
          onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
          variant='outlined'
        >
          Login
        </Button>
      </Box>
      <Button variant='outlined' className={classes.signup}>
        Sign up
      </Button>
    </>
  );
}
