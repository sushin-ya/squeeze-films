import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
// import { socialLogin } from '../../app/firestore/firebaseService';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    color: '#FFFFFF',
  },
  facebook: {
    margin: theme.spacing(1, 1, 1, 1),
    backgroundColor: '#3B5998',
    '&:hover': {
      backgroundColor: '#21355D',
    },
  },
  google: {
    margin: theme.spacing(1, 1, 2, 1),
    backgroundColor: '#DD4B39',
    '&:hover': {
      backgroundColor: '#812B20',
    },
  },
}));

export default function SocialLogin() {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(closeModal());
    // socialLogin(provider);
  }

  return (
    <>
      <Button
        variant='contained'
        className={`${classes.button} ${classes.facebook}`}
      >
        LOGIN with Facebook
      </Button>
      <Button
        variant='contained'
        className={`${classes.button} ${classes.google}`}
      >
        LOGIN with Google
      </Button>
    </>
  );
}
