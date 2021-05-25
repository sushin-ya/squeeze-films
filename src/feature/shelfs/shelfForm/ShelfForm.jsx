import React, { useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import SidePopularFilms from '../../side/SidePopularFilms';
import ShelfFormFragAndDrop from './ShelfFormFragAndDrop';
import { useSelector, useDispatch } from 'react-redux';
import { listenToShelfs } from '../shelfActions';
import { useParams, useHistory } from 'react-router-dom';
import templateData from './template-data';
import FlimAutoCompleteForm from './FilmAutoCompleteForm';
import {
  addShelfToFirestore,
  deleteShelfInFirestore,
  listenToShelfFromFirestore,
  updateShelfToFirestore,
} from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { toast } from 'react-toastify';
import ConfirmDelete from './ConfirmDelete';
import ConfirmCreate from './ConfirmCreate';

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
  const [submitConfirmOpen, setSubmitConfirmOpen] = useState(false);
  const [delteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const selectedShelf = useSelector((state) =>
    state.shelf.shelfs.find((s) => s.uid === params.id)
  );

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

  useFirestoreDoc({
    shouldExecute: !!params.id,
    query: () => listenToShelfFromFirestore(params.id),
    data: (event) => dispatch(listenToShelfs([event])),
    deps: [params.id, dispatch],
  });

  function handleSetData(film) {
    const draggableId = String(film.id);
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
      films: {
        ...data.films,
        [String(film.id)]: film,
      },
    };

    setData(newData);
    return;
  }

  async function handleFormSubmit(updatedData) {
    try {
      const filmList = Object.entries(updatedData.films).map(
        ([key, value]) => value
      );
      const myFilmIds = updatedData.columns['allTimeBest'].filmIds;
      const myFilmList = myFilmIds.reduce(
        (acc, cur) => [...acc, filmList.filter((film) => film.id === cur)[0]],
        []
      );
      const newMyShelf = {
        ...myShelf,
        films: [...myFilmList],
      };
      setMyShelf(newMyShelf);
      selectedShelf
        ? await updateShelfToFirestore(newMyShelf)
        : await addShelfToFirestore(newMyShelf);
      console.log('[update done]', newMyShelf);
      history.push('/shelfs');
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleFormDelete(myShelfId) {
    await deleteShelfInFirestore(myShelfId);
    history.push('/shelfs');
  }

  const handleDeleteConfirmOpen = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
  };

  const handleSubmitConfirmOpen = () => {
    setSubmitConfirmOpen(true);
  };

  const handleSubmitConfirmClose = () => {
    setSubmitConfirmOpen(false);
  };

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
              onClick={() => handleSubmitConfirmOpen()}
            >
              <Box p={0.5}>Submit</Box>
            </Button>
            {selectedShelf ? (
              <Button
                variant='contained'
                className={`${classes.button} ${classes.delete}`}
                onClick={() => handleDeleteConfirmOpen()}
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
      <ConfirmDelete
        confirmOpen={delteConfirmOpen}
        handleClose={handleDeleteConfirmClose}
        handleDelete={handleFormDelete}
        myShelfId={myShelf.id}
      />
      <ConfirmCreate
        confirmOpen={submitConfirmOpen}
        handleClose={handleSubmitConfirmClose}
        handleSubmit={handleFormSubmit}
        data={data}
        isUpdate={!!selectedShelf}
      />
    </div>
  );
}
