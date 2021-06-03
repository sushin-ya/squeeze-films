import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeModal, openModal } from '../../app/common/modals/modalReducer';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  box: {
    pointerEvents: 'auto',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      fontSize: '30px',
      fontWeight: 'bold',
    },
    '& a:hover': {
      opacity: '0.8',
    },
  },
  squeezeFilmsIcon: {
    transform: 'translateX(-16px) scale(0.8,0.8)',
  },
}));

export default function MobileSignedOutMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const Wrapper = React.forwardRef(({ children }, ref) => {
    return (
      <div ref={ref} tabIndex={-1} style={{ pointerEvents: 'none' }}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          className={classes.grid}
        >
          {children}
        </Grid>
      </div>
    );
  });

  function handleToTop() {
    history.push('/');
    dispatch(closeModal());
  }

  function handleToShelfs() {
    history.push('/shelfs');
    dispatch(closeModal());
  }

  function handleSignIn() {
    dispatch(closeModal());
    dispatch(openModal({ modalType: 'LoginForm' }));
  }

  function handleSignUp() {
    dispatch(closeModal());
    dispatch(openModal({ modalType: 'RegisterForm' }));
  }

  return (
    <ModalWrapper>
      <Wrapper>
        <Box className={classes.box}>
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='flex-start'
            spacing={1}
          >
            <Grid item>
              <img
                src='/assets/logo.svg'
                alt=''
                className={classes.squeezeFilmsIcon}
              />
            </Grid>
            <Grid item>
              <Link to='/' onClick={handleToTop}>
                Top
              </Link>
            </Grid>
            <Grid item>
              <Link to='/shelfs' onClick={handleToShelfs}>
                Squeeze Films List
              </Link>
            </Grid>
            <Grid item>
              <Link to='/shelfs' onClick={handleSignIn}>
                Login
              </Link>
            </Grid>
            <Grid item>
              <Link to='/shelfs' onClick={handleSignUp}>
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
    </ModalWrapper>
  );
}
