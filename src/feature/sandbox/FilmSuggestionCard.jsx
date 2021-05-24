import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '20% 80%',
    gridColumnGap: theme.spacing(0),
    gridRowGap: theme.spacing(0),
  },
  image: {
    width: '100%',
  },
  index: {
    width: '10%',
  },
  description: {
    width: '90%',
  },
}));

export default function FilmSuggestionCard({ title, year, img }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} p={1}>
      <div className={classes.grid}>
        <img src={img} alt='' className={classes.image} />
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='flex-start'
        >
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='flex-start'
            className={classes.description}
          >
            <Typography variant='subtitle1' color='textSecondary'>
              {title}
            </Typography>
            <Typography variant='body1' color='textSecondary'>
              {year}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
