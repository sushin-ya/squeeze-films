import React from 'react';
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  film: {
    border: '1px solid lightgrey',
    borderRadius: '2px',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: 'white',
  },
  avatar: {
    width: '50px',
  },
  filmTitle: {
    color: theme.palette.text.secondary,
  },
}));

export default function ShelfFormListItem({ film, index }) {
  const classes = useStyles();

  return (
    <Draggable draggableId={film.id} index={index}>
      {(provided, snapshot) => {
        const style = {
          backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
          ...provided.draggableProps.style,
        };
        return (
          <ListItem
            className={classes.film}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={style}
          >
            <ListItemAvatar>
              <img alt='' src={film.photoURL} className={classes.avatar} />
            </ListItemAvatar>
            <ListItemText className={classes.filmTitle}>
              {index + 1}. {film.title}({film.release})
            </ListItemText>
            <IconButton>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </ListItem>
        );
      }}
    </Draggable>
  );
}
