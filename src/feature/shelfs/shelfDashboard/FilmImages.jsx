import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridColumnGap: theme.spacing(4),
    gridRowGap: theme.spacing(2),
  },
  image: {
    width: '100%',
  },
}));
export default function FilmImages({ films }) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Box mt={2} mb={2}>
        <div className={classes.grid}>
          {films.map((film) => (
            <img
              src={film.photoURL}
              alt=''
              className={classes.image}
              key={film.id}
            />
          ))}
        </div>
      </Box>
    </Grid>
  );
}
