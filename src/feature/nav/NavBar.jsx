import React from 'react';
import {
  AppBar,
  Container,
  Divider,
  Grid,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import squeezeFilmsIcon from '../../app/images/squeezeFilmsIcon.svg';
import MyMenuList from './myMenuList/MyMenuList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    paddingLeft: 0,
    paddingRight: 0,
    color: theme.palette.text.primary,
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
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.appBar}>
      <Container>
        <Toolbar disableGutters>
          <Link
            href='/'
            onClick={() => {
              console.log('clicked');
            }}
            className={classes.marginRight}
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
          <Divider
            orientation='vertical'
            flexItem
            className={classes.marginRight}
          />
          <Typography
            variant='subtitle1'
            className={`${classes.title} ${classes.marginRight}`}
          >
            Squeezed Films List
          </Typography>
          <Divider
            orientation='vertical'
            flexItem
            className={classes.marginRight}
          />
          <Typography
            variant='subtitle1'
            className={`${classes.users} ${classes.marginRight}`}
          >
            Users
          </Typography>
          <MyMenuList />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
