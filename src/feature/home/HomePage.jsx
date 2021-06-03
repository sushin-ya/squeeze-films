import React from 'react';
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
  button: {
    marginTop: '36px',
  },
  squeezeFilmsIcon: {
    [theme.breakpoints.up('sm')]: {
      transform: 'translateY(-24px) scale(0.8,0.8)',
      marginRight: '16px',
    },
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.grid}
    >
      <Grid
        item
        container
        direction='row'
        justify='center'
        alignItems='center'
        wrap={!matches ? 'nowrap' : 'wrap'}
      >
        <Grid item>
          <img
            src='/assets/logo.svg'
            alt=''
            className={classes.squeezeFilmsIcon}
          />
        </Grid>
        {!matches ? (
          <Grid item>
            <Typography variant={!matches ? 'h1' : 'h2'} className={classes.h1}>
              Squeeze Films
            </Typography>
            <Typography variant='body1'>
              あなたにとっての最高の映画、１０本にしぼってみませんか
            </Typography>
          </Grid>
        ) : (
          <Grid
            item
            container
            direction='column'
            justify='center'
            alignItems={!matches ? 'flex-start' : 'center'}
          >
            <Typography variant={!matches ? 'h1' : 'h2'} className={classes.h1}>
              Squeeze Films
            </Typography>
            <Typography variant='body1'>
              あなたにとっての最高の映画、
              <br />
              １０本にしぼってみませんか
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid item>
        <Button
          variant='outlined'
          endIcon={<ArrowRightAltIcon />}
          className={classes.button}
          component={Link}
          to='/shelfs'
        >
          GET STARTED
        </Button>
      </Grid>
    </Grid>
  );
}
