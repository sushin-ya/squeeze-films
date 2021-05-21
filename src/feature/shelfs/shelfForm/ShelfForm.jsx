import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import SidePopularFilms from '../../side/SidePopularFilms';
import ShelfFormInputField from './ShelfFormInputField';
import ShelfFormFragAndDrop from './ShelfFormFragAndDrop';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
  button: {
    width: '49%',
    color: 'white',
    fontSize: '16px',
  },
  success: {
    backgroundColor: '#398585',
    '&:hover': {
      backgroundColor: '#265858',
    },
  },
}));

export default function ShelfForm() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <Box mr={1}>
          <ShelfFormInputField />
          <ShelfFormFragAndDrop />
          <Box
            mt={2}
            mb={2}
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Button
              variant='contained'
              className={`${classes.button} ${classes.success}`}
            >
              <Box p={0.5}>Submit</Box>
            </Button>
            <Button
              variant='contained'
              className={classes.button}
              color='primary'
            >
              <Box p={0.5}>Cancel</Box>
            </Button>
          </Box>
        </Box>
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
