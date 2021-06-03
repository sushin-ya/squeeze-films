import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../app/firestore/firebaseService';

import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { closeModal, openModal } from '../../app/common/modals/modalReducer';

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

export default function MobileSignedInMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.currentUser);

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

  function handleToPopular() {
    history.push('/popular');
    dispatch(closeModal());
  }

  function handleToMyFilms() {
    history.push(`/shelfs/${user.uid}`);
    dispatch(closeModal());
  }

  function handleToProfile() {
    history.push(`/profile/${user.uid}`);
    dispatch(closeModal());
  }

  function handleMyaccount() {
    dispatch(closeModal());
    dispatch(openModal({ modalType: 'AccountForm' }));
  }

  async function handleSignOut() {
    try {
      dispatch(closeModal());
      history.push('/');
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
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
              <Link to={`/popular`} onClick={handleToPopular}>
                Popular Films
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/shelfs/${user?.uid}`} onClick={handleToMyFilms}>
                My Films
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/profile/${user?.uid}`} onClick={handleToProfile}>
                Profile
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/profile/${user?.uid}`} onClick={handleMyaccount}>
                My account
              </Link>
            </Grid>
            <Grid item>
              <Link to='/' onClick={handleSignOut}>
                Logout
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
    </ModalWrapper>
  );
}
