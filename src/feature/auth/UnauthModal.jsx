import React from 'react';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../app/common/modals/modalReducer';
import ModalWrapper from '../../app/common/modals/ModalWrapper';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '360px',
    pointerEvents: 'auto',
  },
  text: {
    textDecoration: 'underline',
  },
}));

export default function UnauthModal({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { prevLocation } = useSelector((state) => state.auth);

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

  function handleOpenLogin() {
    dispatch(closeModal());
    dispatch(openModal({ modalType: 'LoginForm' }));
  }
  function handleOpenRegister() {
    dispatch(closeModal());
    dispatch(openModal({ modalType: 'RegisterForm' }));
  }

  function handleCancel() {
    if (!history) {
      dispatch(closeModal());
      return;
    }

    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push('/shelfs');
    }
    dispatch(closeModal());
  }

  return (
    <ModalWrapper>
      <Wrapper>
        <Paper className={classes.paper}>
          <Box pl={1} pr={1}>
            <Box mt={2} mb={2}>
              <Grid
                container
                direction='row'
                justify='flex-start'
                alignItems='center'
              >
                <HelpIcon />
                <Box ml={1} />
                <Typography variant='subtitle1' className={classes.text}>
                  You need to be signed in to do that
                </Typography>
              </Grid>
            </Box>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            >
              <Button
                onClick={() => handleOpenLogin()}
                variant='contained'
                color='primary'
                size='large'
                fullWidth
              >
                Login
              </Button>
              <Button
                onClick={() => handleOpenRegister()}
                variant='contained'
                color='secondary'
                size='large'
                fullWidth
              >
                Register
              </Button>
              <Box mt={2} />
              <Button
                onClick={() => handleCancel()}
                variant='outlined'
                fullWidth
              >
                Cancel
              </Button>
              <Box mb={4} />
            </Grid>
          </Box>
        </Paper>
      </Wrapper>
    </ModalWrapper>
  );
}
