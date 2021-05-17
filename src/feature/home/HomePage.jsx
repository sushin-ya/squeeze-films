import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import squeezeFilmsIcon from '../../app/images/squeezeFilmsIcon.svg';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

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
    transform: 'translateY(-24px) scale(0.8,0.8)',
    marginRight: '16px',
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.grid}
    >
      <Grid container direction='row' justify='center' alignItems='center'>
        <img
          src={squeezeFilmsIcon}
          alt=''
          className={classes.squeezeFilmsIcon}
        />
        <Grid>
          <Typography variant='h1' className={classes.h1}>
            Squeeze Films
          </Typography>
          <Typography variant='body1'>
            あなたにとっての最高の映画、１０本にしぼってみませんか
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant='outlined'
        endIcon={<ArrowRightAltIcon />}
        className={classes.button}
      >
        GET STARTED
      </Button>
    </Grid>
  );
}
