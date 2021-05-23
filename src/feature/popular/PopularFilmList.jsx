import React from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '15% 85%',
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(2),
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
  descriptionText: {
    width: '70%',
  },
}));

export default function PopularFilmList({ shelf }) {
  const classes = useStyles();

  return (
    <Box mt={2} mb={2}>
      <Paper>
        <Box p={2}>
          <Grid item xs={12}>
            <Box mt={2} mb={2}>
              {shelf &&
                shelf.map((film, index) => (
                  <div key={film.title}>
                    <Box mb={5}>
                      <div className={classes.grid}>
                        <img
                          src={film.photoURL}
                          alt=''
                          className={classes.image}
                        />
                        <Box ml={2}>
                          <Grid
                            container
                            direction='row'
                            justify='center'
                            alignItems='flex-start'
                          >
                            <Typography
                              className={classes.index}
                              variant='h5'
                              color='textSecondary'
                            >
                              {index + 1}.
                            </Typography>
                            <Grid
                              container
                              direction='column'
                              justify='center'
                              alignItems='flex-start'
                              className={classes.description}
                            >
                              <Typography variant='h5' color='textSecondary'>
                                {film.title}
                              </Typography>
                              <Box mt={2}>
                                <Typography>監督：{film.director}</Typography>
                                <Typography>公開：{film.release}年</Typography>
                              </Box>
                              <Box mt={2}>
                                <Typography variant='body1' color='textPrimary'>
                                  あらすじ：
                                </Typography>
                              </Box>
                              <Typography
                                variant='body1'
                                color='textPrimary'
                                className={classes.descriptionText}
                              >
                                あららららららららあああああああああああああああああああ
                                ああああああああああああああららららららららあああああああ
                                あああああああああああああああああ
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                    </Box>
                  </div>
                ))}
            </Box>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
