import React, { useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import SidePopularFilms from '../../side/SidePopularFilms';
import ShelfFormInputField from './ShelfFormInputField';
import ShelfFormFragAndDrop from './ShelfFormFragAndDrop';
import initialData from './initial-data';
import { useDispatch } from 'react-redux';
import { createShelf } from '../shelfActions';

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

export default function ShelfForm({ history }) {
  const classes = useStyles();

  const initialShelf = {
    id: '4',
    uid: 'test1',
    displayName: 'Test1',
    photoURL: null,
    createdAt: '2021-05-21',
    films: [],
  };
  const [data, setData] = useState(initialData);
  const [myShelf, setMyShelf] = useState(initialShelf);
  const dispatch = useDispatch();

  function handleSetMyShelf() {
    const filmList = Object.entries(data.films).map(([key, value]) => value);
    const myFilmIds = data.columns['allTimeBest'].filmIds;
    const myFilmList = filmList.filter((film) => myFilmIds.includes(film.id));
    const newMyShelf = {
      ...myShelf,
      films: [...myFilmList],
    };
    setMyShelf(newMyShelf);
    dispatch(createShelf(newMyShelf));
    history.push('/shelfs');
  }

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <Box mr={1}>
          <ShelfFormInputField />
          <ShelfFormFragAndDrop data={data} setData={setData} />
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
              onClick={() => handleSetMyShelf(data)}
            >
              <Box p={0.5}>Submit</Box>
            </Button>
            <Button
              variant='contained'
              className={classes.button}
              color='primary'
              onClick={() => history.push('/shelfs')}
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
