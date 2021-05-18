import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '20% 80%',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(1),
  },
  image: {
    width: '100%',
  },
}));
export default function SidePopularFilmsList({ films }) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Box mt={2} mb={2}>
        {films.map((film) => (
          <div key={film.title}>
            <Box mb={2}>
              <div className={classes.grid}>
                <img src={film.photoURL} alt='' className={classes.image} />
                <Grid container justify='flex-start' alignItems='center'>
                  <Typography>
                    {film.id}. {film.title}({film.release})
                  </Typography>
                </Grid>
              </div>
            </Box>
          </div>
        ))}
      </Box>
    </Grid>
  );
}
