import React, { useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import SidePopularFilms from '../../side/SidePopularFilms';
import ShelfFormFragAndDrop from './ShelfFormFragAndDrop';
import { useSelector, useDispatch } from 'react-redux';
import { createShelf, deleteShelf, updateShelf } from '../shelfActions';
import { useParams, useHistory } from 'react-router-dom';
import templateData from './template-data';
import FlimAutoCompleteForm from './FilmAutoCompleteForm';

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
  delete: {
    backgroundColor: '#F44336',
    '&:hover': {
      backgroundColor: '#C6382E',
    },
  },
}));

function initialData(shelf) {
  let newTmpData = undefined;
  const tmpData = templateData;
  if (shelf) {
    const newFilms = shelf.films.reduce(
      (newFilms, data) => ({
        ...newFilms,
        [`${data.id}`]: data,
      }),
      {}
    );
    const newFilmIds = shelf.films.map((film) => String(film.id));
    newTmpData = {
      ...tmpData,
      films: newFilms,
      columns: {
        ...tmpData.columns,
        allTimeBest: {
          ...tmpData.columns.allTimeBest,
          filmIds: newFilmIds,
        },
      },
    };
  }
  return newTmpData ?? tmpData;
}

export default function ShelfForm() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const selectedShelf = useSelector((state) =>
    state.shelf.shelfs.find((s) => s.uid === params.id)
  );
  const tmdbFilms = useSelector((state) => state.tmdb.tmdbFilms);

  const initialShelf = selectedShelf ?? {
    id: '4',
    uid: 'test1',
    displayName: 'Test1',
    photoURL: null,
    createdAt: '2021-05-21',
    films: [],
  };
  const [myShelf, setMyShelf] = useState(initialShelf);
  const [data, setData] = useState(initialData(selectedShelf));

  function handleSetData(films) {
    console.log(films);

    const film = {
      id: '10101',
      photoURL: null,
      title: 'ロード・オブ・ザ・リング',
      release: '2001',
      director: 'ピーター・ジャクソン',
      description: '映画の説明文',
    };

    const draggableId = film.id;
    const droppableId = 'candidate';
    const column = data.columns[droppableId];
    const newfilmIds = Array.from(column.filmIds);
    newfilmIds.splice(0, 0, draggableId);

    const newColumn = {
      ...column,
      filmIds: newfilmIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newData);
    return;
  }

  function handleFormSubmit(updatedData) {
    const filmList = Object.entries(updatedData.films).map(
      ([key, value]) => value
    );
    const myFilmIds = updatedData.columns['allTimeBest'].filmIds;
    const myFilmList = filmList.filter((film) => myFilmIds.includes(film.id));
    const newMyShelf = {
      ...myShelf,
      films: [...myFilmList],
    };
    setMyShelf(newMyShelf);

    selectedShelf
      ? dispatch(updateShelf(newMyShelf))
      : dispatch(createShelf(newMyShelf));
    history.push('/shelfs');
  }

  function handleFormDelete(myShelfId) {
    dispatch(deleteShelf(myShelfId));
    history.push('/shelfs');
  }

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <Box mr={1}>
          <FlimAutoCompleteForm setData={handleSetData} />
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
              onClick={() => handleFormSubmit(data)}
            >
              <Box p={0.5}>Submit</Box>
            </Button>
            {selectedShelf ? (
              <Button
                variant='contained'
                className={`${classes.button} ${classes.delete}`}
                onClick={() => handleFormDelete(myShelf.id)}
              >
                <Box p={0.5}>Delete</Box>
              </Button>
            ) : (
              <Button
                variant='contained'
                className={classes.button}
                color='primary'
                onClick={() => history.push('/shelfs')}
              >
                <Box p={0.5}>Cancel</Box>
              </Button>
            )}
          </Box>
        </Box>
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
