import { makeStyles, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  film: {
    border: '1px solid lightgrey',
    borderRadius: '2px',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: 'white',
  },
}));

export default function FilmFormListItem({ film, index }) {
  const classes = useStyles();

  return (
    <Draggable draggableId={film.id} index={index}>
      {(provided, snapshot) => {
        const style = {
          backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
          ...provided.draggableProps.style,
        };
        return (
          <Typography
            className={classes.film}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={style}
          >
            {film.content}
          </Typography>
        );
      }}
    </Draggable>
  );
}
