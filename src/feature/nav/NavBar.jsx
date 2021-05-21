import React from 'react';
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
import MyMenuList from './MyMenuList';
import { NavLink } from 'react-router-dom';

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
  marginRight: {
    marginRight: '16px',
  },
  users: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.primary,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.appBar}>
      <Container>
        <Toolbar disableGutters>
          <Box mr={2}>
            <Link
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
          <Link
            component={NavLink}
            to='/films'
            className={`${classes.link} ${classes.users}`}
          >
            <Typography variant='subtitle1'>Users</Typography>
          </Link>
          <MyMenuList />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
