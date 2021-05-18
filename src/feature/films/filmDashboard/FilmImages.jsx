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
    height: '180px',
    width: '120px',
  },
}));
export default function FilmImages({ films }) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Box mt={2} mb={2}>
        <div className={classes.grid}>
          {films.map((film) => (
            <div
              style={{
                gridColumnStart: `${film.id > 5 ? (film.id % 6) + 1 : film.id}`,
              }}
            >
              <img src={film.photoURL} alt='' className={classes.image} />
            </div>
          ))}
        </div>
      </Box>
    </Grid>
  );
}
