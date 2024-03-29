import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Menu } from '@material-ui/icons';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { openModal } from '../../app/common/modals/modalReducer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  topButton: {
    height: '24px',
    marginRight: '8px',
    transform: 'translateY(-2px)',
  },
  top: {
    '&:hover  h6': {
      textDecoration: 'underline',
    },
  },
  marginRight: {
    marginRight: '16px',
  },
  flexgrow: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.primary,
  },
  button: {
    color: '#FFFFFF',
    background: '#33291A',
    padding: theme.spacing(1),
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);

  return (
    <>
      <AppBar position='fixed' className={classes.appBar}>
        <Container>
          <Toolbar disableGutters>
            <Box mr={2}>
              <Link className={classes.top} component={NavLink} to='/'>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <img
                    src='/assets/logo.svg'
                    alt=''
                    className={classes.topButton}
                  />
                  <Typography variant='subtitle1' color='textPrimary'>
                    Squeeze Films
                  </Typography>
                </Grid>
              </Link>
            </Box>
            {!matches ? (
              <>
                <Divider
                  orientation='vertical'
                  flexItem
                  className={classes.marginRight}
                />
                <Link component={NavLink} to='/shelfs' className={classes.link}>
                  <Box mr={2}>
                    <Typography variant='subtitle1' className={classes.title}>
                      Squeezed Films List
                    </Typography>
                  </Box>
                </Link>
                <Divider
                  orientation='vertical'
                  flexItem
                  className={classes.marginRight}
                />
                <Button
                  variant='contained'
                  className={classes.button}
                  startIcon={<Add />}
                  onClick={
                    authenticated
                      ? currentUserProfile?.hasShelf
                        ? () => history.push(`/manage/${currentUserProfile.id}`)
                        : () => history.push(`/createShelf`)
                      : () => dispatch(openModal({ modalType: 'UnauthModal' }))
                  }
                >
                  Squeeze Films
                </Button>
                <Box mr={2} />
                <Divider
                  orientation='vertical'
                  flexItem
                  className={classes.marginRight}
                />
                <div className={classes.flexgrow}></div>
              </>
            ) : (
              <div className={classes.flexgrow}></div>
            )}
            {!matches ? (
              <> {authenticated ? <SignedInMenu /> : <SignedOutMenu />}</>
            ) : (
              <IconButton
                onClick={
                  authenticated
                    ? () =>
                        dispatch(openModal({ modalType: 'MobileSignedInMenu' }))
                    : () =>
                        dispatch(
                          openModal({ modalType: 'MobileSignedOutMenu' })
                        )
                }
              >
                <Menu />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
