import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import squeezeFilmsIcon from '../../app/images/squeezeFilmsIcon.svg';
import { NavLink, useHistory } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

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
}));

export default function NavBar() {
  const classes = useStyles();
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  function handleSignOut() {
    setAuthenticated(false);
    history.push('/');
  }

  return (
    <AppBar position='static' className={classes.appBar}>
      <Container>
        <Toolbar disableGutters>
          <Box mr={2}>
            <Link
              className={classes.top}
              component={NavLink}
              to='/'
              onClick={() => {
                console.log('clicked');
              }}
            >
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <img
                  src={squeezeFilmsIcon}
                  alt=''
                  className={classes.topButton}
                />
                <Typography variant='subtitle1' color='textPrimary'>
                  Squeeze Films
                </Typography>
              </Grid>
            </Link>
          </Box>
          <Divider
            orientation='vertical'
            flexItem
            className={classes.marginRight}
          />
          <Link component={NavLink} to='/films' className={classes.link}>
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
          {authenticated && (
            <>
              <Link component={NavLink} to='/users' className={classes.link}>
                <Box mr={2}>
                  <Typography variant='subtitle1'>Users</Typography>
                </Box>
              </Link>
              <Divider
                orientation='vertical'
                flexItem
                className={classes.marginRight}
              />
            </>
          )}
          <div className={classes.flexgrow}></div>
          {authenticated ? (
            <SignedInMenu signOut={handleSignOut} />
          ) : (
            <SignedOutMenu setAuthenticated={setAuthenticated} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
